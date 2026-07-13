import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/Card";
import { MetricStat } from "@/components/MetricStat";
import { bi } from "@/lib/bi";
import { sovereigntyMetrics, criticalDependencies } from "@/data/rosatomData";

const statusMeta: Record<string, { text: string }> = {
  "завершено": { text: "text-(--color-good)" },
  "в процессе": { text: "text-(--color-warn)" },
  "требует внимания": { text: "text-(--color-risk)" },
};

export function SovereigntyScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
            <ArrowLeft className="h-3.5 w-3.5" /> Прогноз 2035
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Digital Sovereignty Dashboard", "Технологический суверенитет")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            Платформа поддерживает долгосрочные задачи технологической независимости
          </h1>
        </div>
        <button onClick={onNext} className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0">
          Далее
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5"><MetricStat label="Отечественные технологии" value={sovereigntyMetrics.domesticTechShare} tone="good" /></Card>
        <Card className="p-5"><MetricStat label="Импортозамещение" value={sovereigntyMetrics.importSubstitutionLevel} tone="warn" /></Card>
        <Card className="p-5"><MetricStat label="Цифровая зрелость" value={sovereigntyMetrics.digitalMaturity} tone="neutral" /></Card>
        <Card className="p-5"><MetricStat label="Готовность платформ" value={sovereigntyMetrics.platformReadiness} tone="good" /></Card>
      </div>

      <Card>
        <div className="px-6 pt-6 pb-2 text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em]">
          Критические зависимости
        </div>
        <div className="divide-y divide-(--color-border-soft)">
          {criticalDependencies.map((d) => (
            <div key={d.system} className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 px-6 py-5">
              <div className="text-[14px] text-(--color-ink-1) font-medium">{d.system}</div>
              <div className="text-[13px] text-(--color-ink-2)">{d.dependencyType}</div>
              <div className={`text-[13px] font-medium text-right sm:text-left ${statusMeta[d.substitutionStatus].text}`}>
                {d.substitutionStatus}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="glass rounded-xl mt-6 p-8 text-center border border-(--color-signal)/25">
        <p className="text-[19px] text-(--color-ink-1) font-medium leading-relaxed max-w-[760px] mx-auto">
          Раньше критическая инженерная экспертиза уходила из организации вместе с человеком —
          тихо, необратимо, и обычно раньше, чем кто-то успевал заметить риск.
          <br />
          <span className="text-gradient-accent">
            Теперь организация видит, кто уйдёт и кто должен стать следующим носителем знания —
            за годы до того, как это станет кризисом.
          </span>
        </p>
        <p className="text-[13.5px] text-(--color-ink-3) leading-relaxed max-w-[680px] mx-auto mt-5">
          Атомная отрасль всегда держалась не на людях, а на школах — школе Курчатова, где мышление
          продолжало жить в учениках задолго до того, как ушёл основатель. Это то же самое —
          только теперь передача знания не зависит от того, кто рядом успел научиться.
        </p>
      </div>
    </div>
  );
}
