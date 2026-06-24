/* eslint-disable no-var */
declare var process: { env: Record<string, string | undefined> };

import { gigachatConfigured, gigachatComplete } from "./_gigachat.js";

interface Req { method?: string; body: { initiative: string } }
interface Res { status(c: number): Res; json(d: unknown): void }

const SYSTEM_PROMPT = `Ты — AI-модуль формирования команд.
Тебе дают описание стратегической инициативы.
Верни ТОЛЬКО валидный JSON (без markdown):

{
  "roles": [{
    "role": "string",
    "requiredCompetencies": ["..."],
    "internalCoverage": число 0-100,
    "gap": "none" | "partial" | "critical"
  }]
}

Включи 4-6 ролей. Технически сложные роли — ниже покрытие.`;

export default async function handler(req: Req, res: Res): Promise<void> {
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const { initiative } = req.body;
  try {
    let raw: string;
    if (gigachatConfigured()) {
      raw = await gigachatComplete(SYSTEM_PROMPT, `Инициатива: ${initiative}`);
    } else if (process.env.ANTHROPIC_API_KEY) {
      raw = await callAnthropic(SYSTEM_PROMPT, `Инициатива: ${initiative}`);
    } else {
      res.status(501).json({ error: "No AI provider configured" }); return;
    }
    const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim()) as Record<string, unknown>;
    res.status(200).json({ ...parsed, provider: gigachatConfigured() ? "gigachat" : "anthropic" });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown" });
  }
}

async function callAnthropic(system: string, user: string): Promise<string> {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY ?? "", "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system, messages: [{ role: "user", content: user }] }),
  });
  const d = await r.json() as { content: { type: string; text?: string }[] };
  return d.content?.find(b => b.type === "text")?.text ?? "";
}
