"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Box,
  MessageSquare,
  Database,
  Lock,
  Stethoscope,
  ChevronRight,
  Download,
  Calculator
} from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/shared/page-transition";

const Hero3D = dynamic(() => import("@/components/shared/hero-3d").then(mod => mod.Hero3D), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 h-full w-full bg-cyan-500/5 animate-pulse" />
});

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col gap-32 pb-24">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-16 lg:pt-40 lg:pb-32 flex flex-col items-center text-center">
          <Hero3D />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="z-10 max-w-4xl px-4"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Aetherion v2.0 is now live
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight mb-6">
              Radiation dose management <br className="hidden lg:block" />
              <span className="text-gradient">& 3D imaging intelligence.</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Aetherion builds clinical-grade open-source software for radiology — from automated DRL dose tracking to AI-powered multi-organ 3D segmentation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#products">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-foreground text-background hover:bg-foreground/90">
                  Explore products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/viewer">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-background/50 backdrop-blur-md">
                  Launch 3D Viewer
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="z-10 mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-y border-border/50 py-8 w-full max-w-5xl px-4"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl font-bold text-foreground">8</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Products Live</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl font-bold text-cyan-400">95%</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">QA Time Saved</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl font-bold text-foreground">100%</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Open Source</span>
            </div>
          </motion.div>
        </section>

        {/* THE PRODUCT LINE */}
        <section id="products" className="max-w-6xl mx-auto px-4 w-full scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-4">— The product line —</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">One platform. A growing family of tools.</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each Aetherion product solves one problem deeply — and shares the same secure, web-native foundation.
            </p>
          </div>

          <div className="space-y-24">
            {/* Product 01 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <p className="text-sm text-muted-foreground font-mono mb-4">Product 01 · Web app · Live</p>
                <h4 className="text-3xl font-bold text-foreground mb-4">AI Dose Tracker</h4>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Streamline radiation dose management with automated DRL compliance, instant ICRP-102/AAPM-204 dose analysis, and natural-language AI queries. The dose-tracking layer for modern radiology.
                </p>
                <Link href="/dose-calculator" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium text-lg transition-colors group">
                  Tour Dose Tracker <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="order-1 md:order-2 glass-card rounded-2xl aspect-[4/3] flex items-center justify-center p-8 bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20">
                <Activity className="w-32 h-32 text-cyan-400 opacity-80" />
              </div>
            </div>

            {/* Product 02 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="glass-card rounded-2xl aspect-[4/3] flex items-center justify-center p-8 bg-gradient-to-br from-teal-500/10 to-transparent border border-teal-500/20">
                <Box className="w-32 h-32 text-teal-400 opacity-80" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-mono mb-4">Product 02 · Web app · Live</p>
                <h4 className="text-3xl font-bold text-foreground mb-4">Auto-Segmentation & 3D</h4>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Turn CT and MRI volumes into clean, printable 3D models. AI-powered organ segmentation using TotalSegmentator — STL, OBJ, glTF in minutes, not hours.
                </p>
                <ul className="space-y-2 mb-6 text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckIcon /> 117+ anatomical structures</li>
                  <li className="flex items-center gap-2"><CheckIcon /> Auto-contoured in a single pass</li>
                </ul>
                <Link href="/viewer" className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium text-lg transition-colors group">
                  Tour Auto-Segmentation <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Product 03 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <p className="text-sm text-muted-foreground font-mono mb-4">Product 03 · Web app · Live</p>
                <h4 className="text-3xl font-bold text-foreground mb-4">AI Imaging Assistant</h4>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Interactive reference tool for medical physics students, educators, and professionals. Ask questions about DICOM metadata, scan parameters, and clinical terminology.
                </p>
                <Link href="/assistant" className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium text-lg transition-colors group">
                  Try AI Assistant <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="order-1 md:order-2 glass-card rounded-2xl aspect-[4/3] flex items-center justify-center p-8 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                <MessageSquare className="w-32 h-32 text-purple-400 opacity-80" />
              </div>
            </div>
          </div>
        </section>

        {/* WHY AETHERION */}
        <section className="max-w-6xl mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-4">— Why Aetherion —</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Clinical-grade, end-to-end.</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every Aetherion product is built on the same principles: secure, fast, and obvious to use.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass-card p-8 rounded-2xl">
              <Lock className="w-8 h-8 text-cyan-400 mb-6" />
              <h4 className="text-xl font-bold text-foreground mb-3">Security-first by design</h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Client-side processing where possible. Open-source transparency. Strict CSP headers and rate-limiting built-in.
              </p>
              <span className="text-sm font-medium text-foreground flex items-center gap-2"><CheckIcon /> Full audit trail across all products</span>
            </div>
            
            <div className="glass-card p-8 rounded-2xl">
              <Database className="w-8 h-8 text-cyan-400 mb-6" />
              <h4 className="text-xl font-bold text-foreground mb-3">One platform, one login</h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Unified accounts via Supabase, shared dataset libraries, common analytics admin. Access the whole suite instantly.
              </p>
              <span className="text-sm font-medium text-foreground flex items-center gap-2"><CheckIcon /> Single deployment for the suite</span>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <Stethoscope className="w-8 h-8 text-cyan-400 mb-6" />
              <h4 className="text-xl font-bold text-foreground mb-3">Standards-based</h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Built strictly on ICRP, AAPM, and EC-RP standards. No black-box math for dose tracking.
              </p>
              <span className="text-sm font-medium text-foreground flex items-center gap-2"><CheckIcon /> Ships with national DRL libraries</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8 border-t border-border/50 pt-16">
            <div>
              <h5 className="text-4xl font-bold text-foreground mb-2">95%</h5>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">QA time saved</p>
              <h6 className="text-lg font-bold text-foreground mb-2">Reclaim your week.</h6>
              <p className="text-muted-foreground">Replace manual dose log spreadsheets, ad-hoc segmentation scripts, and per-modality reports with a single workflow.</p>
            </div>
            <div>
              <h5 className="text-4xl font-bold text-cyan-400 mb-2">Open</h5>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Source Architecture</p>
              <h6 className="text-lg font-bold text-foreground mb-2">Maximum ROI.</h6>
              <p className="text-muted-foreground">Zero licensing fees for research and education. Recover investment through QA hours saved immediately.</p>
            </div>
            <div>
              <h5 className="text-4xl font-bold text-foreground mb-2">Day 1</h5>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Zero downtime</p>
              <h6 className="text-lg font-bold text-foreground mb-2">Easy to deploy.</h6>
              <p className="text-muted-foreground">Vercel-native, highly available. Most users are tracking dose or generating their first 3D model within minutes.</p>
            </div>
          </div>
        </section>

        {/* INSIDE DOSE TRACKER */}
        <section className="max-w-6xl mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-4">— Inside Dose Tracker —</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Real reports, real workflows.</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/dose-calculator" className="glass-card rounded-2xl p-8 hover:border-cyan-500/30 transition-colors group block">
              <div className="aspect-[16/9] bg-black/40 rounded-xl mb-6 flex items-center justify-center border border-white/5">
                <Calculator className="w-16 h-16 text-cyan-400/50" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-cyan-400 transition-colors">CT Dose Analysis</h4>
              <p className="text-muted-foreground">Effective dose, SSDE, and DRL compliance — automatically calculated and benchmarked.</p>
            </Link>

            <Link href="/dose-query" className="glass-card rounded-2xl p-8 hover:border-cyan-500/30 transition-colors group block">
              <div className="aspect-[16/9] bg-black/40 rounded-xl mb-6 flex items-center justify-center border border-white/5">
                <Database className="w-16 h-16 text-cyan-400/50" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-cyan-400 transition-colors">AI-powered Dose Queries</h4>
              <p className="text-muted-foreground">Ask about patients, doses, and compliance in plain language — get instant SQL and clinical explanations.</p>
            </Link>
          </div>
        </section>

        {/* INSIDE AUTO SEGMENTATION */}
        <section className="max-w-6xl mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-teal-500 uppercase mb-4">— Inside Auto-Seg 3D —</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">From scan to 3D model.</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/viewer" className="glass-card rounded-2xl p-8 hover:border-teal-500/30 transition-colors group block">
              <div className="aspect-[16/9] bg-black/40 rounded-xl mb-6 flex items-center justify-center border border-white/5">
                <Layers className="w-16 h-16 text-teal-400/50" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-teal-400 transition-colors">Multi-organ segmentation</h4>
              <p className="text-muted-foreground">117+ anatomical structures automatically contoured from CT — axial, sagittal, and coronal views.</p>
            </Link>

            <Link href="/export" className="glass-card rounded-2xl p-8 hover:border-teal-500/30 transition-colors group block">
              <div className="aspect-[16/9] bg-black/40 rounded-xl mb-6 flex items-center justify-center border border-white/5">
                <Download className="w-16 h-16 text-teal-400/50" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-teal-400 transition-colors">3D rendering & STL export</h4>
              <p className="text-muted-foreground">Full-body volume render with isolated organ layers — export to STL, OBJ, or glTF for 3D printing.</p>
            </Link>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="max-w-4xl mx-auto px-4 w-full text-center my-12">
          <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed text-foreground mb-8">
            "Aetherion replaced three spreadsheets and a Friday afternoon. We now calculate DRL compliance instantly — and Auto-Seg cut our 3D prep from a day to under an hour."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-lg border border-cyan-500/30">
              AH
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground">Amirali Hamzeh</p>
              <p className="text-sm text-muted-foreground">Creator, Aetherion Medical Imaging</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-4">— FAQ —</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Common questions.</h3>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-foreground mb-3">How are Aetherion products related?</h4>
              <p className="text-muted-foreground leading-relaxed">
                All products share one platform — same authentication, same dashboards. Dose Calculator handles metrics; Auto-Segmentation handles 3D models from CT/MRI.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-foreground mb-3">What output formats does Auto-Segmentation export?</h4>
              <p className="text-muted-foreground leading-relaxed">
                STL and OBJ for 3D printing, glTF for AR/VR and web rendering, NIfTI for downstream research, and DICOM-SEG for round-tripping back into a PACS.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-foreground mb-3">Is this safe for clinical use?</h4>
              <p className="text-muted-foreground leading-relaxed">
                No. This is an open-source educational and research platform. Any tool that informs diagnosis or treatment is a regulated medical device. Aetherion is strictly for demonstration and learning.
              </p>
            </div>
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
