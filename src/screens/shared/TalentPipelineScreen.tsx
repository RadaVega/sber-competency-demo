import { ArrowLeft, ArrowRight, ArrowDown } from "lucide-react";
import { Card } from "@/components/Card";
import { bi } from "@/lib/bi";
import type { ModeConfig } from "@/data/modes";

const stages = [
  {
    en: "Student",
    ru: "Студент",
    desc: "Академические знания, учебные проекты, стажировки",
    count: 1240,
    color: "text-(--color-ink-2)",
    border: "border-(--color-border)",
    bg: "bg-(--color-surface)",
  },
  {
    en: "Specialist",
    ru: "Специалист",
    desc: "Профессиональный опыт, работа в командах, первые продукты",
    count: 870,
    color: "text-(--color-warn)",
    border: "border-(--color-warn)/40",
    bg: "bg-(--color-warn-soft)",
  },
  {
    en: "Expert",
    ru: "Эксперт",
    desc: "Глубокая предметная экспертиза, лидерство в домене",
    count: 215,
    color: "text-(--color-signal)",
    border: "border-(--color-signal)/40",
    bg: "bg-(--color-signal-soft)",
  },
  {
    en: "Mentor",
    ru: "Наставник",
    desc: "Передача знаний, развитие следующего поколения",
    count: 94,
    color: "text-(--color-good)",
    border: "border-(--color-good)/40",
    bg: "bg-(--color-good-soft)",
  },
  {
    en: "Team Lead",
    ru: "Лидер команды",
    desc: "Сборка и управление кросс-функциональными командами",
    count: 38,
    color: "text-(--color-ink-1)",
    border: "border-(--color-border)",
    bg: "bg-(--color-surface-raised)",
  },
  {
    en: "Strategic Initiative",
    ru: "Стратегическая инициатива",
    desc: "Реализация целей организации через объединение всех уровней",
    count: null,
    color: "text-(--color-signal)",
    border: "border-(--color-signal)/60",
    bg: "bg-(--color-signal-soft)",
  },
];

export function TalentPipelineScreen({
  mode,
  onBack,
  onNext,
  nextLabel = "Далее",
}: {
  mode: ModeConfig;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
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
            {bi("External Talent Discovery", "Поиск внешних талантов")}
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Talent Pipeline", "Конвейер развития талантов")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight max-w-[680px]">
            Найм закрывает вакансию. Конвейер закрывает разрыв на годы вперёд
          </h1>
          <p className="text-[13px] text-(--color-ink-2) mt-3 max-w-[560px] leading-relaxed">
            {mode.org} каждый раз ищет специалиста с нуля — вместо того чтобы вырастить
            его из тех, кто уже в экосистеме. Это карта, по которой видно, кто станет
            экспертом через год, а не только кто свободен сегодня.
          </p>
        </div>
        <button
          onClick={onNext}
          className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
        >
          {nextLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Pipeline vertical diagram */}
      <div className="mx-auto max-w-[640px]">
        {stages.map((stage, i) => (
          <div key={stage.en}>
            <div className={`rounded-xl border ${stage.border} ${stage.bg} px-6 py-5 flex items-center justify-between gap-4`}>
              <div>
                <div className={`text-[15px] font-semibold ${stage.color} mb-1`}>
                  {bi(stage.en, stage.ru)}
                </div>
                <div className="text-[12.5px] text-(--color-ink-2) leading-relaxed">
                  {stage.desc}
                </div>
              </div>
              {stage.count !== null && (
                <div className="text-right shrink-0">
                  <div className={`font-display text-[28px] ${stage.color} leading-none`}>
                    {stage.count.toLocaleString("ru-RU")}
                  </div>
                  <div className="text-[10px] text-(--color-ink-3) font-mono mt-0.5">
                    в экосистеме
                  </div>
                </div>
              )}
              {stage.count === null && (
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: mode.accentColor }}
                >
                  <ArrowRight className="h-5 w-5 text-(--color-canvas)" />
                </div>
              )}
            </div>
            {i < stages.length - 1 && (
              <div className="flex justify-center my-2">
                <ArrowDown className="h-5 w-5 text-(--color-ink-3)" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom message */}
      <Card className="mt-8">
        <div className="p-6 text-center">
          <p className="text-[14px] text-(--color-ink-1) font-medium leading-relaxed max-w-[640px] mx-auto">
            Это не отчёт о найме. Это программа развития — кого готовить наставником
            уже сейчас, чтобы через год не искать его на рынке.
          </p>
        </div>
      </Card>
    </div>
  );
}
