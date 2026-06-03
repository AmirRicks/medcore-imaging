"use client";

import { PageTransition } from "@/components/shared/page-transition";
import { ExportCenter } from "@/components/export/export-center";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Download } from "lucide-react";

export default function ExportPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Export Center</h1>
          <p className="text-sm text-muted-foreground">
            Export segmentations and dose data in multiple formats
          </p>
        </div>

        <Card className="border-cyan-500/20 bg-cyan-500/5">
          <CardContent className="flex items-start gap-3 p-4">
            <Download className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground leading-relaxed">
              <p className="font-medium text-foreground mb-1">Multi-Format Export</p>
              <p>
                Export your 3D organ models and dose data in the format that works for your workflow.
                STL for 3D printing, GLB for web visualization, NIfTI for research tools,
                DICOM-SEG for PACS integration, and PDF/CSV/JSON for documentation and analysis.
              </p>
            </div>
          </CardContent>
        </Card>

        <ExportCenter />
      </div>
    </PageTransition>
  );
}
