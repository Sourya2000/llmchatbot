from transformers import pipeline

chatbot = pipeline("conversational", model="microsoft/DialoGPT-medium")
