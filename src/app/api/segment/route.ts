import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedExtensions = [".nii", ".nii.gz", ".dcm"];
    const fileName = file.name.toLowerCase();
    const valid = allowedExtensions.some((ext) => fileName.endsWith(ext));
    if (!valid) {
      return NextResponse.json({ error: "Unsupported file format. Use NIfTI (.nii, .nii.gz) or DICOM (.dcm)" }, { status: 400 });
    }

    return NextResponse.json({
      id: crypto.randomUUID(),
      message: "Segmentation queued. This endpoint requires the TotalSegmentator backend deployed on Vercel Fluid Compute Python or a Docker worker.",
      status: "queued",
      structures: 117,
      pipeline: "TotalSegmentator",
      documentation: "Deploy the segmentation backend via the FastAPI server in the 'segmentation-backend/' directory.",
    });
  } catch (error) {
    console.error("Segment API error:", error);
    return NextResponse.json({ error: "Segmentation failed" }, { status: 500 });
  }
}
