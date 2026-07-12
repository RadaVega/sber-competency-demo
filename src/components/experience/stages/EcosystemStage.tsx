import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

/**
 * Act 3 — convergence, reframed around a real biological analogy instead
 * of an abstract "everything merges" gesture: a mycorrhizal network — the
 * root-fungus web that connects trees in a forest and redistributes
 * nutrients toward whichever tree needs them most, with no central
 * authority deciding. Nobody issues an order; the system finds balance on
 * its own because resources continuously flow toward need.
 *
 * That's the exact claim being made about the platform: humans see a clear
 * path toward what they want, the organisation gets talent where its
 * strategy actually needs it, and neither requires top-down command — the
 * flow self-balances, continuously, in both directions.
 *
 * Technique: organic bezier "root" paths (not straight lines) connect
 * scattered org/human nodes; small particles travel continuously along
 * each path using CSS motion-path (offset-path), some direction, some
 * reversed — visually distinct from the earlier, deliberate one-time
 * "match" threads in WorldsStage. This is meant to read as alive and
 * ongoing, not a single event.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

interface Node { x: number; y: number }
const ORG_NODES: Node[] = [
  { x: 12, y: 22 }, { x: 18, y: 50 }, { x: 10, y: 76 }, { x: 26, y: 62 },
];
const HUMAN_NODES: Node[] = [
  { x: 88, y: 26 }, { x: 82, y: 52 }, { x: 90, y: 78 }, { x: 74, y: 64 },
];

interface RootPath { d: string; delay: number; reverse: boolean; color: string }

function organicPath(a: Node, b: Node, wobble: number): string {
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  // perpendicular offset for a root-like curve rather than a straight line
  const px = (-dy / len) * wobble, py = (dx / len) * wobble;
  const c1x = a.x + dx * 0.3 + px, c1y = a.y + dy * 0.3 + py;
  const c2x = a.x + dx * 0.7 - px * 0.6, c2y = a.y + dy * 0.7 - py * 0.6;
  return `M ${a.x} ${a.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
}

export function EcosystemStage({ onDone }: { onDone: () => void }) {
  const [settled, setSettled] = useState(false);

  const paths = useMemo<RootPath[]>(() => {
    const out: RootPath[] = [];
    ORG_NODES.forEach((org, i) => {
      HUMAN_NODES.forEach((human, j) => {
        // not a full mesh — a believable, sparser web, like real root grafts
        if ((i + j) % 3 !== 0) return;
        const wobble = 8 + Math.random() * 10;
        out.push({
          d: organicPath(org, human, Math.random() > 0.5 ? wobble : -wobble),
          delay: 0.3 + Math.random() * 1.6,
          reverse: Math.random() > 0.5,
          color: Math.random() > 0.5 ? "var(--color-signal)" : "var(--color-warn)",
        });
      });
    });
    return out;
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setSettled(true), 3200);
    const t2 = setTimeout(onDone, 10500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [1, 0.92, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {paths.map((p, i) => (
            <motion.path
              key={i} d={p.d} fill="none" stroke={p.color} strokeWidth={0.12} strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 1.8, ease: EASE, delay: p.delay }}
            />
          ))}
          {/* particles flowing continuously along each root path once it's grown in */}
          {settled && paths.map((p, i) => (
            <motion.circle key={`flow-${i}`} r={0.35} fill={p.color}
              style={{ offsetPath: `path("${p.d}")` }}
              initial={{ offsetDistance: p.reverse ? "100%" : "0%", opacity: 0 }}
              animate={{ offsetDistance: p.reverse ? "0%" : "100%", opacity: [0, 0.9, 0.9, 0] }}
              transition={{ duration: 3.5 + (i % 4), repeat: Infinity, ease: "linear", delay: (i % 5) * 0.6 }}
            />
          ))}
        </svg>

        {[...ORG_NODES.map((n) => ({ ...n, kind: "org" as const })), ...HUMAN_NODES.map((n) => ({ ...n, kind: "human" as const }))].map((n, i) => (
          <motion.div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: [1, 1.15, 1] }}
            transition={{
              opacity: { duration: 1, ease: EASE, delay: 0.2 + i * 0.12 },
              scale: { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
            }}
          >
            <div
              className="h-3.5 w-3.5 rounded-full"
              style={{
                background: n.kind === "org"
                  ? "radial-gradient(circle, rgba(139,127,255,0.85) 0%, transparent 100%)"
                  : "radial-gradient(circle, rgba(245,183,49,0.85) 0%, transparent 100%)",
                boxShadow: n.kind === "org" ? "0 0 10px rgba(139,127,255,0.5)" : "0 0 10px rgba(245,183,49,0.5)",
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="relative text-center px-8 max-w-[640px]"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 3.6 }}
      >
        <p className="font-display text-[24px] md:text-[30px] text-(--color-ink-1) leading-snug mb-4">
          Живая экосистема, которая балансирует себя сама
        </p>
        <p className="text-[14.5px] md:text-[15.5px] text-(--color-ink-2) leading-relaxed">
          Как грибница связывает деревья в лесу — питание само находит того, кому нужнее.
          <br className="hidden md:block" />
          Человек видит ясный путь к своей цели. Организация получает нужный талант именно там,
          где он нужен стратегии. Без приказов. Без дисбаланса.
        </p>
      </motion.div>
    </div>
  );
}
