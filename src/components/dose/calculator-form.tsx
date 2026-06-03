"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { REGIONS, AGE_GROUPS, AgeGroup, Region } from "@/lib/dose/icrp-tables";
import { DoseInput, DoseResult, calculateDose } from "@/lib/dose/calculator";
import { trackAICall } from "@/lib/observability";

export function DoseCalculatorForm() {
  const [dlp, setDlp] = useState("");
  const [region, setRegion] = useState<Region>("chest");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("adult");
  const [ctdiVol, setCtdiVol] = useState("");
  const [diameter, setDiameter] = useState("");
  const [result, setResult] = useState<DoseResult | null>(null);

  const handleCalculate = () => {
    const dlpNum = parseFloat(dlp);
    if (isNaN(dlpNum) || dlpNum <= 0) return;

    const input: DoseInput = {
      dlp: dlpNum,
      region,
      ageGroup,
      ctdiVol: ctdiVol ? parseFloat(ctdiVol) : undefined,
      effectiveDiameter: diameter ? parseFloat(diameter) : undefined,
    };

    const res = calculateDose(input);
    setResult(res);

    trackAICall({
      model: "deterministic",
      prompt: `Dose calc: DLP=${dlpNum}, region=${region}, age=${ageGroup}`,
      response: res.plainEnglish,
      latency: 0,
      tokens: 0,
      cost: 0,
      success: true,
      route: "/dose-calculator",
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-cyan-400" />
            Dose Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">DLP (mGy·cm)</label>
            <Input
              type="number"
              placeholder="e.g., 470"
              value={dlp}
              onChange={(e) => setDlp(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Scan Region</label>
            <Select value={region} onChange={(e) => setRegion(e.target.value as Region)}>
              {REGIONS.map((r) => (
                <option key={r.key} value={r.key}>{r.label}</option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Patient Age Group</label>
            <Select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}>
              {AGE_GROUPS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </Select>
          </div>

          <div className="border-t border-border/50 pt-4 space-y-4">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Info className="h-3 w-3" />
              Optional — SSDE calculation
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">CTDIvol (mGy)</label>
              <Input
                type="number"
                placeholder="e.g., 15"
                value={ctdiVol}
                onChange={(e) => setCtdiVol(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Effective Diameter (cm)</label>
              <Input
                type="number"
                placeholder="e.g., 25"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full" size="lg">
            Calculate Dose
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-cyan-400" />
                  Dose Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-4 text-center">
                    <p className="text-2xl font-bold text-cyan-400">{result.effectiveDose.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Effective Dose (mSv)</p>
                  </div>
                  <div className="rounded-lg bg-teal-500/10 border border-teal-500/20 p-4 text-center">
                    <p className="text-2xl font-bold text-teal-400">{result.chestXrayEquivalent.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">Chest X-Ray Equivalents</p>
                  </div>
                </div>

                {result.ssde !== undefined && (
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-lg font-semibold text-foreground">{result.ssde.toFixed(2)} mGy</p>
                    <p className="text-xs text-muted-foreground">SSDE (Size-Specific Dose Estimate)</p>
                  </div>
                )}

                {result.drlCompliance && (
                  <div className={`rounded-lg border p-3 ${
                    result.drlCompliance.exceeded
                      ? "bg-red-500/10 border-red-500/30"
                      : "bg-green-500/10 border-green-500/30"
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {result.drlCompliance.exceeded ? (
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      ) : (
                        <Info className="h-4 w-4 text-green-400" />
                      )}
                      <span className={`text-sm font-medium ${
                        result.drlCompliance.exceeded ? "text-red-400" : "text-green-400"
                      }`}>
                        DRL: {result.drlCompliance.compliancePercent.toFixed(0)}% of reference
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Reference DLP: {result.drlCompliance.referenceDLP} mGy·cm
                      {result.drlCompliance.exceeded && " — Review warranted"}
                    </p>
                  </div>
                )}

                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-1000"
                      style={{ width: `${Math.min(result.backgroundPercent, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {result.backgroundPercent}% of annual background radiation (2.7 mSv/yr)
                  </p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.plainEnglish}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
