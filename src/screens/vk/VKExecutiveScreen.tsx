import { ArrowLeft, TrendingUp } from "lucide-react";
import { Card } from "@/components/Card";
import { bi } from "@/lib/bi";

export function VKExecutiveScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 border-b border-(--color-border) pb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Симулятор готовности
        </button>
        <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
          {bi("Executive Recommendation", "Рекомендации руководству")}
        </div>
        <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
          Рекомендации руководству
        </h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-lg border border-(--color-border) bg-(--color-border) mb-6">
        {[
          { n: "8", label: "специалистов в команде" },
          { n: "2", label: "назначенных наставника" },
          { n: "3", label: "закрытых критических дефицита" },
          { n: "40%", label: "сокращение времени запуска" },
        ].map((item) => (
          <div key={item.label} className="bg-(--color-surface) p-6">
            <div className="font-display text-[32px] text-(--color-ink-1) leading-none mb-2">
              {item.n}
            </div>
            <div className="text-[12px] text-(--color-ink-2)">{item.label}</div>
          </div>
        ))}
      </div>

      <Card glow>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-(--color-good)" />
            <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em]">
              Рекомендация
            </div>
          </div>
          <p className="text-[14px] text-(--color-ink-1) leading-relaxed max-w-[720px]">
            Сформировать команду из 8 специалистов, назначить 2 наставников из
            числа выявленных внутренних экспертов и закрыть 3 критических
            дефицита компетенций. Это позволит сократить время запуска
            продукта на 40% относительно базового сценария.
          </p>
        </div>
      </Card>
    </div>
  );
}
