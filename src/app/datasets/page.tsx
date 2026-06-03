"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Database } from "lucide-react";
import { PageTransition } from "@/components/shared/page-transition";
import { DatasetCard, Dataset } from "@/components/datasets/dataset-card";
import { Input } from "@/components/ui/input";

const DATASETS: Dataset[] = [
  { id: "ts-ct", name: "TotalSegmentator CT Demo", description: "Full-body CT scan with 117 anatomical structure labels. The standard benchmark for multi-organ segmentation.", modality: "CT", structures: 117, size: "2.1 GB", source: "TCIA", url: "https://totalsegmentator.com", category: "Full Body" },
  { id: "lidc", name: "LIDC-IDRI Lung Nodules", description: "1018 thoracic CT scans with annotated lung nodules. Reference dataset for pulmonary imaging AI.", modality: "CT", structures: 2, size: "124 GB", source: "TCIA", url: "https://wiki.cancerimagingarchive.net/display/Public/LIDC-IDRI", category: "Thoracic" },
  { id: "sri24", name: "SRI24 Brain Atlas", description: "Multi-modal brain MRI atlas with 84 labeled anatomical regions. T1, T2, and PD-weighted templates.", modality: "MRI", structures: 84, size: "800 MB", source: "SRI", url: "https://www.nitrc.org/projects/sri24", category: "Brain" },
  { id: "chaos", name: "CHAOS Abdomen CT/MRI", description: "Combined Healthy Abdominal Organ Segmentation dataset. Liver, kidneys, spleen from CT and MRI.", modality: "CT/MRI", structures: 4, size: "4.5 GB", source: "CHOA", url: "https://chaos.grand-challenge.org", category: "Abdominal" },
  { id: "msd-brain", name: "Medical Segmentation Decathlon — Brain", description: "Brain tumor segmentation (BraTS) with native, edema, enhancing labels. 484 multi-modal MRI volumes.", modality: "MRI", structures: 3, size: "12 GB", source: "MSD", url: "http://medicaldecathlon.com", category: "Brain" },
  { id: "msd-liver", name: "Medical Segmentation Decathlon — Liver", description: "Liver and tumor segmentation from contrast-enhanced CT. 201 training volumes.", modality: "CT", structures: 2, size: "8 GB", source: "MSD", url: "http://medicaldecathlon.com", category: "Abdominal" },
  { id: "msd-heart", name: "Medical Segmentation Decathlon — Heart", description: "Left atrial segmentation from single-modality MRI. 30 training volumes.", modality: "MRI", structures: 1, size: "1.5 GB", source: "MSD", url: "http://medicaldecathlon.com", category: "Cardiac" },
  { id: "msd-prostate", name: "Medical Segmentation Decathlon — Prostate", description: "Prostate and transition zone segmentation from multimodal MRI. 48 training volumes.", modality: "MRI", structures: 2, size: "2 GB", source: "MSD", url: "http://medicaldecathlon.com", category: "Pelvic" },
  { id: "msd-pancreas", name: "Medical Segmentation Decathlon — Pancreas", description: "Pancreas and tumor segmentation from contrast-enhanced CT. 420 training volumes.", modality: "CT", structures: 2, size: "6 GB", source: "MSD", url: "http://medicaldecathlon.com", category: "Abdominal" },
  { id: "msd-colon", name: "Medical Segmentation Decathlon — Colon", description: "Colon cancer segmentation from CT. 190 training volumes.", modality: "CT", structures: 1, size: "4 GB", source: "MSD", url: "http://medicaldecathlon.com", category: "Abdominal" },
  { id: "msd-hip", name: "Medical Segmentation Decathlon — Hippocampus", description: "Hippocampal segmentation from MRI. 394 training volumes for Alzheimer's research.", modality: "MRI", structures: 2, size: "1 GB", source: "MSD", url: "http://medicaldecathlon.com", category: "Brain" },
  { id: "msd-spleen", name: "Medical Segmentation Decathlon — Spleen", description: "Spleen segmentation from contrast-enhanced CT. 61 training volumes.", modality: "CT", structures: 1, size: "2 GB", source: "MSD", url: "http://medicaldecathlon.com", category: "Abdominal" },
  { id: "ixi", name: "IXI Brain MRI Dataset", description: "Nearly 600 normal brain MRIs from 3 hospitals. T1, T2, PD, MRA, diffusion-weighted.", modality: "MRI", structures: "Various", size: "50 GB", source: "IXI", url: "https://brain-development.org/ixi-dataset/", category: "Brain" },
  { id: "ct-org", name: "CT-ORG Organ Segmentation", description: "140 CT volumes with 6 organ labels: liver, kidneys, spleen, bladder, lungs, heart.", modality: "CT", structures: 6, size: "3 GB", source: "TCIA", url: "https://wiki.cancerimagingarchive.net/display/Public/CT-ORG", category: "Full Body" },
  { id: "vestibular", name: "Vestibular Schwannoma MRI", description: "MRI scans of 242 vestibular schwannoma patients with tumor segmentations.", modality: "MRI", structures: 1, size: "5 GB", source: "TCIA", url: "https://wiki.cancerimagingarchive.net/display/Public/Vestibular+Schwannoma", category: "Brain" },
  { id: "pd-dicom", name: "Project DICOM Sample", description: "Sample DICOM studies for testing PACS connectivity and DICOM processing pipelines.", modality: "DICOM", structures: "Various", size: "500 MB", source: "DICOM", url: "https://www.dicomlibrary.com", category: "Sample Data" },
];

export default function DatasetsPage() {
  const [search, setSearch] = useState("");

  const filtered = DATASETS.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.modality.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase()) ||
      d.source.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [...new Set(DATASETS.map((d) => d.category))];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Research Dataset Library</h1>
          <p className="text-sm text-muted-foreground">
            Publicly available medical imaging datasets from TCIA and open repositories
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search datasets by name, modality, or source..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSearch(cat)}
              className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((ds, i) => (
            <DatasetCard key={ds.id} dataset={ds} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Database className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No datasets match your search</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
