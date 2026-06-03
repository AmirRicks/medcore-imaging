"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Send, Loader2, AlertCircle, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/shared/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackAICall } from "@/lib/observability";

export default function DoseQueryPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ sql: string; explanation: string; data?: any[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuery = async () => {
    if (!query.trim() || loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dose-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();

      trackAICall({
        model: data.model || "unknown",
        prompt: query,
        response: data.explanation || "",
        latency: data.latency || 0,
        tokens: data.tokens || 0,
        cost: data.cost || 0,
        success: res.ok,
        route: "/dose-query",
      });

      if (!res.ok) throw new Error(data.error || "Query failed");
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Failed to process query");
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    "Show all dose records above 5 mSv",
    "Average effective dose for chest CT scans",
    "How many patients exceeded DRL this month?",
    "List dose calculations grouped by region",
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Dose Query</h1>
          <p className="text-sm text-muted-foreground">
            Ask questions about dose data in natural language — AI translates to SQL
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleQuery()}
                placeholder="Ask a question about dose records..."
                className="flex-1 rounded-lg border border-input bg-background/50 px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button onClick={handleQuery} disabled={loading || !query.trim()}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Query
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setQuery(ex)}
                  className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              LLM translates your question to SQL. Dose values remain deterministic and standards-based.
              AI is advisory only.
            </p>
          </CardContent>
        </Card>

        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Database className="h-4 w-4 text-cyan-400" />
                  Generated SQL
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="rounded-lg bg-black/40 p-4 text-xs text-green-400 overflow-x-auto font-mono">
                  {result.sql}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Table2 className="h-4 w-4 text-cyan-400" />
                  Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.explanation}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
