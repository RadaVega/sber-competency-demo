// Vercel Edge Function. Runs server-side, so ANTHROPIC_API_KEY never reaches
// the browser. Configure the key in Vercel → Project → Settings →
// Environment Variables as ANTHROPIC_API_KEY.
//
// Locally, if no key is set, the client (src/lib/claudeClient.ts) falls back
// to mock data automatically — so `npm run dev` works out of the box without
// any backend running.

export const config = { runtime: "edge" };

const SYSTEM_PROMPT = `Ты — AI-модуль анализа компетенций в корпоративной системе Сбера.
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

Включи в radar 5-7 компетенций: часть уже сильных сторон сотрудника и часть
критических пробелов для целевой роли. Будь реалистичен и конкретен.`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }),
      { status: 501 }
    );
  }

  try {
    const body = await req.json();
    const { role, targetRole, currentCompetencies } = body;

    const userPrompt = `Текущая роль: ${role}
Целевая роль: ${targetRole}
Текущие компетенции: ${(currentCompetencies as string[]).join(", ")}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: errText }), {
        status: response.status,
      });
    }

    const data = await response.json();
    const textBlock = data.content?.find((b: { type: string }) => b.type === "text");
    const raw = (textBlock?.text ?? "").replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(raw);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500 }
    );
  }
}
