export interface AICallRecord {
  id: string;
  model: string;
  prompt: string;
  response: string;
  latency: number;
  tokens: number;
  cost: number;
  success: boolean;
  route: string;
  userId?: string;
  timestamp: string;
}

const records: AICallRecord[] = [];

export function trackAICall(record: Omit<AICallRecord, "id" | "timestamp">): string {
  const id = crypto.randomUUID();
  const entry: AICallRecord = { ...record, id, timestamp: new Date().toISOString() };
  records.push(entry);
  if (records.length > 1000) records.shift();
  if (typeof window !== "undefined") {
    try {
      const stored = JSON.parse(localStorage.getItem("ai-observability") || "[]");
      stored.push(entry);
      if (stored.length > 500) stored.splice(0, stored.length - 500);
      localStorage.setItem("ai-observability", JSON.stringify(stored));
    } catch {}
  }
  console.info(`[AI-Observability] ${record.model} | ${record.latency}ms | ${record.tokens} tokens | $${record.cost.toFixed(6)} | ${record.route}`);
  return id;
}

export function getObservabilityRecords(): AICallRecord[] {
  if (typeof window !== "undefined") {
    try {
      const stored = JSON.parse(localStorage.getItem("ai-observability") || "[]");
      return stored;
    } catch {
      return [];
    }
  }
  return records;
}

export function clearObservabilityRecords(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("ai-observability");
  }
  records.length = 0;
}
