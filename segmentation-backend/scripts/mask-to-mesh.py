"""Minimal mask-to-mesh pipeline: one organ → STL + GLB."""

import nibabel as nib
import numpy as np
import trimesh
from skimage import measure


def mask_to_mesh(mask_path: str, output_stl: str, output_glb: str, color: list = None):
    mask = nib.load(mask_path)
    vol = mask.get_fdata() > 0.5
    spacing = mask.header.get_zooms()[:3]

    verts, faces, normals, _ = measure.marching_cubes(vol, level=0.5, spacing=spacing)
    mesh = trimesh.Trimesh(vertices=verts, faces=faces, vertex_normals=normals)
    trimesh.smoothing.filter_taubin(mesh, iterations=10)

    if color:
        if len(color) == 3:
            color.append(255)
        mesh.visual.vertex_colors = color

    mesh.export(output_stl)
    mesh.export(output_glb)
    print(f"Exported {output_stl} and {output_glb}")
    print(f"  Vertices: {len(verts)}, Faces: {len(faces)}")


# Usage:
# mask_to_mesh("segs/liver.nii.gz", "liver.stl", "liver.glb", [180, 40, 40])
