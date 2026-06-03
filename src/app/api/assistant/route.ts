import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chat, ASSISTANT_MODEL, ChatMessage } from "@/lib/openrouter";

const RequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["system", "user", "assistant"]),
      content: z.string(),
    })
  ),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });
    }

    const { messages } = parsed.data;
    const result = await chat(messages as ChatMessage[], ASSISTANT_MODEL);

    return NextResponse.json({
      content: result.content,
      model: result.model,
      latency: result.latency,
      tokens: Math.round((result.content.length + messages.reduce((s, m) => s + m.content.length, 0)) / 4),
      cost: 0,
      success: true,
    });
  } catch (error) {
    console.error("Assistant API error:", error);
    return NextResponse.json({ content: "I'm experiencing a technical issue. Please try again.", success: false }, { status: 500 });
  }
}
