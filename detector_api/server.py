from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
import uvicorn


MODEL_DIR = "../model/distilbert_detector_final"
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # or restrict to your extension ID
    allow_methods=["POST"],       # OPTIONS will be auto-handled
    allow_headers=["*"],
)

# Load your trained model
tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_DIR)

class InputText(BaseModel):
    text: str

@app.post("/predict")
def predict(input_text: InputText):
    inputs = tokenizer(input_text.text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        logits = model(**inputs).logits
        prob_ai = torch.softmax(logits, dim=1)[0, 1].item()
    print("probability: ", prob_ai)
    return {"probability": prob_ai}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)