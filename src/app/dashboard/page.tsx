"use client";

import { PageTransition } from "@/components/shared/page-transition";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { BarChart3, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Platform usage metrics, processing statistics, and activity trends
          </p>
        </div>

        <StatsCards />
        <ActivityChart />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-cyan-400" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {[
                { action: "CT Chest segmented", time: "2 min ago", user: "Dr. Smith" },
                { action: "Dose calculation performed", time: "15 min ago", user: "Dr. Jones" },
                { action: "Export package downloaded", time: "1 hour ago", user: "Dr. Lee" },
                { action: "New dataset uploaded", time: "2 hours ago", user: "Tech. Wang" },
                { action: "AI assistant query", time: "3 hours ago", user: "Dr. Patel" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-sm text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              Top Organs Segmented
            </h3>
            <div className="space-y-4">
              {[
                { name: "Lungs", count: 178, pct: 100 },
                { name: "Liver", count: 156, pct: 88 },
                { name: "Heart", count: 142, pct: 80 },
                { name: "Kidneys", count: 128, pct: 72 },
                { name: "Spleen", count: 115, pct: 65 },
                { name: "Pancreas", count: 94, pct: 53 },
              ].map((organ) => (
                <div key={organ.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-foreground">{organ.name}</span>
                    <span className="text-muted-foreground">{organ.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-1000"
                      style={{ width: `${organ.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
