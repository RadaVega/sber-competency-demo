import process from "node:process";

const TOKEN_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const CHAT_URL  = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions";
const MODEL     = "GigaChat-Lite";

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
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GigaChat token error ${res.status}: ${txt}`);
  }

  const data = await res.json() as { access_token: string; expires_at: number };
  cachedToken    = data.access_token;
  tokenExpiresAt = data.expires_at;
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
