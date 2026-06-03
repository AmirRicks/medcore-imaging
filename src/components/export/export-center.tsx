"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Table,
  Box,
  Download,
  CheckCircle2,
  FileArchive,
  FileJson,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExportOption {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  formats: string[];
}

const EXPORT_OPTIONS: ExportOption[] = [
  { id: "stl", label: "STL", description: "3D printing, FDM/resin", icon: <Box className="h-5 w-5" />, formats: [".stl"] },
  { id: "obj", label: "OBJ", description: "Universal 3D mesh format", icon: <Box className="h-5 w-5" />, formats: [".obj"] },
  { id: "glb", label: "GLB / glTF", description: "Real-time web 3D, Three.js", icon: <Box className="h-5 w-5" />, formats: [".glb"] },
  { id: "nifti", label: "NIfTI", description: "Neuroimaging, FSL, ITK-SNAP", icon: <FileArchive className="h-5 w-5" />, formats: [".nii.gz"] },
  { id: "dicom-seg", label: "DICOM-SEG", description: "PACS-compatible segmentation", icon: <FileArchive className="h-5 w-5" />, formats: [".dcm"] },
  { id: "pdf", label: "PDF Report", description: "Audit-ready dose + segmentation report", icon: <FileText className="h-5 w-5" />, formats: [".pdf"] },
  { id: "csv", label: "CSV", description: "Spreadsheet dose/volume data", icon: <Table className="h-5 w-5" />, formats: [".csv"] },
  { id: "json", label: "JSON Metadata", description: "Machine-readable export", icon: <FileJson className="h-5 w-5" />, formats: [".json"] },
];

export function ExportCenter() {
  const [selected, setSelected] = useState<string[]>([]);
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {EXPORT_OPTIONS.map((opt, i) => (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => toggle(opt.id)}
            className={cn(
              "glass-card rounded-xl p-5 text-left transition-all hover:border-cyan-500/30",
              selected.includes(opt.id) && "border-cyan-500/50 bg-cyan-500/5"
            )}
          >
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg mb-3",
              selected.includes(opt.id) ? "bg-cyan-500/20" : "bg-muted"
            )}>
              {opt.icon}
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{opt.label}</h3>
            <p className="text-xs text-muted-foreground">{opt.description}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-1">
              {opt.formats.join(", ")}
            </p>
          </motion.button>
        ))}
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              {selected.length === 0
                ? "Select formats to export"
                : `${selected.length} format${selected.length > 1 ? "s" : ""} selected`}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {selected.length === 0
                ? "Click on any format above"
                : "Ready to generate export package"}
            </p>
          </div>
          <Button
            onClick={handleExport}
            disabled={selected.length === 0 || exporting || done}
            variant="gradient"
            size="lg"
          >
            {exporting ? (
              <>Processing...</>
            ) : done ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Exported
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Export {selected.length > 0 && `(${selected.length})`}
              </>
            )}
          </Button>
        </div>

        {selected.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {selected.map((id) => {
              const opt = EXPORT_OPTIONS.find((o) => o.id === id);
              return opt ? (
                <span
                  key={id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400"
                >
                  {opt.icon}{opt.label}
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
