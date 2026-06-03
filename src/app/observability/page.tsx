"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Trash2, Activity, AlertCircle, Clock, Cpu, DollarSign } from "lucide-react";
import { PageTransition } from "@/components/shared/page-transition";
import { MetricsGrid } from "@/components/observability/metrics-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getObservabilityRecords, clearObservabilityRecords, AICallRecord } from "@/lib/observability";
import { formatDate } from "@/lib/utils";

export default function ObservabilityPage() {
  const [records, setRecords] = useState<AICallRecord[]>([]);

  useEffect(() => {
    setRecords(getObservabilityRecords());
    const interval = setInterval(() => setRecords(getObservabilityRecords()), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleClear = () => {
    clearObservabilityRecords();
    setRecords([]);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Observability Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Monitor AI model usage, latency, token consumption, and costs
            </p>
          </div>
          {records.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleClear}>
              <Trash2 className="h-4 w-4" />
              Clear Records
            </Button>
          )}
        </div>

        <MetricsGrid />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-cyan-400" />
              AI Call Log ({records.length} records)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {records.length === 0 ? (
              <div className="text-center py-12">
                <Brain className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">No AI calls recorded yet</p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Use the AI Assistant or Dose Query to generate trace data
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-2 px-2 text-muted-foreground font-medium">Model</th>
                      <th className="text-left py-2 px-2 text-muted-foreground font-medium">Route</th>
                      <th className="text-right py-2 px-2 text-muted-foreground font-medium">Latency</th>
                      <th className="text-right py-2 px-2 text-muted-foreground font-medium">Tokens</th>
                      <th className="text-right py-2 px-2 text-muted-foreground font-medium">Cost</th>
                      <th className="text-center py-2 px-2 text-muted-foreground font-medium">Status</th>
                      <th className="text-right py-2 px-2 text-muted-foreground font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.slice().reverse().map((r) => (
                      <tr key={r.id} className="border-b border-border/20 hover:bg-white/5 transition-colors">
                        <td className="py-2 px-2 text-foreground font-mono">{r.model}</td>
                        <td className="py-2 px-2 text-muted-foreground">{r.route}</td>
                        <td className="py-2 px-2 text-right text-muted-foreground">{r.latency}ms</td>
                        <td className="py-2 px-2 text-right text-muted-foreground">{r.tokens}</td>
                        <td className="py-2 px-2 text-right text-muted-foreground">${r.cost.toFixed(6)}</td>
                        <td className="py-2 px-2 text-center">
                          {r.success ? (
                            <span className="text-green-400">OK</span>
                          ) : (
                            <span className="text-red-400 flex items-center justify-center gap-1">
                              <AlertCircle className="h-3 w-3" /> FAIL
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-2 text-right text-muted-foreground">
                          {new Date(r.timestamp).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
