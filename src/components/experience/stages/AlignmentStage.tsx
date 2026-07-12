import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Act 5, reworked around one idea: the human stays in the driving seat.
 * The user connects at least one match themselves — a deliberate click,
 * click — before AI is even offered as an option. Only once they've done
 * that manually can they hand the rest to AI ("Автоматизировать
 * оставшиеся"), which finishes the remaining connections much faster.
 * The contrast in speed IS the point: AI accelerates work the human
 * started and stays in control of, it doesn't replace them.
 *
 * Pairs are placed around a circle at varied angles (not two parallel
 * columns), so connecting threads cross the scene from genuinely different
 * directions — diagonals, near-verticals — rather than uniformly
 * left-to-right.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

interface Node { x: number; y: number; label: string; kind: "org" | "human" }

// Positions computed around a circle (r=36, center 50,50) at varied angles,
// paired so each connecting line crosses the center from a different
// direction than the others.
const NODES: Node[] = [
  { x: 16.2, y: 37.7, label: "Проект новых сплавов", kind: "org" },
  { x: 83.8, y: 62.3, label: "Инженер по материалам", kind: "human" },
  { x: 43.8, y: 85.5, label: "Цифровой двойник производства", kind: "org" },
  { x: 56.3, y: 14.5, label: "Специалист по данным", kind: "human" },
  { x: 16.2, y: 62.3, label: "Стратегическая инициатива", kind: "org" },
  { x: 83.8, y: 37.7, label: "Молодой руководитель проекта", kind: "human" },
  { x: 37.7, y: 16.2, label: "Программа передачи знаний", kind: "org" },
  { x: 62.3, y: 83.8, label: "Наставник с 20-летним стажем", kind: "human" },
];

// [orgNodeIndex, humanNodeIndex]
const PAIRS: [number, number][] = [[0, 1], [2, 3], [4, 5], [6, 7]];

type Mode = "manual" | "automating" | "done";

export function AlignmentStage({ onDone }: { onDone: () => void }) {
  const [connected, setConnected] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>("manual");
  const [lastConnectedBy, setLastConnectedBy] = useState<Record<number, "human" | "ai">>({});
  const [escapeReady, setEscapeReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEscapeReady(true), 12000);
    return () => clearTimeout(t);
  }, []);

  function handleNodeClick(idx: number) {
    if (mode !== "manual") return;
    const pairIdx = PAIRS.findIndex(([a, b]) => (a === idx || b === idx));
    if (connected.has(pairIdx)) return;

    if (selected === null) {
      setSelected(idx);
      return;
    }
    if (selected === idx) { setSelected(null); return; }

    const selectedNode = NODES[selected];
    const clickedNode = NODES[idx];
    if (selectedNode.kind === clickedNode.kind) {
      // same kind clicked twice — just move the selection
      setSelected(idx);
      return;
    }
    // valid org+human pair — connect it. Which specific labels line up is
    // illustrative; the point is the act of connecting, not a matching quiz.
    const finalPairIdx = PAIRS.findIndex(([a, b]) => a === selected || b === selected);
    setConnected((prev) => new Set(prev).add(finalPairIdx));
    setLastConnectedBy((prev) => ({ ...prev, [finalPairIdx]: "human" }));
    setSelected(null);
  }

  function automate() {
    setMode("automating");
    const remaining = PAIRS.map((_, i) => i).filter((i) => !connected.has(i));
    remaining.forEach((pairIdx, seq) => {
      setTimeout(() => {
        setConnected((prev) => new Set(prev).add(pairIdx));
        setLastConnectedBy((prev) => ({ ...prev, [pairIdx]: "ai" }));
      }, 220 * (seq + 1));
    });
    setTimeout(() => setMode("done"), 220 * (remaining.length + 1) + 600);
  }

  useEffect(() => {
    if (mode === "manual" && connected.size === PAIRS.length) setMode("done");
  }, [connected, mode]);

  useEffect(() => {
    if (mode === "done") {
      const t = setTimeout(onDone, 1600);
      return () => clearTimeout(t);
    }
  }, [mode, onDone]);

  const canAutomate = mode === "manual" && connected.size < PAIRS.length && (connected.size >= 1 || escapeReady);

  return (
    <div className="absolute inset-0">
      <motion.p
        className="absolute top-[6%] left-1/2 -translate-x-1/2 text-[14px] md:text-[16px] text-(--color-ink-2) font-mono text-center px-6 max-w-[560px]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: EASE }}
      >
        {connected.size === 0
          ? "Соедините человека с задачей — кликните на одну точку, затем на другую."
          : mode === "manual"
            ? "Остальное может доделать AI — быстрее, но по вашей команде."
            : mode === "automating"
              ? "AI завершает соединения…"
              : "Все связи установлены."}
      </motion.p>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="alignGradientHuman" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-warn)" />
            <stop offset="100%" stopColor="var(--color-signal)" />
          </linearGradient>
          <linearGradient id="alignGradientAI" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-signal)" />
            <stop offset="100%" stopColor="var(--color-good)" />
          </linearGradient>
        </defs>
        {PAIRS.map(([a, b], i) => {
          if (!connected.has(i)) return null;
          const from = NODES[a], to = NODES[b];
          const byAI = lastConnectedBy[i] === "ai";
          return (
            <motion.path
              key={i}
              d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
              fill="none" stroke={byAI ? "url(#alignGradientAI)" : "url(#alignGradientHuman)"}
              strokeWidth={0.4} strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: byAI ? 0.35 : 0.9, ease: EASE }}
            />
          );
        })}
        {/* live preview line while a node is selected, following toward centre */}
        {selected !== null && (
          <line x1={NODES[selected].x} y1={NODES[selected].y} x2={50} y2={50}
            stroke="var(--color-ink-3)" strokeWidth={0.15} strokeDasharray="1 1" opacity={0.5} />
        )}
      </svg>

      {NODES.map((node, i) => {
        const pairIdx = PAIRS.findIndex(([a, b]) => a === i || b === i);
        const isConnected = connected.has(pairIdx);
        const isSelected = selected === i;
        return (
          <motion.button
            key={i}
            onClick={() => handleNodeClick(i)}
            disabled={mode !== "manual" || isConnected}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 group"
            style={{ left: `${node.x}%`, top: `${node.y}%`, cursor: mode === "manual" && !isConnected ? "pointer" : "default" }}
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: isSelected ? 1.25 : 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.12 }}
          >
            {node.kind === "org" ? (
              <div
                className="h-4 w-4 border-2 rotate-45 transition-all duration-300"
                style={{
                  borderColor: "var(--color-signal)",
                  background: isConnected ? "rgba(139,127,255,0.5)" : isSelected ? "rgba(139,127,255,0.35)" : "rgba(139,127,255,0.12)",
                  boxShadow: isConnected || isSelected ? "0 0 10px rgba(139,127,255,0.5)" : "none",
                }}
              />
            ) : (
              <div
                className="h-4 w-4 rounded-full transition-all duration-300"
                style={{
                  background: isConnected
                    ? "radial-gradient(circle, rgba(245,183,49,0.9) 0%, transparent 100%)"
                    : isSelected
                      ? "radial-gradient(circle, rgba(245,183,49,0.6) 0%, transparent 100%)"
                      : "radial-gradient(circle, rgba(245,183,49,0.35) 0%, transparent 100%)",
                  boxShadow: isConnected || isSelected ? "0 0 10px rgba(245,183,49,0.5)" : "none",
                }}
              />
            )}
            <span className="text-[10.5px] font-mono text-(--color-ink-3) group-hover:text-(--color-ink-1) transition-colors max-w-[130px] text-center leading-tight">
              {node.label}
            </span>
          </motion.button>
        );
      })}

      <AnimatePresence>
        {canAutomate && (
          <motion.button
            key="automate"
            onClick={automate}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="absolute bottom-[7%] left-1/2 -translate-x-1/2 text-[13px] font-mono text-(--color-ink-1) px-5 py-2.5 rounded-xl glass border-(--color-good)/30 hover:border-(--color-good)/60 transition-colors"
          >
            Автоматизировать оставшиеся ({PAIRS.length - connected.size})
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
