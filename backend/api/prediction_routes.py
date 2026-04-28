"""Prediction API endpoints for Dermis-Detect - Using HuggingFace Inference API."""

from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from PIL import Image
from io import BytesIO
from pathlib import Path
import os

from utils.model_loader import (
    HF_CLIENT_READY,
    MODEL_INFO,
    CONFIG,
    CLASS_MAPPING
)

from utils.predictor import (
    predict_vit,
    ensemble_predict,
    get_disease_description,
    save_upload
)

# ================== Upload Directory ==================

# Use /tmp in production (Render safe)
UPLOADS_DIR = Path("/tmp/dermis_detect_uploads")
UPLOADS_DIR.mkdir(exist_ok=True, parents=True)

# ================== Router ==================

router = APIRouter(prefix="", tags=["prediction"])

# ================== Response Models ==================

class PredictionResponse(BaseModel):
    filename: str
    prediction: dict


class HealthResponse(BaseModel):
    status: str
    api_ready: bool
    model: str


# ================== Routes ==================

@router.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="operational",
        api_ready=HF_CLIENT_READY,
        model="ViT (HuggingFace Inference API)"
    )


@router.post("/predict", response_model=PredictionResponse)
async def predict_disease(file: UploadFile = File(...)):
    
    # ✅ Basic validations
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    # ✅ FAIL FAST (no waiting loop)
    if not HF_CLIENT_READY:
        raise HTTPException(
            status_code=503,
            detail="Model is still initializing. Please try again in a few seconds."
        )

    try:
        # Read image
        contents = await file.read()
        image = Image.open(BytesIO(contents))
        image = image.convert("RGB")

        # ================== Prediction ==================

        vit_disease_code, vit_confidence = predict_vit(image)

        final_disease_code, final_confidence, model_used = ensemble_predict(
            vit_disease_code, vit_confidence
        )

        # ================== Result ==================

        disease_info = get_disease_description(final_disease_code)

        prediction_result = {
            "disease_code": final_disease_code,
            "disease_name": disease_info.get("full_name", final_disease_code),
            "confidence": round(final_confidence, 2),
            "severity": disease_info.get("severity", "Unknown"),
            "description": disease_info.get("description", ""),
            "causes": disease_info.get("causes", ""),
            "symptoms": disease_info.get("symptoms", ""),
            "treatment": disease_info.get("treatment", ""),
            "prevention": disease_info.get("prevention", ""),
            "disclaimer": "This is an AI prediction. Consult a dermatologist."
        }

        # ================== Save Upload ==================

        saved_path = save_upload(contents, file.filename, prediction_result, UPLOADS_DIR)

        if saved_path:
            print(f"✓ Image saved: {saved_path}")

        return PredictionResponse(
            filename=file.filename,
            prediction=prediction_result
        )

    except Exception as e:
        print(f"❌ Prediction error: {e}")
        raise HTTPException(
            status_code=500,
            detail="Error processing image"
        )


@router.get("/config")
async def get_config():
    return {
        "model_info": MODEL_INFO,
        "preprocessing": CONFIG,
        "num_classes": MODEL_INFO.get("num_classes", 7),
        "class_mapping": CLASS_MAPPING,
        "inference_api": {
            "provider": "HuggingFace",
            "status": "ready" if HF_CLIENT_READY else "initializing"
        }
    }