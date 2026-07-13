import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Act 2 — restored to a clear, well-defined, auto-playing scene after an
 * earlier attempt made this interactive (cursor "chasing" nodes) and it
 * read as confusing rather than meaningful. This version prioritizes
 * clarity: two visually distinct worlds establish themselves, the single
 * defining line appears, then a handful of specific matches connect them —
 * deliberately paced, nothing to chase or figure out.
 *
 * Visual identity of each world is atmospheric, not just small icons:
 * — Organisation = blueprint. Faint drafting grid, cool violet glow, rigid
 *   square nodes, straight elbow connectors. Reads as "engineered system."
 * — Human = living field. Soft warm glow, drifting unlabelled bokeh in the
 *   background, breathing circular nodes, curved connections. Reads as
 *   "alive" before a single word is read.
 */

type Phase = "establish" | "line" | "match";

const ORG_TERMS = ["Стратегия", "Приоритеты", "KPI", "Риски", "Компетенции"];
const HUMAN_TERMS = ["Любопытство", "Развитие", "Наставники", "Опыт", "Карьера"];

// [orgIndex, humanIndex] — the pairs that connect, in the order threads draw.
// Index 2 (org "KPI") and index 0 (human "Любопытство") are deliberately
// left unmatched — not everything aligns at once, which reads as more
// honest than a tidy 1:1 resolution.
const MATCHES: [number, number][] = [
  [4, 1], // Компетенции ↔ Развитие
  [3, 2], // Риски ↔ Наставники
  [0, 4], // Стратегия ↔ Карьера
  [1, 3], // Приоритеты ↔ Опыт
];

const ORG_POS = [
  { x: 16, y: 24 }, { x: 32, y: 18 }, { x: 14, y: 50 }, { x: 32, y: 56 }, { x: 20, y: 76 },
];
const HUMAN_POS = [
  { x: 84, y: 22 }, { x: 68, y: 30 }, { x: 86, y: 48 }, { x: 70, y: 62 }, { x: 82, y: 78 },
];

