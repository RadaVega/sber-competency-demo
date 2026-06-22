import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Card } from "@/components/Card";
import { vkSimulator } from "@/data/vkData";
import { bi } from "@/lib/bi";

export function VKSimulatorScreen({
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
            Внутренние эксперты
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Team Readiness Simulator", "Симулятор готовности команды")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            Симулятор готовности команды
          </h1>
        </div>
        <button
          onClick={onNext}
          className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
        >
          Рекомендация руководству
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="p-6">
            <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-4">
              Готовность команды
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="font-display text-[40px] text-(--color-warn) leading-none">
                  {vkSimulator.currentReadiness}%
                </div>
                <div className="text-[11px] text-(--color-ink-3) mt-1">сейчас</div>
              </div>
              <ArrowRight className="h-5 w-5 text-(--color-ink-3)" />
              <div className="text-center">
                <div className="font-display text-[40px] text-(--color-good) leading-none">
                  {vkSimulator.afterProgramReadiness}%
                </div>
                <div className="text-[11px] text-(--color-ink-3) mt-1">после программы</div>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-(--color-border-soft) overflow-hidden mt-5">
              <div
                className="h-full rounded-full bg-(--color-good) transition-all duration-700"
                style={{ width: `${vkSimulator.afterProgramReadiness}%` }}
              />
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-3.5 w-3.5 text-(--color-ink-3)" />
              <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em]">
                Срок запуска продукта
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="font-display text-[40px] text-(--color-ink-2) leading-none">
                  {vkSimulator.currentTimelineMonths}
                </div>
                <div className="text-[11px] text-(--color-ink-3) mt-1">месяцев</div>
              </div>
              <ArrowRight className="h-5 w-5 text-(--color-ink-3)" />
              <div className="text-center">
                <div className="font-display text-[40px] text-(--color-good) leading-none">
                  {vkSimulator.acceleratedTimelineMonths}
                </div>
                <div className="text-[11px] text-(--color-ink-3) mt-1">месяцев</div>
              </div>
            </div>
            <p className="text-[12.5px] text-(--color-ink-2) mt-5 leading-relaxed">
              Сокращение срока запуска на{" "}
              <span className="text-(--color-good)">
                {Math.round(
                  (1 -
                    vkSimulator.acceleratedTimelineMonths /
                      vkSimulator.currentTimelineMonths) *
                    100
                )}
                %
              </span>{" "}
              за счёт устранения дефицитов компетенций и подбора готовых
              внутренних экспертов.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
