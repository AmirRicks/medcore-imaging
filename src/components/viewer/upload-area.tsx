"use client";

import { useState, useCallback } from "react";
import { Upload, FileWarning, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export type UploadStatus = "idle" | "uploading" | "preprocessing" | "segmenting" | "rendering" | "completed";

export function UploadArea({
  onUpload,
  disabled,
  status = "idle",
  progress = 0,
  onReset,
}: {
  onUpload: (file: File) => void;
  disabled?: boolean;
  status?: UploadStatus;
  progress?: number;
  onReset?: () => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (disabled || status !== "idle") return;
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f && (f.name.endsWith(".nii") || f.name.endsWith(".nii.gz") || f.name.endsWith(".dcm") || f.name.endsWith(".zip"))) {
        setFile(f);
        onUpload(f);
      }
    },
    [onUpload, disabled, status]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || status !== "idle") return;
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      onUpload(f);
    }
  };

  const handleReset = () => {
    setFile(null);
    if (onReset) onReset();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getStatusText = () => {
    switch (status) {
      case "uploading":
        return "Uploading scan DICOM volume...";
      case "preprocessing":
        return "Anonymizing and aligning slices...";
      case "segmenting":
        return "Running TotalSegmentator AI inference (117 labels)...";
      case "rendering":
        return "Extracting Marching Cubes 3D meshes...";
      case "completed":
        return "Reconstruction complete!";
      default:
        return "Processing...";
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); if (!disabled && status === "idle") setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-300",
        dragOver
          ? "border-cyan-400 bg-cyan-500/10"
          : "border-border/50 hover:border-cyan-500/50 hover:bg-cyan-500/5",
        (disabled || status !== "idle") && "pointer-events-none",
        status !== "idle" && status !== "completed" && "bg-cyan-500/[0.02] border-cyan-500/20"
      )}
    >
      {status === "idle" && (
        <input
          type="file"
          accept=".nii,.nii.gz,.dcm,.zip"
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={disabled}
        />
      )}

      {status !== "idle" && status !== "completed" ? (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <Loader2 className="h-10 w-10 text-cyan-400 animate-spin" />
          <div className="text-center space-y-2 w-full">
            <p className="text-sm font-medium text-foreground">{getStatusText()}</p>
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground font-mono">{progress}% complete</p>
          </div>
        </div>
      ) : status === "completed" && file ? (
        <div className="flex flex-col items-center gap-3">
          <CheckCircle2 className="h-10 w-10 text-green-400" />
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Reconstruction Complete</p>
            <p className="text-xs text-muted-foreground">{file.name} ({formatSize(file.size)})</p>
          </div>
          <button
            onClick={handleReset}
            className="mt-2 flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold uppercase tracking-wider transition-colors pointer-events-auto"
          >
            <RefreshCw className="h-3 w-3" />
            Upload New scan
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10">
            <Upload className="h-6 w-6 text-cyan-400" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">
            Drop DICOM series, NIfTI, or ZIP folder here
          </p>
          <p className="text-xs text-muted-foreground">
            or click to browse (.nii, .nii.gz, .dcm, .zip)
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <FileWarning className="h-3 w-3 text-cyan-400" />
            Max 500MB — anonymized scans only
          </div>
        </>
      )}
    </div>
  );
}
