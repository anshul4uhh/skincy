"""Prediction utilities for Dermis-Detect - Using HuggingFace Inference API."""

import json
import io
import time
from pathlib import Path
from datetime import datetime
from PIL import Image

from . import model_loader  # ✅ safer import

# ================== Helpers ==================

def get_class_name(class_idx: int) -> str:
    class_mapping = model_loader.CLASS_MAPPING or {}
    class_key = str(class_idx)

    if class_key in class_mapping:
        return class_mapping[class_key]

    class_list = list(class_mapping.values())
    if class_idx < len(class_list):
        return class_list[class_idx]

    return f"unknown_{class_idx}"


def normalize_disease_code(label: str) -> str:
    label = label.lower().strip()

    mapping = {
        "actinic_keratoses": "akiec",
        "basal_cell_carcinoma": "bcc",
        "benign_keratosis-like_lesions": "bkl",
        "dermatofibroma": "df",
        "melanoma": "mel",
        "melanocytic_nevi": "nv",
        "vascular_lesions": "vasc",
    }

    # direct match
    if label in mapping:
        return mapping[label]

    # partial match fallback
    for k, v in mapping.items():
        if k in label:
            return v

    return label  # fallback


# ================== HF Prediction ==================

def predict_with_hf_api(image: Image.Image) -> tuple[str, float]:

    client = model_loader.HF_CLIENT

    if not model_loader.HF_CLIENT_READY or client is None:
        raise RuntimeError("HF client not ready")

    try:
        if image.mode != "RGB":
            image = image.convert("RGB")

        # convert to bytes
        buf = io.BytesIO()
        image.save(buf, format="JPEG")
        buf.seek(0)

        # 🔁 Retry logic (IMPORTANT)
        for attempt in range(3):
            try:
                result = client.image_classification(buf)

                if not result:
                    raise ValueError("Empty response")

                # ✅ sort by confidence
                result = sorted(result, key=lambda x: x["score"], reverse=True)

                top = result[0]

                label = top.get("label", "")
                score = float(top.get("score", 0)) * 100

                disease_code = normalize_disease_code(label)

                return disease_code, score

            except Exception as retry_err:
                print(f"HF retry {attempt+1} failed: {retry_err}")
                time.sleep(1)

        raise RuntimeError("HF API failed after retries")

    except Exception as e:
        print(f"❌ HF prediction error: {e}")
        raise RuntimeError("Prediction failed")


# ================== Public APIs ==================

def predict_vit(image: Image.Image) -> tuple[str, float]:
    return predict_with_hf_api(image)


def ensemble_predict(code: str, confidence: float) -> tuple[str, float, str]:
    return code, confidence, "ViT (HF Inference API)"


def get_disease_description(class_code: str) -> dict:

    info_db = model_loader.DISEASE_INFO or {}

    info = info_db.get(class_code)

    if isinstance(info, dict):
        return {
            "full_name": info.get("full_name", class_code),
            "severity": info.get("severity", "Unknown"),
            "description": info.get("description", ""),
            "causes": info.get("causes", ""),
            "symptoms": info.get("symptoms", ""),
            "treatment": info.get("treatment", ""),
            "prevention": info.get("prevention", ""),
            "disclaimer": info.get("disclaimer", "Consult a dermatologist")
        }

    return {
        "full_name": f"Unknown ({class_code})",
        "severity": "Unknown",
        "description": "Consult a dermatologist",
        "causes": "",
        "symptoms": "",
        "treatment": "",
        "prevention": "",
        "disclaimer": "AI-based prediction only"
    }


def save_upload(file_bytes: bytes, filename: str, prediction: dict, uploads_dir: Path):

    try:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        ext = Path(filename).suffix or ".jpg"

        safe_name = f"{timestamp}_{Path(filename).stem}{ext}"

        image_path = uploads_dir / safe_name

        with open(image_path, "wb") as f:
            f.write(file_bytes)

        meta_path = uploads_dir / f"{timestamp}.json"

        with open(meta_path, "w") as f:
            json.dump({
                "filename": filename,
                "prediction": prediction
            }, f, indent=2)

        return str(image_path)

    except Exception as e:
        print(f"⚠️ Save failed: {e}")
        return None