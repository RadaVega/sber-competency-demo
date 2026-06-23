import { useState } from "react";
import { Sparkles, Loader2, Zap, ArrowRight } from "lucide-react";
import { Card } from "@/components/Card";
import { yandexProductIdeas } from "@/data/yandexData";
import type { YandexRole } from "@/data/yandexData";
import { analyzeYandexTeam } from "@/lib/claudeClient";
import { bi } from "@/lib/bi";

type Status = "idle" | "loading" | "done";

const speedMeta: Record<string, { text: string; label: string }> = {
  fast: { text: "text-(--color-good)", label: "Готовы сейчас" },
  medium: { text: "text-(--color-warn)", label: "2-4 недели" },
  slow: { text: "text-(--color-risk)", label: "Дефицит" },
};

export function ProductTeamBuilderScreen({ onNext }: { onNext?: () => void }) {
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [roles, setRoles] = useState<YandexRole[]>([]);
  const [source, setSource] = useState<"live" | "mock" | null>(null);

  async function handleBuild() {
    if (!idea.trim()) return;
    setStatus("loading");
    const result = await analyzeYandexTeam(idea);
    setRoles(result.roles);
    setSource(result.source);
    setStatus("done");
  }

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 border-b border-(--color-border) pb-8">
        <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
          {bi("Product Team Builder", "Конструктор продуктовых команд")}
        </div>
        <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight max-w-[700px]">
          Как быстрее создавать сильные продуктовые команды?
        </h1>
      </div>

      <Card className="mb-8">
        <div className="p-6">
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-3">
            Продуктовая идея
          </div>
          <div className="flex gap-3 mb-4">
            <input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Например: генеративный поиск в Яндекс Маркете"
              className="flex-1 rounded-md border border-(--color-border) bg-(--color-surface-raised) px-4 py-3 text-[14px] text-(--color-ink-1) placeholder:text-(--color-ink-3) outline-none focus:border-(--color-signal) transition-colors"
            />
            <button
              onClick={handleBuild}
              disabled={status === "loading" || !idea.trim()}
              className="flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Собрать команду
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {yandexProductIdeas.map((ex) => (
              <button
                key={ex}
                onClick={() => setIdea(ex)}
                className="rounded-full border border-(--color-border) px-3 py-1.5 text-[12px] text-(--color-ink-2) hover:text-(--color-ink-1) hover:bg-(--color-surface-raised) transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
          {source && (
            <div className="text-[11px] text-(--color-ink-3) font-mono flex items-center gap-1.5 pt-3">
              <span className={`h-1.5 w-1.5 rounded-full ${source === "live" ? "bg-(--color-good)" : "bg-(--color-ink-3)"}`} />
              {source === "live" ? "Анализ выполнен моделью Claude" : "Демо-режим — офлайн-данные"}
            </div>
          )}
        </div>
      </Card>

      {status === "done" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {roles.map((r) => {
              const meta = speedMeta[r.speed];
              return (
                <Card key={r.role}>
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-[15px] text-(--color-ink-1) font-medium">{r.role}</h3>
                      <Zap className={`h-4 w-4 ${meta.text}`} />
                    </div>
                    <div className={`text-[12.5px] font-medium ${meta.text}`}>
                      {meta.label} · {r.candidatesAvailable} кандидата(ов)
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-(--color-border-soft)">
                      {r.requiredCompetencies.map((c) => (
                        <span key={c} className="rounded-full border border-(--color-border) bg-(--color-surface-raised) px-2.5 py-1 text-[12px] text-(--color-ink-2)">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          {onNext && (
            <div className="flex justify-end mt-6">
              <button
                onClick={onNext}
                className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all"
              >
                {bi("Talent Ecosystem", "Экосистема талантов")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
