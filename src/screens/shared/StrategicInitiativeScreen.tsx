import { useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles, Loader2, ChevronRight } from "lucide-react";
import { bi } from "@/lib/bi";
import { useViewMode } from "@/lib/ViewModeContext";
import type { ModeConfig } from "@/data/modes";

/* ---- Per-mode strategic initiatives ---- */
const initiativesByMode: Record<string, { title: string; subtitle: string; icon: string }[]> = {
  sber: [
    { icon: "🤖", title: "AI-трансформация организации",          subtitle: "Agentic AI в контактных центрах и продуктах" },
    { icon: "⚡", title: "Повышение производительности",           subtitle: "Автоматизация операционных процессов" },
    { icon: "📱", title: "Развитие цифровых платформ",             subtitle: "Экосистема клиентских сервисов" },
    { icon: "🌐", title: "Развитие экосистемных сервисов",         subtitle: "Новые направления бизнеса" },
    { icon: "🛠", title: "Развитие инженерных компетенций",        subtitle: "Технологический суверенитет" },
  ],
  vk: [
    { icon: "🚀", title: "Развитие экосистемы MAX",                subtitle: "AI-сервисы нового поколения" },
    { icon: "👥", title: "Развитие профессиональных сообществ",    subtitle: "Knowledge живёт в сообществах" },
    { icon: "🎓", title: "Образовательные инициативы",             subtitle: "VK Education Platform" },
    { icon: "🤖", title: "AI-продукты и сервисы",                  subtitle: "Новые AI-направления" },
    { icon: "💻", title: "Developer Ecosystem",                     subtitle: "Инфраструктура для разработчиков" },
  ],
  rosatom: [
    { icon: "🔬", title: "Передача критических знаний",            subtitle: "Экспертиза не должна уходить" },
    { icon: "⚙️",  title: "Развитие инженерных компетенций",       subtitle: "Стратегические технологические программы" },
    { icon: "🛳", title: "Северный морской путь",                  subtitle: "Навигация и логистика будущего" },
    { icon: "⚛️",  title: "Новые энергетические системы",          subtitle: "Малые модульные реакторы и SMR" },
    { icon: "🤖", title: "Роботизация промышленности",             subtitle: "AI-интеграция в производство" },
  ],
  yandex: [
    { icon: "🔍", title: "Генеративный поиск нового поколения",    subtitle: "LLM-интеграция в Яндекс Поиск" },
    { icon: "☁️",  title: "Yandex Cloud AI Platform",              subtitle: "Инфраструктура для AI-разработчиков" },
    { icon: "🚗", title: "Автономные технологии",                  subtitle: "Беспилотники и робототехника" },
    { icon: "🎯", title: "AI-ассистенты и Copilot",               subtitle: "Продуктивность через AI" },
    { icon: "📊", title: "Рекомендательные системы",               subtitle: "Персонализация нового уровня" },
  ],
};

/* ---- What a strategic initiative cascades into ---- */
const cascadeSteps = [
  { label: "Необходимые возможности",  en: "Required Capabilities",  icon: "🧩", color: "text-(--color-ink-1)" },
  { label: "Дефицит компетенций",      en: "Capability Gaps",        icon: "⚠️", color: "text-(--color-risk)" },
  { label: "Где находятся эксперты",   en: "Expert Discovery",       icon: "🔍", color: "text-(--color-signal)" },
  { label: "Кто может стать наставником", en: "Mentor Network",      icon: "🎓", color: "text-(--color-good)" },
  { label: "Проектная команда",        en: "Team Formation",          icon: "👥", color: "text-(--color-warn)" },
  { label: "AI-ускорение",             en: "AI Orchestration",        icon: "⚡", color: "text-gradient" },
  { label: "Результат",                en: "Outcome",                 icon: "🏆", color: "text-(--color-good)" },
];

/* ---- What this looks like for each audience ---- */
const vpView = [
  "Стратегические инициативы",
  "Организационные возможности",
  "Дефицит компетенций",
  "Эксперты и проектные команды",
  "KPI и прогресс реализации",
];
const employeeView = [
  "Путь профессионального развития",
  "Наставники, готовые помочь",
  "Проекты, в которых можно участвовать",
  "Рекомендации по обучению",
  "Профессиональное сообщество",
];

type AnalyzeStatus = "idle" | "analyzing" | "done";

