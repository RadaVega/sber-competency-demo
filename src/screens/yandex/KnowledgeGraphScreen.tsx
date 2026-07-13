import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/Card";
import { bi } from "@/lib/bi";
import { useViewMode } from "@/lib/ViewModeContext";
import { knowledgeGraphNodes, knowledgeGraphEdges, type KGNode } from "@/data/yandexData";

/**
 * The central object of the Yandex scenario — not a dashboard, a living
 * knowledge graph. Every completed project becomes a permanent node instead
 * of disappearing into a closed ticket. VP sees velocity and duplication
 * risk; Engineer sees where to plug in and who to learn from.
 */

const typeMeta: Record<KGNode["type"], { color: string; label: string }> = {
  research:    { color: "#4FA8E8", label: "Исследование" },
  product:     { color: "var(--color-good)", label: "Продукт" },
  team:        { color: "var(--color-warn)", label: "Команда" },
  expert:      { color: "var(--color-signal)", label: "Эксперт" },
  competency:  { color: "#7C6EFF", label: "Компетенция" },
  technology:  { color: "#FF8A5B", label: "Технология" },
  ai:          { color: "#FFCC00", label: "AI" },
};

const positions: Record<string, { x: number; y: number }> = {
  r1: { x: 100, y: 90 }, r2: { x: 100, y: 340 },
  p1: { x: 340, y: 60 }, p2: { x: 340, y: 380 },
  t1: { x: 560, y: 90 }, t2: { x: 560, y: 340 },
  e1: { x: 780, y: 300 }, e2: { x: 780, y: 130 },
  c1: { x: 900, y: 200 }, c2: { x: 900, y: 380 },
  tech1: { x: 1000, y: 90 }, ai1: { x: 470, y: 220 },
};

export function KnowledgeGraphScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { isVP } = useViewMode();
  const [selected, setSelected] = useState<string | null>(null);
  const selectedNode = knowledgeGraphNodes.find((n) => n.id === selected) ?? null;

  const connectedIds = selected
    ? new Set(knowledgeGraphEdges.filter((e) => e.from === selected || e.to === selected).flatMap((e) => [e.from, e.to]))
    : null;

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
            <ArrowLeft className="h-3.5 w-3.5" /> Инициатива
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Organizational Knowledge Graph", "Граф знаний организации")}
          </div>
          <h1 className="font-display text-[32px] text-(--color-ink-1) leading-tight max-w-[700px]">
            {isVP
              ? "Каждый завершённый проект становится вершиной, а не закрытым тикетом"
              : "Найдите, где эта работа уже была сделана — и кем"}
          </h1>
        </div>
        <button onClick={onNext} className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0">
          Карта возможностей
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <Card className="mb-6 p-6">
        <svg viewBox="0 0 1080 460" className="w-full h-auto">
          {knowledgeGraphEdges.map((edge, i) => {
            const from = positions[edge.from], to = positions[edge.to];
            if (!from || !to) return null;
            const dim = selected && !(connectedIds?.has(edge.from) && connectedIds?.has(edge.to));
            return (
              <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="var(--color-border)" strokeWidth={1.5}
                opacity={dim ? 0.15 : 0.6} />
            );
          })}
          {knowledgeGraphNodes.map((node) => {
            const pos = positions[node.id];
            if (!pos) return null;
            const meta = typeMeta[node.type];
            const isSelected = selected === node.id;
            const dim = selected && !connectedIds?.has(node.id);
            return (
              <g key={node.id} onClick={() => setSelected(isSelected ? null : node.id)} className="cursor-pointer" opacity={dim ? 0.3 : 1}>
                <circle cx={pos.x} cy={pos.y} r={isSelected ? 11 : 8} fill={meta.color} />
                {isSelected && <circle cx={pos.x} cy={pos.y} r={17} fill="none" stroke={meta.color} strokeWidth={1.5} opacity={0.5} />}
                <text x={pos.x} y={pos.y - 16} textAnchor="middle" fontSize="12.5"
                  fontFamily="IBM Plex Mono, monospace" fill="var(--color-ink-1)">
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <Card className="p-5">
          <div className="flex flex-wrap gap-4">
            {Object.entries(typeMeta).map(([key, meta]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.color }} />
                <span className="text-[12px] text-(--color-ink-2)">{meta.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          {selectedNode ? (
            <>
              <div className="text-[11px] font-mono uppercase tracking-[0.08em] mb-2" style={{ color: typeMeta[selectedNode.type].color }}>
                {typeMeta[selectedNode.type].label}
              </div>
              <div className="text-[14px] text-(--color-ink-1) font-medium mb-2">{selectedNode.label}</div>
              <p className="text-[12.5px] text-(--color-ink-3) leading-relaxed">
                {connectedIds ? `${connectedIds.size - 1} прямых связей в графе.` : ""}
              </p>
            </>
          ) : (
            <p className="text-[12.5px] text-(--color-ink-3) leading-relaxed">
              Нажмите на любой узел графа, чтобы увидеть его связи с исследованиями, продуктами, командами и компетенциями.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
