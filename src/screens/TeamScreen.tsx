import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Card } from "@/components/Card";
import { teamRoles as mockRoles } from "@/data/mockData";
import type { TeamRole } from "@/data/types";
import { bi } from "@/lib/bi";

export function TeamScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [goal, setGoal] = useState("Внедрение Agentic AI в контактный центр");
  const [status, setStatus] = useState<"idle"|"loading"|"done">("idle");
  const [roles, setRoles] = useState<TeamRole[]>([]);

  async function handle() {
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1000));
    setRoles(mockRoles);
    setStatus("done");
  }

  function barColor(v: number) {
    return v >= 70 ? "from-(--color-good) to-emerald-300" : v >= 50 ? "from-(--color-warn) to-orange-300" : "from-(--color-risk) to-rose-300";
  }
  function textColor(v: number) {
    return v >= 70 ? "text-(--color-good)" : v >= 50 ? "text-(--color-warn)" : "text-(--color-risk)";
  }

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-12">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-(--color-border) pb-10">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-pres-sm text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-4 font-mono">
            <ArrowLeft className="h-4 w-4" /> План развития
          </button>
          <div className="text-pres-label text-(--color-signal) mb-4">{bi("Team Formation", "Формирование команды")}</div>
          <h1 className="font-display text-pres-hero leading-tight">Формирование команды</h1>
        </div>
        {status === "done" && (
          <button onClick={onNext} className="group flex items-center gap-3 rounded-2xl px-7 py-4 text-pres-lg font-semibold text-white hover:scale-105 transition-all shrink-0"
            style={{ background: "linear-gradient(135deg, #21A038, #8B7FFF)", boxShadow: "0 6px 24px rgba(33,160,56,0.3)" }}>
            Экосистема талантов <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>

      {/* Goal input */}
      <Card className="mb-8">
        <div className="p-6">
          <div className="text-pres-label text-(--color-ink-3) mb-4">Стратегическая задача</div>
          <div className="flex gap-4">
            <input value={goal} onChange={e => setGoal(e.target.value)}
              className="flex-1 rounded-xl border border-(--color-border) bg-(--color-surface-raised) px-5 py-4 text-pres-base text-(--color-ink-1) placeholder:text-(--color-ink-3) outline-none focus:border-(--color-signal) transition-colors" />
            <button onClick={handle} disabled={status === "loading"}
              className="flex items-center gap-3 rounded-xl px-6 py-4 text-pres-base font-semibold text-white hover:scale-105 transition-all disabled:opacity-50 shrink-0"
              style={{ background: "linear-gradient(135deg, #8B7FFF, #56AEFF)", boxShadow: "0 4px 20px rgba(139,127,255,0.35)" }}>
              {status === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
              Сформировать команду
            </button>
          </div>
        </div>
      </Card>

      {status === "done" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {roles.map((r) => (
            <Card key={r.role}>
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-pres-xl font-semibold text-(--color-ink-1)">{r.role}</h3>
                  <span className={`font-display text-pres-metric-sm ${textColor(r.coverage)}`}>{r.coverage}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${barColor(r.coverage)}`} style={{ width: `${r.coverage}%` }} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {r.requiredCompetencies.map(c => (
                    <span key={c} className="rounded-full border border-(--color-border) bg-(--color-surface-raised) px-3 py-1.5 text-pres-sm text-(--color-ink-2)">{c}</span>
                  ))}
                </div>
                {r.risks.length > 0 && (
                  <div className="pt-3 border-t border-(--color-border-soft)">
                    <div className="text-pres-label text-(--color-risk) mb-2">Риски</div>
                    {r.risks.map(risk => (
                      <div key={risk} className="text-pres-sm text-(--color-ink-2) flex gap-2 leading-relaxed">
                        <span className="text-(--color-risk)">—</span>{risk}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {status === "idle" && (
        <div className="glass rounded-2xl flex items-center justify-center min-h-[200px]">
          <p className="text-pres-lg text-(--color-ink-3) max-w-[380px] text-center">
            AI-агент подберёт роли, проверит покрытие компетенций и выявит риски.
          </p>
        </div>
      )}
    </div>
  );
}
