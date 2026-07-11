import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Building2, User } from "lucide-react";
import type { ModeConfig } from "@/data/modes";

const companyLines = [
  "Нужно выполнить стратегию.",
  "Не хватает компетенций.",
  "Проекты задерживаются.",
  "Не можем найти экспертов.",
  "Растут риски.",
];

const employeeLines = [
  "Не понимаю, куда развиваться.",
  "Не вижу карьерной траектории.",
  "Обучение не связано с моей работой.",
  "Не знаю, кому я нужен.",
  "Работаю только ради зарплаты.",
];

const companyStream = ["Стратегия", "Программы", "Компетенции", "Команды", "AI"];
const employeeStream = ["Человек", "Интересы", "Развитие", "Наставники", "Опыт"];
const radiatingNodes = ["Проекты", "Команды", "Университеты", "Эксперты", "Наставники", "AI-агенты"];

const taglines = [
  "Когда стратегия организации и цели человека начинают работать вместе — реализация становится неизбежной.",
  "Capability Intelligence Platform — это место, где стратегия компании становится личной целью каждого сотрудника.",
];

// stage 0: conflict split-screen · 1: reveal line · 2: convergence animation · 3: platform reveal + tagline
export function RealityConvergenceScreen({
  mode,
  onBack,
  onNext,
}: {
  mode: ModeConfig;
  onBack: () => void;
  onNext: () => void;
}) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) { setStage(3); return; }
    const t1 = setTimeout(() => setStage(1), 2600);
    const t2 = setTimeout(() => setStage(2), 4400);
    const t3 = setTimeout(() => setStage(3), 6600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10 min-h-[80vh] flex flex-col">
      <div className="mb-8 flex items-center justify-between border-b border-(--color-border) pb-6">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors font-mono">
          <ArrowLeft className="h-3.5 w-3.5" /> Назад
        </button>
        <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono">
          Один разрыв, две реальности
        </div>
        <button onClick={onNext} className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-2.5 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all">
          {stage < 3 ? "Пропустить" : "Далее"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded-2xl glass-subtle min-h-[560px]">
        {/* Stage 0-1: split-screen conflict */}
        <div
          className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 transition-opacity duration-700"
          style={{ opacity: stage < 2 ? 1 : 0, pointerEvents: stage < 2 ? "auto" : "none" }}
        >
          <div className="p-10 border-b md:border-b-0 md:border-r border-(--color-border) flex flex-col">
            <div className="flex items-center gap-2 mb-6 text-(--color-ink-1)">
              <Building2 className="h-5 w-5 text-(--color-signal)" />
              <span className="font-display text-[22px]">Компания</span>
            </div>
            <div className="flex flex-col gap-3">
              {companyLines.map((line, i) => (
                <div
                  key={line}
                  className="text-[15px] text-(--color-ink-2) leading-relaxed transition-all duration-500"
                  style={{ transitionDelay: `${i * 180}ms`, opacity: 1 }}
                >
                  «{line}»
                </div>
              ))}
            </div>
          </div>
          <div className="p-10 flex flex-col">
            <div className="flex items-center gap-2 mb-6 text-(--color-ink-1)">
              <User className="h-5 w-5 text-(--color-good)" />
              <span className="font-display text-[22px]">Сотрудник</span>
            </div>
            <div className="flex flex-col gap-3">
              {employeeLines.map((line, i) => (
                <div
                  key={line}
                  className="text-[15px] text-(--color-ink-2) leading-relaxed transition-all duration-500"
                  style={{ transitionDelay: `${i * 180}ms`, opacity: 1 }}
                >
                  «{line}»
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stage 1: reveal line, overlaid centrally */}
        <div
          className="absolute inset-0 flex items-center justify-center px-10 transition-opacity duration-700"
          style={{ opacity: stage === 1 ? 1 : 0, pointerEvents: "none" }}
        >
          <div className="text-center max-w-[600px]">
            <p className="font-display text-[30px] md:text-[36px] text-(--color-ink-1) leading-snug">
              Они работают в одной компании.
              <br />
              Но живут в разных реальностях.
            </p>
          </div>
        </div>

        {/* Stage 2-3: convergence animation */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700"
          style={{ opacity: stage >= 2 ? 1 : 0, pointerEvents: stage >= 2 ? "auto" : "none" }}
        >
          <div className="relative w-full max-w-[880px] h-[280px] flex items-center justify-between px-6">
            {/* left stream */}
            <div className="flex flex-col gap-2 items-start">
              {companyStream.map((label, i) => (
                <div
                  key={label}
                  className="text-[13px] font-mono text-(--color-ink-2) transition-all duration-700"
                  style={{
                    transform: stage >= 2 ? "translateX(0)" : "translateX(-40px)",
                    opacity: stage >= 2 ? 1 : 0,
                    transitionDelay: `${i * 90}ms`,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* central glowing sphere */}
            <div className="relative flex flex-col items-center justify-center">
              <div
                className="h-24 w-24 rounded-full glow-signal transition-all duration-1000"
                style={{
                  background: "radial-gradient(circle, rgba(139,127,255,0.9) 0%, rgba(86,174,255,0.5) 60%, transparent 100%)",
                  transform: stage >= 3 ? "scale(1.15)" : "scale(1)",
                }}
              />
              <div
                className="absolute top-full mt-4 text-center w-[260px] transition-opacity duration-700"
                style={{ opacity: stage >= 3 ? 1 : 0 }}
              >
                <div className="font-display text-[16px] text-(--color-ink-1) leading-tight">
                  Capability Intelligence Platform
                </div>
                <div className="text-[11px] text-(--color-ink-3) font-mono mt-1">
                  Платформа управления стратегическими компетенциями
                </div>
              </div>
            </div>

            {/* right stream */}
            <div className="flex flex-col gap-2 items-end">
              {employeeStream.map((label, i) => (
                <div
                  key={label}
                  className="text-[13px] font-mono text-(--color-ink-2) transition-all duration-700"
                  style={{
                    transform: stage >= 2 ? "translateX(0)" : "translateX(40px)",
                    opacity: stage >= 2 ? 1 : 0,
                    transitionDelay: `${i * 90}ms`,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* radiating nodes, appear after platform reveal */}
          <div
            className="flex flex-wrap justify-center gap-2 mt-10 max-w-[640px] transition-all duration-700"
            style={{ opacity: stage >= 3 ? 1 : 0, transform: stage >= 3 ? "translateY(0)" : "translateY(10px)" }}
          >
            {radiatingNodes.map((n) => (
              <span key={n} className="rounded-full border border-(--color-border) bg-(--color-surface-raised) px-3 py-1.5 text-[12px] text-(--color-ink-2)">
                {n}
              </span>
            ))}
          </div>

          {/* tagline */}
          <div
            className="mt-8 max-w-[640px] text-center transition-all duration-700"
            style={{ opacity: stage >= 3 ? 1 : 0, transform: stage >= 3 ? "translateY(0)" : "translateY(10px)" }}
          >
            <p className="text-[15px] text-(--color-ink-2) italic leading-relaxed">
              «{taglines[0]}»
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-[12px] text-(--color-ink-3)">
        {mode.org} · {mode.scenarioNameRu}
      </div>
    </div>
  );
}
