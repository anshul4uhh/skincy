"""API routes for Dermis-Detect backend."""

from .prediction_routes import router as prediction_router
from .chat_routes import router as chat_router

__all__ = ['prediction_router', 'chat_router']
