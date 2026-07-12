import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Combined stage for Acts 2–4 of the spec: people appear first (unordered,
 * living independently), then a second system — strategy — appears
 * alongside them (also unordered). Only then does the cursor become an
 * instrument: moving near people weaves them together, moving near
 * strategy nodes nudges them into order. The user is the one creating
 * structure, not watching it happen.
 *
 * Both "people" and "strategy" phases render from this single component so
 * the people layer never disappears or re-randomizes when strategy nodes
 * are added — it just keeps living underneath, still interactive.
 *
 * Accessibility: nobody is trapped behind a mouse-only interaction. Each
 * phase shows a "Продолжить" affordance after a few seconds, and touch
 * (pointerdown) works the same as hover proximity.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const PEOPLE_COUNT = 55;
const STRATEGY_COUNT = 10;
const PEOPLE_RADIUS = 11; // % of container
const STRATEGY_RADIUS = 13;
const PEOPLE_SATISFY_RATIO = 0.35;
const STRATEGY_SATISFY_RATIO = 0.5;
const ESCAPE_HATCH_DELAY = 6500; // ms before "Продолжить" appears, per phase

interface PersonPoint { x: number; y: number; driftX: number; driftY: number; driftDur: number; delay: number }
interface StrategyNode { x0: number; y0: number; tx: number; ty: number; delay: number }

function dist(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(ax - bx, ay - by);
}

