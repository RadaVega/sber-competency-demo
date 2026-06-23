import type { AIProvider } from "@/lib/claudeClient";

const labels: Record<AIProvider, { dot: string; text: string }> = {
  gigachat:  { dot: "bg-(--color-good)",   text: "GigaChat Lite · живой ответ" },
  anthropic: { dot: "bg-(--color-good)",   text: "Claude · живой ответ" },
  mock:      { dot: "bg-(--color-ink-3)",  text: "Демо-режим · офлайн-данные" },
};

export function AISourceBadge({
  source,
  provider,
}: {
  source: "live" | "mock";
  provider: AIProvider;
}) {
  const meta = source === "live" ? labels[provider] : labels.mock;
  return (
    <div className="text-[11px] text-(--color-ink-3) font-mono flex items-center gap-1.5 pt-1">
      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${meta.dot}`} />
      {meta.text}
    </div>
  );
}
