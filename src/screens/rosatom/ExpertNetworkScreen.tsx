import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/Card";
import { rosatomExperts } from "@/data/rosatomData";
import { bi } from "@/lib/bi";

export function ExpertNetworkScreen({ onBack, onNext }: { onBack: () => void; onNext?: () => void }) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Карта компетенций
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Expert Network", "Сеть экспертов")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            Сеть экспертов
          </h1>
        </div>
        {onNext && (
          <button
            onClick={onNext}
            className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
          >
            {bi("Mission Team Builder", "Формирование команды")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rosatomExperts.map((e) => (
          <Card key={e.name}>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-11 w-11 rounded-full bg-(--color-surface-raised) border border-(--color-border) flex items-center justify-center text-(--color-ink-2) font-display text-[16px]">
                  {e.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-[13.5px] text-(--color-ink-1) font-medium leading-tight">
                    {e.name}
                  </div>
                  <span
                    className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[10.5px] font-mono uppercase tracking-[0.06em] ${
                      e.role === "mentor"
                        ? "bg-(--color-good-soft) text-(--color-good)"
                        : "bg-(--color-signal-soft) text-(--color-signal)"
                    }`}
                  >
                    {e.role === "mentor" ? "Наставник" : "Эксперт"}
                  </span>
                </div>
              </div>
              <div className="text-[12px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-1">
                Экспертиза
              </div>
              <div className="text-[13px] text-(--color-ink-1) mb-3">{e.expertise}</div>
              <div className="text-[12px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-1">
                Проект
              </div>
              <div className="text-[13px] text-(--color-ink-2)">{e.project}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
