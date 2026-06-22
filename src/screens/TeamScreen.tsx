import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Card } from "@/components/Card";
import { teamRoles as mockTeamRoles } from "@/data/mockData";
import type { TeamRole } from "@/data/types";
import { bi } from "@/lib/bi";

type Status = "idle" | "loading" | "done";

function toneFor(value: number): { text: string; bar: string } {
  if (value >= 70) return { text: "text-(--color-good)", bar: "bg-(--color-good)" };
  if (value >= 50) return { text: "text-(--color-warn)", bar: "bg-(--color-warn)" };
  return { text: "text-(--color-risk)", bar: "bg-(--color-risk)" };
}

export function TeamScreen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [goal, setGoal] = useState(
    "Внедрение Agentic AI в контактный центр"
  );
  const [status, setStatus] = useState<Status>("idle");
  const [roles, setRoles] = useState<TeamRole[]>([]);

  async function handleBuild() {
    setStatus("loading");
    // Chunk 6 will route this through the agent chain / live API.
    // For now: deterministic mock so the demo is reliable on stage.
    await new Promise((r) => setTimeout(r, 1000));
    setRoles(mockTeamRoles);
    setStatus("done");
  }

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            План развития
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Team Formation", "Формирование команды")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            Формирование команды
          </h1>
        </div>
        {status === "done" && (
          <button
            onClick={onNext}
            className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
          >
            Agentic AI Orchestration
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* ---- Goal input ---- */}
      <Card className="mb-8">
        <div className="p-5">
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-3">
            Стратегическая задача
          </div>
          <div className="flex gap-3">
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Опишите стратегическую задачу..."
              className="flex-1 rounded-md border border-(--color-border) bg-(--color-surface-raised) px-4 py-3 text-[14px] text-(--color-ink-1) placeholder:text-(--color-ink-3) outline-none focus:border-(--color-signal) transition-colors"
            />
            <button
              onClick={handleBuild}
              disabled={status === "loading" || goal.trim().length === 0}
              className="flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Сформировать команду
            </button>
          </div>
        </div>
      </Card>

      {status === "idle" && (
        <Card className="flex items-center justify-center min-h-[280px]">
          <p className="text-(--color-ink-3) text-[13px] max-w-[320px] text-center">
            AI-агент подберёт роли, проверит покрытие компетенций и выявит
            риски под указанную задачу.
          </p>
        </Card>
      )}

      {status === "done" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {roles.map((r) => {
            const tone = toneFor(r.coverage);
            return (
              <Card key={r.role}>
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-[15px] text-(--color-ink-1) font-medium">{r.role}</h3>
                    <span className={`font-display text-[22px] ${tone.text}`}>
                      {r.coverage}%
                    </span>
                  </div>

                  <div className="h-1 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
                    <div
                      className={`h-full rounded-full ${tone.bar} transition-all duration-700`}
                      style={{ width: `${r.coverage}%` }}
                    />
                  </div>

                  <div>
                    <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-2">
                      Необходимые компетенции
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {r.requiredCompetencies.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-(--color-border) bg-(--color-surface-raised) px-2.5 py-1 text-[12px] text-(--color-ink-2)"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {r.risks.length > 0 && (
                    <div className="pt-3 border-t border-(--color-border-soft)">
                      <div className="text-[11px] text-(--color-risk) font-mono uppercase tracking-[0.1em] mb-2">
                        Риски
                      </div>
                      <ul className="space-y-1">
                        {r.risks.map((risk) => (
                          <li
                            key={risk}
                            className="text-[12.5px] text-(--color-ink-2) leading-relaxed flex gap-2"
                          >
                            <span className="text-(--color-risk) shrink-0">—</span>
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
