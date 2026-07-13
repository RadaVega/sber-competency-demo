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

interface RootPath { d: string; delay: number; reverse: boolean; color: string; mx: number; my: number }

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
        const signedWobble = Math.random() > 0.5 ? wobble : -wobble;
        const dx = human.x - org.x, dy = human.y - org.y;
        const len = Math.hypot(dx, dy) || 1;
        const px = (-dy / len) * signedWobble, py = (dx / len) * signedWobble;
        // approximate midpoint of the cubic bezier at t=0.5, for mushroom placement
        const c1x = org.x + dx * 0.3 + px, c1y = org.y + dy * 0.3 + py;
        const c2x = org.x + dx * 0.7 - px * 0.6, c2y = org.y + dy * 0.7 - py * 0.6;
        const mx = 0.125 * org.x + 0.375 * c1x + 0.375 * c2x + 0.125 * human.x;
        const my = 0.125 * org.y + 0.375 * c1y + 0.375 * c2y + 0.125 * human.y;
        out.push({
          d: organicPath(org, human, signedWobble),
          delay: 0.3 + Math.random() * 1.6,
          reverse: Math.random() > 0.5,
          color: Math.random() > 0.5 ? "var(--color-signal)" : "var(--color-warn)",
          mx, my,
        });
      });
    });
    return out;
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setSettled(true), 3600);
    const t2 = setTimeout(onDone, 14000);
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
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: [1, 1.08, 1] }}
            transition={{
              opacity: { duration: 1, ease: EASE, delay: 0.2 + i * 0.12 },
              scale: { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
            }}
          >
            {/* A small tree silhouette, not an abstract dot — this is a
                forest, and every node is one of its trees. Colour keeps the
                two-worlds coding (cool = organisation, warm = human). */}
            <svg width="22" height="26" viewBox="0 0 22 26" style={{ overflow: "visible" }}>
              <defs>
                <filter id={`glow-${i}`}>
                  <feGaussianBlur stdDeviation="1.6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" /><feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g filter={`url(#glow-${i})`}>
                <path d="M11 1 L18 13 L14 13 L19 20 L3 20 L8 13 L4 13 Z"
                  fill={n.kind === "org" ? "rgba(139,127,255,0.85)" : "rgba(245,183,49,0.85)"} />
                <rect x="9.5" y="20" width="3" height="5" rx="1"
                  fill={n.kind === "org" ? "rgba(139,127,255,0.5)" : "rgba(245,183,49,0.5)"} />
              </g>
            </svg>
          </motion.div>
        ))}

        {/* Mushroom-cap accents along a few root paths — makes the
            "mycorrhizal network" concrete rather than purely verbal */}
        {settled && paths.filter((_, i) => i % 3 === 0).slice(0, 6).map((p, i) => (
            <motion.div
              key={`mushroom-${i}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.mx}%`, top: `${p.my}%` }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 0.85, scale: [0.9, 1.05, 0.9] }}
              transition={{
                opacity: { duration: 1, ease: EASE, delay: 0.6 },
                scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
              }}
            >
              <svg width="12" height="10" viewBox="0 0 12 10">
                <path d="M1 6 Q1 0 6 0 Q11 0 11 6 Z" fill={p.color} opacity={0.7} />
                <rect x="4.5" y="6" width="3" height="3.5" rx="0.8" fill={p.color} opacity={0.4} />
              </svg>
            </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="relative text-center px-8 max-w-[640px]"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 3.6 }}
      >
        <p className="font-display text-[24px] md:text-[30px] text-(--color-ink-1) leading-snug mb-4">
          От двух разных миров — к одной живой системе
        </p>
        <p className="text-[14.5px] md:text-[15.5px] text-(--color-ink-2) leading-relaxed">
          Под лесом есть грибница — сеть, которую не видно сверху. Через неё одно дерево
          отдаёт другому именно то, чего тому не хватает, а не то, что просто есть в избытке.
          <br className="hidden md:block" />
          Человек видит ясный путь к своей цели. Организация получает нужный талант именно там,
          где он нужен стратегии. Без приказов. Без дисбаланса.
        </p>
      </motion.div>
    </div>
  );
}
