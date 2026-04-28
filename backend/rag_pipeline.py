"""
Simplified pipeline for generating responses about skin health using LLM with chat history.
No knowledge base or RAG - just uses the language model with chat context.
"""

from llm_client import generate_response
import re


def clean_chat_history(messages):
    """
    Clean chat history for LLM context - remove HTML formatting.
    
    Args:
        messages (list): Chat history with {role, content} dicts
        
    Returns:
        list: Cleaned messages for LLM context
    """
    if not messages:
        return []
    
    cleaned = []
    
    for msg in messages:
        role = msg.get("role", "").lower()
        content = msg.get("content", "").strip()
        
        if not content or role not in ["user", "assistant"]:
            continue
        
        # Remove HTML tags if present (from previous responses)
        if role == "assistant":
            cleaned_content = re.sub(r'<[^>]+>', '', content)
            cleaned_content = cleaned_content.strip()
            
            if cleaned_content:
                cleaned.append({
                    "role": role,
                    "content": cleaned_content
                })
        else:
            cleaned.append({
                "role": role,
                "content": content
            })
    
    return cleaned


def run_rag(user_message, chat_history=None):
    """
    Generate a response to the user's message using LLM.
    Maintains conversation context using chat history.
    
    Args:
        user_message (str): The user's question or message
        chat_history (list, optional): Previous messages for context
                                      Format: [{"role": "user"|"assistant", "content": str}, ...]
        
    Returns:
        str: The generated response from the LLM
    """
    try:
        # Clean and prepare chat history
        cleaned_history = clean_chat_history(chat_history)
        
        # Generate response using LLM with system prompt and chat history
        response = generate_response(user_message, cleaned_history)
        
        return response
        
    except Exception as e:
        error_msg = f"Error generating response: {str(e)}"
        return error_msg