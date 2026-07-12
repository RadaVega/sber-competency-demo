import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useViewMode } from "@/lib/ViewModeContext";
import { TwoWorldsScene } from "./TwoWorldsScene";

/**
 * The first ~55 seconds of the product — a wordless-where-possible cinematic
 * opening that establishes the core problem (strategy and people live in
 * two disconnected systems) before the viewer ever sees a menu.
 *
 * Built on Framer Motion throughout — not hand-rolled CSS keyframes —
 * because the moments that matter (the two worlds converging) need genuine
 * position tweening, not a slideshow of static frames. Paced deliberately
 * slower than a typical product intro: each stage gets real time to land
 * before the next begins.
 *
 * Stages: Question → Network forms → [TwoWorldsScene: establish → the line →
 * converge] → Platform reveals → Value chain radiates → Perspective choice.
 *
 * Runs once per session. Always skippable. Honours prefers-reduced-motion
 * by jumping straight to the choice with no animated sequence at all.
 */

type Stage = "question" | "network" | "worlds" | "reveal" | "chain" | "choice";

const CHAIN = ["Стратегия", "Проекты", "Компетенции", "Наставники", "Практический опыт", "AI", "Команды", "Результат"];

const EASE = [0.16, 1, 0.3, 1] as const;
const stageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 1.3, ease: EASE } },
  exit: { opacity: 0, scale: 1.01, transition: { duration: 0.9, ease: EASE } },
};

interface Particle { x: number; y: number; r: number; delay: number }
interface Edge { a: number; b: number; delay: number }

