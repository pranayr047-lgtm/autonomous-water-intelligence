"""
Aqua Intelligence - FastAPI Inference & Decision Support Backend
Routes:
  - /api/detection: YOLO inference & frame analysis
  - /api/water-quality: Physicochemical sensor data
  - /api/analytics: Longitudinal trends and decision support
"""
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os

app = FastAPI(
    title="Aqua Intelligence API",
    description="Autonomous Water Intelligence, YOLO Floating Waste Detection, & Decision Support",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "Aqua Intelligence AI Backend",
        "yolo_model": "AquaYOLO-v1.0 (YOLO11-WaterVision)",
        "dataset": "Aqua-WaterWaste-v1",
        "supported_classes": 14
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
