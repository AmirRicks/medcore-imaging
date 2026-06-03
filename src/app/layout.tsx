import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aetherion Medical Imaging — AI-Powered Radiology Platform",
  description:
    "Open-source AI-powered medical imaging platform. 3D organ segmentation, radiation dose tracking, and AI-assisted analysis. For educational and research use only.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        <AnimatedBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-border/50 py-6">
            <div className="mx-auto max-w-7xl px-4 text-center text-xs text-muted-foreground">
              <p className="mb-1">Aetherion Medical Imaging — For educational and research use only</p>
              <p>Not cleared for clinical or diagnostic use. Not a substitute for professional medical advice.</p>
            </div>
          </footer>
        </div>
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
