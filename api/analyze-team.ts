// Vercel Edge Function. Mirrors api/analyze-employee.ts and
// api/analyze-initiative.ts — server-side only, key never reaches the browser.

export const config = { runtime: "edge" };

const SYSTEM_PROMPT = `Ты — AI-модуль формирования продуктовых команд в Яндексе.
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

Включи 4-6 ролей. "speed" отражает, насколько быстро можно укомплектовать
роль внутренними кандидатами: "fast" — кандидаты готовы сейчас,
"medium" — требуется 2-4 недели на подбор/дообучение, "slow" — выраженный
дефицит специалистов. candidatesAvailable — реалистичное число кандидатов
внутри компании (0-10).`;

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
    const { idea } = await req.json();

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
        messages: [{ role: "user", content: `Продуктовая идея: ${idea}` }],
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
