"""Image preprocessing utilities for Dermis-Detect."""

import torch
import torchvision.transforms as transforms
from PIL import Image
from .model_loader import CONFIG, VIT_PROCESSOR


def preprocess_image_resnet(image: Image.Image) -> torch.Tensor:
    """
    Preprocess image for ResNet50 model.
    
    Training parameters:
    - Input size: 224x224
    - Normalization: ImageNet means [0.485, 0.456, 0.406]
                     ImageNet stds [0.229, 0.224, 0.225]
    - No augmentation during inference
    
    Args:
        image: PIL Image object
        
    Returns:
        torch.Tensor: Preprocessed image tensor for ResNet50
    """
    
    input_size = CONFIG.get("input_size", 224)
    mean = CONFIG.get("mean", [0.485, 0.456, 0.406])
    std = CONFIG.get("std", [0.229, 0.224, 0.225])
    
    # Define preprocessing pipeline to match ResNet50 training
    preprocess = transforms.Compose([
        transforms.Resize((input_size, input_size)),  # 224x224 as in training
        transforms.ToTensor(),
        transforms.Normalize(
            mean=mean,
            std=std
        )
    ])
    
    # Convert to RGB if necessary
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Apply preprocessing
    image_tensor = preprocess(image)
    
    return image_tensor


def preprocess_image_vit(image: Image.Image) -> dict:
    """
    Preprocess image for ViT model using the model's processor.
    
    The ViT processor handles:
    - Resizing to model's expected input size
    - Normalization with model's specific stats
    - Tensor conversion and batching
    
    Args:
        image: PIL Image object
        
    Returns:
        dict: Preprocessed inputs with 'pixel_values' tensor ready for ViT
    """
    
    # Convert to RGB if necessary
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Use the ViT model's own processor
    # This ensures preprocessing matches the model's training exactly
    inputs = VIT_PROCESSOR(images=image, return_tensors="pt")
    
    return inputs


def preprocess_image(image: Image.Image) -> torch.Tensor:
    """
    Preprocess image EXACTLY as done during training (ResNet50).
    
    Training parameters used:
    - FocalLoss with gamma=2.0, alpha=0.25
    - ResNet50 with 7 classes
    - Input size: 224x224
    - Normalization: ImageNet means and stds
    - No augmentation during inference (only resize & normalize)
    
    Args:
        image: PIL Image object
        
    Returns:
        torch.Tensor: Preprocessed image tensor
    """
    
    return preprocess_image_resnet(image)

