import { ArrowRight, ArrowLeft, ArrowDown, Building2, User, Sparkles } from "lucide-react";
import { bi } from "@/lib/bi";
import { alignmentExamples } from "@/data/alignmentExamples";
import type { ModeConfig } from "@/data/modes";

// Paired rows: orgFlow[i] aligns conceptually with humanFlow[i] — this pairing
// is what the converging connector lines visually link together.
const orgFlow = [
  { ru: "Видение",                     en: "Vision" },
  { ru: "Стратегия",                   en: "Strategy" },
  { ru: "Стратегические инициативы",   en: "Strategic Initiatives" },
  { ru: "Необходимые компетенции",     en: "Required Capabilities" },
  { ru: "Дефицит компетенций",         en: "Capability Gaps" },
  { ru: "Эксперты и наставники",       en: "Experts & Mentors" },
  { ru: "Команды",                     en: "Teams" },
  { ru: "Реализация",                  en: "Execution" },
  { ru: "Результаты",                  en: "Outcomes" },
];

const humanFlow = [
  { ru: "Сильные стороны",   en: "Strengths" },
  { ru: "Интересы",          en: "Interests" },
  { ru: "Цели развития",     en: "Growth Goals" },
  { ru: "Компетенции",       en: "Capabilities" },
  { ru: "Наставники",        en: "Mentors" },
  { ru: "Проекты",           en: "Projects" },
  { ru: "Сообщество",        en: "Community" },
  { ru: "Мастерство",        en: "Mastery" },
  { ru: "Влияние",           en: "Impact" },
];

const ciprStats = [
  { n: "13 000+", label: "участников ЦИПР-2026" },
  { n: "350+",    label: "подписанных соглашений" },
  { n: "185",     label: "технологических решений" },
  { n: "?",       label: "кто реализует стратегию" },
];

const whyOrg = [
  "Реализация стратегии",
  "Видимость компетенций",
  "Быстрое формирование команд",
  "Передача знаний",
  "Развитие кадрового резерва",
  "Ускорение инноваций",
];

const whyHuman = [
  "Наставники и развитие",
  "Новые компетенции",
  "Значимые проекты",
  "Профессиональное сообщество",
  "Экспертный статус",
  "Реальное влияние",
];

