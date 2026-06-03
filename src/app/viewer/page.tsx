"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Download, Upload, Layers } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/shared/page-transition";
import { UploadArea } from "@/components/viewer/upload-area";
import { SliceViewer } from "@/components/viewer/slice-viewer";
import { MeshViewer } from "@/components/viewer/mesh-viewer";

export default function ViewerPage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">3D Organ Viewer</h1>
            <p className="text-sm text-muted-foreground">
              Upload a CT/MRI scan, auto-segment 117+ structures, and explore in 3D
            </p>
          </div>
          {file && (
            <Button variant="gradient">
              <Download className="h-4 w-4" />
              Export All
            </Button>
          )}
        </div>

        <UploadArea
          disabled={false}
          onUpload={(f) => setFile(f)}
        />

        <Tabs defaultValue="slices" className="w-full">
          <TabsList>
            <TabsTrigger value="slices">
              <Layers className="h-4 w-4" />
              Slice Viewer
            </TabsTrigger>
            <TabsTrigger value="3d">
              <Eye className="h-4 w-4" />
              3D Mesh Viewer
            </TabsTrigger>
          </TabsList>
          <TabsContent value="slices">
            <div className="glass-card rounded-xl p-6">
              <SliceViewer />
            </div>
          </TabsContent>
          <TabsContent value="3d">
            <div className="glass-card rounded-xl p-6">
              <MeshViewer />
            </div>
          </TabsContent>
        </Tabs>

        {file && (
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Download className="h-4 w-4 text-cyan-400" />
              Export Segmentation
            </h3>
            <div className="flex flex-wrap gap-3">
              {["STL", "OBJ", "GLB", "NIfTI", "DICOM-SEG"].map((fmt) => (
                <Button key={fmt} variant="outline" size="sm">
                  {fmt}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
