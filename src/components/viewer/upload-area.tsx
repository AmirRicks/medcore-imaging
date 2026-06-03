"use client";

import { useState, useCallback } from "react";
import { Upload, FileWarning, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function UploadArea({
  onUpload,
  disabled,
}: {
  onUpload: (file: File) => void;
  disabled?: boolean;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f && (f.name.endsWith(".nii") || f.name.endsWith(".nii.gz") || f.name.endsWith(".dcm"))) {
        setFile(f);
        setUploading(true);
        onUpload(f);
      }
    },
    [onUpload]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setUploading(true);
      onUpload(f);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-300",
        dragOver
          ? "border-cyan-400 bg-cyan-500/10"
          : "border-border/50 hover:border-cyan-500/50 hover:bg-cyan-500/5",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <input
        type="file"
        accept=".nii,.nii.gz,.dcm"
        onChange={handleFileInput}
        className="absolute inset-0 opacity-0 cursor-pointer"
        disabled={disabled}
      />

      {uploading ? (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 text-cyan-400 animate-spin" />
          <p className="text-sm text-muted-foreground">Processing...</p>
        </div>
      ) : file ? (
        <div className="flex flex-col items-center gap-3">
          <CheckCircle2 className="h-10 w-10 text-green-400" />
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10">
            <Upload className="h-6 w-6 text-cyan-400" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">
            Drop NIfTI or DICOM file here
          </p>
          <p className="text-xs text-muted-foreground">
            or click to browse (.nii, .nii.gz, .dcm)
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <FileWarning className="h-3 w-3" />
            Max 500MB — research use only
          </div>
        </>
      )}
    </div>
  );
}
