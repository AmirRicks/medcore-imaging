"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Gauge,
  DollarSign,
  AlertTriangle,
  Activity,
  Cpu,
} from "lucide-react";
import { getObservabilityRecords, AICallRecord } from "@/lib/observability";
import { cn } from "@/lib/utils";

function MetricCard({
  title,
  value,
  sub,
  icon,
  color,
}: {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className={cn("glass-card rounded-xl p-4", color)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">{title}</span>
        {icon}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </div>
  );
}

export function MetricsGrid() {
  const [records, setRecords] = useState<AICallRecord[]>([]);

  useEffect(() => {
    setRecords(getObservabilityRecords());
    const interval = setInterval(() => {
      setRecords(getObservabilityRecords());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const totalCalls = records.length;
  const totalCost = records.reduce((s, r) => s + r.cost, 0);
  const avgLatency = totalCalls > 0 ? Math.round(records.reduce((s, r) => s + r.latency, 0) / totalCalls) : 0;
  const failures = records.filter((r) => !r.success).length;
  const totalTokens = records.reduce((s, r) => s + r.tokens, 0);
  const uniqueModels = new Set(records.map((r) => r.model)).size;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Total AI Calls"
        value={totalCalls.toString()}
        sub="Across all features"
        icon={<Brain className="h-4 w-4 text-cyan-400" />}
        color="hover:border-cyan-500/30"
      />
      <MetricCard
        title="Avg Latency"
        value={`${avgLatency}ms`}
        sub="Per request"
        icon={<Gauge className="h-4 w-4 text-teal-400" />}
        color="hover:border-teal-500/30"
      />
      <MetricCard
        title="Total Cost"
        value={`$${totalCost.toFixed(6)}`}
        sub="All time"
        icon={<DollarSign className="h-4 w-4 text-green-400" />}
        color="hover:border-green-500/30"
      />
      <MetricCard
        title="Total Tokens"
        value={totalTokens.toLocaleString()}
        sub="Input + output"
        icon={<Cpu className="h-4 w-4 text-purple-400" />}
        color="hover:border-purple-500/30"
      />
      <MetricCard
        title="Failures"
        value={failures.toString()}
        sub={totalCalls > 0 ? `${((failures / totalCalls) * 100).toFixed(1)}% rate` : "0% rate"}
        icon={<AlertTriangle className="h-4 w-4 text-red-400" />}
        color="hover:border-red-500/30"
      />
      <MetricCard
        title="Models Used"
        value={uniqueModels.toString()}
        sub="Unique this session"
        icon={<Activity className="h-4 w-4 text-amber-400" />}
        color="hover:border-amber-500/30"
      />
    </div>
  );
}
