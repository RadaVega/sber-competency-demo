import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/Card";
import { TwoQuestionsClose } from "@/components/TwoQuestionsClose";
import { nationalCapabilities, heatMapDomains } from "@/data/rosatomData";
import { bi } from "@/lib/bi";
import { useViewMode } from "@/lib/ViewModeContext";

const riskMeta: Record<string, { text: string; bg: string; label: string }> = {
  low: { text: "text-(--color-good)", bg: "bg-(--color-good)", label: "Низкий" },
  medium: { text: "text-(--color-warn)", bg: "bg-(--color-warn)", label: "Средний" },
  high: { text: "text-(--color-risk)", bg: "bg-(--color-risk)", label: "Высокий" },
};

// From the employee's side, the same gap reads as opportunity — the colour
// scale flips (a high-risk gap is a high-opportunity opening), the label
// changes, but the underlying number (level, maturity) stays identical.
const opportunityMeta: Record<string, { text: string; bg: string; label: string }> = {
  low: { text: "text-(--color-ink-3)", bg: "bg-(--color-ink-3)", label: "Невысокая" },
  medium: { text: "text-(--color-signal)", bg: "bg-(--color-signal)", label: "Хорошая" },
  high: { text: "text-(--color-good)", bg: "bg-(--color-good)", label: "Отличная" },
};

export function CapabilityMapScreen({ onBack, onNext }: { onBack?: () => void; onNext: () => void }) {
  const { isVP } = useViewMode();

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          {onBack && (
            <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
              <ArrowLeft className="h-3.5 w-3.5" /> Стратегическая реализация
            </button>
          )}
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {isVP
              ? bi("Critical Capability Heat Map", "Карта критической экспертизы")
              : bi("Where Opportunity Is Highest", "Карта возможностей роста")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight max-w-[700px]">
            {isVP
              ? "Какие компетенции необходимы для стратегических проектов страны?"
              : "Где меньше конкурентов и выше шанс стать заметным специалистом?"}
          </h1>
        </div>
        <button
          onClick={onNext}
          className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
        >
          Риск потери знаний
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* 1-2-3. Question, analogy, plain explanation — before any data */}
      <div className="mb-10 text-center">
        <p className="font-display text-[24px] md:text-[28px] text-(--color-ink-1) leading-snug max-w-[680px] mx-auto mb-6">
          Почему в одном и том же саду одни растения цветут,
          <br />
          а другие незаметно чахнут?
        </p>
        <p className="text-[14px] text-(--color-ink-2) leading-relaxed max-w-[560px] mx-auto mb-3">
          Садовник каждый день видит только то, на что смотрит. Если он год
          за годом ухаживает за одними и теми же грядками, соседние вянут —
          не потому что они менее важны, а потому что до них просто не
          доходят руки.
        </p>
        <p className="text-[13px] text-(--color-ink-3) leading-relaxed max-w-[560px] mx-auto">
          В инженерных компетенциях происходит то же самое: одни направления
          получают внимание годами, а другие тихо теряют экспертов — просто
          потому что на них никто не смотрел.
        </p>
      </div>

      {/* Heat map by domain */}
      <Card className="mb-8 p-6">
        <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-5">
          {isVP ? "Тепловая карта по направлениям" : "Карта возможностей по направлениям"}
        </div>
        <div className="flex flex-col gap-4">
          {heatMapDomains.map((d) => {
            const meta = isVP ? riskMeta[d.risk] : opportunityMeta[d.risk];
            // Employee view reads the bar inverted: fewer filled segments in the
            // VP "maturity" sense means more open room — so we mirror the fill.
            const filled = isVP ? d.level : 10 - d.level + 2;
            return (
              <div key={d.name} className="grid grid-cols-1 sm:grid-cols-[220px_1fr_260px] items-center gap-3">
                <div className="text-[13.5px] text-(--color-ink-1) font-medium">{d.name}</div>
                <div className="flex gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-4 flex-1 rounded-sm ${i < filled ? meta.bg : "bg-(--color-border-soft)"}`}
                      style={{ opacity: i < filled ? 0.4 + (i / 10) * 0.6 : 1 }}
                    />
                  ))}
                </div>
                <div className="text-[12px] text-(--color-ink-3)">
                  {isVP ? d.explanation : d.opportunity}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Detailed capability table */}
      <Card>
        <div className="px-6 pt-6 pb-2 text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em]">
          Детализация по проектам
        </div>
        <div className="divide-y divide-(--color-border-soft)">
          {nationalCapabilities.map((c) => {
            const meta = isVP ? riskMeta[c.risk] : opportunityMeta[c.risk];
            return (
              <div
                key={c.name}
                className="grid grid-cols-[1fr_140px_90px] items-center gap-6 px-6 py-5"
              >
                <div>
                  <div className="text-[14px] text-(--color-ink-1) font-medium mb-1">
                    {c.name}
                  </div>
                  <div className="text-[12px] text-(--color-ink-3) mb-1.5">{c.project}</div>
                  <div className="text-[12px] text-(--color-ink-2)">
                    {isVP ? c.gapSummary : c.opportunityNote}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-1.5">
                    Зрелость
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
                    <div
                      className={`h-full rounded-full ${meta.bg} transition-all duration-700`}
                      style={{ width: `${c.maturity}%` }}
                    />
                  </div>
                  <div className="text-[12px] text-(--color-ink-2) mt-1">{c.maturity}%</div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-1.5">
                    {isVP ? "Риск" : "Возможность"}
                  </div>
                  <span className={`text-[13px] font-medium ${meta.text}`}>{meta.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <TwoQuestionsClose
        vpQuestion="Какое направление в вашей организации сейчас получает внимание только потому, что оно громче остальных — а не потому что оно важнее?"
        employeeQuestion="Есть ли у вас компетенция, о критичности которой руководитель пока даже не подозревает?"
      />
    </div>
  );
}
