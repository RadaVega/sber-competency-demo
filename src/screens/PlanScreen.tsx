import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/Card";
import { developmentPlan, employee } from "@/data/mockData";
import { bi } from "@/lib/bi";

const periodMeta: Record<string, { color: string; bar: string }> = {
  "30": { color: "text-(--color-signal)", bar: "from-(--color-grad-from) to-(--color-grad-to)" },
  "60": { color: "text-(--color-ink-2)",  bar: "from-blue-500 to-cyan-400" },
  "90": { color: "text-(--color-good)",   bar: "from-(--color-good) to-emerald-300" },
};

export function PlanScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-12">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-(--color-border) pb-10">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-pres-sm text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-4 font-mono">
            <ArrowLeft className="h-4 w-4" /> Наставник
          </button>
          <div className="text-pres-label text-(--color-signal) mb-4">{bi("Learning Plan", "План развития")}</div>
          <h1 className="font-display text-pres-hero leading-tight">План развития</h1>
          <p className="text-pres-lg text-(--color-ink-2) mt-3">
            {employee.name} · {employee.role} → <span className="text-(--color-ink-1) font-semibold">{employee.targetRole}</span>
          </p>
        </div>
        <button onClick={onNext} className="group flex items-center gap-3 rounded-2xl px-7 py-4 text-pres-lg font-semibold text-white hover:scale-105 transition-all shrink-0"
          style={{ background: "linear-gradient(135deg, #21A038, #8B7FFF)", boxShadow: "0 6px 24px rgba(33,160,56,0.3)" }}>
          Формирование команды <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {developmentPlan.map((milestone) => {
          const meta = periodMeta[milestone.period];
          return (
            <div key={milestone.period} className="relative">
              <div className="mb-5">
                <div className={`font-display text-pres-metric-sm ${meta.color} leading-none`}>
                  {milestone.period}
                </div>
                <div className="text-pres-base text-(--color-ink-3) mt-1">{milestone.label}</div>
                <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${meta.bar} mt-3`} />
              </div>
              <Card>
                <div className="p-6 flex flex-col gap-3">
                  {milestone.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl border border-(--color-border-soft) bg-(--color-surface-raised) px-4 py-3">
                      <div className="h-6 w-6 rounded-full bg-(--color-border-soft) flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5 text-(--color-ink-3)" />
                      </div>
                      <span className="text-pres-base text-(--color-ink-1) font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      <Card>
        <div className="p-6 flex items-center gap-4">
          <div className="text-pres-label text-(--color-ink-3) shrink-0">Итог программы</div>
          <p className="text-pres-base text-(--color-ink-2) leading-relaxed">
            По завершении 90 дней готовность{" "}
            <span className="text-(--color-ink-1) font-semibold">{employee.name}</span> к роли{" "}
            <span className="text-(--color-ink-1) font-semibold">{employee.targetRole}</span> вырастет
            с <span className="text-(--color-warn) font-semibold">{employee.readinessTargetRole}%</span> до
            прогнозных <span className="text-(--color-good) font-semibold">85%+</span>.
          </p>
        </div>
      </Card>
    </div>
  );
}
