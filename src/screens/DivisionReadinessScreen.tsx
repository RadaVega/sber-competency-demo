import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/Card";
import { divisions } from "@/data/mockData";
import { bi } from "@/lib/bi";

function toneFor(value: number): string {
  if (value >= 65) return "text-(--color-good)";
  if (value >= 50) return "text-(--color-warn)";
  return "text-(--color-risk)";
}

function barTone(value: number): string {
  if (value >= 65) return "bg-(--color-good)";
  if (value >= 50) return "bg-(--color-warn)";
  return "bg-(--color-risk)";
}

const trendIcon = {
  up: <TrendingUp className="h-3.5 w-3.5 text-(--color-good)" />,
  down: <TrendingDown className="h-3.5 w-3.5 text-(--color-risk)" />,
  flat: <Minus className="h-3.5 w-3.5 text-(--color-ink-3)" />,
};

export function DivisionReadinessScreen({ onBack }: { onBack: () => void }) {
  const avg = Math.round(
    divisions.reduce((s, d) => s + d.readiness, 0) / divisions.length
  );

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 border-b border-(--color-border) pb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Рекомендация руководителю
        </button>
        <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
          {bi("Division Readiness Comparison", "Сравнение готовности подразделений")}
        </div>
        <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight max-w-[700px]">
          Готовность подразделений к AI-трансформации
        </h1>
        <p className="text-[14px] text-(--color-ink-2) mt-4 max-w-[640px] leading-relaxed">
          Есть ли у нас люди, которые способны реализовать нашу стратегию —
          в каждом подразделении?
        </p>
      </div>

      <div className="mb-6 flex items-baseline gap-3">
        <span className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em]">
          Средняя готовность по группе
        </span>
        <span className={`font-display text-[24px] ${toneFor(avg)}`}>{avg}%</span>
      </div>

      <Card>
        <div className="divide-y divide-(--color-border-soft)">
          {divisions.map((d) => (
            <div
              key={d.name}
              className="grid grid-cols-[1fr_auto_140px_auto] items-center gap-6 px-6 py-5"
            >
              <div>
                <div className="text-[14px] text-(--color-ink-1) font-medium mb-1">
                  {d.name}
                </div>
                <div className="text-[12px] text-(--color-ink-3)">
                  {d.headcount.toLocaleString("ru-RU")} сотрудников · {d.strategicGoal}
                </div>
              </div>

              <div className="text-[12px] text-(--color-ink-2) whitespace-nowrap">
                Риск: <span className="text-(--color-ink-1)">{d.topRisk}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-1.5 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barTone(d.readiness)} transition-all duration-700`}
                    style={{ width: `${d.readiness}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end">
                {trendIcon[d.trend]}
                <span className={`font-display text-[20px] ${toneFor(d.readiness)} w-[52px] text-right`}>
                  {d.readiness}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-6">
        <div className="p-6">
          <p className="text-[13px] text-(--color-ink-2) leading-relaxed max-w-[760px]">
            <span className="text-(--color-ink-1)">Риски и комплаенс</span> — единственное
            подразделение с отрицательной динамикой готовности. Без целевой
            программы это создаёт риск для всей стратегии AI-трансформации
            группы, поскольку именно это подразделение отвечает за AI
            Governance на уровне группы.
          </p>
        </div>
      </Card>
    </div>
  );
}
