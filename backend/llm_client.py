import openai
import os
from openai import OpenAI
from dotenv import load_dotenv
import logging
from utils.prompts import SYSTEM_PROMPT

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")
if not api_key:
    logger.error("OPENROUTER_API_KEY not found in environment variables")
    raise ValueError("OPENROUTER_API_KEY environment variable is required")

openai.api_key = api_key
openai.base_url = "https://openrouter.ai/api/v1"

client = OpenAI(
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1"
)

def generate_response(user_message, chat_history=None):
    """
    Generate response from LLM using the system prompt and chat history.
    
    Args:
        user_message (str): The current user message/question
        chat_history (list, optional): List of previous messages for context
                                       Format: [{"role": "user"|"assistant", "content": str}, ...]
        
    Returns:
        str: Generated response from LLM
    """
    try:
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT}
        ]
        
        # Add chat history for context (excluding HTML formatting)
        if chat_history:
            for msg in chat_history:
                # Store only the essential text content, not HTML
                clean_content = msg.get("content", "")
                # If it's assistant message with HTML, we keep original for display but send clean text
                if msg["role"] == "assistant" and "<" in clean_content:
                    # Try to extract plain text from HTML (basic cleaning)
                    import re
                    clean_content = re.sub(r'<[^>]+>', '', clean_content)
                    clean_content = clean_content.replace("&nbsp;", " ").strip()
                
                messages.append({
                    "role": msg["role"],
                    "content": clean_content
                })
        
        # Add current user message
        messages.append({"role": "user", "content": user_message})
        
        response = client.chat.completions.create(
            model="deepseek/deepseek-chat",
            messages=messages,
            temperature=0.7,
            max_tokens=2000
        )

        return response.choices[0].message.content

    except openai.RateLimitError:
        error_msg = "API rate limit exceeded. Please try again later."
        logger.error(error_msg)
        return error_msg
    
    except openai.AuthenticationError:
        error_msg = "Authentication failed. Check your OPENROUTER_API_KEY."
        logger.error(error_msg)
        return error_msg
    
    except Exception as e:
        error_msg = f"Error generating response: {str(e)}"
        logger.error(error_msg)
        return error_msg