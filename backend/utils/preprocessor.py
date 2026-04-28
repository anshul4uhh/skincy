"""Image preprocessing utilities for Dermis-Detect (API-based)."""

from PIL import Image


def preprocess_image(image: Image.Image) -> Image.Image:
    """
    Minimal preprocessing for HuggingFace Inference API.

    Since preprocessing is handled by the HF model itself,
    we only ensure:
    - RGB format
    - valid PIL image

    Args:
        image: PIL Image object

    Returns:
        PIL Image (ready for API)
    """

    if image.mode != "RGB":
        image = image.convert("RGB")

    return image