export function InteractiveField({
  phase, epoch, onPeopleSatisfied, onStrategySatisfied,
}: {
  phase: "people" | "strategy";
  epoch: number;
  onPeopleSatisfied: () => void;
  onStrategySatisfied: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [touchedPeople, setTouchedPeople] = useState<Set<number>>(new Set());
  const [touchedStrategy, setTouchedStrategy] = useState<Set<number>>(new Set());
  const [showEscapePeople, setShowEscapePeople] = useState(false);
  const [showEscapeStrategy, setShowEscapeStrategy] = useState(false);
  const peopleSatisfiedRef = useRef(false);
  const strategySatisfiedRef = useRef(false);

  const people = useMemo<PersonPoint[]>(() => Array.from({ length: PEOPLE_COUNT }, () => ({
    x: Math.random() * 92 + 4, y: Math.random() * 88 + 6,
    driftX: (Math.random() - 0.5) * 3, driftY: (Math.random() - 0.5) * 3,
    driftDur: 4 + Math.random() * 4, delay: Math.random() * 1.8,
  })), [epoch]);

  const strategyNodes = useMemo<StrategyNode[]>(() => {
    const cols = 5;
    return Array.from({ length: STRATEGY_COUNT }, (_, i) => ({
      x0: Math.random() * 84 + 8, y0: Math.random() * 80 + 10,
      tx: 20 + (i % cols) * 15, ty: 30 + Math.floor(i / cols) * 34,
      delay: Math.random() * 1.4,
    }));
  }, [epoch]);

  // Escape hatches — independent per phase, reset when phase changes
  useEffect(() => {
    setShowEscapePeople(false);
    setShowEscapeStrategy(false);
    const t = setTimeout(() => {
      if (phase === "people") setShowEscapePeople(true);
      else setShowEscapeStrategy(true);
    }, ESCAPE_HATCH_DELAY);
    return () => clearTimeout(t);
  }, [phase, epoch]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPointer({ x, y });
    registerProximity(x, y);
  }

  function registerProximity(x: number, y: number) {
    setTouchedPeople((prev) => {
      let changed = false;
      const next = new Set(prev);
      people.forEach((p, i) => {
        if (!next.has(i) && dist(x, y, p.x, p.y) < PEOPLE_RADIUS) { next.add(i); changed = true; }
      });
      return changed ? next : prev;
    });
    if (phase === "strategy") {
      setTouchedStrategy((prev) => {
        let changed = false;
        const next = new Set(prev);
        strategyNodes.forEach((n, i) => {
          if (!next.has(i) && dist(x, y, n.x0, n.y0) < STRATEGY_RADIUS) { next.add(i); changed = true; }
        });
        return changed ? next : prev;
      });
    }
  }

  // Satisfy checks
  useEffect(() => {
    if (peopleSatisfiedRef.current) return;
    if (touchedPeople.size / PEOPLE_COUNT >= PEOPLE_SATISFY_RATIO) {
      peopleSatisfiedRef.current = true;
      onPeopleSatisfied();
    }
  }, [touchedPeople, onPeopleSatisfied]);

  useEffect(() => {
    if (strategySatisfiedRef.current || phase !== "strategy") return;
    if (touchedStrategy.size / STRATEGY_COUNT >= STRATEGY_SATISFY_RATIO) {
      strategySatisfiedRef.current = true;
      onStrategySatisfied();
    }
  }, [touchedStrategy, phase, onStrategySatisfied]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 touch-none"
      onPointerMove={handlePointerMove}
      onPointerDown={(e) => handlePointerMove(e)}
    >
      {/* Hint — appears briefly at the start of each phase, then fades */}
      <motion.p
        key={phase}
        className="absolute top-[8%] left-1/2 -translate-x-1/2 text-[13px] md:text-[14px] text-(--color-ink-3) font-mono text-center px-6 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 5.5, times: [0, 0.2, 0.7, 1], ease: EASE }}
      >
        {phase === "people"
          ? "Двигайте курсором — люди начнут находить друг друга."
          : "Курсор рядом со стратегией наводит порядок."}
      </motion.p>

      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Cursor-to-point threads for nearby people — the "weaving" cue */}
        {pointer && people.map((p, i) => {
          if (!touchedPeople.has(i)) return null;
          const d = dist(pointer.x, pointer.y, p.x, p.y);
          if (d > PEOPLE_RADIUS * 1.4) return null;
          return (
            <line key={`thread-${i}`} x1={pointer.x} y1={pointer.y} x2={p.x} y2={p.y}
              stroke="var(--color-signal)" strokeWidth={0.08} opacity={0.4} />
          );
        })}
      </svg>

      {/* People — soft light points, drifting independently, brighten once touched */}
      {people.map((p, i) => {
        const touched = touchedPeople.has(i);
        return (
          <motion.div
            key={`p-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: 5, height: 5, marginLeft: -2.5, marginTop: -2.5 }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              opacity: 1,
              scale: touched ? [1, 1.6, 1.1] : 1,
              x: [0, p.driftX, 0, -p.driftX, 0],
              y: [0, p.driftY, 0, -p.driftY, 0],
              background: touched ? "var(--color-signal)" : "var(--color-ink-2)",
              boxShadow: touched ? "0 0 8px rgba(139,127,255,0.7)" : "none",
            }}
            transition={{
              opacity: { duration: 1, delay: p.delay, ease: EASE },
              scale: { duration: 0.6, ease: EASE },
              x: { duration: p.driftDur, repeat: Infinity, ease: "easeInOut" },
              y: { duration: p.driftDur * 1.15, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        );
      })}

      {/* Strategy — rigid nodes, scattered, snap toward their aligned position once touched */}
      {phase === "strategy" && strategyNodes.map((n, i) => {
        const touched = touchedStrategy.has(i);
        return (
          <motion.div
            key={`s-${i}`}
            className="absolute pointer-events-none"
            style={{ left: 0, top: 0, width: 12, height: 12, marginLeft: -6, marginTop: -6 }}
            initial={{ left: `${n.x0}%`, top: `${n.y0}%`, opacity: 0, rotate: 45 }}
            animate={{
              left: `${touched ? n.tx : n.x0}%`,
              top: `${touched ? n.ty : n.y0}%`,
              opacity: 1,
              rotate: 45,
            }}
            transition={{
              left: { duration: touched ? 1.4 : 0.01, ease: EASE },
              top: { duration: touched ? 1.4 : 0.01, ease: EASE },
              opacity: { duration: 0.9, delay: n.delay, ease: EASE },
            }}
          >
            <div
              className="w-full h-full border-2 transition-colors duration-500"
              style={{
                borderColor: "var(--color-warn)",
                background: touched ? "rgba(245,183,49,0.35)" : "rgba(245,183,49,0.08)",
                boxShadow: touched ? "0 0 10px rgba(245,183,49,0.5)" : "none",
              }}
            />
          </motion.div>
        );
      })}

      {/* Escape hatches */}
      {phase === "people" && showEscapePeople && (
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          onClick={() => { if (!peopleSatisfiedRef.current) { peopleSatisfiedRef.current = true; onPeopleSatisfied(); } }}
          className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-[12px] font-mono text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors px-4 py-2 rounded-lg border border-(--color-border) hover:border-(--color-signal)/40"
        >
          Продолжить
        </motion.button>
      )}
      {phase === "strategy" && showEscapeStrategy && (
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          onClick={() => { if (!strategySatisfiedRef.current) { strategySatisfiedRef.current = true; onStrategySatisfied(); } }}
          className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-[12px] font-mono text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors px-4 py-2 rounded-lg border border-(--color-border) hover:border-(--color-warn)/40"
        >
          Продолжить
        </motion.button>
      )}
    </div>
  );
}
