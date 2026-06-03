# Segmentation Backend — TotalSegmentator FastAPI Server

Deploy this on Vercel Fluid Compute Python, Modal, or a Docker box with GPU access.

## Quick Start

```bash
pip install TotalSegmentator fastapi uvicorn python-multipart nibabel scikit-image trimesh

uvicorn main:app --host 0.0.0.0 --port 8000
```

## API

### POST /segment
Upload a NIfTI (.nii.gz) or DICOM file. Returns segmentation results as a .glb multi-organ scene.

```python
import requests
resp = requests.post(
    "http://localhost:8000/segment",
    files={"file": open("ct.nii.gz", "rb")}
)
with open("segmentation.glb", "wb") as f:
    f.write(resp.content)
```

## Python Mask→Mesh Pipeline

See `scripts/mask-to-mesh.py` for the reference implementation using marching_cubes + trimesh.
