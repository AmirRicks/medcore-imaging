"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Activity,
  Brain,
  Calculator,
  ChartArea,
  Database,
  Download,
  Eye,
  LogIn,
  Menu,
  MessageSquare,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/viewer", label: "3D Viewer", icon: Eye },
  { href: "/dose-calculator", label: "Dose Calculator", icon: Calculator },
  { href: "/dose-query", label: "Dose Query", icon: Database },
  { href: "/datasets", label: "Datasets", icon: ChartArea },
  { href: "/assistant", label: "AI Assistant", icon: MessageSquare },
  { href: "/dashboard", label: "Dashboard", icon: Activity },
  { href: "/observability", label: "Observability", icon: Brain },
  { href: "/export", label: "Export", icon: Download },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50">
      <div className="glass px-4">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-gradient">Aetherion</span>
              <span className="text-muted-foreground ml-1">Medical</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-cyan-400"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-600 hover:to-teal-600 transition-all duration-200"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-white/5"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass border-b border-border/50 lg:hidden"
        >
          <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-2 gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-cyan-400 bg-cyan-500/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
