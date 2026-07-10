import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { Card } from "@/components/Card";
import { RiskBadge } from "@/components/RiskBadge";
import { bi } from "@/lib/bi";
import { missionPrograms } from "@/data/rosatomData";

export function TeamBuilderScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [selected, setSelected] = useState(0);
  const program = missionPrograms[selected];

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
            <ArrowLeft className="h-3.5 w-3.5" /> Сеть экспертов
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Mission Team Builder", "Формирование проектной команды")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            Выберите программу — AI соберёт команду
          </h1>
        </div>
        <button onClick={onNext} className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0">
          Центр AI-управления
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {missionPrograms.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setSelected(i)}
            className={`rounded-full border px-4 py-2 text-[13px] transition-all ${
              i === selected
                ? "bg-(--color-signal) text-(--color-canvas) border-(--color-signal)"
                : "border-(--color-border) text-(--color-ink-2) hover:text-(--color-ink-1)"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5">
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-3">
            Необходимые специалисты
          </div>
          <div className="flex flex-col gap-2">
            {program.requiredSpecialists.map((s) => (
              <div key={s} className="text-[13px] text-(--color-ink-1)">{s}</div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-3">
            Внутренние эксперты и наставники
          </div>
          <div className="flex flex-col gap-2">
            {program.internalExperts.map((e) => (
              <div key={e} className="flex items-center gap-2 text-[13px] text-(--color-ink-1)">
                <Check className="h-3.5 w-3.5 text-(--color-good)" /> {e}
                {program.mentors.includes(e) && (
                  <span className="text-[10.5px] text-(--color-warn) font-mono uppercase">наставник</span>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-3">
            Недостающие компетенции
          </div>
          {program.missingCompetencies.length === 0 ? (
            <div className="text-[13px] text-(--color-good)">Дефицита нет — команда полностью укомплектована.</div>
          ) : (
            <div className="flex flex-col gap-2 mb-4">
              {program.missingCompetencies.map((m) => (
                <div key={m} className="flex items-center gap-2 text-[13px] text-(--color-ink-1)">
                  <X className="h-3.5 w-3.5 text-(--color-risk)" /> {m}
                </div>
              ))}
            </div>
          )}
          <div className="pt-4 border-t border-(--color-border-soft)">
            <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-2">
              Прогноз риска проекта
            </div>
            <RiskBadge risk={{ name: program.name, severity: program.riskForecast }} />
          </div>
        </Card>
      </div>
    </div>
  );
}
