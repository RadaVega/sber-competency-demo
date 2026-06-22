import { ArrowRight } from "lucide-react";
import { Card } from "@/components/Card";
import { nationalCapabilities } from "@/data/rosatomData";
import { bi } from "@/lib/bi";

const riskMeta: Record<string, { text: string; bg: string; label: string }> = {
  low: { text: "text-(--color-good)", bg: "bg-(--color-good)", label: "Низкий" },
  medium: { text: "text-(--color-warn)", bg: "bg-(--color-warn)", label: "Средний" },
  high: { text: "text-(--color-risk)", bg: "bg-(--color-risk)", label: "Высокий" },
};

export function CapabilityMapScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("National Capability Map", "Карта стратегических компетенций")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight max-w-[700px]">
            Какие компетенции необходимы для стратегических проектов страны?
          </h1>
        </div>
        <button
          onClick={onNext}
          className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
        >
          Сеть экспертов
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <Card>
        <div className="divide-y divide-(--color-border-soft)">
          {nationalCapabilities.map((c) => {
            const risk = riskMeta[c.risk];
            return (
              <div
                key={c.name}
                className="grid grid-cols-[1fr_140px_90px] items-center gap-6 px-6 py-5"
              >
                <div>
                  <div className="text-[14px] text-(--color-ink-1) font-medium mb-1">
                    {c.name}
                  </div>
                  <div className="text-[12px] text-(--color-ink-3) mb-1.5">{c.project}</div>
                  <div className="text-[12px] text-(--color-ink-2)">{c.gapSummary}</div>
                </div>

                <div>
                  <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-1.5">
                    Зрелость
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
                    <div
                      className={`h-full rounded-full ${risk.bg} transition-all duration-700`}
                      style={{ width: `${c.maturity}%` }}
                    />
                  </div>
                  <div className="text-[12px] text-(--color-ink-2) mt-1">{c.maturity}%</div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-1.5">
                    Риск
                  </div>
                  <span className={`text-[13px] font-medium ${risk.text}`}>{risk.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
