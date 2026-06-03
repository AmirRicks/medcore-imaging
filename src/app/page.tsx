"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Eye,
  Calculator,
  MessageSquare,
  Database,
  Activity,
  Download,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/shared/page-transition";

const FEATURES = [
  {
    icon: Eye,
    title: "3D Organ Viewer",
    desc: "Upload CT/MRI scans, auto-segment 117+ anatomical structures, explore in 3D with per-organ controls",
    href: "/viewer",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Calculator,
    title: "Dose Calculator",
    desc: "Calculate effective dose, SSDE, and DRL compliance using ICRP-102 and AAPM-204 standards",
    href: "/dose-calculator",
    color: "from-teal-500 to-emerald-500",
  },
  {
    icon: MessageSquare,
    title: "AI Assistant",
    desc: "Ask questions about segmentation, dose, DICOM metadata, and imaging terminology",
    href: "/assistant",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Database,
    title: "Dose Query",
    desc: "Natural-language queries over dose records with AI-powered SQL translation",
    href: "/dose-query",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Activity,
    title: "Analytics",
    desc: "Track usage metrics, processing statistics, and AI interaction trends",
    href: "/dashboard",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Download,
    title: "Export Center",
    desc: "Export in STL, OBJ, GLB, NIfTI, DICOM-SEG, CSV, PDF formats",
    href: "/export",
    color: "from-blue-500 to-indigo-500",
  },
];

const DATASETS = [
  { name: "CT Chest — TotalSegmentator", modality: "CT", structures: "117", source: "TCIA" },
  { name: "Brain MRI — SRI24 Atlas", modality: "MRI", structures: "84", source: "SRI" },
  { name: "Abdomen CT — CHAOS Challenge", modality: "CT", structures: "4", source: "CHOA" },
  { name: "LIDC-IDRI Lung Nodules", modality: "CT", structures: "Nodules", source: "TCIA" },
];

export default function Home() {
  return (
    <PageTransition>
      <div className="space-y-24">
        <section className="relative pt-16 pb-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-2xl shadow-cyan-500/30"
          >
            <Brain className="h-10 w-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="text-gradient">Aetherion</span>
            <br />
            <span className="text-foreground">Medical Imaging</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            AI-powered multi-organ segmentation, radiation dose tracking, and 3D visualization.
            Built on open standards. For education and research.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link href="/viewer">
              <Button variant="gradient" size="lg">
                <Eye className="h-4 w-4" />
                Try 3D Viewer
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dose-calculator">
              <Button variant="outline" size="lg">
                <Calculator className="h-4 w-4" />
                Dose Calculator
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"
          >
            <Shield className="h-3 w-3" />
            Research use only · Not for clinical diagnosis
          </motion.div>
        </section>

        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Everything you need
            </h2>
            <p className="text-muted-foreground">
              A complete medical imaging analysis platform
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <Link key={feature.href} href={feature.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-xl p-6 h-full hover:border-cyan-500/30 transition-all group cursor-pointer"
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Demo Datasets
            </h2>
            <p className="text-muted-foreground">
              Ready-to-use public datasets from trusted repositories
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DATASETS.map((ds, i) => (
              <motion.div
                key={ds.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-5 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-400">
                    {ds.modality}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{ds.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {ds.structures} structures · {ds.source}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/datasets">
              <Button variant="outline">
                Browse all datasets
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
