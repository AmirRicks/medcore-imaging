export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const EDGE_FUNCTION_URL = process.env.EDGE_FUNCTION_URL || "https://jbghbdyybjdznmxoqavw.supabase.co/functions/v1/ai-chat";

export type ModelConfig = {
  task: string;
};

export const QUERY_MODEL: ModelConfig = {
  task: "chat",
};

export const ASSISTANT_MODEL: ModelConfig = {
  task: "chat",
};

export async function chat(
  messages: ChatMessage[],
  config: ModelConfig = QUERY_MODEL
): Promise<{ content: string; model: string; latency: number; tokens?: number; cost?: number; success: boolean }> {
  const start = Date.now();
  try {
    const res = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: config.task,
        messages,
        max_tokens: 1024,
        temperature: 0.3,
        stream: false,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return { content: `Service error: ${text.slice(0, 200)}`, model: "none", latency: Date.now() - start, success: false };
    }

    const data = await res.json();
    return {
      content: data.choices?.[0]?.message?.content || "",
      model: data.model || "master-proxy",
      latency: Date.now() - start,
      tokens: data.usage?.total_tokens,
      cost: data.usage?.cost,
      success: true,
    };
  } catch {
    return { content: "Service unavailable. Please try again later.", model: "none", latency: 0, success: false };
  }
}
