import { ArrowLeft, ArrowRight, TrendingUp, Target, Users, Zap } from "lucide-react";
import { orgUnit } from "@/data/mockData";
import { bi } from "@/lib/bi";

export function ExecutiveScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const delta = orgUnit.targetReadiness - orgUnit.readiness;
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">

      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
            <ArrowLeft className="h-3.5 w-3.5" /> Оркестрация
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Executive Recommendation", "Рекомендации руководству")}
          </div>
          <h1 className="font-display text-[32px] leading-tight">
            <span className="text-gradient-accent">Рекомендация</span>
            <span className="text-(--color-ink-1)"> руководителю</span>
          </h1>
        </div>
        <button onClick={onNext} className="group flex items-center gap-2 rounded-xl px-5 py-3 text-[13px] font-semibold text-white hover:scale-105 transition-all shrink-0"
          style={{ background: "linear-gradient(135deg, #21A038, #7C6EFF)", boxShadow: "0 4px 20px rgba(33,160,56,0.3)" }}>
          Готовность подразделений
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Strategic ask */}
      <div className="glass rounded-xl p-6 mb-6 border border-(--color-signal)/15">
        <p className="text-[14px] text-(--color-ink-1) leading-relaxed">
          Для достижения цели внедрения Agentic AI в течение{" "}
          <span className="text-gradient font-semibold">{orgUnit.timelineMonths} месяцев</span> необходимо:
        </p>
      </div>

      {/* Resource needs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { icon: <Zap className="h-5 w-5" />, n: 12, label: "AI Champions" },
          { icon: <Target className="h-5 w-5" />, n: 4, label: "Product Leads" },
          { icon: <Users className="h-5 w-5" />, n: 2, label: "AI Architects" },
          { icon: <TrendingUp className="h-5 w-5" />, n: 3, label: "Change Managers" },
        ].map((item) => (
          <div key={item.label} className="glass rounded-xl p-5 text-center">
            <div className="flex justify-center mb-3 text-(--color-signal) opacity-70">{item.icon}</div>
            <div className="font-display text-[40px] text-gradient-accent leading-none mb-1">{item.n}</div>
            <div className="text-[12px] text-(--color-ink-3)">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Risk + Solution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div className="glass rounded-xl p-5 border border-(--color-risk)/20">
          <div className="text-[11px] text-(--color-risk) font-mono uppercase tracking-[0.1em] mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-(--color-risk)" /> Основной риск
          </div>
          <p className="text-[14px] text-(--color-ink-1) leading-relaxed">
            Недостаток экспертизы в <span className="font-semibold">Agentic AI</span> — блокирует реализацию стратегической инициативы.
          </p>
        </div>
        <div className="glass rounded-xl p-5 border border-(--color-good)/20">
          <div className="text-[11px] text-(--color-good) font-mono uppercase tracking-[0.1em] mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-(--color-good)" /> Рекомендуемое решение
          </div>
          <p className="text-[14px] text-(--color-ink-1) leading-relaxed">
            Программа ускоренного развития компетенций на <span className="font-semibold">90 дней</span> + подключение внешней экосистемы Точки Сборки.
          </p>
        </div>
      </div>

      {/* Outcome projection */}
      <div className="glass rounded-xl p-6 border border-(--color-signal)/20 glow-signal">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="h-4 w-4 text-(--color-good)" />
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em]">
            Ожидаемый результат
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5 mb-4">
          <span className="font-display text-[56px] text-(--color-ink-3) leading-none">{orgUnit.readiness}%</span>
          <ArrowRight className="h-6 w-6 text-(--color-ink-3)" />
          <span className="font-display text-[56px] text-gradient leading-none">{orgUnit.targetReadiness}%</span>
          <div className="text-[13px] text-(--color-ink-2]">
            <div className="font-medium text-(--color-ink-1) mb-1">готовность к AI-трансформации</div>
            <div className="text-(--color-good) font-semibold">+{delta}% за {orgUnit.timelineMonths} месяцев</div>
          </div>
        </div>
        <div className="h-2 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-(--color-grad-from) to-(--color-grad-to) transition-all duration-1000"
            style={{ width: `${orgUnit.targetReadiness}%` }} />
        </div>
      </div>

    </div>
  );
}
