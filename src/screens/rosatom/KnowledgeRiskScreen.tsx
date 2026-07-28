import { ArrowLeft, ArrowRight, Users } from "lucide-react";
import { Card } from "@/components/Card";
import { bi } from "@/lib/bi";
import { knowledgeRiskAreas, knowledgeRiskAIRecommendations, knowledgeRiskEmployeeRecommendations } from "@/data/rosatomData";
import { useViewMode } from "@/lib/ViewModeContext";

function lossTone(p: number) {
  if (p >= 70) return { text: "text-(--color-risk)", bg: "bg-(--color-risk)" };
  if (p >= 40) return { text: "text-(--color-warn)", bg: "bg-(--color-warn)" };
  return { text: "text-(--color-good)", bg: "bg-(--color-good)" };
}

// Employee view flips the palette: high loss-probability is a bright
// opportunity (few carriers left = easy to become one), not a warning.
function opportunityTone(p: number) {
  if (p >= 70) return { text: "text-(--color-good)", bg: "bg-(--color-good)" };
  if (p >= 40) return { text: "text-(--color-signal)", bg: "bg-(--color-signal)" };
  return { text: "text-(--color-ink-3)", bg: "bg-(--color-ink-3)" };
}

export function KnowledgeRiskScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { isVP } = useViewMode();
  const recommendations = isVP ? knowledgeRiskAIRecommendations : knowledgeRiskEmployeeRecommendations;

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
            <ArrowLeft className="h-3.5 w-3.5" /> Карта компетенций
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {isVP
              ? bi("Critical Knowledge Risk", "Риск потери критической экспертизы")
              : bi("Rare Expertise Opening Up", "Редкая экспертиза, которая освобождается")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            {isVP
              ? "Где мы можем потерять экспертизу, которую невозможно быстро восстановить?"
              : "Где я могу стать одним из немногих носителей редкой экспертизы?"}
          </h1>
        </div>
        <button onClick={onNext} className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0">
          Граф знаний
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <Card className="mb-8">
        <div className="divide-y divide-(--color-border-soft)">
          {knowledgeRiskAreas.map((r) => {
            const tone = isVP ? lossTone(r.lossProbability) : opportunityTone(r.lossProbability);
            return (
              <div key={r.competency} className="grid grid-cols-1 md:grid-cols-[1fr_120px_100px_110px_140px] items-center gap-4 px-6 py-5">
                <div className="text-[14px] text-(--color-ink-1) font-medium">{r.competency}</div>
                <div className="flex items-center gap-1.5 text-[13px] text-(--color-ink-2)">
                  <Users className="h-3.5 w-3.5 text-(--color-ink-3)" />
                  {r.uniqueExperts} чел.
                </div>
                <div className="text-[13px] text-(--color-ink-2)">{r.avgAge} лет</div>
                <div className="text-[13px] text-(--color-ink-2) capitalize">{r.replaceability}</div>
                <div>
                  <div className="h-1.5 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
                    <div className={`h-full rounded-full ${tone.bg} transition-all duration-700`} style={{ width: `${r.lossProbability}%` }} />
                  </div>
                  <div className={`text-[12px] mt-1 font-medium ${tone.text}`}>
                    {isVP ? `${r.lossProbability}% риск потери за 5 лет` : `${r.lossProbability}% шанс стать ключевым носителем за 5 лет`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="border-(--color-signal)/25">
        <div className="px-6 pt-6 pb-4 text-[11px] text-(--color-signal) font-mono uppercase tracking-[0.08em]">
          {isVP ? "AI-рекомендации" : "AI-советы лично для вас"}
        </div>
        <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendations.map((rec, i) => (
            <div key={i} className="rounded-xl border border-(--color-border) p-4">
              <div className={`text-[11px] font-mono uppercase tracking-[0.06em] mb-2 ${isVP ? "text-(--color-warn)" : "text-(--color-good)"}`}>{rec.action}</div>
              <p className="text-[13px] text-(--color-ink-2) leading-relaxed">{rec.detail}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
