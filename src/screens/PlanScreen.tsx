import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/Card";
import { developmentPlan, employee } from "@/data/mockData";
import { bi } from "@/lib/bi";

const periodMeta: Record<string, { tone: string; dot: string }> = {
  "30": { tone: "text-(--color-signal)", dot: "bg-(--color-signal)" },
  "60": { tone: "text-(--color-ink-1)", dot: "bg-(--color-ink-2)" },
  "90": { tone: "text-(--color-good)", dot: "bg-(--color-good)" },
};

export function PlanScreen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Наставник
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Learning Plan", "План развития")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            План развития
          </h1>
          <p className="text-[13px] text-(--color-ink-2) mt-3 max-w-[560px]">
            Дорожная карта для {employee.name}: {employee.role} →{" "}
            {employee.targetRole}.
          </p>
        </div>
        <button
          onClick={onNext}
          className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
        >
          Формирование команды
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* ---- Horizontal timeline ---- */}
      <div className="relative">
        {/* connecting line */}
        <div className="absolute top-[15px] left-[16px] right-[16px] h-px bg-(--color-border) hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {developmentPlan.map((milestone) => {
            const meta = periodMeta[milestone.period];
            return (
              <div key={milestone.period} className="relative">
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div
                    className={`h-8 w-8 rounded-full border-2 border-(--color-canvas) ring-1 ring-(--color-border) flex items-center justify-center bg-(--color-canvas)`}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
                  </div>
                  <div>
                    <div className={`font-display text-[20px] ${meta.tone} leading-none`}>
                      День {milestone.period}
                    </div>
                    <div className="text-[12px] text-(--color-ink-3) mt-0.5">
                      {milestone.label}
                    </div>
                  </div>
                </div>

                <Card className="ml-0">
                  <div className="p-5 flex flex-col gap-3">
                    {milestone.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-md border border-(--color-border-soft) bg-(--color-surface-raised) px-3 py-2.5"
                      >
                        <div className="h-5 w-5 rounded-full bg-(--color-border-soft) flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-(--color-ink-3)" />
                        </div>
                        <span className="text-[13px] text-(--color-ink-1)">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <Card className="mt-8">
        <div className="p-5 flex items-center gap-4">
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] shrink-0">
            Итог программы
          </div>
          <p className="text-[13px] text-(--color-ink-2) leading-relaxed">
            По завершении 90-дневной программы готовность{" "}
            <span className="text-(--color-ink-1)">{employee.name}</span> к
            роли <span className="text-(--color-ink-1)">{employee.targetRole}</span> вырастет
            с <span className="text-(--color-warn)">{employee.readinessTargetRole}%</span> до
            прогнозных <span className="text-(--color-good)">85%+</span>.
          </p>
        </div>
      </Card>
    </div>
  );
}
