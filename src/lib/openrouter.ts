import OpenAI from "openai";

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY || "",
      defaultHeaders: {
        "HTTP-Referer": "https://aetherion-medical-imaging.vercel.app",
        "X-Title": "Aetherion Medical Imaging",
      },
    });
  }
  return client;
}

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ModelConfig = {
  model: string;
  fallback?: string;
};

export const QUERY_MODEL: ModelConfig = {
  model: "openai/gpt-oss-20b:free",
  fallback: "microsoft/phi-3.5-mini-128k-instruct:free",
};

export const ASSISTANT_MODEL: ModelConfig = {
  model: "openai/gpt-oss-20b:free",
  fallback: "nvidia/nemotron-nano-12b-v2-vl:free",
};

export async function chat(
  messages: ChatMessage[],
  config: ModelConfig = QUERY_MODEL
): Promise<{ content: string; model: string; latency: number }> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return { content: "AI service not configured. Set OPENROUTER_API_KEY to enable.", model: "none", latency: 0 };
  }

  const start = Date.now();
  try {
    const res = await getClient().chat.completions.create({
      model: config.model,
      messages,
      max_tokens: 1024,
      temperature: 0.3,
    });
    const latency = Date.now() - start;
    return {
      content: res.choices[0]?.message?.content || "",
      model: res.model,
      latency,
    };
  } catch {
    if (config.fallback) {
      const start2 = Date.now();
      try {
        const res = await getClient().chat.completions.create({
          model: config.fallback,
          messages,
          max_tokens: 1024,
          temperature: 0.3,
        });
        return {
          content: res.choices[0]?.message?.content || "",
          model: res.model,
          latency: Date.now() - start2,
        };
      } catch {
        return { content: "Service unavailable. Please try again later.", model: "none", latency: 0 };
      }
    }
    return { content: "Service unavailable. Please try again later.", model: "none", latency: 0 };
  }
}
