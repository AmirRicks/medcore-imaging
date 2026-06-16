"use client";

import { motion } from "framer-motion";
import { Calculator, Info, Shield, Scale } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageTransition } from "@/components/shared/page-transition";
import { DoseCalculatorForm } from "@/components/dose/calculator-form";
import { DRLComplianceChecker } from "@/components/dose/compliance-checker";
import { Card, CardContent } from "@/components/ui/card";

export default function DoseCalculatorPage() {
  return (
    <PageTransition>
      <div className="space-y-6 pb-16">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Medical Physics Tools</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Clinical calculators for radiation dose — built on published standards.
          </p>
        </div>

        <Card className="glass-card border-none">
          <CardContent className="flex items-start gap-3 p-4">
            <Info className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground leading-relaxed">
              <p className="font-bold text-white mb-0.5">Clinical Standards Policy & Computation Notice</p>
              <p>
                All computation occurs locally in your browser. Calculations comply with ICRP Publication 102 (DLP × k-factors), AAPM Report 204 (SSDE diameter correction), and European Commission RP 185 adult reference standards. These tools are for educational/portfolio demonstration and are not cleared for medical diagnosis.
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="effective-dose" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="effective-dose" className="text-xs font-semibold uppercase tracking-wider">
              <Calculator className="h-4 w-4 mr-1.5" />
              Effective Dose Calculator
            </TabsTrigger>
            <TabsTrigger value="drl-compliance" className="text-xs font-semibold uppercase tracking-wider">
              <Scale className="h-4 w-4 mr-1.5" />
              DRL Compliance Checker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="effective-dose">
            <DoseCalculatorForm />
          </TabsContent>

          <TabsContent value="drl-compliance">
            <DRLComplianceChecker />
          </TabsContent>

        </Tabs>
      </div>
    </PageTransition>
  );
}
