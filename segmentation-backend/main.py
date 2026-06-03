"""TotalSegmentator FastAPI backend - Mask to 3D mesh pipeline."""
import io
import os
import tempfile
import nibabel as nib
import numpy as np
from skimage import measure
import trimesh
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response

app = FastAPI(title="Aetherion Segmentation Backend")

ORGAN_COLORS = {
    1: [255, 0, 0],      # Spleen
    2: [0, 255, 0],      # Kidney right
    3: [0, 0, 255],      # Kidney left
    4: [255, 255, 0],    # Gallbladder
    5: [255, 0, 255],    # Liver
    6: [0, 255, 255],    # Stomach
    7: [128, 128, 0],    # Pancreas
    8: [128, 0, 128],    # Adrenal right
    9: [0, 128, 128],    # Adrenal left
    10: [128, 0, 0],     # Lung upper left
    11: [0, 128, 0],     # Lung upper right
    12: [0, 0, 128],     # Lung lower left
    13: [128, 128, 128], # Lung lower right
    14: [64, 64, 64],    # Heart
    15: [192, 0, 0],     # Aorta
    16: [0, 192, 0],     # Pulmonary vein
    17: [0, 0, 192],     # Brachiocephalic trunk
}


@app.post("/segment")
async def segment(file: UploadFile = File(...)):
    contents = await file.read()
    suffix = ".nii.gz" if file.filename.endswith(".gz") else ".nii"

    with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
        tmp.write(contents)
        tmp_path = tmp.name

    try:
        from TotalSegmentator import total_segmentator
        output_dir = tempfile.mkdtemp()
        total_segmentator(input_path=tmp_path, output_path=output_dir, fast=True)

        scene = trimesh.Scene()
        for label_file in sorted(os.listdir(output_dir)):
            if not label_file.endswith(".nii.gz"):
                continue
            label_path = os.path.join(output_dir, label_file)
            try:
                label_num = int(label_file.split(".")[0].split("_")[-1])
            except ValueError:
                continue

            mask_nii = nib.load(label_path)
            vol = mask_nii.get_fdata() > 0.5
            spacing = mask_nii.header.get_zooms()[:3]

            if vol.sum() < 100:
                continue

            verts, faces, _, _ = measure.marching_cubes(vol, level=0.5, spacing=spacing)
            mesh = trimesh.Trimesh(vertices=verts, faces=faces)
            trimesh.smoothing.filter_taubin(mesh, iterations=5)

            color = ORGAN_COLORS.get(label_num, [128, 128, 128, 255])
            if len(color) == 3:
                color.append(255)
            mesh.visual.vertex_colors = color
            scene.add_geometry(mesh)

        glb_bytes = io.BytesIO()
        scene.export(file_obj=glb_bytes, file_type="glb")
        return Response(content=glb_bytes.getvalue(), media_type="model/gltf-binary")

    finally:
        os.unlink(tmp_path)
