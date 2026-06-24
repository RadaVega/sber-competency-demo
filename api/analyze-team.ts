/* eslint-disable no-var */
declare var process: { env: Record<string, string | undefined> };

import { gigachatConfigured, gigachatComplete } from "./_gigachat.js";

const SYSTEM_PROMPT = `Ты — AI-модуль формирования продуктовых команд.
Тебе дают продуктовую идею. Верни ТОЛЬКО валидный JSON (без markdown):

{
  "roles": [
    {
      "role": "string",
      "speed": "fast" | "medium" | "slow",
      "candidatesAvailable": число,
      "requiredCompetencies": ["...", "..."]
    }
  ]
}

Включи 4-6 ролей. fast — готовы сейчас, medium — 2-4 недели, slow — дефицит.`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const { idea } = await req.json() as { idea: string };
  const userMessage = `Продуктовая идея: ${idea}`;

  try {
    let raw: string;
    if (gigachatConfigured()) {
      raw = await gigachatComplete(SYSTEM_PROMPT, userMessage);
    } else if (process.env.ANTHROPIC_API_KEY) {
      raw = await callAnthropic(SYSTEM_PROMPT, userMessage);
    } else {
      return new Response(JSON.stringify({ error: "No AI provider configured" }), { status: 501 });
    }

    const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim()) as Record<string, unknown>;
    return new Response(
      JSON.stringify({ ...parsed, provider: gigachatConfigured() ? "gigachat" : "anthropic" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500 }
    );
  }
}

async function callAnthropic(system: string, user: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type":      "application/json",
      "x-api-key":         process.env.ANTHROPIC_API_KEY ?? "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  const data = await res.json() as { content: { type: string; text?: string }[] };
  return data.content?.find((b) => b.type === "text")?.text ?? "";
}
