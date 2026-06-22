import { ArrowLeft, ArrowRight, UserCheck } from "lucide-react";
import { Card } from "@/components/Card";
import { mentors, employee } from "@/data/mockData";
import { bi } from "@/lib/bi";

export function MentorScreen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Сотрудник
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Mentor Matching", "Подбор наставников")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            Поиск наставника
          </h1>
          <p className="text-[13px] text-(--color-ink-2) mt-3 max-w-[560px]">
            Подбор на основе пробелов, выявленных для{" "}
            <span className="text-(--color-ink-1)">{employee.name}</span>:{" "}
            {employee.criticalGaps.join(", ")}.
          </p>
        </div>
        <button
          onClick={onNext}
          className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
        >
          План развития
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mentors.map((m, i) => (
          <Card key={m.id} className="flex flex-col">
            <div className="p-5 flex items-start justify-between border-b border-(--color-border-soft)">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-(--color-surface-raised) border border-(--color-border) flex items-center justify-center text-(--color-ink-2) font-display text-[16px]">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-[14px] text-(--color-ink-1) font-medium leading-tight">
                    {m.name}
                  </div>
                  <div className="text-[12px] text-(--color-ink-3) leading-tight mt-0.5">
                    {m.role}
                  </div>
                </div>
              </div>
              {i === 0 && (
                <span className="rounded-full bg-(--color-signal-soft) text-(--color-signal) text-[10px] font-mono uppercase tracking-[0.08em] px-2 py-1">
                  Top match
                </span>
              )}
            </div>

            <div className="p-5 flex flex-col gap-4 flex-1">
              <div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-[28px] text-(--color-good)">
                    {m.matchPercent}
                  </span>
                  <span className="text-[14px] text-(--color-ink-3)">% совпадение</span>
                </div>
                <div className="h-1 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
                  <div
                    className="h-full rounded-full bg-(--color-good) transition-all duration-700"
                    style={{ width: `${m.matchPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-2">
                  Сильные стороны
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {m.strengths.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-(--color-border) bg-(--color-surface-raised) px-2.5 py-1 text-[12px] text-(--color-ink-2)"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[12.5px] text-(--color-ink-2) leading-relaxed mt-auto pt-3 border-t border-(--color-border-soft)">
                {m.reason}
              </p>

              <button className="w-full flex items-center justify-center gap-2 rounded-md border border-(--color-border) px-4 py-2.5 text-[12.5px] font-medium text-(--color-ink-1) hover:bg-(--color-surface-raised) transition-colors">
                <UserCheck className="h-3.5 w-3.5" />
                Назначить наставником
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
