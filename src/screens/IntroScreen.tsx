import { ArrowRight, Users, TrendingUp, Zap } from "lucide-react";
import type { ModeConfig } from "@/data/modes";
import { PLATFORM_TAGLINE } from "@/data/modes";

const highlights: Record<string, string[]> = {
  sber: [
    "Какие AI-компетенции есть внутри организации сегодня?",
    "Где критические дефициты, блокирующие AI-стратегию?",
    "Как внешняя экосистема закрывает пробелы: 67% → 89%?",
  ],
  vk: [
    "Как быстрее собирать команды под новые продукты?",
    "Где внутри компании эксперты по нужным технологиям?",
    "Как сократить Time-to-Market на 40% через гибридную сеть?",
  ],
  rosatom: [
    "Какие компетенции критичны для стратегических проектов страны?",
    "Где риски потери уникальной инженерной экспертизы?",
    "Как передать критические знания следующему поколению?",
  ],
  yandex: [
    "Как быстрее создавать сильные продуктовые команды?",
    "Какие роли доступны прямо сейчас — а где дефицит?",
    "Как гибридная сеть ускоряет запуск новых направлений?",
  ],
};

const agentLabels = [
  "Internal Talent", "External Talent",
  "Competency", "Gap Analysis",
  "Mentor", "Team Formation", "Executive AI",
];

export function IntroScreen({ mode, onStart }: { mode: ModeConfig; onStart: () => void }) {
  const questions = highlights[mode.id] ?? highlights.sber;

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 py-12 overflow-hidden">

      {/* Ambient orbs */}
      <div className="absolute inset-0 ambient-bg pointer-events-none" />
      <div className="absolute inset-0 grid-overlay opacity-[0.12] pointer-events-none" />
      <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] rounded-full blur-[140px] animate-glow pointer-events-none" style={{ background: "rgba(124,110,255,0.14)" }} />
      <div className="absolute bottom-1/4 right-1/6 w-[350px] h-[350px] rounded-full blur-[120px] animate-glow pointer-events-none" style={{ background: "rgba(79,168,255,0.10)", animationDelay: "2s" }} />
      <div className="absolute top-2/3 left-1/2 w-[250px] h-[250px] rounded-full blur-[100px] animate-glow pointer-events-none" style={{ background: "rgba(54,200,130,0.07)", animationDelay: "4s" }} />

      <div className="relative z-10 w-full max-w-[960px] flex flex-col items-center text-center gap-8">

        {/* ---- CIPR-2026 banner ---- */}
        <div className="glass rounded-xl px-5 py-3 flex flex-wrap items-center justify-center gap-4 text-[12px] font-mono text-(--color-ink-3)">
          <span className="text-(--color-signal) font-semibold">ЦИПР-2026</span>
          {[
            { icon: <Users className="h-3 w-3" />, val: "13 000+ участников" },
            { icon: <TrendingUp className="h-3 w-3" />, val: "350+ соглашений" },
            { icon: <Zap className="h-3 w-3" />, val: "185 технологических решений" },
          ].map((s) => (
            <span key={s.val} className="flex items-center gap-1.5 text-(--color-ink-2)">
              {s.icon} {s.val}
            </span>
          ))}
          <span className="text-(--color-ink-3)">· AI · Технологический суверенитет · Цифровизация промышленности</span>
        </div>

        {/* ---- The unanswered question ---- */}
        <div className="glass rounded-2xl px-8 py-5 border border-(--color-signal)/20">
          <p className="text-[13px] text-(--color-ink-3) font-mono uppercase tracking-[0.12em] mb-2">
            Нерешённый вопрос ЦИПР-2026
          </p>
          <p className="font-display text-[22px] sm:text-[28px] text-gradient-accent leading-snug">
            Кто будет реализовывать стратегию?
          </p>
        </div>

        {/* ---- Org badge + scenario ---- */}
        <div className="flex items-center gap-3">
          <div
            className="h-11 w-11 rounded-[10px] flex items-center justify-center text-[15px] font-bold shadow-lg shrink-0"
            style={{ background: `linear-gradient(135deg, ${mode.accentColor}, ${mode.accentColor}88)`, color: "#06091A", boxShadow: `0 0 24px ${mode.accentColor}44` }}
          >
            {mode.badgeLetter}
          </div>
          <div className="text-left">
            <div className="text-[13px] font-medium text-(--color-ink-1)">{mode.org}</div>
            <div className="text-[11px] text-(--color-ink-3) font-mono">{mode.scenarioName}</div>
          </div>
        </div>

        {/* ---- Main question ---- */}
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-(--color-ink-3) font-mono mb-3">
            {PLATFORM_TAGLINE}
          </div>
          <h1 className="font-display text-[38px] sm:text-[52px] text-gradient-accent leading-tight text-balance max-w-[800px] mx-auto">
            {mode.mainQuestion}
          </h1>
        </div>

        {/* ---- Three questions ---- */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
          {questions.map((q, i) => (
            <div key={i} className="glass rounded-xl px-5 py-4 text-left hover:border-(--color-signal)/30 transition-all duration-200">
              <div className="text-[11px] text-(--color-signal) font-mono mb-2 font-medium">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-[13px] text-(--color-ink-2) leading-relaxed">{q}</p>
            </div>
          ))}
        </div>

        {/* ---- CTA ---- */}
        <button
          onClick={onStart}
          className="group relative flex items-center gap-3 rounded-xl px-10 py-4 text-[15px] font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-100"
          style={{ background: `linear-gradient(135deg, ${mode.accentColor}, #7C6EFF)`, boxShadow: `0 8px 36px ${mode.accentColor}44, 0 0 0 1px ${mode.accentColor}22` }}
        >
          <span className="relative z-10">Начать демонстрацию</span>
          <ArrowRight className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>

        {/* ---- Agent chain ---- */}
        <div className="flex flex-wrap items-center justify-center gap-1">
          {agentLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-1">
              <div className="glass-subtle rounded-full px-3 py-1.5 text-[11px] font-mono text-(--color-ink-3) whitespace-nowrap">{label}</div>
              {i < agentLabels.length - 1 && <span className="text-(--color-signal)/30 text-[11px]">→</span>}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-(--color-ink-3) -mt-5">
          7 Agentic AI агентов · 2 источника талантов · 5 минут демонстрации
        </p>

      </div>
    </div>
  );
}
