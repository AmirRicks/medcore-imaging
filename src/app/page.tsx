"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Download,
  Shield,
  Sparkles,
  Server,
  Users,
  Clock,
  CheckCircle2,
  ChevronDown,
  Mail,
  Smartphone,
  Eye,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/shared/page-transition";
import { Card, CardContent } from "@/components/ui/card";

const FAQS = [
  {
    q: "How does the AI-powered auto-segmentation work?",
    a: "Our deep-learning engine, built on state-of-the-art architectures like TotalSegmentator and nnU-Net, processes CT or MRI volume scans (NIfTI format). It automatically contours 117+ anatomical structures (bones, organs, vessels) in single-pass axial, sagittal, and coronal views. Triangle meshes are extracted using the Marching Cubes algorithm and converted to interactive, printable 3D models (STL, glTF) in under two minutes.",
  },
  {
    q: "Is patient data secure? How is HIPAA compliance maintained?",
    a: "Absolutely. Dosiation is designed with an on-premise-first approach. All DICOM ingestion, segmentation processing, and dose computations run entirely inside your local network via Docker. Patient Health Information (PHI) never leaves your firewall. No external API calls are made for inference or database operations in production environments.",
  },
  {
    q: "What radiation dose metrics does the tracker capture?",
    a: "Radiosh Tracker automatically parses DICOM metadata to extract key dosimetry parameters, including Entrance Skin Dose, CTDIvol, DLP, Exposure Time, and DAP. These values are mapped against standard k-factors (ICRP Publication 102) and size-specific corrections (AAPM Report 204) to calculate effective dose and Size-Specific Dose Estimates (SSDE).",
  },
  {
    q: "How do we benchmark dose values?",
    a: "The system compares actual exposures against national Diagnostic Reference Levels (DRL) from European Commission Radiation Protection 185 (2014) and local guidelines. Exceedances are highlighted on the dashboard for review. DRLs are treated as statistical investigation thresholds (75th percentile), not absolute legal dose limits.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageTransition>
      <div className="space-y-24 pb-16">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-6 text-center space-y-6">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[80px] animate-pulse-glow" />
            <div className="h-[200px] w-[200px] rounded-full bg-teal-500/10 blur-[60px] animate-pulse-glow [animation-delay:1.5s]" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-xl shadow-cyan-500/20"
          >
            <Brain className="h-7 w-7 text-white" />
          </motion.div>

          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight"
            >
              Dosiation
              <br />
              <span className="text-gradient">Medical Imaging Intelligence</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Clinical-grade software for radiology departments — automated dose tracking,
              AI-powered 3D segmentation, and HIPAA-compliant reporting. Open-source portfolio edition.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            <Link href="/auto-segmentation">
              <Button variant="gradient" size="lg" className="shadow-lg shadow-cyan-500/10">
                Auto-Seg 3D
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
            <Link href="/radiosh-tracker">
              <Button variant="outline" size="lg" className="border-border hover:bg-white/5">
                Dose Tracker AI
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
          >
            <Shield className="h-3.5 w-3.5 text-cyan-400" />
            <span>Research and Portfolio Use Only · Clinical FDA 510(k) Mockup</span>
          </motion.div>
        </section>

        {/* PRODUCTS SECTION */}
        <section id="products" className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-4xl font-bold text-white">Our Products</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Each product solves one problem deeply, built on a shared, secure, on-prem-first foundation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* PRODUCT 1: Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <Activity className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  Radiosh Tracker AI
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Streamline radiation dose management with automated DRL compliance, instant dose analysis,
                  and audit-ready reports. The dose-tracking layer for modern radiology.
                </p>
              </div>
              <Link href="/radiosh-tracker" className="pt-6 block">
                <Button variant="ghost" className="p-0 text-cyan-400 hover:text-cyan-300 hover:bg-transparent flex items-center gap-1">
                  Tour Radiosh Tracker <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            {/* PRODUCT 2: Segmentation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:border-teal-500/30 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                  <Eye className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
                  Auto-Segmentation & 3D
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Turn CT and MRI volumes into clean, printable 3D models. AI-powered organ and lesion
                  segmentation — export STL, OBJ, glTF, and NIfTI files in minutes.
                </p>
              </div>
              <Link href="/auto-segmentation" className="pt-6 block">
                <Button variant="ghost" className="p-0 text-teal-400 hover:text-teal-300 hover:bg-transparent flex items-center gap-1">
                  Tour Auto-Segmentation <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            {/* PRODUCT 3: Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <Smartphone className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  Radiosh Mobile
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Interactive radiation dosimetry simulator and reference tool for medical physics
                  students, educators, and professionals. Free reference companion app.
                </p>
              </div>
              <div className="pt-6">
                <span className="text-xs rounded-full bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 text-purple-400 inline-block font-medium">
                  Free Companion Simulator
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SHARED FOUNDATION SECTION */}
        <section className="space-y-12 bg-white/[0.01] border-y border-border/50 py-16 -mx-4 px-4 sm:-mx-8 sm:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-4xl font-bold text-white">One Shared Foundation</h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Every Dosiation product is built on the same principles: secure, fast, and obvious to use.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="glass-card border-none">
                <CardContent className="p-6 space-y-3">
                  <Server className="h-8 w-8 text-cyan-400" />
                  <h4 className="text-base font-bold text-white">HIPAA-First by Design</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Offline processing. PHI stays entirely on your network. Zero external API dependencies in local mode. Available on-premise.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-none">
                <CardContent className="p-6 space-y-3">
                  <Users className="h-8 w-8 text-teal-400" />
                  <h4 className="text-base font-bold text-white">Built by Physicists</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Designed alongside clinical medical physicists and radiologists. No bloated dashboards — just clear workflows your team actually uses.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-none">
                <CardContent className="p-6 space-y-3">
                  <Clock className="h-8 w-8 text-purple-400" />
                  <h4 className="text-base font-bold text-white">Reclaim Your Week</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Replace manual dose spreadsheets, ad-hoc segmentation scripts, and per-modality reports with a single unified workspace.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-none">
                <CardContent className="p-6 space-y-3">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  <h4 className="text-base font-bold text-white">Expected ROI</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Pilot sites recover software investments in under three months — through clinical QA hours saved and avoided audit penalties.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-none">
                <CardContent className="p-6 space-y-3">
                  <Sparkles className="h-8 w-8 text-amber-400" />
                  <h4 className="text-base font-bold text-white">Easy to Deploy</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Docker-native, PACS-friendly. Most radiology departments are tracking dose or generating 3D models within 15 minutes of install.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-none">
                <CardContent className="p-6 space-y-3">
                  <Brain className="h-8 w-8 text-pink-400" />
                  <h4 className="text-base font-bold text-white">Unified Platform</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Unified accounts, shared PACS/DICOM ingestion, and common administrative controls. Add new modules without changing your infrastructure.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* INTERACTIVE WORKFLOW PREVIEWS */}
        <section className="space-y-16">
          {/* WORKFLOW 1: Auto Segmentation */}
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400 border border-cyan-500/20">
                <Sparkles className="h-3.5 w-3.5" />
                AI Auto-Segmentation
              </div>
              <h2 className="text-3xl font-bold text-white">From Scan to 3D Model in Minutes</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Anatomical structures automatically contoured from CT or MRI volume scans. Support for 117+
                structures generated in a single pass. Export segmentation files directly to your PACS
                (DICOM-SEG) or 3D modeling programs (STL, glTF).
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  Whole-body organ sets, vasculature, and skeletal structures.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  Real-time interactive 3D rendering with isolate and opacity toggles.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  DICOM-SEG round-trip support for immediate PACS archiving.
                </li>
              </ul>
              <Link href="/auto-segmentation" className="inline-block">
                <Button variant="gradient">
                  Launch 3D Workspace
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            </div>

            <div className="glass-card rounded-2xl p-4 aspect-[4/3] bg-black/40 flex flex-col justify-between border border-border/50 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/30 pb-2">
                <span>Auto-Segmentation Output Preview</span>
                <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-cyan-400">TotalSegmentator v2</span>
              </div>
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="relative w-full max-w-[280px] aspect-square rounded-xl border border-dashed border-cyan-500/30 flex flex-col items-center justify-center text-center p-4 bg-cyan-500/[0.02]">
                  <Eye className="h-10 w-10 text-cyan-400/80 mb-3 animate-float" />
                  <p className="text-sm font-semibold text-white mb-1">Interactive 3D Workspace</p>
                  <p className="text-xs text-muted-foreground">
                    Upload clinical scans to view 2D cross-sections and manipulate multi-organ meshes.
                  </p>
                </div>
              </div>
              <div className="text-center text-[10px] text-muted-foreground/60 border-t border-border/30 pt-2">
                Supported formats: STL, OBJ, glTF, NIfTI, DICOM-SEG
              </div>
            </div>
          </div>

          {/* WORKFLOW 2: Dose Tracker */}
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="glass-card rounded-2xl p-4 aspect-[4/3] bg-black/40 flex flex-col justify-between border border-border/50 overflow-hidden relative group order-last lg:order-first">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/30 pb-2">
                <span>Radiosh Tracker AI Console</span>
                <span className="rounded bg-teal-500/10 px-2 py-0.5 text-teal-400">Audit-Ready</span>
              </div>
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="relative w-full max-w-[280px] aspect-square rounded-xl border border-dashed border-teal-500/30 flex flex-col items-center justify-center text-center p-4 bg-teal-500/[0.02]">
                  <Activity className="h-10 w-10 text-teal-400/80 mb-3 animate-pulse-glow" />
                  <p className="text-sm font-semibold text-white mb-1">Dose Queries & Analytics</p>
                  <p className="text-xs text-muted-foreground">
                    Execute natural language queries, generate DRL compliance reports, and review charts.
                  </p>
                </div>
              </div>
              <div className="text-center text-[10px] text-muted-foreground/60 border-t border-border/30 pt-2">
                Complies with ICRP-102, AAPM-204 (SSDE) and EC-RP-185
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3 py-1 text-xs text-teal-400 border border-teal-500/20">
                <Activity className="h-3.5 w-3.5" />
                Radiation Dose Tracking
              </div>
              <h2 className="text-3xl font-bold text-white">Real Reports, Real Workflows</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Extract dose parameters (CTDIvol, DLP, DAP) automatically from incoming imaging scans.
                Benchmark results against local and national thresholds. Use our AI agent to query cohort
                tables, audit logs, and compliance statuses in plain language.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-400" />
                  Automated Diagnostic Reference Level (DRL) compliance check.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-400" />
                  AI-powered dose query console (text-to-table analytics).
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-400" />
                  One-click PDF compliance reports with charts and recommendations.
                </li>
              </ul>
              <Link href="/radiosh-tracker" className="inline-block">
                <Button variant="gradient" className="from-teal-500 to-emerald-500 shadow-teal-500/10">
                  Open Dose Tracker
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="space-y-8 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="glass-card rounded-xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-medium text-white hover:bg-white/[0.02]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-muted-foreground border-t border-border/30 leading-relaxed bg-white/[0.005]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* DEMO CTA SECTION */}
        <section className="relative rounded-2xl glass-card p-8 sm:p-12 text-center space-y-6 overflow-hidden max-w-4xl mx-auto">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-transparent to-teal-500/5 pointer-events-none" />
          <h2 className="text-3xl font-bold text-white">Bring your imaging data into the light.</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Ready to explore? Tour the full, client-side interactive workspace. Test 3D organ mesh extraction
            and check Diagnostic Reference Level compliance using our custom tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auto-segmentation">
              <Button variant="gradient" size="lg">
                Try Auto-Segmentation
              </Button>
            </Link>
            <a href="mailto:info@dosiation.com?subject=Dosiation%20Open%20Source%20Query">
              <Button variant="outline" size="lg" className="border-border hover:bg-white/5 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Team
              </Button>
            </a>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}

function CheckIcon() {
  return <ShieldCheck className="h-5 w-5 text-cyan-400 shrink-0" />;
}

function Layers({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" />
      <polyline points="2 17 12 22 22 17" />
    </svg>
  );
}
