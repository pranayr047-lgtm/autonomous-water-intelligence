# Aqua Intelligence - Model Checkpoint Directory

This directory stores trained model weights:
- `aqua_yolo.pt`: Active PyTorch weights trained on Aqua-WaterWaste-v1
- `aqua_yolo.engine`: TensorRT 10.x compiled engine for low-latency edge deployment

To train a new checkpoint:
```bash
yolo detect train \
  data=datasets/data.yaml \
  model=yolo11n.pt \
  epochs=100 \
  imgsz=640 \
  batch=32 \
  device=0 \
  project=runs/train \
  name=aqua_yolo_v1
```
