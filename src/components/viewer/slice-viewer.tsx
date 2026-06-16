"use client";

import { useState, useEffect, useRef } from "react";
import { Layers, Eye, EyeOff, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export function SliceViewer() {
  const [sliceIndex, setSliceIndex] = useState(45);
  const [view, setView] = useState<"axial" | "sagittal" | "coronal">("axial");
  const [showMasks, setShowMasks] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#09090d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    // Draw grid lines (radar/clinical look)
    ctx.strokeStyle = "rgba(6, 182, 212, 0.05)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
    ctx.moveTo(0, cy); ctx.lineTo(w, cy);
    ctx.stroke();

    // Body contour scale based on index (simulating getting wider at the torso)
    const bodyScale = 0.8 + Math.sin((sliceIndex / 100) * Math.PI) * 0.15;
    const rx = 140 * bodyScale;
    const ry = 100 * bodyScale;

    // 1. Draw Body Outline (CT scanner patient shape)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 2. Draw Spine (Skeletal landmark)
    const spineY = cy + ry - 25;
    ctx.fillStyle = "#26262b";
    ctx.strokeStyle = "#404047";
    ctx.beginPath();
    ctx.arc(cx, spineY, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Spine spinal cord canal
    ctx.fillStyle = "#09090d";
    ctx.beginPath();
    ctx.arc(cx, spineY, 5, 0, Math.PI * 2);
    ctx.fill();

    if (view === "axial") {
      // 3. Draw Lungs (Only visible in upper-mid chest slices 20 - 75)
      if (sliceIndex > 20 && sliceIndex < 75) {
        const lungFactor = Math.sin(((sliceIndex - 20) / 55) * Math.PI);
        const lWidth = 45 * lungFactor;
        const lHeight = 65 * lungFactor;

        // Left Lung
        ctx.fillStyle = showMasks ? "rgba(249, 115, 22, 0.45)" : "#17171c";
        ctx.strokeStyle = showMasks ? "rgba(249, 115, 22, 0.8)" : "#38383f";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(cx - 50, cy - 10, lWidth, lHeight, 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Right Lung
        ctx.fillStyle = showMasks ? "rgba(249, 115, 22, 0.45)" : "#17171c";
        ctx.strokeStyle = showMasks ? "rgba(249, 115, 22, 0.8)" : "#38383f";
        ctx.beginPath();
        ctx.ellipse(cx + 50, cy - 10, lWidth, lHeight, -0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // 4. Draw Heart (Visible in mid-chest slices 35 - 65)
      if (sliceIndex > 35 && sliceIndex < 65) {
        const heartFactor = Math.sin(((sliceIndex - 35) / 30) * Math.PI);
        ctx.fillStyle = showMasks ? "rgba(239, 68, 68, 0.45)" : "#2a2a35";
        ctx.strokeStyle = showMasks ? "rgba(239, 68, 68, 0.8)" : "#4b4b5c";
        ctx.beginPath();
        ctx.ellipse(cx - 10, cy - 15, 25 * heartFactor, 22 * heartFactor, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // 5. Draw Liver (Visible in abdominal slices 45 - 85)
      if (sliceIndex > 45 && sliceIndex < 85) {
        const liverFactor = Math.sin(((sliceIndex - 45) / 40) * Math.PI);
        ctx.fillStyle = showMasks ? "rgba(185, 28, 28, 0.45)" : "#22222a";
        ctx.strokeStyle = showMasks ? "rgba(185, 28, 28, 0.8)" : "#3a3a47";
        ctx.beginPath();
        // Liver is a large triangular crescent on the right (anatomical right = viewer's left)
        ctx.ellipse(cx - 60, cy + 20, 45 * liverFactor, 30 * liverFactor, 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // 6. Draw Kidneys (Visible in lower abdominal slices 55 - 90)
      if (sliceIndex > 55 && sliceIndex < 90) {
        const kidneyFactor = Math.sin(((sliceIndex - 55) / 35) * Math.PI);
        // Left Kidney
        ctx.fillStyle = showMasks ? "rgba(251, 191, 36, 0.45)" : "#1e1e24";
        ctx.strokeStyle = showMasks ? "rgba(251, 191, 36, 0.8)" : "#34343f";
        ctx.beginPath();
        ctx.ellipse(cx - 45, cy + 50, 15 * kidneyFactor, 22 * kidneyFactor, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Right Kidney
        ctx.fillStyle = showMasks ? "rgba(251, 191, 36, 0.45)" : "#1e1e24";
        ctx.strokeStyle = showMasks ? "rgba(251, 191, 36, 0.8)" : "#34343f";
        ctx.beginPath();
        ctx.ellipse(cx + 45, cy + 50, 15 * kidneyFactor, 22 * kidneyFactor, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    } else if (view === "coronal") {
      // CORONAL VIEW SIMULATION
      const factor = Math.sin((sliceIndex / 100) * Math.PI);
      
      // Skeleton - ribs lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 3;
      for (let i = -4; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy + i * 20, rx - 10, Math.PI, Math.PI * 2);
        ctx.stroke();
      }

      // Lungs in coronal
      ctx.fillStyle = showMasks ? "rgba(249, 115, 22, 0.45)" : "#17171c";
      ctx.strokeStyle = showMasks ? "rgba(249, 115, 22, 0.8)" : "#38383f";
      ctx.beginPath();
      ctx.ellipse(cx - 50, cy - 20, 35, 75, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx + 50, cy - 20, 35, 75, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Liver
      ctx.fillStyle = showMasks ? "rgba(185, 28, 28, 0.45)" : "#22222a";
      ctx.strokeStyle = showMasks ? "rgba(185, 28, 28, 0.8)" : "#3a3a47";
      ctx.beginPath();
      ctx.ellipse(cx - 45, cy + 50, 45, 35, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Heart
      ctx.fillStyle = showMasks ? "rgba(239, 68, 68, 0.45)" : "#2a2a35";
      ctx.strokeStyle = showMasks ? "rgba(239, 68, 68, 0.8)" : "#4b4b5c";
      ctx.beginPath();
      ctx.ellipse(cx - 10, cy - 10, 25, 30, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      // SAGITTAL VIEW SIMULATION
      // Lungs in sagittal
      ctx.fillStyle = showMasks ? "rgba(249, 115, 22, 0.45)" : "#17171c";
      ctx.strokeStyle = showMasks ? "rgba(249, 115, 22, 0.8)" : "#38383f";
      ctx.beginPath();
      ctx.ellipse(cx - 10, cy - 20, 50, 70, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Spine vertical line
      ctx.strokeStyle = "#404047";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(cx + rx - 30, cy - ry);
      ctx.lineTo(cx + rx - 30, cy + ry);
      ctx.stroke();

      // Heart
      ctx.fillStyle = showMasks ? "rgba(239, 68, 68, 0.45)" : "#2a2a35";
      ctx.strokeStyle = showMasks ? "rgba(239, 68, 68, 0.8)" : "#4b4b5c";
      ctx.beginPath();
      ctx.ellipse(cx - 30, cy - 10, 25, 28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Liver
      ctx.fillStyle = showMasks ? "rgba(185, 28, 28, 0.45)" : "#22222a";
      ctx.strokeStyle = showMasks ? "rgba(185, 28, 28, 0.8)" : "#3a3a47";
      ctx.beginPath();
      ctx.ellipse(cx - 15, cy + 45, 45, 25, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Add HUD overlay text on canvas
    ctx.fillStyle = "rgba(6, 182, 212, 0.8)";
    ctx.font = "10px monospace";
    ctx.fillText(`VIEW: ${view.toUpperCase()}`, 15, 25);
    ctx.fillText(`SLICE: ${sliceIndex}/100`, 15, 40);
    ctx.fillText("SCALE: 1.0mm/px", 15, 55);
    ctx.fillText("PATIENT: MOCK_TCIA_04", w - 130, 25);
    ctx.fillText("WINDOW: SOFT_TISSUE", w - 130, 40);
  }, [sliceIndex, view, showMasks]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {(["axial", "sagittal", "coronal"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                view === v
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="show-masks"
            checked={showMasks}
            onCheckedChange={setShowMasks}
          />
          <label htmlFor="show-masks" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 cursor-pointer">
            {showMasks ? <Eye className="h-3.5 w-3.5 text-cyan-400" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
            Segmentation Masks
          </label>
        </div>
      </div>

      <div className="relative flex justify-center bg-black/60 rounded-xl border border-border/50 overflow-hidden py-4">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="max-w-full aspect-[4/3] rounded-lg"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Slice Position</span>
          <span className="font-mono text-cyan-400">Index {sliceIndex} / 100</span>
        </div>
        <Slider
          min={1}
          max={100}
          value={sliceIndex}
          onChange={(e) => setSliceIndex(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="rounded-lg bg-cyan-500/5 border border-cyan-500/10 p-3 flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
        <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-foreground mb-0.5">Anatomical Landmark Indicators</p>
          <p>
            Slide through slices to inspect structural segmentation: <span className="text-orange-400 font-medium">Lungs</span> appear between slices 20–75, <span className="text-red-400 font-medium">Heart</span> at 35–65, <span className="text-red-600 font-medium">Liver</span> at 45–85, and <span className="text-amber-500 font-medium">Kidneys</span> at 55–90.
          </p>
        </div>
      </div>
    </div>
  );
}
