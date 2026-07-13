import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import { Card } from "@/components/Card";
import { bi } from "@/lib/bi";
import { useViewMode } from "@/lib/ViewModeContext";
import { opportunityAreas } from "@/data/yandexData";

/**
 * Scene 3+4 from the brief: missing competencies shown as a map of
 * openings, not an HR shortage report — plus the duplication signal
 * (research happening twice, unknowingly) that only an org-wide graph
 * can surface.
 */
export function OpportunityMapScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { isVP } = useViewMode();

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
            <ArrowLeft className="h-3.5 w-3.5" /> Граф знаний
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {isVP
              ? bi("Innovation Opportunity Map", "Карта возможностей для инноваций")
              : bi("Where To Grow Next", "Куда расти дальше")}
          </div>
          <h1 className="font-display text-[32px] text-(--color-ink-1) leading-tight max-w-[700px]">
            {isVP
              ? "Не дефицит специалистов — карта того, где рождаются новые продукты"
              : "Кто уже решает похожую задачу — и чему у них можно научиться"}
          </h1>
        </div>
        <button onClick={onNext} className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0">
          Рождение команды
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {opportunityAreas.map((area) => (
          <Card key={area.domain} className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="text-[16px] text-(--color-ink-1) font-medium">{area.domain}</div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="h-1.5 w-32 rounded-full bg-(--color-border-soft) overflow-hidden">
                  <div className="h-full rounded-full bg-(--color-signal) transition-all duration-700" style={{ width: `${area.maturity}%` }} />
                </div>
                <span className="text-[12px] text-(--color-ink-3) font-mono">{area.maturity}%</span>
              </div>
            </div>
            <p className="text-[13.5px] text-(--color-ink-2) leading-relaxed mb-3">
              {isVP ? area.vpFraming : area.engineerFraming}
            </p>
            {isVP && (
              <div className="flex items-start gap-2.5 pt-3 border-t border-(--color-border-soft)">
                <Layers className="h-3.5 w-3.5 text-(--color-warn) shrink-0 mt-0.5" />
                <p className="text-[12.5px] text-(--color-ink-3) leading-relaxed">{area.duplication}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
