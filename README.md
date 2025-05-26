# Generative AI Detector

A lightweight browser extension that highlights paragraphs of text likely to be AI

# What It Does

This extension scans text content on any webpage, sends each paragraph to a backend AI detector, and highlights those with a high probability of being AI-generated (default: > 60%). The backend uses a transformer-based model (e.g., `roberta-base-openai-detector`) to make predictions.

Features:
- Chrome extension with real-time page scanning
- Local model inference via Flask API
- Visual overlays showing likelihood of AI authorship
- Easily extendable to support image classification

# Future work

- Train news-specific bespoke model 
- Better GUI 
