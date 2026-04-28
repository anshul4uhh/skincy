"""
Simplified Chatbot Integration Endpoints
Wraps the Streamlit chatbot pipeline for API access
No knowledge base or source citations - just direct LLM responses
"""

import sys
from pathlib import Path
import os

# Add backend directory to path for imports
backend_dir = Path(__file__).parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

# Load environment variables from backend .env file if it exists
backend_env = backend_dir / ".env"
if backend_env.exists():
    from dotenv import load_dotenv
    load_dotenv(str(backend_env))

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

# Try to import chatbot functions at module load time
try:
    # Import from backend root
    from rag_pipeline import run_rag
    CHATBOT_AVAILABLE = True
except ImportError as e:
    print(f"Error: Could not import chatbot modules: {e}")
    print(f"  Make sure chatbot dependencies are installed: pip install -r backend/requirements.txt")
    CHATBOT_AVAILABLE = False
    run_rag = None
except ValueError as e:
    # This happens when OPENROUTER_API_KEY is not set
    error_msg = str(e).lower()
    if "openrouter_api_key" in error_msg or "api" in error_msg:
        print(f"Warning: Chatbot module not fully initialized: {e}")
        print(f"  To enable chat, set OPENROUTER_API_KEY environment variable")
        print(f"  Add it to backend/.env file: OPENROUTER_API_KEY=your_api_key")
    else:
        print(f"Error: Failed to initialize chatbot: {e}")
    CHATBOT_AVAILABLE = False
    run_rag = None
except Exception as e:
    print(f"Unexpected error loading chatbot: {type(e).__name__}: {e}")
    CHATBOT_AVAILABLE = False
    run_rag = None

router = APIRouter(tags=["chatbot"])


class ChatMessage(BaseModel):
    """Chat message model"""
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    """Chat request model"""
    query: str
    chat_history: Optional[list[ChatMessage]] = None


class ChatResponse(BaseModel):
    """Chat response model"""
    answer: str
    success: bool = True


@router.options("/chat/query")
async def options_chat_query():
    """Handle CORS preflight request for chat query."""
    return {"message": "OK"}


@router.post("/chat/query", response_model=ChatResponse)
async def chat_query(request: ChatRequest):
    """
    Query the chatbot with a question about skin cancer/health.
    
    Args:
        request: ChatRequest containing query and optional chat history
        
    Returns:
        ChatResponse with answer
    """
    try:
        if not request.query or not request.query.strip():
            raise HTTPException(
                status_code=400,
                detail="Query cannot be empty"
            )
        
        if not CHATBOT_AVAILABLE:
            raise HTTPException(
                status_code=503,
                detail="Chatbot service is not available. Please check your dependencies: pip install -r backend/requirements.txt"
            )
        
        # Convert chat history if provided
        chat_history = None
        if request.chat_history:
            chat_history = [
                {"role": msg.role, "content": msg.content}
                for msg in request.chat_history
            ]
        
        # Run chatbot pipeline
        response = run_rag(request.query.strip(), chat_history=chat_history)
        
        return ChatResponse(
            answer=response,
            success=True
        )
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        error_msg = f"Error processing chat query: {str(e)}\n{traceback.format_exc()}"
        print(error_msg)
        raise HTTPException(
            status_code=500,
            detail=f"Error processing chat query: {str(e)}"
        )


@router.options("/chat/health")
async def options_chat_health():
    """Handle CORS preflight request for chat health."""
    return {"message": "OK"}


@router.get("/chat/health")
async def chat_health():
    """Check if chatbot service is available."""
    return {
        "status": "available",
        "service": "Skin Health Chatbot",
        "description": "Chatbot for skin cancer and skin health information"
    }
