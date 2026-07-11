import { useEffect, useMemo, useRef, useState } from "react";
import { useViewMode } from "@/lib/ViewModeContext";

/**
 * The first 30 seconds of the product — an 8-act, wordless-where-possible
 * cinematic opening that establishes the core problem (strategy and people
 * live in two disconnected systems) before the viewer ever sees a menu.
 *
 * Runs once per session, before IntroScreen. Auto-advances through Acts 1–7
 * on a timer; Act 8 (the perspective choice) waits for a click. Always
 * skippable, and honours prefers-reduced-motion by jumping straight to the
 * choice with no animated sequence at all.
 */

const ORG_TERMS = ["Стратегия", "Национальные проекты", "Приоритеты", "KPI", "Риски", "Компетенции", "Команды", "AI"];
const HUMAN_TERMS = ["Любопытство", "Развитие", "Ошибки", "Наставники", "Обучение", "Опыт", "Карьера", "Самореализация"];
const CHAIN = ["Стратегия", "Проекты", "Компетенции", "Наставники", "Практический опыт", "AI", "Команды", "Результат"];

const ACT_DURATIONS = [0, 3200, 3800, 3400, 2600, 3600, 2800, 2600]; // index 1..7, ms until next act

interface Particle { x: number; y: number; r: number; delay: number }
interface Edge { a: number; b: number; delay: number }

