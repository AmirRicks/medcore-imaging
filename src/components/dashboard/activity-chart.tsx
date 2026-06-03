"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

type DataPoint = Record<string, string | number>;

const weeklyData: DataPoint[] = [
  { label: "Mon", uploads: 4, segmentations: 3, dose: 8, ai: 12 },
  { label: "Tue", uploads: 7, segmentations: 5, dose: 6, ai: 18 },
  { label: "Wed", uploads: 3, segmentations: 2, dose: 10, ai: 8 },
  { label: "Thu", uploads: 8, segmentations: 6, dose: 7, ai: 22 },
  { label: "Fri", uploads: 5, segmentations: 4, dose: 9, ai: 15 },
  { label: "Sat", uploads: 2, segmentations: 1, dose: 3, ai: 5 },
  { label: "Sun", uploads: 1, segmentations: 1, dose: 2, ai: 3 },
];

const monthlyData: DataPoint[] = [
  { label: "W1", uploads: 28, segmentations: 19, dose: 42, ai: 68 },
  { label: "W2", uploads: 35, segmentations: 24, dose: 38, ai: 82 },
  { label: "W3", uploads: 30, segmentations: 21, dose: 45, ai: 74 },
  { label: "W4", uploads: 42, segmentations: 28, dose: 52, ai: 96 },
];

export function ActivityChart() {
  const [period, setPeriod] = useState("weekly");
  const data = period === "weekly" ? weeklyData : monthlyData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-foreground">Activity Trends</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod("weekly")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              period === "weekly"
                ? "bg-cyan-500/20 text-cyan-400"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod("monthly")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              period === "monthly"
                ? "bg-cyan-500/20 text-cyan-400"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="uploadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="doseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="label" tick={{ fill: "#9494a8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#9494a8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "rgba(18,18,26,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#e8e8ed",
              }}
            />
            <Area type="monotone" dataKey="uploads" stroke="#06b6d4" fill="url(#uploadGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="dose" stroke="#2dd4bf" fill="url(#doseGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="ai" stroke="#a855f7" fill="none" strokeWidth={2} strokeDasharray="4 4" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
