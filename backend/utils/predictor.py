"""Prediction utilities for Dermis-Detect - Using HuggingFace Inference API."""

import sys
import json
from pathlib import Path
from datetime import datetime
from PIL import Image
import io

from .model_loader import (
    HF_CLIENT, HF_CLIENT_READY, CLASS_MAPPING, DISEASE_INFO
)


def get_class_name(class_idx: int) -> str:
    """Convert class index to disease code (short name)."""
    class_key = str(class_idx)
    
    # Try to get from class mapping
    if class_key in CLASS_MAPPING:
        return CLASS_MAPPING[class_key]
    
    # If class mapping is a list-style
    class_list = list(CLASS_MAPPING.values())
    if class_idx < len(class_list):
        return class_list[class_idx]
    
    return f"unknown_{class_idx}"


def normalize_disease_code(disease_label: str) -> str:
    """
    Normalize ViT disease label to our short disease codes.
    ViT returns class names like 'actinic_keratoses', 'benign_keratosis-like_lesions', etc.
    We need to convert to our short codes like 'mel', 'bcc', 'akiec', etc.
    
    Args:
        disease_label: Disease label from ViT model
        
    Returns:
        Short disease code (mel, bcc, akiec, nv, bkl, df, vasc)
    """
    # Mapping from ViT class names (as they appear in id2label) to our short codes
    label_to_code = {
        # Exact ViT class names (from id2label)
        "actinic_keratoses": "akiec",
        "basal_cell_carcinoma": "bcc",
        "benign_keratosis-like_lesions": "bkl",
        "dermatofibroma": "df",
        "melanoma": "mel",
        "melanocytic_nevi": "nv",
        "vascular_lesions": "vasc",
        
        # Also handle different case variations
        "actinic_keratosis": "akiec",
        "benign_keratosis": "bkl",
        "melanocytic_Nevi": "nv",
        "vascular_lesion": "vasc",
        
        # Fallback for short codes
        "mel": "mel",
        "bcc": "bcc",
        "akiec": "akiec",
        "nv": "nv",
        "bkl": "bkl",
        "df": "df",
        "vasc": "vasc",
    }
    
    # Normalize to lowercase and remove extra spaces
    normalized = disease_label.lower().strip()
    
    # Check direct mapping first
    if normalized in label_to_code:
        return label_to_code[normalized]
    
    # Try to find partial match in keys
    for full_name, code in label_to_code.items():
        if full_name in normalized or normalized in full_name:
            return code
    
    # Fallback - if can't map, keep normalized version
    return normalized


def predict_with_hf_api(image: Image.Image) -> tuple[str, float]:
    """
    Run ViT model inference using HuggingFace Inference API.
    
    Args:
        image: PIL Image object
        
    Returns:
        (predicted_disease_code, confidence_percentage)
    """
    if not HF_CLIENT_READY or HF_CLIENT is None:
        raise RuntimeError("HuggingFace Inference API client is not ready")
    
    try:
        # Ensure image is RGB
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Convert PIL image to bytes for API
        image_bytes = io.BytesIO()
        image.save(image_bytes, format='JPEG')
        image_bytes.seek(0)
        
        # Call HF Inference API
        result = HF_CLIENT.image_classification(image_bytes)
        
        # Parse results - the API returns a list of classifications
        # Each item has 'label' and 'score'
        if result and len(result) > 0:
            top_prediction = result[0]  # Get highest confidence prediction
            
            # Extract disease code from label
            disease_label = top_prediction.get('label', '')
            confidence = top_prediction.get('score', 0.0) * 100  # Convert to percentage
            
            # Normalize disease label to our short codes
            disease_code = normalize_disease_code(disease_label)
            
            return disease_code, confidence
        else:
            raise RuntimeError("No predictions returned from API")
            
    except Exception as e:
        print(f"Error in HF API prediction: {e}")
        raise


