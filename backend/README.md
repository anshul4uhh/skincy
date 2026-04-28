# Dermis-Detect Backend

FastAPI backend for skin disease detection using a fine-tuned ResNet50 model.

## Setup

### 1. Create Virtual Environment
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Server
```bash
python main.py
```

The API will be available at `http://localhost:8000`

## Endpoints

- **GET /health** - Health check endpoint
  ```
  Response: {"status": "operational", "model_loaded": true, "device": "cpu"}
  ```

- **POST /predict** - Predict disease from image
  ```
  Request: MultiPart FormData with 'file' parameter
  Response: {
    "filename": "image.jpg",
    "prediction": {
      "class": "mel",
      "confidence": 95.32,
      "description": "..."
    }
  }
  ```

- **GET /config** - Get model configuration
  ```
  Response: Model info, preprocessing config, class mapping, device info
  ```

## Class Mapping

- `akiec` - Actinic Keratoses (Pre-cancer)
- `bcc` - Basal Cell Carcinoma
- `bkl` - Benign Keratosis
- `df` - Dermatofibroma
- `mel` - Melanoma (Dangerous)
- `nv` - Melanocytic Nevus (Normal mole)
- `vasc` - Vascular lesion

## Configuration

The backend automatically loads:
- `model_fine_tuned/best_skin_cancer_model_fine_tuned.pth` - Pre-trained model
- `model_fine_tuned/preprocessing_config.json` - Image preprocessing parameters
- `model_fine_tuned/class_mapping.json` - Class labels
- `model_fine_tuned/disease_info.json` - Disease descriptions
- `model_fine_tuned/model_info.json` - Model architecture info

## Environment Variables

See `.env.example` for available options.

## CORS Configuration

For production, update the `origins` list in `main.py` with your actual domain:

```python
origins = [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
]
```

## Production Deployment

1. Set `ENV=production` in `.env`
2. Set `RELOAD=false` in environment or main.py
3. Use a production ASGI server like Gunicorn with Uvicorn workers:
   ```bash
   gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
   ```

## Troubleshooting

- **Model not loading**: Ensure the model file path is correct and the file exists
- **CORS errors**: Check that your frontend URL is in the `origins` list
- **Image processing errors**: Ensure uploaded images are valid image files (JPEG, PNG, etc.)
