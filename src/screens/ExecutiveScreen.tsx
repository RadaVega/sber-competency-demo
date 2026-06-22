import { ArrowLeft, ArrowRight, TrendingUp } from "lucide-react";
import { Card } from "@/components/Card";
import { orgUnit } from "@/data/mockData";
import { bi } from "@/lib/bi";

export function ExecutiveScreen({
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
            Оркестрация
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Executive Recommendation", "Рекомендации руководству")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            Рекомендация руководителю
          </h1>
        </div>
        <button
          onClick={onNext}
          className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
        >
          Готовность подразделения
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <Card className="mb-6">
        <div className="p-6">
          <p className="text-[14px] text-(--color-ink-1) leading-relaxed max-w-[760px]">
            Для достижения цели внедрения Agentic AI в течение{" "}
            <span className="text-(--color-signal)">{orgUnit.timelineMonths} месяцев</span>{" "}
            необходимо:
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-lg border border-(--color-border) bg-(--color-border) mb-6">
        {[
          { n: 12, label: "AI Champions" },
          { n: 4, label: "Product Leads" },
          { n: 2, label: "AI Architects" },
          { n: 3, label: "Change Managers" },
        ].map((item) => (
          <div key={item.label} className="bg-(--color-surface) p-6">
            <div className="font-display text-[36px] text-(--color-ink-1) leading-none mb-2">
              {item.n}
            </div>
            <div className="text-[12.5px] text-(--color-ink-2)">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="p-6">
            <div className="text-[11px] text-(--color-risk) font-mono uppercase tracking-[0.1em] mb-3">
              Основной риск
            </div>
            <p className="text-[14px] text-(--color-ink-1) leading-relaxed">
              Недостаток экспертизы в Agentic AI.
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="text-[11px] text-(--color-good) font-mono uppercase tracking-[0.1em] mb-3">
              Рекомендуемое решение
            </div>
            <p className="text-[14px] text-(--color-ink-1) leading-relaxed">
              Запуск программы ускоренного развития компетенций длительностью
              90 дней.
            </p>
          </div>
        </Card>
      </div>

      <Card glow>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-(--color-good)" />
            <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em]">
              Ожидаемый результат
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-display text-[48px] text-(--color-ink-2)">
              {orgUnit.readiness}%
            </span>
            <ArrowRight className="h-6 w-6 text-(--color-ink-3)" />
            <span className="font-display text-[48px] text-(--color-good)">
              {orgUnit.targetReadiness}%
            </span>
            <span className="text-[13px] text-(--color-ink-2) ml-2">
              готовность организации к AI-трансформации
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
