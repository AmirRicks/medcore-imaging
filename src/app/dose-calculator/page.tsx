"use client";

import { motion } from "framer-motion";
import { Calculator, Info } from "lucide-react";
import { PageTransition } from "@/components/shared/page-transition";
import { DoseCalculatorForm } from "@/components/dose/calculator-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DoseCalculatorPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Radiation Dose Calculator</h1>
          <p className="text-sm text-muted-foreground">
            CT effective dose (ICRP-102), SSDE (AAPM-204), and DRL compliance (EC-RP-185)
          </p>
        </div>

        <Card className="border-cyan-500/20 bg-cyan-500/5">
          <CardContent className="flex items-start gap-3 p-4">
            <Info className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground leading-relaxed">
              <p className="font-medium text-foreground mb-1">Standards-Based Calculation</p>
              <p>
                All dose values are computed using deterministic formulas from ICRP Publication 102,
                AAPM Report 204, and EC Radiation Protection 185. DRLs are statistical investigation
                thresholds set at the 75th percentile — exceeding a DRL triggers review, not alarm.
                Dose calculations are for educational reference only.
              </p>
            </div>
          </CardContent>
        </Card>

        <DoseCalculatorForm />
      </div>
    </PageTransition>
  );
}
