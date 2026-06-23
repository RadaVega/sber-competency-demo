// Vercel Serverless Function (Node.js runtime).
// Priority: GigaChat (if GIGACHAT_AUTH_KEY set) → Anthropic → 501
// The client falls back to mock data on any non-200 response.

import { gigachatConfigured, gigachatComplete } from "./_gigachat";

const SYSTEM_PROMPT = `Ты — AI-модуль анализа компетенций в корпоративной системе.
Тебе дают текущую роль сотрудника, целевую роль и список текущих компетенций.
Верни ТОЛЬКО валидный JSON (без markdown, без преамбулы) со следующей структурой:

{
  "readinessCurrentRole": число 0-100,
  "readinessTargetRole": число 0-100,
  "criticalGaps": ["...", "..."],
  "radar": [
    { "name": "string", "current": число 0-100, "required": число 0-100 }
  ]
}

Включи в radar 5-7 компетенций. Будь реалистичен и конкретен.`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const body = await req.json();
  const { role, targetRole, currentCompetencies } = body;
  const userMessage = `Текущая роль: ${role}\nЦелевая роль: ${targetRole}\nТекущие компетенции: ${(currentCompetencies as string[]).join(", ")}`;

  try {
    let raw: string;

    if (gigachatConfigured()) {
      raw = await gigachatComplete(SYSTEM_PROMPT, userMessage);
    } else if (process.env.ANTHROPIC_API_KEY) {
      raw = await callAnthropic(SYSTEM_PROMPT, userMessage);
    } else {
      return new Response(JSON.stringify({ error: "No AI provider configured" }), { status: 501 });
    }

    const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
    return new Response(JSON.stringify({ ...parsed, provider: gigachatConfigured() ? "gigachat" : "anthropic" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }), { status: 500 });
  }
}

async function callAnthropic(system: string, user: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  const data = await res.json();
  const block = data.content?.find((b: { type: string }) => b.type === "text");
  return block?.text ?? "";
}
