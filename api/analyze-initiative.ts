// Vercel Edge Function. Mirrors api/analyze-employee.ts: server-side only,
// ANTHROPIC_API_KEY never reaches the browser. See that file for the full
// pattern explanation.

export const config = { runtime: "edge" };

const SYSTEM_PROMPT = `Ты — AI-модуль формирования продуктовых команд в VK.
Тебе дают описание стратегической инициативы (новый продукт, фича, сервис).
Верни ТОЛЬКО валидный JSON (без markdown, без преамбулы):

{
  "roles": [
    {
      "role": "string",
      "requiredCompetencies": ["...", "..."],
      "internalCoverage": число 0-100,
      "gap": "none" | "partial" | "critical"
    }
  ]
}

Включи 4-6 ролей, необходимых для реализации инициативы. internalCoverage —
оценка того, насколько внутри VK уже есть люди с такими компетенциями.
Будь реалистичен: технически сложные/новые роли (например, специализированный
ML/AI) должны иметь более низкое покрытие и gap "critical" или "partial".`;

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
    const { initiative } = await req.json();

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
        messages: [{ role: "user", content: `Инициатива: ${initiative}` }],
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
