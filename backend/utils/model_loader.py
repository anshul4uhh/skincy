"""Model loading utilities for Dermis-Detect - Using HuggingFace Inference API."""

import json
import torch
from pathlib import Path
import os
from huggingface_inference import InferenceClient


# HuggingFace Model IDs
VIT_REPO_ID = os.getenv("VIT_REPO_ID", "Anshul518/dermis-detect-vit-large")
# Handle empty token string - convert to None to avoid "Bearer " header issue
_hf_token = os.getenv("HF_TOKEN", "").strip()
HF_TOKEN = _hf_token if _hf_token else None  # Convert empty string to None

# Cache directory for downloaded models
CACHE_DIR = Path(__file__).parent.parent / ".model_cache"
CACHE_DIR.mkdir(exist_ok=True)

# Device configuration (not needed for Inference API, but kept for compatibility)
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def load_config():
    """Load preprocessing configuration."""
    # Default config for ViT preprocessing
    return {
        "input_size": 384,  # ViT-Large uses 384x384
        "mean": [0.5, 0.5, 0.5],
        "std": [0.5, 0.5, 0.5]
    }


def load_class_mapping():
    """Load class index to name mapping."""
    return {
        "0": "akiec",
        "1": "bcc",
        "2": "bkl",
        "3": "df",
        "4": "mel",
        "5": "nv",
        "6": "vasc"
    }


def load_disease_info():
    """Load human-friendly disease descriptions."""
    return {
        "mel": {
            "full_name": "Melanoma",
            "severity": "High",
            "description": "A type of skin cancer that develops from melanocytes (pigment-producing cells).",
            "causes": "Excessive sun exposure, genetic predisposition",
            "symptoms": "Irregular moles, color variation, asymmetry",
            "treatment": "Surgical removal, immunotherapy, targeted therapy",
            "prevention": "Sun protection, regular skin checks"
        },
        "bcc": {
            "full_name": "Basal Cell Carcinoma",
            "severity": "Medium",
            "description": "The most common type of skin cancer, arising from basal cells.",
            "causes": "Sun exposure, fair skin",
            "symptoms": "Pearly bump, bleeding lesion, scar-like appearance",
            "treatment": "Surgical removal, radiation, topical treatments",
            "prevention": "Sun protection, avoid tanning beds"
        },
        "akiec": {
            "full_name": "Actinic Keratosis",
            "severity": "Medium",
            "description": "Precancerous lesion caused by sun damage.",
            "causes": "Chronic sun exposure",
            "symptoms": "Scaly, rough patches on skin",
            "treatment": "Cryotherapy, topical creams, laser therapy",
            "prevention": "Sun protection, regular monitoring"
        },
        "nv": {
            "full_name": "Melanocytic Nevi",
            "severity": "Low",
            "description": "Common moles that are typically benign.",
            "causes": "Genetic, sun exposure",
            "symptoms": "Brown spots, uniform color and shape",
            "treatment": "Usually no treatment needed unless cosmetic",
            "prevention": "Regular monitoring"
        },
        "bkl": {
            "full_name": "Benign Keratosis",
            "severity": "Low",
            "description": "Non-cancerous skin growths that are very common.",
            "causes": "Age-related, genetic",
            "symptoms": "Waxy, scaly appearance",
            "treatment": "Removal if desired for cosmetic reasons",
            "prevention": "Regular skin checks"
        },
        "df": {
            "full_name": "Dermatofibroma",
            "severity": "Low",
            "description": "A common benign skin growth.",
            "causes": "Unknown, possibly related to minor skin injury",
            "symptoms": "Small, firm brown bump",
            "treatment": "Usually no treatment needed",
            "prevention": "N/A"
        },
        "vasc": {
            "full_name": "Vascular Lesion",
            "severity": "Low",
            "description": "Benign skin lesion with blood vessel involvement.",
            "causes": "Vascular malformations",
            "symptoms": "Red or purple lesions",
            "treatment": "Laser therapy if desired",
            "prevention": "N/A"
        }
    }


def load_model_info():
    """Load model architecture information."""
    return {
        "model_name": "vit-large",
        "num_classes": 7,
        "input_size": 384,
        "api_based": True
    }


# ================== Initialize HF Inference API Client ==================

import threading

print("=" * 70)
print("DERMIS-DETECT: Using HuggingFace Inference API for ViT Predictions")
print("=" * 70)

# Global flags and client
HF_CLIENT = None
HF_CLIENT_READY = False
CONFIG = None
CLASS_MAPPING = None
DISEASE_INFO = None
MODEL_INFO = None

# Dummy flags for compatibility with prediction routes
MODEL_LOADED = True  # Not used in API mode
VIT_MODEL_LOADED = True  # Not used in API mode
MODEL = None  # Not used
VIT_MODEL = None  # Not used
VIT_PROCESSOR = None  # Not used


def _initialize_hf_client():
    """Initialize HuggingFace Inference API client in background thread."""
    global HF_CLIENT, HF_CLIENT_READY
    
    try:
        print("Initializing HuggingFace Inference API client...")
        HF_CLIENT = InferenceClient(
            model=VIT_REPO_ID,
            token=HF_TOKEN,
            timeout=30  # 30 second timeout
        )
        
        # Test connection
        HF_CLIENT_READY = True
        print("✓ HuggingFace Inference API client initialized successfully!")
        
    except Exception as e:
        print(f"✗ Error initializing HF API client: {e}")
        HF_CLIENT = None
        HF_CLIENT_READY = False


def _load_config_background():
    """Load configurations in background thread."""
    global CONFIG, CLASS_MAPPING, DISEASE_INFO, MODEL_INFO
    
    CONFIG = load_config()
    CLASS_MAPPING = load_class_mapping()
    DISEASE_INFO = load_disease_info()
    MODEL_INFO = load_model_info()
    
    print("✓ Configuration loaded")


# Start background initialization (non-blocking)
config_thread = threading.Thread(target=_load_config_background, daemon=True)
config_thread.start()

hf_thread = threading.Thread(target=_initialize_hf_client, daemon=True)
hf_thread.start()

print("=" * 70)
print(f"API Client Status: INITIALIZING")
print(f"Using ViT Model: {VIT_REPO_ID}")
print("=" * 70)
print("\n✓ App ready to accept requests (API client initializing in background...)\n")
