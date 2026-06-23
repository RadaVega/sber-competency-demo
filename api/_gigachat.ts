// Shared GigaChat helper — imported by all three API route files.
// GigaChat uses a two-step OAuth flow:
//   1. POST to token endpoint with Authorization: Basic <key>  → access_token
//   2. POST to chat completions with Bearer <access_token>
//
// Env vars needed (set in .env.local and Vercel):
//   GIGACHAT_AUTH_KEY   — the Base64 Authorization key from Sber cabinet
//   GIGACHAT_SCOPE      — GIGACHAT_API_PERS (personal) or GIGACHAT_API_CORP (corporate)
//                         defaults to GIGACHAT_API_PERS

const TOKEN_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const CHAT_URL  = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions";
const MODEL     = "GigaChat-Lite";

// Simple in-memory token cache (per serverless instance lifetime).
// Vercel cold-starts a new instance anyway, so this avoids double token
// fetches within the same warm invocation.
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

export function gigachatConfigured(): boolean {
  return !!process.env.GIGACHAT_AUTH_KEY;
}

async function fetchToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt - 30_000) return cachedToken;

  const authKey = process.env.GIGACHAT_AUTH_KEY!;
  const scope   = process.env.GIGACHAT_SCOPE ?? "GIGACHAT_API_PERS";
  const rqUID   = crypto.randomUUID();

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${authKey}`,
      "RqUID":         rqUID,
      "Content-Type":  "application/x-www-form-urlencoded",
    },
    body: `scope=${scope}`,
    // GigaChat token endpoint uses a self-signed cert on port 9443.
    // In Node.js runtime on Vercel this fetch goes through the native
    // TLS stack; if you hit SSL errors locally, set:
    //   NODE_TLS_REJECT_UNAUTHORIZED=0 in .env.local (dev only — never prod).
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GigaChat token error ${res.status}: ${txt}`);
  }

  const data = await res.json() as { access_token: string; expires_at: number };
  cachedToken    = data.access_token;
  tokenExpiresAt = data.expires_at;   // Unix ms from Sber
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
    },
    body: JSON.stringify({
      model:      MODEL,
      max_tokens: 1000,
      messages: [
        { role: "system",  content: systemPrompt },
        { role: "user",    content: userMessage  },
      ],
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GigaChat completion error ${res.status}: ${txt}`);
  }

  const data = await res.json() as {
    choices: { message: { content: string } }[];
  };
  return data.choices[0]?.message?.content ?? "";
}
