# Dermis-Detect - Skin Disease Detection Application

A full-stack web application for AI-powered skin disease detection using a fine-tuned ResNet50 model.

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![Python](https://img.shields.io/badge/python-3.8%2B-blue)
![FastAPI](https://img.shields.io/badge/fastapi-0.108-green)
![React](https://img.shields.io/badge/react-18%2B-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Features

- **Live Disease Prediction**: Upload skin images and get instant predictions
- **High Accuracy**: Fine-tuned ResNet50 model trained on HAM10000 dataset
- **Beautiful UI**: Modern React frontend with Tailwind CSS
- **7 Disease Classes**: Detect multiple types of skin conditions
- **Fast API**: RESTful API built with FastAPI and Pydantic
- **Production Ready**: Docker, Nginx, and SSL-ready configuration

## 📋 Disease Categories

The model can detect and classify:

| Disease | Code | Risk Level |
|---------|------|-----------|
| Actinic Keratoses (Pre-cancer) | `akiec` | Medium |
| Basal Cell Carcinoma | `bcc` | High |
| Benign Keratosis | `bkl` | Low |
| Dermatofibroma | `df` | Low |
| Melanoma | `mel` | Very High ⚠️ |
| Melanocytic Nevus (Mole) | `nv` | Low |
| Vascular Lesion | `vasc` | Low |

## 🚀 Quick Start

### Easiest Method: Run Startup Script

**Windows:**
```bash
start.bat
```

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

This automatically sets up and starts both backend and frontend.

### Manual Setup

**1. Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python main.py
```

Backend runs on: http://localhost:8000

**2. Frontend Setup** (new terminal)
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

### Access the Application

- **Web App**: http://localhost:5173
- **API Docs**: http://localhost:8000/docs
- **API Health**: http://localhost:8000/health

## 🐳 Docker Deployment

```bash
# Using Docker Compose (recommended)
docker-compose up --build

# Backend: http://localhost:8000
# Frontend: http://localhost:3000
```

## 📁 Project Structure

```
Dermis-Detect/
├── backend/                    # FastAPI server
│   ├── main.py               # API implementation
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile           # Container setup
│
├── frontend/                  # React TypeScript app
│   ├── src/                 # Source code
│   ├── package.json         # Node dependencies
│   └── Dockerfile           # Container setup
│
├── model_fine_tuned/         # ML model & config
│   ├── best_skin_cancer_model_fine_tuned.pth
│   ├── class_mapping.json
│   ├── disease_info.json
│   └── preprocessing_config.json
│
├── start.bat / start.sh      # Quick startup scripts
├── docker-compose.yml        # Container orchestration
├── verify_integration.py      # Integration tests
└── test_api.py              # API endpoint tests
```

## 🔌 API Endpoints

### Health Check
```
GET /health
```

Response:
```json
{
  "status": "operational",
  "model_loaded": true,
  "device": "cpu"
}
```

### Predict Disease
```
POST /predict
Content-Type: multipart/form-data

Body:
  file: <image-file>
```

Response:
```json
{
  "filename": "skin_image.jpg",
  "prediction": {
    "class": "mel",
    "confidence": 94.87,
    "description": "Melanoma (Dangerous)..."
  }
}
```

### Configuration
```
GET /config
```

Returns model info, preprocessing config, class mapping, and device info.

## 💬 Chatbot Integration

The application includes an **AI-powered Skin Cancer Information Chatbot** that provides accurate, focused answers about skin cancer detection, prevention, and health.

### Chatbot Features
- ✅ **RAG-based** (Retrieval-Augmented Generation) for accurate answers
- ✅ **Floating chat widget** in the UI
- ✅ **Vector search** through skin cancer knowledge base
- ✅ **Intent detection** for focused, relevant responses
- ✅ **Source citations** from knowledge base
- ✅ **Multi-turn conversations** with memory

### Using the Chatbot
1. Click the **chat button** (bottom-right) on the web app
2. Ask any question about:
   - Skin cancer types (melanoma, basal cell carcinoma, etc.)
   - Prevention and sun protection strategies
   - Symptom detection and identification
   - General skin health and dermatology

### Chatbot API Endpoint
```
POST /chat/query
```

Request:
```json
{
  "query": "What is melanoma?",
  "chat_history": []
}
```

Response:
```json
{
  "answer": "Melanoma is the most serious type of skin cancer...",
  "sources": ["Skin Cancer Knowledge Base (Page 5,49)"],
  "success": true
}
```

### Configuration & Setup
See **[CHATBOT_INTEGRATION.md](./CHATBOT_INTEGRATION.md)** for:
- Setup instructions
- API key configuration  
- Vector database setup
- Troubleshooting
- Performance optimization

## 🧪 Testing

### Verify Integration
```bash
python verify_integration.py
```

Checks:
- ✓ Model files present
- ✓ Backend setup
- ✓ Frontend setup
- ✓ CORS configuration
- ✓ API contract

### Test API Endpoints
```bash
# Test health and config endpoints
python test_api.py

# Test prediction with image
python test_api.py /path/to/image.jpg
```

## 🔧 Configuration

### Environment Variables

**Frontend** (`.env.local`):
```env
VITE_API_BASE_URL=http://localhost:8000
```

**Backend** (`.env`):
```env
ENV=development
API_HOST=0.0.0.0
API_PORT=8000
```

### CORS Settings

Edit `backend/main.py` to update CORS origins:

```python
origins = [
    "http://localhost:5173",  # Vite dev
    "http://localhost:3000",  # React dev
]
```

For production:
```python
origins = ["https://yourdomain.com"]
```

## 📚 Documentation

- [Setup Guide](./SETUP.md) - Detailed setup instructions
- [Integration Checklist](./INTEGRATION_CHECKLIST.md) - Verify integration status
- [Backend README](./backend/README.md) - Backend API documentation
- [API Docs](http://localhost:8000/docs) - Interactive API documentation (when running)

## 🚨 Important Notes

⚠️ **Medical Disclaimer**

This application is designed for informational purposes only and should NOT be relied upon for:
- Medical diagnosis
- Treatment recommendations
- Emergency situations

Always consult with a qualified dermatologist for professional medical advice.

## 🛠️ Troubleshooting

### Backend won't start
- Check Python version: `python --version` (3.8+ required)
- Verify model file exists in `model_fine_tuned/`
- Check dependencies: `pip install -r backend/requirements.txt`

### Frontend won't connect
- Verify backend is running: Visit http://localhost:8000/health
- Check `.env.local` has correct API URL
- Check browser console for CORS errors

### Image upload fails
- Ensure image is valid (JPEG, PNG, WebP, GIF)
- Check file size (should be < 10MB)
- Verify backend model is loaded (check /health endpoint)

### Model loading fails
- Verify `.pth` file size and integrity
- Check PyTorch installation: `pip install torch torchvision --upgrade`
- Check available disk space

## 📦 Requirements

### Backend
- Python 3.8+
- PyTorch 2.1+
- FastAPI 0.108+
- See [backend/requirements.txt](./backend/requirements.txt)

### Frontend
- Node.js 16+
- npm 7+
- See [frontend/package.json](./frontend/package.json)

## 🌐 Production Deployment

### Using Docker Compose
```bash
docker-compose -f docker-compose.yml up -d
```

### Using Gunicorn + Uvicorn
```bash
cd backend
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app \
  --bind 0.0.0.0:8000 \
  --timeout 60
```

### SSL/HTTPS
Use Nginx as reverse proxy with Let's Encrypt certificates:

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location /api/ {
        proxy_pass http://localhost:8000/;
    }
    
    location / {
        proxy_pass http://localhost:3000/;
    }
}
```

## 📊 Model Details

- **Architecture**: ResNet50
- **Input Size**: 224×224 pixels
- **Dataset**: HAM10000 (Skin Cancer MNIST)
- **Classes**: 7 skin disease categories
- **Training**: Fine-tuned on domain-specific data
- **Performance**: See `model_fine_tuned/fine_tuning_results.json`

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- [ ] Add user authentication
- [ ] Add prediction history
- [ ] Improve model accuracy
- [ ] Add multi-image batch processing
- [ ] Add visualization of model predictions
- [ ] Add database for storing results
- [ ] Add email notifications

## 📄 License

This project is provided as-is for educational and research purposes.

## ⚕️ Medical Compliance

This application is intended to assist healthcare professionals, not replace them. Always verify findings with professional medical examination.

## 📞 Support

For issues or questions:
1. Check the [troubleshooting section](#troubleshooting)
2. Review [documentation files](./SETUP.md)
3. Run verification tests: `python verify_integration.py`
4. Check API health: `python test_api.py`

## 🎓 Learning Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [PyTorch Documentation](https://pytorch.org/docs/stable/index.html)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Created with ❤️ for healthcare technology**

Happy diagnosing! 🔬
