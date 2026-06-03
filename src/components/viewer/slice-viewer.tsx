"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

export function SliceViewer() {
  const [sliceIndex, setSliceIndex] = useState(50);
  const [view, setView] = useState<"axial" | "sagittal" | "coronal">("axial");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["axial", "sagittal", "coronal"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              view === v
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      <div className="relative aspect-square rounded-xl bg-black/40 border border-border/50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10">
              <svg className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">Upload a scan to view slices</p>
            <p className="text-xs text-muted-foreground/60">
              Colored mask overlays appear after segmentation
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Slice {sliceIndex}/100</span>
          <span>Scroll to navigate</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={sliceIndex}
          onChange={(e) => setSliceIndex(Number(e.target.value))}
          className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-cyan-500/30"
        />
      </div>
    </div>
  );
}
