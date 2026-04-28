"""Prediction API endpoints for Dermis-Detect - Using HuggingFace Inference API."""

import sys
import asyncio
from pathlib import Path
from io import BytesIO

# Add backend directory to path for imports
backend_dir = Path(__file__).parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from PIL import Image

from utils.model_loader import HF_CLIENT_READY, MODEL_INFO
from utils.predictor import (
    predict_vit, ensemble_predict, get_disease_description, save_upload
)


# Configure uploads directory - use /tmp for Render (ephemeral), local for development
import os
ENV = os.getenv("ENV", "development")
if ENV == "production" or os.path.exists("/tmp"):
    # Render / Linux production environment
    UPLOADS_DIR = Path("/tmp/dermis_detect_uploads")
else:
    # Local development
    UPLOADS_DIR = Path(__file__).parent.parent / "uploads"

UPLOADS_DIR.mkdir(exist_ok=True, parents=True)

router = APIRouter(prefix="", tags=["prediction"])


# Data Models
class PredictionResponse(BaseModel):
    """Response model for prediction endpoint."""
    filename: str
    prediction: dict


class HealthResponse(BaseModel):
    """Response model for health check endpoint."""
    status: str
    api_ready: bool
    model: str


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="operational",
        api_ready=HF_CLIENT_READY,
        model="ViT (HuggingFace Inference API)"
    )


@router.post("/predict", response_model=PredictionResponse)
async def predict_disease(file: UploadFile = File(...)):
    """
    Predict skin disease from uploaded image.
    
    Uses ViT model via HuggingFace Inference API for predictions.
    
    Args:
        file: Image file to analyze
        
    Returns:
        PredictionResponse with disease prediction and detailed information
    """
    
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Wait for API client to initialize (with timeout) if still initializing
    if not HF_CLIENT_READY:
        import time
        timeout_counter = 0
        max_wait = 120  # 2 minute max wait
        wait_interval = 1  # Check every 1 second
        
        print(f"⏳ HF API client still initializing... Waiting (max {max_wait}s)")
        while not HF_CLIENT_READY and timeout_counter < max_wait:
            await asyncio.sleep(wait_interval)
            timeout_counter += wait_interval
        
        if not HF_CLIENT_READY:
            raise HTTPException(
                status_code=503,
                detail="HuggingFace Inference API client failed to initialize. Please try again later."
            )
    
    try:
        # Read and process image
        contents = await file.read()
        image = Image.open(BytesIO(contents))
        image_rgb = image.convert('RGB') if image.mode != 'RGB' else image
        
        # ViT prediction using HF Inference API
        vit_disease_code, vit_confidence = predict_vit(image_rgb)
        
        # Use HF API prediction as final result
        final_disease_code, final_confidence, model_used = ensemble_predict(
            vit_disease_code, vit_confidence
        )
        
        # Log prediction
        print(f"\n{'='*70}")
        sys.stdout.flush()
        print(f"PREDICTION SUMMARY")
        sys.stdout.flush()
        print(f"{'='*70}")
        sys.stdout.flush()
        print(f"Model Used: {model_used}")
        sys.stdout.flush()
        print(f"Final Prediction: {final_disease_code} ({final_confidence:.2f}% confidence)")
        sys.stdout.flush()
        print(f"{'='*70}\n")
        sys.stdout.flush()
        
        # Get comprehensive disease information
        disease_info = get_disease_description(final_disease_code)
        full_disease_name = disease_info.get("full_name", final_disease_code)
        
        # Format confidence as percentage
        confidence_percent = round(final_confidence, 2)
        
        # Prepare comprehensive prediction result
        prediction_result = {
            "disease_code": final_disease_code,
            "disease_name": full_disease_name,
            "confidence": confidence_percent,
            "severity": disease_info.get("severity", "Unknown"),
            "description": disease_info.get("description", ""),
            "causes": disease_info.get("causes", ""),
            "symptoms": disease_info.get("symptoms", ""),
            "treatment": disease_info.get("treatment", ""),
            "prevention": disease_info.get("prevention", ""),
            "disclaimer": disease_info.get("disclaimer", "Please consult a dermatologist")
        }
        
        # Save image with metadata
        saved_path = save_upload(contents, file.filename, prediction_result, UPLOADS_DIR)
        if saved_path:
            print(f"✓ Uploaded image saved to: {saved_path}")
            sys.stdout.flush()
        
        return PredictionResponse(
            filename=file.filename,
            prediction=prediction_result
        )
    
    except Exception as e:
        print(f"Error processing image: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Error processing image: {str(e)}"
        )


@router.get("/config")
async def get_config():
    """Get current model and prediction configuration."""
    from utils.model_loader import CONFIG, CLASS_MAPPING, HF_CLIENT_READY
    
    return {
        "model_info": MODEL_INFO,
        "preprocessing": CONFIG,
        "num_classes": MODEL_INFO.get("num_classes", 7),
        "class_mapping": CLASS_MAPPING,
        "inference_api": {
            "provider": "HuggingFace Inference API",
            "model": "ViT (vit-large-ham10000)",
            "status": "ready" if HF_CLIENT_READY else "initializing"
        },
        "description": "Using HuggingFace Inference API for ViT predictions (no local models loaded)"
    }
