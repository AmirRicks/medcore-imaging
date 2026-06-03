"use client";

import { PageTransition } from "@/components/shared/page-transition";
import { ChatInterface } from "@/components/assistant/chat-interface";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Sparkles } from "lucide-react";

export default function AssistantPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Imaging Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Ask questions about segmentation, dose calculations, and imaging terminology
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-xs text-amber-400 font-medium">Powered by OpenRouter</span>
          </div>
        </div>

        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="flex items-start gap-3 p-4">
            <Info className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground leading-relaxed">
              <p className="font-medium text-foreground mb-1">Educational Use Only</p>
              <p>
                This AI assistant provides educational information about medical imaging concepts,
                segmentation outputs, and dose calculations. It does not provide diagnoses,
                treatment recommendations, or clinical interpretations. Always consult a qualified
                healthcare provider for medical decisions.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <ChatInterface />
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Segmentation", items: ["Organ identification", "Structure counts", "Volume measurements"] },
            { title: "Dose & Safety", items: ["Effective dose", "SSDE calculation", "DRL compliance"] },
            { title: "Terminology", items: ["DICOM tags", "Scan parameters", "Anatomical terms"] },
          ].map((section) => (
            <div key={section.title} className="glass-card rounded-xl p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">{section.title}</h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
