import { useState } from "react";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Card, CardHeader } from "@/components/Card";
import { AISourceBadge } from "@/components/AISourceBadge";
import { initiativeExamples } from "@/data/vkData";
import type { VKRole } from "@/data/vkData";
import { analyzeVKInitiative } from "@/lib/claudeClient";
import type { AIProvider } from "@/lib/claudeClient";
import { useLiveMode } from "@/lib/LiveModeContext";
import { bi } from "@/lib/bi";

type Status = "idle" | "loading" | "done";

const gapStyle: Record<string, { text: string; bar: string; label: string }> = {
  none: { text: "text-(--color-good)", bar: "bg-(--color-good)", label: "Покрыто" },
  partial: { text: "text-(--color-warn)", bar: "bg-(--color-warn)", label: "Частично" },
  critical: { text: "text-(--color-risk)", bar: "bg-(--color-risk)", label: "Критично" },
};

export function VKInitiativeScreen({ onNext }: { onNext: () => void }) {
  const [initiative, setInitiative] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [roles, setRoles] = useState<VKRole[]>([]);
  const [source, setSource] = useState<"live" | "mock" | null>(null);
  const [provider, setProvider] = useState<AIProvider>("mock");
  const { isLive } = useLiveMode();

  async function handleAnalyze() {
    if (!initiative.trim()) return;
    setStatus("loading");
    const result = await analyzeVKInitiative(initiative, isLive);
    setRoles(result.roles);
    setSource(result.source);
    setProvider(result.provider);
    setStatus("done");
  }

  const avgCoverage = roles.length
    ? Math.round(roles.reduce((s, r) => s + r.internalCoverage, 0) / roles.length)
    : 0;

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      {/* Level 1 — plain human observation, no corporate language */}
      <div className="mb-8 text-center">
        <p className="font-display text-[22px] md:text-[26px] text-(--color-ink-1) leading-snug max-w-[620px] mx-auto">
          Почему опытная кухня ресторана готовит блюдо быстрее,
          <br />
          чем повар такого же уровня в одиночку?
        </p>
        <p className="text-[13.5px] text-(--color-ink-2) mt-4 max-w-[560px] mx-auto leading-relaxed">
          Не потому что там работают более талантливые люди. А потому что
          каждый заранее знает свою станцию и то, что делает сосед —
          собрать такую бригаду с нуля под каждое новое блюдо было бы
          в разы медленнее.
        </p>
      </div>

      <div className="mb-10 border-b border-(--color-border) pb-8">
        <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
          {bi("Strategic Initiative Builder", "Конструктор стратегических инициатив")}
        </div>
        <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight max-w-[700px]">
          Как быстрее запускать новые продукты и инициативы?
        </h1>
      </div>

      <Card className="mb-8">
        <div className="p-6">
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-3">
            Опишите инициативу
          </div>
          <div className="flex gap-3 mb-4">
            <input
              value={initiative}
              onChange={(e) => setInitiative(e.target.value)}
              placeholder="Например: создать AI-помощника для VK MAX"
              className="flex-1 rounded-md border border-(--color-border) bg-(--color-surface-raised) px-4 py-3 text-[14px] text-(--color-ink-1) placeholder:text-(--color-ink-3) outline-none focus:border-(--color-signal) transition-colors"
            />
            <button
              onClick={handleAnalyze}
              disabled={status === "loading" || !initiative.trim()}
              className="flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Проанализировать
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {initiativeExamples.map((ex) => (
              <button
                key={ex}
                onClick={() => setInitiative(ex)}
                className="rounded-full border border-(--color-border) px-3 py-1.5 text-[12px] text-(--color-ink-2) hover:text-(--color-ink-1) hover:bg-(--color-surface-raised) transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>

          {source && (
            <AISourceBadge source={source} provider={provider} />
          )}
        </div>
      </Card>

      {status === "done" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-lg border border-(--color-border) bg-(--color-border) mb-6">
            <div className="bg-(--color-surface) p-6">
              <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-2">
                Необходимых ролей
              </div>
              <div className="font-display text-[32px] text-(--color-ink-1)">
                {roles.length}
              </div>
            </div>
            <div className="bg-(--color-surface) p-6">
              <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-2">
                Внутреннее покрытие
              </div>
              <div className="font-display text-[32px] text-(--color-warn)">
                {avgCoverage}%
              </div>
            </div>
            <div className="bg-(--color-surface) p-6">
              <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-2">
                Критических дефицитов
              </div>
              <div className="font-display text-[32px] text-(--color-risk)">
                {roles.filter((r) => r.gap === "critical").length}
              </div>
            </div>
          </div>

          <Card>
            <CardHeader eyebrow="Role Breakdown" title="Необходимые роли и покрытие" />
            <div className="divide-y divide-(--color-border-soft)">
              {roles.map((r) => {
                const g = gapStyle[r.gap];
                return (
                  <div
                    key={r.role}
                    className="grid grid-cols-[1fr_140px_auto] items-center gap-6 px-5 py-4"
                  >
                    <div>
                      <div className="text-[13.5px] text-(--color-ink-1) font-medium mb-1.5">
                        {r.role}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {r.requiredCompetencies.map((c) => (
                          <span
                            key={c}
                            className="rounded-full border border-(--color-border) bg-(--color-surface-raised) px-2 py-0.5 text-[11px] text-(--color-ink-2)"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
                      <div
                        className={`h-full rounded-full ${g.bar} transition-all duration-700`}
                        style={{ width: `${r.internalCoverage}%` }}
                      />
                    </div>
                    <div className={`text-[12.5px] font-medium ${g.text} text-right w-[90px]`}>
                      {g.label} · {r.internalCoverage}%
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="mt-6 rounded-xl border border-(--color-signal)/25 px-5 py-5 max-w-[720px] mx-auto">
            <div className="text-[10.5px] text-(--color-signal) font-mono uppercase tracking-[0.08em] mb-2.5 text-center">
              Вопрос руководителю
            </div>
            <p className="text-[14px] text-(--color-ink-1) leading-relaxed text-center">
              Сколько своих запусков заняли на 2-3 месяца дольше только потому,
              что бригаду под них каждый раз собирали заново?
            </p>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onNext}
              className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all"
            >
              Найти внутренних экспертов
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
