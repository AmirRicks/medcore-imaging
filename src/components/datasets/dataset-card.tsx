"use client";

import { motion } from "framer-motion";
import { Database, Download, ExternalLink, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Dataset {
  id: string;
  name: string;
  description: string;
  modality: string;
  structures: number | string;
  size: string;
  source: string;
  url: string;
  category: string;
}

export function DatasetCard({ dataset, index }: { dataset: Dataset; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="glass-card rounded-xl p-5 hover:border-cyan-500/30 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
            <Database className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-cyan-400 transition-colors">
              {dataset.name}
            </h3>
            <p className="text-xs text-muted-foreground">{dataset.modality}</p>
          </div>
        </div>
        <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs text-cyan-400">
          {dataset.category}
        </span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
        {dataset.description}
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ScanLine className="h-3 w-3" />
          {dataset.structures} structures
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Database className="h-3 w-3" />
          {dataset.size}
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <a href={dataset.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3 w-3" />
            View Source
          </a>
        </Button>
        <Button variant="ghost" size="sm">
          <Download className="h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  );
}
