import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  formats: z.array(z.enum(["stl", "obj", "glb", "nifti", "dicom-seg", "pdf", "csv", "json"])),
  segmentationId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid export request", details: parsed.error.flatten() }, { status: 400 });
    }

    const { formats } = parsed.data;

    return NextResponse.json({
      message: `Export package generated with ${formats.length} format(s): ${formats.join(", ")}`,
      formats,
      status: "ready",
      downloadUrl: "#",
    });
  } catch (error) {
    console.error("Export API error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
