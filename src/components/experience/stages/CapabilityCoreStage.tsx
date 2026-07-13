import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { BRAND_RU, BRAND_EN, CATEGORY_RU } from "@/data/branding";

/**
 * Act 4 — the platform reveals itself as a living network: nodes fade in
 * across two loosely-staggered waves (inner ring, then outer ring) and
 * connect into a central core, with small pulses of energy continuously
 * traveling inward along a handful of the connections — meant to read as
 * an active, breathing system, not a static logo mark.
 *
 * Ends on the bridge line at deliberately large size with generous dwell
 * time — this is the single most important sentence in the whole intro
 * (it's the answer to the Aha moment the viewer just had), so it gets the
 * most visual weight and the most time, not the least.
 */
const EASE = [0.16, 1, 0.3, 1] as const;
const INNER_COUNT = 10;
const OUTER_COUNT = 14;

export function CapabilityCoreStage({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 17000);
    return () => clearTimeout(t);
  }, [onDone]);

  const nodes = useMemo(() => {
    const inner = Array.from({ length: INNER_COUNT }, (_, i) => {
      const angle = (i / INNER_COUNT) * Math.PI * 2 + Math.random() * 0.25;
      const r = 12 + Math.random() * 6;
      return {
        x: 50 + Math.cos(angle) * r, y: 50 + Math.sin(angle) * r,
        delay: 0.1 + Math.random() * 0.8, wave: 0,
        color: Math.random() > 0.5 ? "var(--color-signal)" : "var(--color-warn)",
        size: 1.1 + Math.random() * 0.6,
      };
    });
    const outer = Array.from({ length: OUTER_COUNT }, (_, i) => {
      const angle = (i / OUTER_COUNT) * Math.PI * 2 + Math.random() * 0.25;
      const r = 22 + Math.random() * 10;
      return {
        x: 50 + Math.cos(angle) * r, y: 50 + Math.sin(angle) * r,
        delay: 1.1 + Math.random() * 1.1, wave: 1,
        color: Math.random() > 0.5 ? "var(--color-signal)" : "var(--color-warn)",
        size: 0.8 + Math.random() * 0.5,
      };
    });
    return [...inner, ...outer];
  }, []);

  // a handful of connections carry a continuously-flowing pulse toward the core
  const flowing = useMemo(() => nodes.filter((_, i) => i % 4 === 0), [nodes]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-8">
      <motion.div
        className="relative w-[280px] h-[220px] md:w-[360px] md:h-[280px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {nodes.map((n, i) => (
            <motion.line
              key={`line-${i}`} x1={50} y1={50} x2={n.x} y2={n.y}
              stroke={n.color} strokeWidth={0.2}
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 1, ease: EASE, delay: n.delay }}
            />
          ))}
          {flowing.map((n, i) => (
            <motion.circle key={`flow-${i}`} r={0.5} fill={n.color}
              initial={{ cx: n.x, cy: n.y, opacity: 0 }}
              animate={{ cx: [n.x, 50], cy: [n.y, 50], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeIn", delay: n.delay + 1.5 + i * 0.3 }}
            />
          ))}
          {nodes.map((n, i) => (
            <motion.circle
              key={`node-${i}`} cx={n.x} cy={n.y} r={n.size} fill={n.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.9, scale: [0, 1.5, 1] }}
              transition={{ duration: 0.8, ease: EASE, delay: n.delay }}
            />
          ))}
        </svg>
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,127,255,0.9) 0%, rgba(245,183,49,0.4) 55%, transparent 100%)" }}
          initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [0.6, 1.1, 1], opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
      </motion.div>

      <motion.div className="text-center"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 2.4 }}
      >
        <div className="font-display text-[28px] md:text-[34px] text-gradient-accent leading-tight">
          {BRAND_RU}
        </div>
        <div className="text-[14px] text-(--color-ink-3) font-mono mt-2">
          ({BRAND_EN})
        </div>
        <div className="text-[11px] text-(--color-signal) font-mono uppercase tracking-[0.1em] mt-3">
          {CATEGORY_RU}
        </div>
        <p className="text-[14px] text-(--color-ink-2) mt-5 max-w-[540px] mx-auto leading-relaxed">
          Не отдельные люди. Не отдельная стратегия. Единая живая сеть, которая
          видит оба мира сразу — и соединяет их быстрее, чем это может сделать
          любой человек в одиночку.
        </p>
      </motion.div>

      <motion.p
        className="font-display text-[24px] md:text-[32px] text-(--color-ink-1) text-center leading-snug max-w-[720px]"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 6.2 }}
      >
        Раньше стратегию реализовывали вопреки организации.
        <br />
        <span className="text-gradient-accent">Теперь организация реализует стратегию сама —</span>
        <br />
        потому что каждый в ней уже на своём месте.
      </motion.p>
    </div>
  );
}
