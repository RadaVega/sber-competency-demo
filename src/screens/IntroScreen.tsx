import { ArrowRight } from "lucide-react";
import type { ModeConfig } from "@/data/modes";

const highlights: Record<string, string[]> = {
  sber: [
    "Какие компетенции есть у организации сегодня?",
    "Где критические дефициты, блокирующие стратегию?",
    "Кто внутри компании способен возглавить AI-инициативы?",
  ],
  vk: [
    "Как быстрее собирать команды под новые продукты?",
    "Какие компетенции нужны — и есть ли они внутри?",
    "Как сократить срок запуска продукта на 40%?",
  ],
  rosatom: [
    "Какие компетенции критичны для стратегических проектов страны?",
    "Где риски на уровне национальных приоритетов?",
    "Кто в организации носитель уникальной экспертизы?",
  ],
  yandex: [
    "Как быстрее находить и собирать сильные продуктовые команды?",
    "Какие роли доступны прямо сейчас — а где дефицит?",
    "Как ускорить эксперименты и запуск новых направлений?",
  ],
};

const agentLabels = [
  "Competency Analyzer",
  "Gap Analysis",
  "Mentor Matching",
  "Learning Planner",
  "Team Formation",
  "Executive Recommendation",
];

export function IntroScreen({
  mode,
  onStart,
}: {
  mode: ModeConfig;
  onStart: () => void;
}) {
  const questions = highlights[mode.id] ?? highlights.sber;

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 py-16">
      {/* ---- Ambient grid ---- */}
      <div className="fixed inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-[860px] flex flex-col items-center text-center gap-10">

        {/* Org badge */}
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-[8px] flex items-center justify-center text-[14px] font-bold"
            style={{ background: mode.accentColor, color: "#0B0E14" }}
          >
            {mode.badgeLetter}
          </div>
          <span className="text-[14px] text-(--color-ink-2) font-medium">
            {mode.org} · Strategy Office
          </span>
        </div>

        {/* Platform name */}
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-(--color-signal) font-mono mb-5">
            {mode.platformName}
          </div>
          <h1 className="font-display text-[40px] sm:text-[52px] text-(--color-ink-1) leading-tight text-balance max-w-[720px] mx-auto">
            {mode.mainQuestion}
          </h1>
        </div>

        {/* The three sub-questions */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
          {questions.map((q, i) => (
            <div
              key={i}
              className="rounded-lg border border-(--color-border) bg-(--color-surface) px-5 py-4 text-left"
            >
              <div className="text-[11px] text-(--color-signal) font-mono mb-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-[13px] text-(--color-ink-2) leading-relaxed">{q}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="group flex items-center gap-3 rounded-md bg-(--color-signal) px-8 py-4 text-[14px] font-semibold text-(--color-canvas) hover:brightness-110 transition-all shadow-lg shadow-(--color-signal)/20"
        >
          Начать демонстрацию
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Agent chain preview */}
        <div className="flex items-center gap-0 flex-wrap justify-center">
          {agentLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-0">
              <div className="rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-[11px] font-mono text-(--color-ink-3) whitespace-nowrap">
                {label}
              </div>
              {i < agentLabels.length - 1 && (
                <span className="text-(--color-border) px-1 text-[11px]">→</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-[12px] text-(--color-ink-3) -mt-4">
          6 специализированных агентов · 1 рекомендация · 5 минут демонстрации
        </p>

      </div>
    </div>
  );
}
