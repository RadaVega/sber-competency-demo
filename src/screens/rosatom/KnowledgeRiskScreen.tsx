import { ArrowLeft, ArrowRight, Users } from "lucide-react";
import { Card } from "@/components/Card";
import { bi } from "@/lib/bi";
import { knowledgeRiskAreas, knowledgeRiskAIRecommendations } from "@/data/rosatomData";

function lossTone(p: number) {
  if (p >= 70) return { text: "text-(--color-risk)", bg: "bg-(--color-risk)" };
  if (p >= 40) return { text: "text-(--color-warn)", bg: "bg-(--color-warn)" };
  return { text: "text-(--color-good)", bg: "bg-(--color-good)" };
}

export function KnowledgeRiskScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
            <ArrowLeft className="h-3.5 w-3.5" /> Карта компетенций
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Critical Knowledge Risk", "Риск потери критической экспертизы")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            Где мы можем потерять экспертизу, которую невозможно быстро восстановить?
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
            const tone = lossTone(r.lossProbability);
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
                  <div className={`text-[12px] mt-1 font-medium ${tone.text}`}>{r.lossProbability}% риск потери за 5 лет</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="border-(--color-signal)/25">
        <div className="px-6 pt-6 pb-4 text-[11px] text-(--color-signal) font-mono uppercase tracking-[0.08em]">
          AI-рекомендации
        </div>
        <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {knowledgeRiskAIRecommendations.map((rec, i) => (
            <div key={i} className="rounded-xl border border-(--color-border) p-4">
              <div className="text-[11px] text-(--color-warn) font-mono uppercase tracking-[0.06em] mb-2">{rec.action}</div>
              <p className="text-[13px] text-(--color-ink-2) leading-relaxed">{rec.detail}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
