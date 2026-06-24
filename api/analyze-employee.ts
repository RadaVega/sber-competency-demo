/* eslint-disable no-var */
declare var process: { env: Record<string, string | undefined> };

// Node.js runtime (NOT Edge) — required for NODE_TLS_REJECT_UNAUTHORIZED=0
// to bypass GigaChat's Russian CA cert that US servers don't trust.
// Add NODE_TLS_REJECT_UNAUTHORIZED=0 in Vercel → Settings → Environment Variables.

import { gigachatConfigured, gigachatComplete } from "./_gigachat.js";

interface Req { method?: string; body: { role: string; targetRole: string; currentCompetencies: string[] } }
interface Res { status(c: number): Res; json(d: unknown): void }

const SYSTEM_PROMPT = `Ты — AI-модуль анализа компетенций.
Тебе дают роль сотрудника, целевую роль и список компетенций.
Верни ТОЛЬКО валидный JSON (без markdown):

{
  "readinessCurrentRole": число 0-100,
  "readinessTargetRole": число 0-100,
  "criticalGaps": ["...", "..."],
  "radar": [{ "name": "string", "current": число 0-100, "required": число 0-100 }]
}

Включи 5-7 пунктов в radar. Будь реалистичен.`;

export default async function handler(req: Req, res: Res): Promise<void> {
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const { role, targetRole, currentCompetencies } = req.body;
  const userMsg = `Текущая роль: ${role}\nЦелевая роль: ${targetRole}\nКомпетенции: ${currentCompetencies.join(", ")}`;

  try {
    let raw: string;
    if (gigachatConfigured()) {
      raw = await gigachatComplete(SYSTEM_PROMPT, userMsg);
    } else if (process.env.ANTHROPIC_API_KEY) {
      raw = await callAnthropic(SYSTEM_PROMPT, userMsg);
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
