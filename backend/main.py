"""
╔════════════════════════════════════════════════════════════════════════════════╗
║                    DERMIS-DETECT BACKEND API                                  ║
║                  Skin Disease Detection using ResNet50                         ║
╚════════════════════════════════════════════════════════════════════════════════╝

TRAINING CONFIGURATION:
═══════════════════════════════════════════════════════════════════════════════

Model:
  - Architecture: ResNet50 (fine-tuned)
  - Classes: 7 (akiec, bcc, bkl, df, mel, nv, vasc)
  - Loss: FocalLoss (gamma=2.0, alpha=0.25) - handles class imbalance
  - Optimizer: Adam with learning rate 0.0001 (fine-tuning)
  - Early Stopping: 20 epochs patience, weighted F1 metric

Image Preprocessing (INFERENCE):
  - Input Size: 224×224 pixels
  - Normalization: ImageNet means [0.485, 0.456, 0.406]
                   ImageNet stds [0.229, 0.224, 0.225]
  - Augmentation: None (deterministic inference)
  - Color Space: RGB

Expected Performance:
  - Test Accuracy: ~85-90% (depending on training results)
  - Test F1 Score: ~0.82-0.88 (weighted average)
  - Inference Time: <100ms per image on CPU, <20ms on GPU

IMPORTANT:
  - Backend uses EXACT same preprocessing as training
  - Model outputs are probabilities (softmax applied)
  - Confidence is reported as percentage (0-100)
  - All configuration loaded from model_fine_tuned/ directory

═══════════════════════════════════════════════════════════════════════════════
"""

import os
import sys
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import modular components
from api import prediction_router, chat_router

# ==================== FastAPI Setup ====================

app = FastAPI(
    title="Dermis-Detect API",
    description="Skin disease detection using fine-tuned ResNet50 model",
    version="1.0.0"
)

# ==================== CORS Configuration ====================
# IMPORTANT: Must be added IMMEDIATELY after app creation, BEFORE any other setup

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8080",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8080",
        "*",  # Allow all origins in development
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=600,
)

# ==================== Include Routers ====================

app.include_router(prediction_router)
app.include_router(chat_router)


# ==================== Root & Health Endpoints ====================

@app.api_route("/", methods=["GET", "HEAD"])
async def root():
    """Root endpoint - confirms API is running. Supports both GET and HEAD."""
    return {
        "status": "✓ API Running",
        "message": "Dermis-Detect Skin Cancer Detection API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "predict": "/predict (POST)",
            "chat": "/chat/query (POST)",
            "docs": "/docs"
        }
    }


# ==================== Main ====================

if __name__ == "__main__":
    import os
    # Use PORT environment variable (Render sets this dynamically)
    port = int(os.getenv("PORT", 8000))
    reload = os.getenv("ENV", "development") == "development"
    
    uvicorn.run(
        "main:app",  # Use import string format
        host="0.0.0.0",
        port=port,
        reload=reload  # Set to False in production
    )
