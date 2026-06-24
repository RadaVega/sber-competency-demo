/* eslint-disable no-var */
// Node.js runtime — NODE_TLS_REJECT_UNAUTHORIZED=0 disables SSL cert check
// for Sber's Russian Ministry of Digital Development CA (not in standard bundles).
// Set NODE_TLS_REJECT_UNAUTHORIZED=0 in Vercel Environment Variables.
declare var process: { env: Record<string, string | undefined> };

const TOKEN_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const CHAT_URL  = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions";
const MODEL     = process.env.GIGACHAT_MODEL ?? "GigaChat";

// Token cache — valid 30 min per GigaChat docs
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

export function gigachatConfigured(): boolean {
  return !!process.env.GIGACHAT_AUTH_KEY;
}

async function fetchToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt - 60_000) return cachedToken;

  const authKey = process.env.GIGACHAT_AUTH_KEY ?? "";
  const scope   = process.env.GIGACHAT_SCOPE ?? "GIGACHAT_API_PERS";
  const rqUID   = crypto.randomUUID();

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${authKey}`,
      "RqUID":         rqUID,
      "Content-Type":  "application/x-www-form-urlencoded",
      "Accept":        "application/json",
    },
    body: `scope=${scope}`,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GigaChat token error ${res.status}: ${txt}`);
  }

  const data = await res.json() as { access_token: string; expires_at: number };
  cachedToken    = data.access_token;
  // expires_at is Unix seconds from Sber
  tokenExpiresAt = data.expires_at * (data.expires_at < 1e12 ? 1000 : 1);
  return cachedToken;
}

export async function gigachatComplete(
  systemPrompt: string,
  userMessage:  string
): Promise<string> {
  const token = await fetchToken();

  const res = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type":  "application/json",
      "Accept":        "application/json",
    },
    body: JSON.stringify({
      model:      MODEL,
      max_tokens: 1000,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userMessage  },
      ],
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GigaChat completion error ${res.status}: ${txt}`);
  }

  const data = await res.json() as { choices: { message: { content: string } }[] };
  return data.choices[0]?.message?.content ?? "";
}