export function OpeningExperience({ onComplete }: { onComplete: (perspective: "vp" | "employee") => void }) {
  const [act, setAct] = useState(1);
  const [reduced, setReduced] = useState(false);
  const { toggle, isVP } = useViewMode();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 220 }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 560,
      r: Math.random() * 1.4 + 0.5,
      delay: Math.random() * 1800,
    }));
  }, []);

  const edges = useMemo<Edge[]>(() => {
    return Array.from({ length: 60 }, () => ({
      a: Math.floor(Math.random() * particles.length),
      b: Math.floor(Math.random() * particles.length),
      delay: 1200 + Math.random() * 1600,
    }));
  }, [particles]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setReduced(true); setAct(8); return; }
  }, []);

  useEffect(() => {
    if (reduced || act >= 8) return;
    const t = setTimeout(() => setAct((a) => Math.min(a + 1, 8)), ACT_DURATIONS[act]);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [act, reduced]);

  function skip() {
    timers.current.forEach(clearTimeout);
    setAct(8);
  }

  function choose(perspective: "vp" | "employee") {
    if ((perspective === "vp") !== isVP) toggle();
    onComplete(perspective);
  }

  return (
    <div className="fixed inset-0 z-50 bg-(--color-canvas) overflow-hidden">
      {act < 8 && (
        <button
          onClick={skip}
          className="absolute top-6 right-6 z-10 text-[12px] font-mono text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors px-3 py-1.5 rounded-lg hover:bg-(--color-surface-raised)"
        >
          Пропустить вступление
        </button>
      )}

      {act === 1 && (
        <div key={1} className="absolute inset-0 flex items-center justify-center px-8 animate-act-in">
          <p className="font-display text-[26px] md:text-[36px] text-(--color-ink-1) text-center leading-snug max-w-[760px]">
            Почему даже лучшие стратегии
            <br />
            не всегда становятся реальностью?
          </p>
        </div>
      )}

      {act === 2 && (
        <div key={2} className="absolute inset-0 animate-act-in">
          <svg viewBox="0 0 1000 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {edges.map((e, i) => {
              const pa = particles[e.a], pb = particles[e.b];
              if (!pa || !pb) return null;
              return (
                <line
                  key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                  stroke="var(--color-signal)" strokeWidth={0.5}
                  className="opening-fade-in" style={{ animationDelay: `${e.delay}ms`, opacity: 0 }}
                />
              );
            })}
            {particles.map((p, i) => (
              <circle
                key={i} cx={p.x} cy={p.y} r={p.r} fill="var(--color-ink-2)"
                className="opening-fade-in" style={{ animationDelay: `${p.delay}ms`, opacity: 0 }}
              />
            ))}
          </svg>
        </div>
      )}

      {act === 3 && (
        <div key={3} className="absolute inset-0 grid grid-cols-2 animate-act-in">
          <div className="flex flex-col items-center justify-center gap-3 border-r border-(--color-border)">
            {ORG_TERMS.map((t, i) => (
              <span
                key={t} className="text-[13px] font-mono text-(--color-ink-2) opening-fade-in"
                style={{ animationDelay: `${i * 110}ms`, opacity: 0 }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            {HUMAN_TERMS.map((t, i) => (
              <span
                key={t} className="text-[13px] font-mono text-(--color-ink-2) opening-fade-in"
                style={{ animationDelay: `${i * 110}ms`, opacity: 0 }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {act === 4 && (
        <div key={4} className="absolute inset-0 flex items-center justify-center px-8 animate-act-in">
          <p className="font-display text-[28px] md:text-[40px] text-(--color-ink-1) text-center leading-snug">
            Они работают
            <br />
            в одной организации.
            <br />
            <br />
            Но живут
            <br />
            в разных реальностях.
          </p>
        </div>
      )}

      {act === 5 && (
        <div key={5} className="absolute inset-0 grid grid-cols-[1fr_auto_1fr] items-center px-10 animate-act-in">
          <div className="flex flex-col items-end gap-3">
            {ORG_TERMS.slice(0, 5).map((t, i) => (
              <span key={t} className="text-[13px] font-mono text-(--color-ink-1) animate-row-in-left" style={{ animationDelay: `${i * 90}ms` }}>{t}</span>
            ))}
          </div>
          <div className="w-24 h-24 rounded-full animate-converge-fade" style={{ background: "radial-gradient(circle, rgba(139,127,255,0.85) 0%, rgba(86,174,255,0.4) 60%, transparent 100%)", animationDelay: "1.2s" }} />
          <div className="flex flex-col items-start gap-3">
            {HUMAN_TERMS.slice(0, 5).map((t, i) => (
              <span key={t} className="text-[13px] font-mono text-(--color-ink-1) animate-row-in-right" style={{ animationDelay: `${i * 90}ms` }}>{t}</span>
            ))}
          </div>
        </div>
      )}

      {act === 6 && (
        <div key={6} className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8 animate-act-in">
          <div className="w-28 h-28 rounded-full glow-signal" style={{ background: "radial-gradient(circle, rgba(139,127,255,0.9) 0%, rgba(86,174,255,0.5) 60%, transparent 100%)" }} />
          <div className="text-center animate-converge-fade" style={{ animationDelay: "0.5s" }}>
            <div className="font-display text-[28px] md:text-[34px] text-gradient-accent leading-tight">
              Capability Intelligence Platform
            </div>
            <div className="text-[14px] text-(--color-ink-3) font-mono mt-2">
              Платформа управления стратегическими компетенциями
            </div>
            <p className="text-[14px] text-(--color-ink-2) mt-5 max-w-[540px] mx-auto leading-relaxed">
              Интеллектуальная инфраструктура, которая соединяет стратегию организации, развитие человека
              и AI-поддержку принятия решений в единый непрерывный цикл.
            </p>
          </div>
        </div>
      )}

      {act === 7 && (
        <div key={7} className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-act-in">
          {CHAIN.map((c, i) => (
            <div key={c} className="flex items-center gap-3 animate-converge-fade" style={{ animationDelay: `${i * 160}ms` }}>
              <span className="text-[14px] font-mono text-(--color-ink-1)">{c}</span>
              {i < CHAIN.length - 1 && <span className="text-(--color-signal)">↓</span>}
            </div>
          ))}
        </div>
      )}

      {act === 8 && (
        <div key={8} className="absolute inset-0 flex items-center justify-center px-6 animate-act-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[820px] w-full">
            <button
              onClick={() => choose("vp")}
              className="glass rounded-2xl p-8 text-left hover:scale-[1.02] transition-all border-(--color-signal)/25 hover:border-(--color-signal)/50"
            >
              <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-(--color-signal) mb-3">
                Реальность руководителя
              </div>
              <p className="text-[16px] text-(--color-ink-1) leading-relaxed">
                Помочь организации быстрее реализовать стратегию.
              </p>
            </button>
            <button
              onClick={() => choose("employee")}
              className="glass rounded-2xl p-8 text-left hover:scale-[1.02] transition-all border-(--color-good)/25 hover:border-(--color-good)/50"
            >
              <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-(--color-good) mb-3">
                Реальность сотрудника
              </div>
              <p className="text-[16px] text-(--color-ink-1) leading-relaxed">
                Найти своё место. Развиваться. Стать ценнее.
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