const BOKEH = [
  { x: 92, y: 12, r: 3.2, dur: 9 }, { x: 76, y: 8, r: 2.2, dur: 11 },
  { x: 94, y: 62, r: 2.6, dur: 8 }, { x: 60, y: 48, r: 1.8, dur: 12 },
  { x: 90, y: 90, r: 2.4, dur: 10 }, { x: 66, y: 86, r: 1.6, dur: 13 },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function WorldsStage({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("establish");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"), 8200);
    const t2 = setTimeout(() => setPhase("match"), 8200 + 6800);
    const t3 = setTimeout(onDone, 8200 + 6800 + 11500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className="relative w-full h-full">
      {/* Atmosphere: blueprint grid (left) */}
      <motion.svg
        className="absolute inset-0 w-1/2 h-full" viewBox="0 0 50 100" preserveAspectRatio="none"
        initial={{ opacity: 0 }} animate={{ opacity: phase === "match" ? 0.35 : 0.55 }}
        transition={{ duration: 2, ease: EASE }}
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 5} y1={0} x2={i * 5} y2={100} stroke="var(--color-signal)" strokeWidth={0.04} />
        ))}
        {Array.from({ length: 21 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 5} x2={50} y2={i * 5} stroke="var(--color-signal)" strokeWidth={0.04} />
        ))}
      </motion.svg>
      <motion.div
        className="absolute -left-[10%] top-1/2 -translate-y-1/2 w-[55%] h-[70%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,127,255,0.16) 0%, transparent 70%)", filter: "blur(40px)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.4, ease: EASE }}
      />

      {/* Atmosphere: warm living field (right) */}
      <motion.div
        className="absolute -right-[10%] top-1/2 -translate-y-1/2 w-[55%] h-[70%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,183,49,0.16) 0%, transparent 70%)", filter: "blur(40px)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.4, ease: EASE }}
      />
      {BOKEH.map((b, i) => (
        <motion.div
          key={`bokeh-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.r}%`, height: `${b.r}%`, background: "radial-gradient(circle, rgba(245,183,49,0.5) 0%, transparent 75%)" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.6, 0.3, 0.6], scale: [0.6, 1, 0.9, 1], y: [0, -6, 0, 4, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}

      {/* World titles — an explicit definition, not just icons */}
      <motion.div
        className="absolute left-[6%] top-[6%] max-w-[280px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: phase === "establish" ? 1 : 0.25, y: 0 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
      >
        <div className="text-[20px] md:text-[24px] font-display text-(--color-ink-1) leading-tight">Мир системы</div>
        <div className="text-[12.5px] text-(--color-ink-3) mt-1.5 leading-relaxed">Управляемый. Измеримый. Спроектированный.</div>
      </motion.div>
      <motion.div
        className="absolute right-[6%] top-[6%] max-w-[280px] text-right"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: phase === "establish" ? 1 : 0.25, y: 0 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.6 }}
      >
        <div className="text-[20px] md:text-[24px] font-display text-(--color-ink-1) leading-tight">Мир человека</div>
        <div className="text-[12.5px] text-(--color-ink-3) mt-1.5 leading-relaxed">Живой. Развивающийся. Непредсказуемый.</div>
      </motion.div>

      {/* Divider — present while worlds are apart, fades as they connect */}
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 w-px bg-(--color-border)"
        initial={{ opacity: 0 }} animate={{ opacity: phase === "establish" ? 0.5 : 0 }}
        transition={{ duration: 1.6, ease: EASE }}
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {ORG_POS.slice(1).map((p, i) => (
          <motion.line
            key={`org-line-${i}`} x1={ORG_POS[0].x} y1={ORG_POS[0].y} x2={p.x} y2={p.y}
            stroke="var(--color-signal)" strokeWidth={0.15}
            initial={{ opacity: 0 }} animate={{ opacity: phase === "establish" ? 0.4 : 0.15 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.6 + i * 0.25 }}
          />
        ))}
        {HUMAN_POS.slice(1).map((p, i) => {
          const from = HUMAN_POS[0];
          const mx = (from.x + p.x) / 2, my = (from.y + p.y) / 2 - 4;
          return (
            <motion.path
              key={`human-line-${i}`} d={`M ${from.x} ${from.y} Q ${mx} ${my} ${p.x} ${p.y}`}
              fill="none" stroke="var(--color-warn)" strokeWidth={0.15}
              initial={{ opacity: 0 }} animate={{ opacity: phase === "establish" ? 0.35 : 0.12 }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.9 + i * 0.25 }}
            />
          );
        })}

        {phase === "match" && MATCHES.map(([oi, hi], i) => {
          const from = ORG_POS[oi], to = HUMAN_POS[hi];
          const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2;
          return (
            <motion.path
              key={`match-${i}`} d={`M ${from.x} ${from.y} Q ${mx} ${my - 6} ${to.x} ${to.y}`}
              fill="none" stroke="url(#matchGradient)" strokeWidth={0.35} strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.5 + i * 1.5 }}
            />
          );
        })}
        <defs>
          <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-signal)" />
            <stop offset="100%" stopColor="var(--color-warn)" />
          </linearGradient>
        </defs>
      </svg>

      {ORG_TERMS.map((term, i) => {
        const isMatched = phase === "match" && MATCHES.some(([oi]) => oi === i);
        const matchDelay = 0.5 + MATCHES.findIndex(([oi]) => oi === i) * 1.5;
        return (
          <motion.div
            key={`org-${i}`}
            className="absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${ORG_POS[i].x}%`, top: `${ORG_POS[i].y}%` }}
            initial={{ opacity: 0, scale: 0.4, rotate: 45 }}
            animate={{ opacity: 1, scale: isMatched ? [1, 1.35, 1] : 1, rotate: 45 }}
            transition={{
              opacity: { duration: 1, ease: EASE, delay: 0.2 * i },
              scale: isMatched ? { duration: 0.9, ease: EASE, delay: matchDelay + 1.2 } : { duration: 1, delay: 0.2 * i },
            }}
          >
            <div className="h-5 w-5 border-2 transition-all duration-700" style={{
              borderColor: "var(--color-signal)",
              background: isMatched ? "rgba(139,127,255,0.4)" : "rgba(139,127,255,0.12)",
              boxShadow: isMatched ? "0 0 16px rgba(139,127,255,0.6)" : "none",
            }} />
            <span className="text-[11px] font-mono text-(--color-ink-2) -rotate-45 whitespace-nowrap">{term}</span>
          </motion.div>
        );
      })}

      {HUMAN_TERMS.map((term, i) => {
        const isMatched = phase === "match" && MATCHES.some(([, hi]) => hi === i);
        const matchDelay = 0.5 + MATCHES.findIndex(([, hi]) => hi === i) * 1.5;
        return (
          <motion.div
            key={`human-${i}`}
            className="absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${HUMAN_POS[i].x}%`, top: `${HUMAN_POS[i].y}%` }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: isMatched ? [1, 1.35, 1.08, 1.15, 1.08] : [1, 1.1, 1] }}
            transition={{
              opacity: { duration: 1, ease: EASE, delay: 0.2 * i + 0.1 },
              scale: isMatched
                ? { duration: 0.9, ease: EASE, delay: matchDelay + 1.2 }
                : { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
            }}
          >
            <div className="h-6 w-6 rounded-full transition-all duration-700" style={{
              background: isMatched
                ? "radial-gradient(circle, rgba(245,183,49,0.85) 0%, rgba(245,183,49,0.3) 70%, transparent 100%)"
                : "radial-gradient(circle, rgba(245,183,49,0.55) 0%, rgba(245,183,49,0.15) 70%, transparent 100%)",
              boxShadow: isMatched ? "0 0 20px rgba(245,183,49,0.6)" : "0 0 14px rgba(245,183,49,0.35)",
            }} />
            <span className="text-[11px] font-mono text-(--color-ink-2) whitespace-nowrap">{term}</span>
          </motion.div>
        );
      })}

      {phase !== "establish" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-8 pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: phase === "line" ? 1 : 0 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <div className="absolute inset-0 bg-(--color-canvas)" style={{ opacity: phase === "line" ? 0.68 : 0 }} />
          <p className="relative font-display text-[28px] md:text-[42px] text-(--color-ink-1) text-center leading-snug">
            У организации — стратегия.
            <br />У человека — жизнь.
            <br /><br />
            Одна компания.
            <br />Два разных мира.
          </p>
        </motion.div>
      )}

      {phase === "match" && (
        <motion.p
          className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-[13px] text-(--color-ink-3) font-mono text-center px-6"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6, times: [0, 0.15, 0.75, 1], ease: EASE, delay: 0.3 }}
        >
          AI находит не общие категории — конкретные совпадения.
        </motion.p>
      )}
    </div>
  );
}
