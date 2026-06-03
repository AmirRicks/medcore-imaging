# Aetherion Medical Imaging Platform

> **AI-powered multi-organ segmentation, radiation dose tracking, and 3D visualization. For educational and research use only.**

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black?style=flat&logo=vercel)](https://aetherion-medical-imaging.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase)](https://supabase.com)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-FF6B6B?style=flat)](https://openrouter.ai)

## Features

### 1. AI Organ Segmentation
Upload CT/MRI scans and auto-segment 117+ anatomical structures using TotalSegmentator. Colored mask overlays on axial/sagittal/coronal slices.

### 2. Interactive 3D Viewer
Multi-organ mesh viewer with per-organ toggle, color, and opacity controls. Built with Three.js/react-three-fiber.

### 3. Radiation Dose Calculator
Client-side CT effective dose calculation using ICRP-102 k-factors. SSDE per AAPM-204. DRL benchmarking per EC-RP-185. Plain-English dose explanations.

### 4. AI Medical Imaging Assistant
Natural-language Q&A about segmentation, dose, DICOM metadata, and imaging terminology. Powered by OpenRouter free-tier models.

### 5. Research Dataset Library
Curated collection of publicly available datasets from TCIA, Medical Segmentation Decathlon, and other open repositories.

### 6. Analytics Dashboard
Platform usage metrics, activity trends, and processing statistics with animated Recharts visualizations.

### 7. Export Center
Multi-format export: STL, OBJ, GLB, NIfTI, DICOM-SEG, PDF, CSV, JSON metadata.

### 8. User Accounts
Supabase authentication with email/password and Google OAuth. Saved projects and history.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 App Router |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui + Custom glassmorphism design system |
| Animation | Framer Motion v12, Three.js animated backgrounds |
| 3D Rendering | Three.js, react-three-fiber, @react-three/drei |
| Backend | Supabase (PostgreSQL, Auth, Storage) |
| AI Provider | OpenRouter (free-tier: GPT-OSS-20B, Phi-3.5) |
| Segmentation | TotalSegmentator (FastAPI backend) |
| Charts | Recharts |
| Security | CSP, HSTS, rate limiting, Zod validation |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Next.js 16 App                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────┐  │
│  │ 3D Viewer│ │  Dose    │ │ AI       │ │Dashboard│  │
│  │          │ │Calculator│ │ Assistant│ │        │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────┘  │
│  ┌──────────────────────────────────────────────┐   │
│  │          API Route Handlers                   │   │
│  │  /api/segment  /api/dose-query  /api/assistant │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │       Lib: Dose Math (ICRP/AAPM/DRL)         │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
         │                          │
         ▼                          ▼
   ┌──────────┐             ┌──────────────┐
   │ Supabase │             │  OpenRouter  │
   │ (Auth +  │             │  (AI Models) │
   │  DB +    │             │              │
   │ Storage) │             │ GPT-OSS-20B  │
   └──────────┘             │ Phi-3.5      │
                            └──────────────┘
```

## Getting Started

```bash
# Clone
git clone https://github.com/AmirRicks/medcore-imaging.git
cd medcore-imaging

# Install
npm install

# Set environment variables
cp .env.example .env.local

# Run
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `OPENROUTER_API_KEY` | OpenRouter API key |

## Safety & Disclaimer

> **This platform is for educational and research use only.**
> - Not cleared for clinical or diagnostic use
> - Not a substitute for professional medical advice
> - Always consult a qualified healthcare provider for medical decisions
> - Open-source segmentation model weights may have research-use-only licenses
> - Any tool that informs diagnosis or treatment is a regulated medical device

## License

MIT — See LICENSE for details.
