import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { divisions } from "@/data/mockData";
import { bi } from "@/lib/bi";

function bar(v: number) {
  if (v >= 65) return "from-(--color-good) to-emerald-400";
  if (v >= 50) return "from-(--color-warn) to-orange-400";
  return "from-(--color-risk) to-rose-400";
}
function text(v: number) {
  if (v >= 65) return "text-(--color-good)";
  if (v >= 50) return "text-(--color-warn)";
  return "text-(--color-risk)";
}

const trendIcon = {
  up:   <TrendingUp className="h-3.5 w-3.5 text-(--color-good)" />,
  down: <TrendingDown className="h-3.5 w-3.5 text-(--color-risk)" />,
  flat: <Minus className="h-3.5 w-3.5 text-(--color-ink-3)" />,
};

export function DivisionReadinessScreen({ onBack }: { onBack: () => void }) {
  const avg = Math.round(divisions.reduce((s, d) => s + d.readiness, 0) / divisions.length);

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">

      <div className="mb-10 border-b border-(--color-border) pb-8">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
          <ArrowLeft className="h-3.5 w-3.5" /> Рекомендация руководителю
        </button>
        <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
          {bi("Division Readiness Comparison", "Сравнение готовности подразделений")}
        </div>
        <h1 className="font-display text-[32px] leading-tight max-w-[640px]">
          <span className="text-gradient-accent">Есть ли у нас люди</span>
          <span className="text-(--color-ink-1)"> для реализации стратегии?</span>
        </h1>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-[12px] text-(--color-ink-3) font-mono">Средняя по группе:</span>
          <span className={`font-display text-[22px] ${text(avg)}`}>{avg}%</span>
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="divide-y divide-(--color-border-soft)">
          {divisions.map((d) => (
            <div key={d.name} className="grid grid-cols-[1fr_160px_90px] items-center gap-6 px-6 py-5 hover:bg-(--color-surface-raised)/50 transition-colors">
              <div>
                <div className="text-[14px] font-semibold text-(--color-ink-1) mb-1">{d.name}</div>
                <div className="text-[12px] text-(--color-ink-3)">
                  {d.headcount.toLocaleString("ru-RU")} сотр. · {d.strategicGoal}
                </div>
                <div className="text-[12px] text-(--color-ink-3) mt-0.5">
                  Риск: <span className="text-(--color-ink-2)">{d.topRisk}</span>
                </div>
              </div>
              <div>
                <div className="h-1.5 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${bar(d.readiness)} transition-all duration-700`}
                    style={{ width: `${d.readiness}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-2 justify-end">
                {trendIcon[d.trend]}
                <span className={`font-display text-[22px] ${text(d.readiness)}`}>{d.readiness}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl mt-5 p-5 border border-(--color-risk)/20">
        <p className="text-[13px] text-(--color-ink-2) leading-relaxed max-w-[760px]">
          <span className="text-(--color-ink-1) font-medium">Риски и комплаенс</span> — единственное
          подразделение с отрицательной динамикой. Без целевой программы это создаёт риск для всей
          AI-трансформации группы: именно оно отвечает за AI Governance на уровне группы.
        </p>
      </div>
    </div>
  );
}