export function StrategicEcosystemScreen({
  mode,
  onBack,
  onNext,
}: {
  mode: ModeConfig;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">

      {/* ---- Header ---- */}
      <div className="mb-8 border-b border-(--color-border) pb-8">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
          <ArrowLeft className="h-3.5 w-3.5" />
          Назад
        </button>
        <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
          {bi("Strategic Capability Ecosystem", "Экосистема стратегических возможностей")}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[32px] text-gradient-accent leading-tight max-w-[640px]">
              Стратегия реализуется через людей
            </h1>
            <p className="text-[14px] text-(--color-ink-2) mt-3 max-w-[560px] leading-relaxed">
              Платформа соединяет стратегию организации с потенциалом людей — делая эту связь видимой и управляемой.
            </p>
          </div>
          <button onClick={onNext} className="group flex items-center gap-2 rounded-xl px-5 py-3 text-[13px] font-semibold text-white hover:scale-105 transition-all shrink-0" style={{ background: `linear-gradient(135deg, ${mode.accentColor}, #7C6EFF)`, boxShadow: `0 4px 20px ${mode.accentColor}33` }}>
            Готовность организации
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* ---- Catchphrase — comes first, on its own, before the picture below ---- */}
      <div className="mb-10 rounded-2xl glass px-8 py-10 text-center animate-screen-in">
        <p className="font-display text-[26px] md:text-[32px] text-(--color-ink-1) leading-snug max-w-[820px] mx-auto">
          Организация и человек работают в одной компании.
          <br />
          Но смотрят на неё{" "}
          <span className="text-gradient-accent">совершенно по-разному</span>.
        </p>
        <p className="text-[13px] text-(--color-ink-3) font-mono mt-4 uppercase tracking-[0.1em]">
          {bi("Two points of view, one organization", "Два взгляда, одна организация")}
        </p>
      </div>

      {/* ---- CIPR-2026 context ---- */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ciprStats.map((s) => (
          <div key={s.n} className={`glass rounded-xl p-4 text-center ${s.n === "?" ? "border-(--color-signal)/40 glow-signal" : ""}`}>
            <div className={`font-display text-[28px] leading-none mb-1 ${s.n === "?" ? "text-gradient-accent" : "text-(--color-ink-1)"}`}>{s.n}</div>
            <div className="text-[11.5px] text-(--color-ink-3) leading-tight">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ---- Dual model — rows enter from opposite sides and converge on the centre ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Left — Organisation */}
        <div className="glass rounded-xl p-5">
          <div className="text-[11px] uppercase tracking-[0.12em] font-mono mb-4 font-semibold" style={{ color: mode.accentColor }}>
            Организация
          </div>
          <div className="flex flex-col gap-1.5">
            {orgFlow.map((item, i) => (
              <div key={item.ru}>
                <div
                  className="rounded-lg px-3 py-2 text-[12.5px] font-medium text-(--color-ink-1) bg-(--color-surface-raised) border border-(--color-border-soft) animate-row-in-left"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <span className="text-(--color-ink-1)">{item.ru}</span>
                  <span className="text-(--color-ink-3) ml-1.5">({item.en})</span>
                </div>
                {i < orgFlow.length - 1 && (
                  <div className="flex justify-center my-0.5">
                    <ArrowDown className="h-3 w-3 text-(--color-ink-3)" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Centre — Platform, arrival animates in after both sides have converged */}
        <div className="flex flex-col items-center justify-center gap-6 py-8 relative">
          {/* Connecting line — draws in after the row entrance finishes */}
          <div
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-(--color-signal)/40 to-transparent animate-converge-line"
          />
          <div className="relative z-10 text-center animate-converge-fade">
            <div className="w-24 h-24 rounded-full glass glow-signal flex flex-col items-center justify-center mx-auto mb-4" style={{ background: "rgba(124,110,255,0.18)" }}>
              <span className="text-[28px]">🧠</span>
            </div>
            <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-(--color-signal) mb-2">{bi("Agentic AI", "Агентный AI")}</div>
            <div className="font-display text-[18px] text-gradient-accent mb-3">{bi("Orchestrator", "Оркестратор")}</div>
            <p className="text-[12px] text-(--color-ink-3) max-w-[190px] leading-relaxed mx-auto">
              Соединяет стратегию организации с потенциалом людей
            </p>
          </div>
          <div className="text-center animate-converge-fade" style={{ animationDelay: "150ms" }}>
            <div className="text-[11px] text-(--color-ink-3) font-mono mb-2">Источники экспертизы</div>
            <div className="flex flex-col gap-1.5 text-[11.5px]">
              {["Внутренние эксперты", "Наставники", "Сообщества практиков", "Точка Сборки ✦"].map((s) => (
                <div key={s} className={`glass-subtle rounded-lg px-3 py-1.5 ${s.includes("✦") ? "border-(--color-signal)/30 text-(--color-signal)" : "text-(--color-ink-2)"}`}>{s}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Human */}
        <div className="glass rounded-xl p-5">
          <div className="text-[11px] uppercase tracking-[0.12em] font-mono mb-4 text-(--color-good) font-semibold">
            Человек
          </div>
          <div className="flex flex-col gap-1.5">
            {humanFlow.map((item, i) => (
              <div key={item.ru}>
                <div
                  className="rounded-lg px-3 py-2 text-[12.5px] font-medium bg-(--color-surface-raised) border border-(--color-border-soft) animate-row-in-right"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <span className="text-(--color-ink-1)">{item.ru}</span>
                  <span className="text-(--color-ink-3) ml-1.5">({item.en})</span>
                </div>
                {i < humanFlow.length - 1 && (
                  <div className="flex justify-center my-0.5">
                    <ArrowDown className="h-3 w-3 text-(--color-ink-3)" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Alignment in practice — makes the "AI aligns both sides" claim concrete ---- */}
      <div className="mb-8">
        <div className="text-[11px] uppercase tracking-[0.12em] font-mono mb-4 text-(--color-signal) font-semibold">
          {bi("Alignment in practice", "Как это работает на практике")}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {alignmentExamples[mode.id].map((ex, i) => (
            <div
              key={ex.orgNeed}
              className="glass rounded-xl p-5 flex flex-col gap-3 animate-converge-fade"
              style={{ animationDelay: `${1.35 + i * 0.12}s` }}
            >
              <div className="flex items-start gap-2.5">
                <Building2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: mode.accentColor }} />
                <p className="text-[12.5px] text-(--color-ink-2) leading-relaxed">{ex.orgNeed}</p>
              </div>
              <div className="flex items-start gap-2.5">
                <User className="h-4 w-4 text-(--color-good) shrink-0 mt-0.5" />
                <p className="text-[12.5px] text-(--color-ink-2) leading-relaxed">{ex.humanGoal}</p>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-(--color-border-soft)">
                <Sparkles className="h-3.5 w-3.5 text-(--color-signal) shrink-0" />
                <p className="text-[11.5px] text-(--color-signal) font-mono">{ex.aiAction}</p>
              </div>
              <p className="text-[12.5px] text-(--color-ink-1) font-medium leading-relaxed">{ex.outcome}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Why it matters ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="glass rounded-xl p-5">
          <div className="text-[11px] uppercase tracking-[0.12em] font-mono mb-3 font-semibold" style={{ color: mode.accentColor }}>
            Для организации
          </div>
          <ul className="space-y-2">
            {whyOrg.map((w) => (
              <li key={w} className="flex items-center gap-2.5 text-[13px] text-(--color-ink-2)">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: mode.accentColor }} />
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-xl p-5">
          <div className="text-[11px] uppercase tracking-[0.12em] font-mono mb-3 text-(--color-good) font-semibold">
            Для человека
          </div>
          <ul className="space-y-2">
            {whyHuman.map((w) => (
              <li key={w} className="flex items-center gap-2.5 text-[13px] text-(--color-ink-2)">
                <span className="h-1.5 w-1.5 rounded-full bg-(--color-good) shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
