import { ArrowRight, AlertTriangle, Sparkles } from "lucide-react";
import { Card } from "@/components/Card";
import { bi } from "@/lib/bi";
import { strategicPrograms, dashboardSummary, dashboardAIRecommendations } from "@/data/rosatomData";

const riskMeta: Record<string, { text: string; bg: string; label: string }> = {
  low: { text: "text-(--color-good)", bg: "bg-(--color-good)", label: "Низкий" },
  medium: { text: "text-(--color-warn)", bg: "bg-(--color-warn)", label: "Средний" },
  high: { text: "text-(--color-risk)", bg: "bg-(--color-risk)", label: "Высокий" },
};

export function RosatomDashboardScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Strategic Execution Dashboard", "Стратегическая реализация")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight max-w-[760px]">
            Как быстрее реализовать стратегическую программу, если критически важных специалистов недостаточно?
          </h1>
        </div>
        <button
          onClick={onNext}
          className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
        >
          Карта компетенций
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Программы в реализации", value: dashboardSummary.programsInProgress, suffix: "" },
          { label: "Программы под риском", value: dashboardSummary.atRiskPrograms, suffix: "" },
          { label: "Средний прогресс", value: dashboardSummary.avgProgress, suffix: "%" },
          { label: "Дефицит специалистов", value: dashboardSummary.totalStaffingGap, suffix: "" },
          { label: "Компетенции под риском", value: dashboardSummary.criticalCompetenciesAtRisk, suffix: "" },
        ].map((m) => (
          <Card key={m.label} className="p-5">
            <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-2">
              {m.label}
            </div>
            <div className="font-display text-[36px] text-(--color-ink-1) leading-none">
              {m.value}
              <span className="text-[18px] text-(--color-ink-3) font-sans ml-1">{m.suffix}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Programs table */}
      <Card className="mb-8">
        <div className="px-6 pt-6 pb-2 text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em]">
          Стратегические программы
        </div>
        <div className="divide-y divide-(--color-border-soft)">
          {strategicPrograms.map((p) => {
            const risk = riskMeta[p.risk];
            return (
              <div key={p.name} className="grid grid-cols-1 md:grid-cols-[1fr_160px_100px_100px] items-center gap-4 px-6 py-5">
                <div>
                  <div className="text-[14px] text-(--color-ink-1) font-medium mb-1">{p.name}</div>
                  <div className="text-[12px] text-(--color-ink-3) mb-1.5">{p.direction}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.criticalCompetencies.map((c) => (
                      <span key={c} className="rounded-full bg-(--color-surface-raised) border border-(--color-border) px-2 py-0.5 text-[10.5px] text-(--color-ink-2)">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-1.5">Прогресс</div>
                  <div className="h-1.5 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
                    <div className={`h-full rounded-full ${risk.bg} transition-all duration-700`} style={{ width: `${p.progress}%` }} />
                  </div>
                  <div className="text-[12px] text-(--color-ink-2) mt-1">{p.progress}%</div>
                </div>
                <div className="text-right md:text-left">
                  <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-1.5">Риск</div>
                  <span className={`text-[13px] font-medium ${risk.text}`}>{risk.label}</span>
                </div>
                <div className="text-right md:text-left">
                  <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-1.5">Дефицит</div>
                  <span className="text-[13px] font-medium text-(--color-ink-1)">{p.staffingGap} чел.</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* AI recommendations */}
      <Card className="border-(--color-signal)/25">
        <div className="px-6 pt-6 pb-4 flex items-center gap-2 text-[11px] text-(--color-signal) font-mono uppercase tracking-[0.08em]">
          <Sparkles className="h-3.5 w-3.5" />
          AI-рекомендации
        </div>
        <div className="px-6 pb-6 flex flex-col gap-3">
          {dashboardAIRecommendations.map((rec, i) => (
            <div key={i} className="flex gap-3 items-start">
              <AlertTriangle className="h-4 w-4 text-(--color-warn) shrink-0 mt-0.5" />
              <p className="text-[13px] text-(--color-ink-2) leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
