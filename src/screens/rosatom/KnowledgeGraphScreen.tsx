import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/Card";
import { bi } from "@/lib/bi";
import { knowledgeGraphNodes, knowledgeGraphEdges, type KnowledgeGraphNode } from "@/data/rosatomData";
import { useViewMode } from "@/lib/ViewModeContext";

const typeMeta: Record<KnowledgeGraphNode["type"], { color: string; label: string }> = {
  expert:     { color: "var(--color-signal)", label: "Эксперт" },
  competency: { color: "#7C6EFF", label: "Компетенция" },
  project:    { color: "var(--color-good)", label: "Проект" },
  technology: { color: "#4FA8E8", label: "Технология" },
  mentor:     { color: "var(--color-warn)", label: "Наставник" },
  nextgen:    { color: "var(--color-ink-3)", label: "Следующее поколение" },
};

// Fixed layout positions for a calm, legible static graph (viewBox 0 0 960 460)
const positions: Record<string, { x: number; y: number }> = {
  e1: { x: 120, y: 90 },
  e2: { x: 120, y: 340 },
  c1: { x: 380, y: 90 },
  c2: { x: 380, y: 340 },
  p1: { x: 620, y: 90 },
  p2: { x: 620, y: 340 },
  t1: { x: 840, y: 90 },
  m1: { x: 620, y: 220 },
  n1: { x: 840, y: 220 },
  you: { x: 880, y: 380 },
};

export function KnowledgeGraphScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { isVP } = useViewMode();

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
            <ArrowLeft className="h-3.5 w-3.5" /> Риск потери знаний
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {isVP
              ? bi("Engineering Knowledge Graph", "Граф инженерных знаний")
              : bi("Find Your Place in the Graph", "Ваше место в графе знаний")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            {isVP
              ? "Знания компании становятся видимыми и передаваемыми"
              : "Куда вы могли бы встроиться, продолжая развиваться"}
          </h1>
        </div>
        <button onClick={onNext} className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0">
          Сеть экспертов
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <Card className="mb-6 p-6">
        <svg viewBox="0 0 960 460" className="w-full h-auto">
          {knowledgeGraphEdges.map((edge, i) => {
            const from = positions[edge.from];
            const to = positions[edge.to];
            if (!from || !to) return null;
            return (
              <line
                key={i}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="var(--color-border)"
                strokeWidth={1.5}
              />
            );
          })}

          {/* Employee view: an extra "you" node connecting into the next-generation
              engineers cluster — makes the abstract graph personally locatable. */}
          {!isVP && (
            <>
              <line
                x1={positions.you.x} y1={positions.you.y}
                x2={positions.n1.x} y2={positions.n1.y}
                stroke="var(--color-good)"
                strokeWidth={2}
                strokeDasharray="4 3"
              />
              <circle cx={positions.you.x} cy={positions.you.y} r={11} fill="var(--color-good)" opacity={0.25} />
              <circle cx={positions.you.x} cy={positions.you.y} r={8} fill="var(--color-good)" />
              <text
                x={positions.you.x} y={positions.you.y - 18}
                textAnchor="middle" fontSize="13" fontWeight="600"
                fontFamily="IBM Plex Mono, monospace" fill="var(--color-good)"
              >
                Вы
              </text>
            </>
          )}

          {knowledgeGraphNodes.map((node) => {
            const pos = positions[node.id];
            if (!pos) return null;
            const meta = typeMeta[node.type];
            return (
              <g key={node.id}>
                <circle cx={pos.x} cy={pos.y} r={8} fill={meta.color} />
                <text
                  x={pos.x}
                  y={pos.y - 16}
                  textAnchor="middle"
                  fontSize="13"
                  fontFamily="IBM Plex Mono, monospace"
                  fill="var(--color-ink-1)"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </Card>

      {!isVP && (
        <Card className="mb-6 p-5 border-(--color-good)/25">
          <p className="text-[13px] text-(--color-ink-2) leading-relaxed">
            <span className="text-(--color-good) font-medium">Ваш путь в граф:</span>{" "}
            развиваясь рядом с наставником, вы входите в цепочку передачи знаний — от эксперта к компетенции,
            от компетенции к проекту, и дальше к следующему поколению инженеров, которое однажды поведёте уже вы.
          </p>
        </Card>
      )}

      <Card className="p-5">
        <div className="flex flex-wrap gap-4">
          {Object.entries(typeMeta).map(([key, meta]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.color }} />
              <span className="text-[12px] text-(--color-ink-2)">{meta.label}</span>
            </div>
          ))}
          {!isVP && (
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-good)" }} />
              <span className="text-[12px] text-(--color-ink-2)">Вы</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