export function StrategicInitiativeScreen({
  mode,
  onBack,
  onNext,
}: {
  mode: ModeConfig;
  onBack: () => void;
  onNext: () => void;
}) {
  const { isVP } = useViewMode();
  const initiatives = initiativesByMode[mode.id] ?? initiativesByMode.sber;
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<AnalyzeStatus>("idle");

  async function handleAnalyze(idx: number) {
    setSelected(idx);
    setStatus("analyzing");
    await new Promise(r => setTimeout(r, 1200));
    setStatus("done");
  }

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">

      {/* ---- Header ---- */}
      <div className="mb-10 border-b border-(--color-border) pb-8">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
          <ArrowLeft className="h-3.5 w-3.5" /> Концепция платформы
        </button>
        <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
          {bi("Strategic Initiative Navigator", "Навигатор стратегических инициатив")}
        </div>
        <h1 className="font-display text-[32px] leading-tight mb-2">
          <span className="text-gradient-accent">Как реализовать стратегию</span>
          <span className="text-(--color-ink-1)"> — быстрее?</span>
        </h1>
        <p className="text-[14px] text-(--color-ink-2) max-w-[560px] leading-relaxed">
          Выберите стратегическую инициативу {mode.org}. Система покажет какие возможности нужны, где дефицит, где эксперты и как собрать команду.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ---- Left: Initiative picker ---- */}
        <div className="lg:col-span-2">

          {/* VP / Employee view toggle */}
          <div className="mb-5 flex items-center gap-4">
            <div className="text-[12px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em]">
              Что видит:
            </div>
            <div className="flex flex-col gap-2">
              <div className={`text-[13px] font-medium ${isVP ? "text-(--color-ink-1)" : "text-(--color-ink-3)"}`}>
                {isVP ? "🏢 VP / Директор — стратегический уровень" : "👤 Сотрудник — путь развития"}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(isVP ? vpView : employeeView).map(v => (
                  <span key={v} className="glass-subtle rounded-full px-2.5 py-1 text-[11px] text-(--color-ink-2)">{v}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-3">
            {bi("Select Strategic Initiative", "Выберите стратегическую инициативу")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {initiatives.map((init, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => handleAnalyze(i)}
                  className={`text-left rounded-xl p-4 border transition-all duration-200 hover:scale-[1.01] ${
                    isSelected
                      ? "border-(--color-signal)/50 glow-signal bg-(--color-surface-raised)"
                      : "glass-subtle hover:border-(--color-signal)/25"
                  }`}
                >
                  <div className="text-[22px] mb-2">{init.icon}</div>
                  <div className="text-[13.5px] font-semibold text-(--color-ink-1) mb-1">{init.title}</div>
                  <div className="text-[12px] text-(--color-ink-3)">{init.subtitle}</div>
                </button>
              );
            })}
          </div>

          {/* Analyse result */}
          {status === "analyzing" && (
            <div className="glass rounded-xl p-5 flex items-center gap-3 text-(--color-ink-2)">
              <Loader2 className="h-5 w-5 animate-spin text-(--color-signal)" />
              <span className="text-[13px]">Agentic AI анализирует стратегическую инициативу…</span>
            </div>
          )}

          {status === "done" && selected !== null && (
            <div className="glass rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-(--color-border-soft)">
                <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-1">
                  Анализ инициативы
                </div>
                <div className="text-[15px] font-semibold text-(--color-ink-1) flex items-center gap-2">
                  <span>{initiatives[selected].icon}</span>
                  {initiatives[selected].title}
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {isVP ? (
                  <>
                    <Metric label="Организационная готовность" value="54%" tone="warn" />
                    <Metric label="Покрытие компетенций" value="67%" tone="warn" />
                    <Metric label="Доступность экспертов" value="41%" tone="risk" />
                    <Metric label="Скорость формирования команды" value="58%" tone="warn" />
                  </>
                ) : (
                  <>
                    <Metric label="Открытых проектов" value="12" tone="good" suffix="" />
                    <Metric label="Доступных наставников" value="8" tone="good" suffix="" />
                    <Metric label="Ваше соответствие" value="74%" tone="warn" />
                    <Metric label="Потенциал роста" value="89%" tone="good" />
                  </>
                )}
              </div>
              <div className="px-4 pb-4">
                <button
                  onClick={onNext}
                  className="w-full group flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-semibold text-white transition-all hover:scale-[1.01]"
                  style={{ background: `linear-gradient(135deg, ${mode.accentColor}, #7C6EFF)`, boxShadow: `0 4px 20px ${mode.accentColor}33` }}
                >
                  <Sparkles className="h-4 w-4" />
                  Показать полный анализ
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ---- Right: Cascade ---- */}
        <div>
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-3">
            {bi("Model Flow", "Логика стратегической модели")}
          </div>
          <div className="glass rounded-xl p-4 flex flex-col gap-1">
            {cascadeSteps.map((step, i) => (
              <div key={step.en}>
                <div className={`rounded-lg px-3 py-2.5 flex items-center gap-3 transition-all duration-300 ${
                  status === "done" && selected !== null ? "bg-(--color-surface-raised)" : ""
                }`}>
                  <span className="text-[16px] shrink-0">{step.icon}</span>
                  <div>
                    <div className="text-[12.5px] font-medium text-(--color-ink-1)">{step.label}</div>
                    <div className="text-[10.5px] text-(--color-ink-3) font-mono">{step.en}</div>
                  </div>
                </div>
                {i < cascadeSteps.length - 1 && (
                  <div className="flex justify-center my-0.5">
                    <ChevronRight className="h-3.5 w-3.5 text-(--color-signal)/40 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-[11.5px] text-(--color-ink-3) mt-4 leading-relaxed">
            Весь сценарий — 3–5 минут. Начинается со стратегической задачи, заканчивается готовой командой и AI-рекомендацией.
          </p>
        </div>

      </div>
    </div>
  );
}

function Metric({ label, value, tone, suffix = "%" }: { label: string; value: string; tone: string; suffix?: string }) {
  const color = tone === "good" ? "text-(--color-good)" : tone === "warn" ? "text-(--color-warn)" : "text-(--color-risk)";
  return (
    <div className="bg-(--color-surface) rounded-lg px-3 py-2.5">
      <div className="text-[10.5px] text-(--color-ink-3) font-mono mb-1">{label}</div>
      <div className={`font-display text-[22px] ${color} leading-none`}>{value}{suffix && <span className="text-[14px] text-(--color-ink-3) ml-0.5">{suffix}</span>}</div>
    </div>
  );
}
