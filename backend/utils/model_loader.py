"""Model loading utilities for Dermis-Detect - Using HuggingFace Inference API."""

import os
import threading
from huggingface_hub import InferenceClient

# ================== Environment ==================

VIT_REPO_ID = os.getenv("VIT_REPO_ID", "Anshul518/dermis-detect-vit-large")

# Safe token handling
_hf_token = os.getenv("HF_TOKEN", "").strip()
HF_TOKEN = _hf_token if _hf_token else None

# ================== Config Loaders ==================

def load_config():
    return {
        "input_size": 384,
        "mean": [0.5, 0.5, 0.5],
        "std": [0.5, 0.5, 0.5]
    }


def load_class_mapping():
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
    return {
        "mel": {
            "full_name": "Melanoma",
            "severity": "High",
            "description": "Skin cancer from melanocytes.",
            "causes": "Sun exposure, genetics",
            "symptoms": "Irregular mole, color variation",
            "treatment": "Surgery, immunotherapy",
            "prevention": "Sun protection"
        },
        "bcc": {
            "full_name": "Basal Cell Carcinoma",
            "severity": "Medium",
            "description": "Common skin cancer.",
            "causes": "Sun exposure",
            "symptoms": "Pearly bump",
            "treatment": "Surgery",
            "prevention": "Sun protection"
        },
        "akiec": {
            "full_name": "Actinic Keratosis",
            "severity": "Medium",
            "description": "Precancerous lesion.",
            "causes": "Sun exposure",
            "symptoms": "Rough patches",
            "treatment": "Cryotherapy",
            "prevention": "Sun protection"
        },
        "nv": {
            "full_name": "Melanocytic Nevi",
            "severity": "Low",
            "description": "Benign mole.",
            "causes": "Genetics",
            "symptoms": "Brown spot",
            "treatment": "None",
            "prevention": "Monitoring"
        },
        "bkl": {
            "full_name": "Benign Keratosis",
            "severity": "Low",
            "description": "Non-cancerous growth.",
            "causes": "Age-related",
            "symptoms": "Scaly patch",
            "treatment": "Optional removal",
            "prevention": "Checkups"
        },
        "df": {
            "full_name": "Dermatofibroma",
            "severity": "Low",
            "description": "Benign bump.",
            "causes": "Unknown",
            "symptoms": "Firm lump",
            "treatment": "None",
            "prevention": "N/A"
        },
        "vasc": {
            "full_name": "Vascular Lesion",
            "severity": "Low",
            "description": "Blood vessel lesion.",
            "causes": "Vascular issue",
            "symptoms": "Red/purple mark",
            "treatment": "Laser",
            "prevention": "N/A"
        }
    }


def load_model_info():
    return {
        "model_name": "vit-large",
        "num_classes": 7,
        "input_size": 384,
        "api_based": True
    }

# ================== Globals ==================

HF_CLIENT = None
HF_CLIENT_READY = False

CONFIG = None
CLASS_MAPPING = None
DISEASE_INFO = None
MODEL_INFO = None

# ================== Initialization ==================

def _initialize_hf_client():
    global HF_CLIENT, HF_CLIENT_READY

    try:
        print("Initializing HuggingFace Inference API client...")

        HF_CLIENT = InferenceClient(
            model=VIT_REPO_ID,
            token=HF_TOKEN,
            timeout=30
        )

        # ✅ No fake method call — just mark ready
        HF_CLIENT_READY = True

        print("✓ HuggingFace client ready!")

    except Exception as e:
        print(f"✗ HF client error: {e}")
        HF_CLIENT = None
        HF_CLIENT_READY = False


def _load_config_background():
    global CONFIG, CLASS_MAPPING, DISEASE_INFO, MODEL_INFO

    CONFIG = load_config()
    CLASS_MAPPING = load_class_mapping()
    DISEASE_INFO = load_disease_info()
    MODEL_INFO = load_model_info()

    print("✓ Config loaded")


# ================== Start Background Init ==================

print("=" * 70)
print("DERMIS-DETECT: Using HuggingFace Inference API")
print("=" * 70)

threading.Thread(target=_load_config_background, daemon=True).start()
threading.Thread(target=_initialize_hf_client, daemon=True).start()

print("=" * 70)
print("API Client Status: INITIALIZING")
print(f"Using Model: {VIT_REPO_ID}")
print("=" * 70)
print("\n✓ App ready (client initializing in background...)\n")