export function OpeningExperience({ onComplete }: { onComplete: (perspective: "vp" | "employee") => void }) {
  const [stage, setStage] = useState<Stage>("question");
  const [reduced, setReduced] = useState(false);
  const { toggle, isVP } = useViewMode();

  const particles = useMemo<Particle[]>(() => Array.from({ length: 180 }, () => ({
    x: Math.random() * 100, y: Math.random() * 100, r: Math.random() * 0.35 + 0.15,
    delay: Math.random() * 2.6,
  })), []);
  const edges = useMemo<Edge[]>(() => Array.from({ length: 46 }, () => ({
    a: Math.floor(Math.random() * particles.length), b: Math.floor(Math.random() * particles.length),
    delay: 1.4 + Math.random() * 2.2,
  })), [particles]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setReduced(true); setStage("choice"); }
  }, []);

  useEffect(() => {
    if (reduced) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (stage === "question") timers.push(setTimeout(() => setStage("network"), 7000));
    if (stage === "network") timers.push(setTimeout(() => setStage("worlds"), 9500));
    // "worlds" stage advances itself via TwoWorldsScene's onDone callback
    if (stage === "reveal") timers.push(setTimeout(() => setStage("chain"), 8000));
    if (stage === "chain") timers.push(setTimeout(() => setStage("choice"), 7200));
    return () => timers.forEach(clearTimeout);
  }, [stage, reduced]);

  function skip() {
    setStage("choice");
  }

  function choose(perspective: "vp" | "employee") {
    if ((perspective === "vp") !== isVP) toggle();
    onComplete(perspective);
  }

  return (
    <div className="fixed inset-0 z-50 bg-(--color-canvas) overflow-hidden">
      {stage !== "choice" && (
        <button
          onClick={skip}
          className="absolute top-6 right-6 z-10 text-[12px] font-mono text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors px-3 py-1.5 rounded-lg hover:bg-(--color-surface-raised)"
        >
          Пропустить вступление
        </button>
      )}

      <AnimatePresence mode="wait">
        {stage === "question" && (
          <motion.div key="question" className="absolute inset-0 flex items-center justify-center px-8"
            variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <motion.p
              className="font-display text-[26px] md:text-[38px] text-(--color-ink-1) text-center leading-snug max-w-[760px]"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
            >
              Почему даже лучшие стратегии
              <br />
              не всегда становятся реальностью?
            </motion.p>
          </motion.div>
        )}

        {stage === "network" && (
          <motion.div key="network" className="absolute inset-0"
            variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {edges.map((e, i) => {
                const pa = particles[e.a], pb = particles[e.b];
                if (!pa || !pb) return null;
                return (
                  <motion.line
                    key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                    stroke="var(--color-signal)" strokeWidth={0.06}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.35 }}
                    transition={{ duration: 1.8, ease: EASE, delay: e.delay }}
                  />
                );
              })}
              {particles.map((p, i) => (
                <motion.circle
                  key={i} cx={p.x} cy={p.y} r={p.r} fill="var(--color-ink-2)"
                  initial={{ opacity: 0 }} animate={{ opacity: 0.75 }}
                  transition={{ duration: 1.4, ease: EASE, delay: p.delay }}
                />
              ))}
            </svg>
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8 pointer-events-none text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 9.5, times: [0, 0.32, 0.42, 0.8, 1], ease: EASE }}
            >
              <p className="font-display text-[20px] md:text-[26px] text-(--color-ink-1) leading-snug">
                Тысячи специалистов по всей стране.
              </p>
              <p className="text-[15px] md:text-[18px] text-(--color-ink-3)">
                Но связи между ними — случайны.
              </p>
            </motion.div>
          </motion.div>
        )}

        {stage === "worlds" && (
          <motion.div key="worlds" className="absolute inset-0"
            variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <TwoWorldsScene onDone={() => setStage("reveal")} />
          </motion.div>
        )}

        {stage === "reveal" && (
          <motion.div key="reveal" className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8"
            variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <motion.div
              className="w-28 h-28 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(139,127,255,0.9) 0%, rgba(245,183,49,0.4) 55%, transparent 100%)" }}
              initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [0.6, 1.08, 1], opacity: 1 }}
              transition={{ duration: 1.8, ease: EASE }}
            />
            <motion.div className="text-center"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: EASE, delay: 1 }}
            >
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
            </motion.div>
          </motion.div>
        )}

        {stage === "chain" && (
          <motion.div key="chain" className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            variants={stageVariants} initial="initial" animate="animate" exit="exit">
            {CHAIN.map((c, i) => (
              <motion.div key={c} className="flex items-center gap-3"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.4 + i * 0.5 }}
              >
                <span className="text-[14px] font-mono text-(--color-ink-1)">{c}</span>
                {i < CHAIN.length - 1 && <span className="text-(--color-signal)">↓</span>}
              </motion.div>
            ))}
          </motion.div>
        )}

        {stage === "choice" && (
          <motion.div key="choice" className="absolute inset-0 flex items-center justify-center px-6"
            variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <div className="flex flex-col items-center gap-10 max-w-[860px] w-full">
              <motion.p
                className="font-display text-[22px] md:text-[28px] text-(--color-ink-1) text-center leading-snug max-w-[620px]"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: EASE, delay: reduced ? 0 : 0.3 }}
              >
                С какой точки зрения вы хотите продолжить исследование этой организации?
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <motion.button
                  onClick={() => choose("vp")}
                  className="glass rounded-2xl p-8 text-left border-(--color-signal)/25 hover:border-(--color-signal)/50"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: EASE, delay: reduced ? 0 : 2.1 }}
                >
                  <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-(--color-signal) mb-3">
                    Руководитель
                  </div>
                  <p className="text-[16px] text-(--color-ink-1) leading-relaxed">
                    Как реализовать стратегию быстрее и эффективнее?
                  </p>
                </motion.button>
                <motion.button
                  onClick={() => choose("employee")}
                  className="glass rounded-2xl p-8 text-left border-(--color-good)/25 hover:border-(--color-good)/50"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: EASE, delay: reduced ? 0 : 2.4 }}
                >
                  <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-(--color-good) mb-3">
                    Сотрудник
                  </div>
                  <p className="text-[16px] text-(--color-ink-1) leading-relaxed">
                    Как найти своё место, развиваться и влиять на результат?
                  </p>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