def predict(image_tensor=None) -> tuple[int, float]:
    """
    Deprecated: Legacy function for ResNet50 predictions.
    Kept for compatibility but raises error.
    
    Use predict_with_hf_api instead.
    """
    raise RuntimeError("Local ResNet50 model is not loaded. Using HF Inference API for all predictions.")


def predict_vit(image: Image.Image) -> tuple[str, float]:
    """
    Run ViT model inference.
    
    This now uses HuggingFace Inference API instead of local model.
    
    Args:
        image: PIL Image object
        
    Returns:
        (predicted_disease_code, confidence_percentage)
    """
    return predict_with_hf_api(image)


def ensemble_predict(disease_code: str, confidence: float) -> tuple[str, float, str]:
    """
    Return final prediction (now uses only ViT via HF API).
    
    Args:
        disease_code: ViT predicted disease code
        confidence: ViT confidence
        
    Returns:
        (final_class_code, final_confidence, which_model_used)
    """
    model_used = "ViT (HF Inference API)"
    return disease_code, confidence, model_used


def get_disease_description(class_code: str) -> dict:
    """
    Get comprehensive disease information.
    
    Args:
        class_code: Disease code (e.g., 'mel', 'nv', 'bcc')
        
    Returns:
        dict: Comprehensive disease information
    """
    
    # Direct lookup in disease info
    if class_code in DISEASE_INFO:
        info = DISEASE_INFO[class_code]
        
        # If info is a dictionary with comprehensive details
        if isinstance(info, dict):
            return {
                "full_name": info.get("full_name", class_code),
                "severity": info.get("severity", "Unknown"),
                "description": info.get("description", "No description available"),
                "causes": info.get("causes", "Information not available"),
                "symptoms": info.get("symptoms", "Information not available"),
                "treatment": info.get("treatment", "Consult a dermatologist"),
                "prevention": info.get("prevention", "Regular skin checks recommended"),
                "disclaimer": info.get("disclaimer", "Consult a board-certified dermatologist for proper diagnosis and treatment")
            }
        
        # If info is just a string (old format)
        return {
            "full_name": str(info),
            "severity": "Unknown",
            "description": str(info),
            "causes": "Unknown",
            "symptoms": "Unknown",
            "treatment": "Consult a dermatologist",
            "prevention": "Regular skin checks",
            "disclaimer": "Please consult a board-certified dermatologist for professional diagnosis and medical advice"
        }
    
    # Fallback if disease not found
    return {
        "full_name": f"Unknown Condition ({class_code})",
        "severity": "Unknown",
        "description": f"Detected condition: {class_code}. Please consult a dermatologist for professional diagnosis.",
        "causes": "Unknown",
        "symptoms": "Unknown",
        "treatment": "Consult a dermatologist",
        "prevention": "Regular skin checks",
        "disclaimer": "This analysis is for informational purposes only. A qualified dermatologist must provide proper diagnosis and treatment recommendations"
    }


def save_upload(file_bytes: bytes, filename: str, prediction: dict, uploads_dir: Path) -> str:
    """
    Save uploaded image with prediction metadata.
    
    Args:
        file_bytes: Raw image bytes
        filename: Original filename
        prediction: Prediction results
        uploads_dir: Directory to save uploads
        
    Returns:
        Path where image was saved
    """
    try:
        # Create timestamp for unique filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_ext = Path(filename).suffix or ".jpg"
        safe_filename = f"{timestamp}_{Path(filename).stem}{file_ext}"
        
        # Save image file
        image_path = uploads_dir / safe_filename
        with open(image_path, "wb") as f:
            f.write(file_bytes)
        
        # Save prediction metadata as JSON
        meta_path = uploads_dir / f"{timestamp}_{Path(filename).stem}.json"
        metadata = {
            "original_filename": filename,
            "saved_filename": safe_filename,
            "timestamp": datetime.now().isoformat(),
            "prediction": prediction
        }
        with open(meta_path, "w", encoding='utf-8') as f:
            json.dump(metadata, f, indent=2, ensure_ascii=False)
        
        return str(image_path)
    except Exception as e:
        print(f"Warning: Failed to save uploaded image: {e}")
        return None
