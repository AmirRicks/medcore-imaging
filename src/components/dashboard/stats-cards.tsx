"use client";

import { motion } from "framer-motion";
import {
  Upload,
  ScanLine,
  Activity,
  Clock,
  Calculator,
  HardDrive,
  MessageSquare,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

function StatCard({ title, value, change, icon, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card rounded-xl p-4 hover:border-cyan-500/30 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <p className="text-xs text-green-400">+{change} this week</p>
          )}
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", color)}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

const stats: StatCardProps[] = [
  { title: "Total Uploads", value: "142", change: "12", icon: <Upload className="h-5 w-5 text-white" />, color: "bg-cyan-500/20", delay: 0 },
  { title: "Segmentations", value: "89", change: "8", icon: <ScanLine className="h-5 w-5 text-white" />, color: "bg-teal-500/20", delay: 0.05 },
  { title: "Organs Segmented", value: "1,847", change: "203", icon: <Activity className="h-5 w-5 text-white" />, color: "bg-purple-500/20", delay: 0.1 },
  { title: "Avg Processing", value: "3.2 min", change: null as unknown as string, icon: <Clock className="h-5 w-5 text-white" />, color: "bg-amber-500/20", delay: 0.15 },
  { title: "Dose Calculations", value: "231", change: "18", icon: <Calculator className="h-5 w-5 text-white" />, color: "bg-green-500/20", delay: 0.2 },
  { title: "Storage Used", value: "4.2 GB", change: null as unknown as string, icon: <HardDrive className="h-5 w-5 text-white" />, color: "bg-blue-500/20", delay: 0.25 },
  { title: "AI Interactions", value: "567", change: "45", icon: <MessageSquare className="h-5 w-5 text-white" />, color: "bg-pink-500/20", delay: 0.3 },
  { title: "Active Users", value: "12", change: "3", icon: <Users className="h-5 w-5 text-white" />, color: "bg-indigo-500/20", delay: 0.35 },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} change={stat.change ?? undefined} />
      ))}
    </div>
  );
}
