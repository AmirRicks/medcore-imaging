import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chat, QUERY_MODEL } from "@/lib/openrouter";

const RequestSchema = z.object({
  query: z.string().min(1).max(500),
});

const SYSTEM_PROMPT = `You are a medical dose database query assistant. You translate natural language questions into SQL queries for a table called 'dose_records' with columns: id (uuid), user_id (uuid), dlp (numeric), region (text), age_group (text), effective_dose (numeric), ssde (numeric, nullable), created_at (timestamp).

Return ONLY a JSON object with:
- "sql": the PostgreSQL query
- "explanation": plain English explanation of what the query does

Rules:
- Never invent data or columns that don't exist
- Use only SELECT queries (read-only)
- Dose values are in mSv
- Keep it educational and clear`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query", details: parsed.error.flatten() }, { status: 400 });
    }

    const { query } = parsed.data;

    const result = await chat(
      [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Translate this to SQL: "${query}"` },
      ],
      QUERY_MODEL
    );

    let parsedResponse;
    try {
      const jsonMatch = result.content.match(/\{[\s\S]*\}/);
      parsedResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : { sql: "Unable to parse", explanation: result.content };
    } catch {
      parsedResponse = { sql: "Parse error", explanation: result.content };
    }

    return NextResponse.json({
      sql: parsedResponse.sql,
      explanation: parsedResponse.explanation,
      model: result.model,
      latency: result.latency,
      tokens: Math.round((result.content.length + query.length) / 4),
      cost: 0,
      success: true,
    });
  } catch (error) {
    console.error("Dose query API error:", error);
    return NextResponse.json({ error: "Failed to process query" }, { status: 500 });
  }
}
