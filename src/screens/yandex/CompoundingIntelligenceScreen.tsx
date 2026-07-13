import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/Card";
import { bi } from "@/lib/bi";
import { aiCopilotSuggestions, compoundingStats, compoundingExamples } from "@/data/yandexData";

/**
 * Scene 6 (AI stays present during the project) + Scene 7 (knowledge
 * compounds into the graph, the next team starts faster) + the brief's
 * explicit Aha-moment line and closing thought — deliberately not phrased
 * as "next screen" / "continue".
 */
export function CompoundingIntelligenceScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
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
        <button onClick={onNext} className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0">
          Архитектура платформы
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Scene 6 — AI stays present throughout the project */}
      <Card className="mb-8 p-6">
        <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-5">
          Пока команда работает над проектом
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

      {/* Scene 7 — the loop closes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <div className="font-display text-[32px] text-(--color-ink-1) leading-none">{compoundingStats.projectsCompleted}</div>
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.06em] mt-2">Завершённых проектов</div>
        </Card>
        <Card className="p-5">
          <div className="font-display text-[32px] text-(--color-ink-1) leading-none">{compoundingStats.knowledgeArtifactsReused}</div>
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.06em] mt-2">Артефактов знаний переиспользовано</div>
        </Card>
        <Card className="p-5 border-(--color-good)/25">
          <div className="font-display text-[32px] text-(--color-good) leading-none">+{compoundingStats.avgSpeedupForNextTeam}%</div>
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.06em] mt-2">Скорость старта следующей команды</div>
        </Card>
        <Card className="p-5">
          <div className="font-display text-[32px] text-(--color-ink-1) leading-none">{compoundingStats.activeKnowledgeGraphNodes.toLocaleString("ru-RU")}</div>
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.06em] mt-2">Узлов в графе знаний</div>
        </Card>
      </div>

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

      {/* The Aha moment, verbatim per the brief */}
      <Card className="p-8 text-center border-(--color-signal)/25">
        <p className="text-[19px] text-(--color-ink-1) font-medium leading-relaxed max-w-[720px] mx-auto">
          Самая ценная технология Яндекса — не отдельный AI.
          <br />
          <span className="text-gradient-accent">Самая ценная технология — организация, которая после каждого проекта становится умнее.</span>
        </p>
        <p className="text-[13.5px] text-(--color-ink-3) mt-5 max-w-[600px] mx-auto leading-relaxed">
          Каждый новый проект увеличивает интеллектуальный капитал организации.
          Capability Intelligence Platform превращает этот процесс в непрерывный цикл.
        </p>
      </Card>
    </div>
  );
}
