import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * The emotional core of the opening: one continuously-mounted scene that
 * moves through three phases without ever unmounting its nodes, so Framer
 * Motion can genuinely tween their positions (not cut between static
 * screens). This is what makes the "two worlds becoming one" moment read
 * as fluid rather than a slideshow.
 *
 * Visual language is deliberately non-verbal first, verbal second:
 * — Organisation = a blueprint: rigid squares, straight elbow connectors,
 *   cool signal-purple. Reads as "engineered system" on sight.
 * — Human = organic blooms: soft breathing circles, curved connections,
 *   warm amber. Reads as "living, growing" on sight.
 * The contrast (straight vs curved, cool vs warm, static vs breathing) is
 * legible before anyone reads a single label.
 */

type Phase = "establish" | "line" | "converge";

const ORG_TERMS = ["Стратегия", "Приоритеты", "KPI", "Риски", "Компетенции"];
const HUMAN_TERMS = ["Любопытство", "Развитие", "Наставники", "Опыт", "Карьера"];

// Positions as % of container — establish (worlds apart) vs converge (worlds meeting)
const ORG_ESTABLISH = [
  { x: 14, y: 22 }, { x: 30, y: 16 }, { x: 12, y: 48 }, { x: 30, y: 55 }, { x: 18, y: 74 },
];
const ORG_CONVERGE = [
  { x: 32, y: 38 }, { x: 40, y: 30 }, { x: 34, y: 50 }, { x: 42, y: 58 }, { x: 38, y: 66 },
];
const HUMAN_ESTABLISH = [
  { x: 86, y: 20 }, { x: 70, y: 30 }, { x: 88, y: 46 }, { x: 72, y: 60 }, { x: 84, y: 76 },
];
const HUMAN_CONVERGE = [
  { x: 68, y: 36 }, { x: 60, y: 28 }, { x: 66, y: 50 }, { x: 58, y: 60 }, { x: 62, y: 68 },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function TwoWorldsScene({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("establish");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"), 4600);
    const t2 = setTimeout(() => setPhase("converge"), 4600 + 4200);
    const t3 = setTimeout(() => onDone(), 4600 + 4200 + 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const orgPos = phase === "establish" ? ORG_ESTABLISH : ORG_CONVERGE;
  const humanPos = phase === "establish" ? HUMAN_ESTABLISH : HUMAN_CONVERGE;

  return (
    <div className="relative w-full h-full">
      {/* Divider — present while worlds are apart, dissolves as they converge */}
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 w-px bg-(--color-border)"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "establish" ? 0.6 : 0 }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      {/* Connectors — straight elbows for org, soft curves for human */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {orgPos.slice(1).map((p, i) => {
          const from = orgPos[0];
          return (
            <motion.line
              key={`org-line-${i}`}
              x1={from.x} y1={from.y} x2={p.x} y2={p.y}
              stroke="var(--color-signal)" strokeWidth={0.15}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4, x1: from.x, y1: from.y, x2: p.x, y2: p.y }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.3 + i * 0.15 }}
            />
          );
        })}
        {humanPos.slice(1).map((p, i) => {
          const from = humanPos[0];
          const mx = (from.x + p.x) / 2, my = (from.y + p.y) / 2 - 4;
          return (
            <motion.path
              key={`human-line-${i}`}
              d={`M ${from.x} ${from.y} Q ${mx} ${my} ${p.x} ${p.y}`}
              fill="none" stroke="var(--color-warn)" strokeWidth={0.15}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.5 + i * 0.15 }}
            />
          );
        })}
      </svg>

      {/* Organisation nodes — rigid, geometric, cool */}
      {ORG_TERMS.map((term, i) => (
        <motion.div
          key={`org-${i}`}
          className="absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2"
          initial={{ left: `${ORG_ESTABLISH[i].x}%`, top: `${ORG_ESTABLISH[i].y}%`, opacity: 0, scale: 0.4, rotate: 45 }}
          animate={{ left: `${orgPos[i].x}%`, top: `${orgPos[i].y}%`, opacity: 1, scale: 1, rotate: 45 }}
          transition={{ duration: phase === "converge" ? 2.6 : 1.1, ease: EASE, delay: phase === "establish" ? 0.15 * i : 0 }}
        >
          <div
            className="h-5 w-5 border-2"
            style={{ borderColor: "var(--color-signal)", background: "rgba(139,127,255,0.12)" }}
          />
          <span className="text-[11px] font-mono text-(--color-ink-2) -rotate-45 whitespace-nowrap">{term}</span>
        </motion.div>
      ))}

      {/* Human nodes — soft, organic, warm, breathing */}
      {HUMAN_TERMS.map((term, i) => (
        <motion.div
          key={`human-${i}`}
          className="absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2"
          initial={{ left: `${HUMAN_ESTABLISH[i].x}%`, top: `${HUMAN_ESTABLISH[i].y}%`, opacity: 0, scale: 0.4 }}
          animate={{ left: `${humanPos[i].x}%`, top: `${humanPos[i].y}%`, opacity: 1, scale: [1, 1.12, 1] }}
          transition={{
            left: { duration: phase === "converge" ? 2.6 : 1.1, ease: EASE, delay: phase === "establish" ? 0.15 * i : 0 },
            top: { duration: phase === "converge" ? 2.6 : 1.1, ease: EASE, delay: phase === "establish" ? 0.15 * i : 0 },
            opacity: { duration: 1, delay: phase === "establish" ? 0.15 * i : 0 },
            scale: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
          }}
        >
          <div
            className="h-6 w-6 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(245,183,49,0.55) 0%, rgba(245,183,49,0.15) 70%, transparent 100%)", boxShadow: "0 0 14px rgba(245,183,49,0.35)" }}
          />
          <span className="text-[11px] font-mono text-(--color-ink-2) whitespace-nowrap">{term}</span>
        </motion.div>
      ))}

      {/* The single line — appears over the (now paused) scene, not replacing it */}
      {phase !== "establish" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-8 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "line" ? 1 : 0 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <div className="absolute inset-0 bg-(--color-canvas)" style={{ opacity: phase === "line" ? 0.72 : 0 }} />
          <p className="relative font-display text-[28px] md:text-[42px] text-(--color-ink-1) text-center leading-snug">
            Они работают
            <br />
            в одной организации.
            <br />
            <br />
            Но живут
            <br />
            в разных реальностях.
          </p>
        </motion.div>
      )}

      {/* Converging core — appears as both worlds meet */}
      {phase === "converge" && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: 2.4 }}
          style={{ background: "radial-gradient(circle, rgba(139,127,255,0.85) 0%, rgba(245,183,49,0.35) 55%, transparent 100%)" }}
        />
      )}
    </div>
  );
}
