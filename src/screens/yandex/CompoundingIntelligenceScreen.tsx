import { useEffect, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Card } from "@/components/Card";
import { bi } from "@/lib/bi";
import { aiCopilotSuggestions, compoundingStats, compoundingExamples } from "@/data/yandexData";

/**
 * Scene 6 (AI present throughout) + Scene 7 (the loop closes) + the exact
 * closing thought from the brief. Deliberately reordered per the brief's
 * instruction: feel first, then understand. The consequence — the next
 * team starts instantly — leads; the statistics that explain why follow
 * after. No "Continue" button at the end; a soft suggestion fades in a
 * few seconds after the final thought settles.
 */
export function CompoundingIntelligenceScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSuggestion(true), 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 border-b border-(--color-border) pb-8">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
          <ArrowLeft className="h-3.5 w-3.5" /> Рождение команды
        </button>
        <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
          {bi("Compounding Intelligence", "Накопление интеллекта")}
        </div>
        <h1 className="font-display text-[32px] text-(--color-ink-1) leading-tight max-w-[760px]">
          Проект заканчивается. Знания — нет.
        </h1>
      </div>

      {/* Feel first: the consequence, before any explanation */}
      <Card className="mb-8 p-8 text-center border-(--color-good)/25">
        <p className="text-[22px] md:text-[26px] text-(--color-ink-1) font-medium leading-snug max-w-[760px] mx-auto">
          Следующая команда открывает граф —
          <br />
          <span className="text-gradient-accent">и стартует так, будто этот проект уже кто-то сделал за них.</span>
        </p>
      </Card>

      {/* Then understand: how, via the AI copilot timeline */}
      <Card className="mb-8 p-6">
        <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-5">
          Как это происходило, пока команда работала
        </div>
        <div className="flex flex-col gap-4">
          {aiCopilotSuggestions.map((s) => (
            <div key={s.moment} className="flex gap-4 items-start">
              <span className="text-[11px] text-(--color-signal) font-mono uppercase tracking-[0.06em] w-20 shrink-0 pt-0.5">{s.moment}</span>
              <p className="text-[13.5px] text-(--color-ink-2) leading-relaxed">{s.suggestion}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Intellectual capital — framed as network quality, not a raw KPI count */}
      <Card className="mb-8 p-6">
        <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-5">
          Интеллектуальный капитал организации
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <div className="font-display text-[26px] text-(--color-good) leading-none">+{compoundingStats.avgSpeedupForNextTeam}%</div>
            <div className="text-[12px] text-(--color-ink-3) mt-2 leading-relaxed">Короче путь между идеей и экспертом, который уже это решал</div>
          </div>
          <div>
            <div className="font-display text-[26px] text-(--color-ink-1) leading-none">{compoundingStats.knowledgeArtifactsReused.toLocaleString("ru-RU")}</div>
            <div className="text-[12px] text-(--color-ink-3) mt-2 leading-relaxed">Раз знания были найдены и переиспользованы, а не исследованы заново</div>
          </div>
          <div>
            <div className="font-display text-[26px] text-(--color-ink-1) leading-none">{compoundingStats.activeKnowledgeGraphNodes.toLocaleString("ru-RU")}</div>
            <div className="text-[12px] text-(--color-ink-3) mt-2 leading-relaxed">Живых вершин графа — не число для отчёта, а плотность связей</div>
          </div>
        </div>
      </Card>

      <Card className="mb-8 p-6">
        <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-4">
          Как это уже работает
        </div>
        <div className="flex flex-col gap-3">
          {compoundingExamples.map((ex, i) => (
            <div key={i} className="flex gap-3 items-start">
              <Sparkles className="h-4 w-4 text-(--color-signal) shrink-0 mt-0.5" />
              <p className="text-[13px] text-(--color-ink-2) leading-relaxed">{ex}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* The final thought — large, slow, no button */}
      <div className="py-10 text-center">
        <p className="text-[20px] md:text-[26px] text-(--color-ink-1) font-medium leading-relaxed max-w-[760px] mx-auto animate-screen-in">
          Главное конкурентное преимущество организации — не технологии. Не модели. Не алгоритмы.
          <br />
          <span className="text-gradient-accent">
            Главное преимущество — скорость, с которой организация превращает знания в новые знания.
          </span>
        </p>
        <p className="text-[15px] text-(--color-ink-3) mt-6 max-w-[560px] mx-auto leading-relaxed animate-screen-in" style={{ animationDelay: "0.4s" }}>
          Capability Intelligence Platform делает этот процесс непрерывным.
        </p>

        {showSuggestion && (
          <button
            onClick={onNext}
            className="mt-10 text-[13px] font-mono text-(--color-ink-3) hover:text-(--color-signal) transition-colors animate-screen-in underline decoration-(--color-border) underline-offset-4"
          >
            Исследовать организацию дальше
          </button>
        )}
      </div>
    </div>
  );
}
