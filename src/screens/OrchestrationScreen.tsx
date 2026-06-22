import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Check, Loader2 } from "lucide-react";
import { Card } from "@/components/Card";
import { agentChain } from "@/data/mockData";
import { bi } from "@/lib/bi";

const VIEW = 600;
const CX = VIEW / 2;
const CY = VIEW / 2;
const HUB_R = 62;
const NODE_DIST = 218;
const NODE_R = 40;
const STEP_MS = 1000;
const GAP_MS = 250;

type StepState = "pending" | "active" | "done";

function nodePos(i: number, count: number) {
  const angle = -90 + (360 / count) * i;
  const rad = (angle * Math.PI) / 180;
  return {
    x: CX + NODE_DIST * Math.cos(rad),
    y: CY + NODE_DIST * Math.sin(rad),
  };
}

export function OrchestrationScreen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [step, setStep] = useState(-1); // -1 = not started, N = all done
  const [runId, setRunId] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStep(-1);

    agentChain.forEach((_, i) => {
      const t = setTimeout(() => setStep(i), i * (STEP_MS + GAP_MS) + 300);
      timers.current.push(t);
    });
    const finalT = setTimeout(
      () => setStep(agentChain.length),
      agentChain.length * (STEP_MS + GAP_MS) + 300
    );
    timers.current.push(finalT);

    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId]);

  const allDone = step === agentChain.length;

  function stateOf(i: number): StepState {
    if (step > i) return "done";
    if (step === i) return "active";
    return "pending";
  }

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Команда
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Agentic AI Orchestration", "Оркестрация агентного ИИ")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            Оркестрация агентов
          </h1>
          <p className="text-[13px] text-(--color-ink-2) mt-3 max-w-[560px]">
            AI не заменяет человека. AI координирует специализированных
            агентов, чтобы ускорить принятие решений.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setRunId((id) => id + 1)}
            className="flex items-center gap-2 rounded-md border border-(--color-border) px-4 py-3 text-[13px] font-medium text-(--color-ink-1) hover:bg-(--color-surface-raised) transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Повторить
          </button>
          {allDone && (
            <button
              onClick={onNext}
              className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all"
            >
              Executive Recommendation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ---- Radial diagram ---- */}
        <Card className="md:col-span-2 relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
          <div className="relative p-6">
            <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="w-full h-auto">
              {/* connecting lines */}
              {agentChain.map((agent, i) => {
                const p = nodePos(i, agentChain.length);
                const dx = p.x - CX;
                const dy = p.y - CY;
                const len = Math.hypot(dx, dy);
                const ux = dx / len;
                const uy = dy / len;
                const x1 = CX + ux * HUB_R;
                const y1 = CY + uy * HUB_R;
                const x2 = p.x - ux * NODE_R;
                const y2 = p.y - uy * NODE_R;
                const st = stateOf(i);
                return (
                  <line
                    key={agent.id}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={st === "pending" ? "#232A37" : "#E8A33D"}
                    strokeWidth={st === "active" ? 2.5 : 1.5}
                    strokeLinecap="round"
                    style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
                    opacity={st === "pending" ? 0.6 : 1}
                  />
                );
              })}

              {/* traveling pulse on the active edge */}
              {step >= 0 &&
                step < agentChain.length &&
                (() => {
                  const p = nodePos(step, agentChain.length);
                  return (
                    <circle r={5} fill="#E8A33D">
                      <animate
                        attributeName="cx"
                        from={CX}
                        to={p.x}
                        dur={`${STEP_MS}ms`}
                        begin="0s"
                        fill="freeze"
                        key={`cx-${runId}-${step}`}
                      />
                      <animate
                        attributeName="cy"
                        from={CY}
                        to={p.y}
                        dur={`${STEP_MS}ms`}
                        begin="0s"
                        fill="freeze"
                        key={`cy-${runId}-${step}`}
                      />
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        keyTimes="0;0.1;0.85;1"
                        dur={`${STEP_MS}ms`}
                        fill="freeze"
                        key={`op-${runId}-${step}`}
                      />
                    </circle>
                  );
                })()}

              {/* agent nodes */}
              {agentChain.map((agent, i) => {
                const p = nodePos(i, agentChain.length);
                const st = stateOf(i);
                return (
                  <g key={agent.id} style={{ transition: "transform 0.4s ease" }}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={NODE_R}
                      fill={st === "pending" ? "#11151D" : "#161B25"}
                      stroke={
                        st === "done"
                          ? "#4FAE82"
                          : st === "active"
                          ? "#E8A33D"
                          : "#232A37"
                      }
                      strokeWidth={st === "active" ? 2.5 : 1.5}
                      style={{ transition: "stroke 0.4s ease" }}
                    />
                    {st === "active" && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={NODE_R}
                        fill="none"
                        stroke="#E8A33D"
                        strokeWidth={1.5}
                        opacity={0.5}
                      >
                        <animate
                          attributeName="r"
                          values={`${NODE_R};${NODE_R + 14}`}
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.5;0"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    <text
                      x={p.x}
                      y={p.y + 5}
                      textAnchor="middle"
                      fontSize={18}
                      fontFamily="IBM Plex Mono"
                      fill={st === "pending" ? "#5C6680" : "#E7EAF0"}
                    >
                      {i + 1}
                    </text>
                  </g>
                );
              })}

              {/* hub */}
              <circle cx={CX} cy={CY} r={HUB_R} fill="#161B25" stroke="#E8A33D" strokeWidth={2} />
              <text
                x={CX}
                y={CY - 6}
                textAnchor="middle"
                fontSize={11}
                fontFamily="IBM Plex Mono"
                fill="#9AA4B6"
              >
                AGENTIC
              </text>
              <text
                x={CX}
                y={CY + 12}
                textAnchor="middle"
                fontSize={13}
                fontFamily="Inter"
                fontWeight={600}
                fill="#E7EAF0"
              >
                Orchestrator
              </text>
            </svg>

            {/* HTML labels overlaid at node positions, in percentage coords */}
            <div className="absolute inset-0 p-6 pointer-events-none">
              {agentChain.map((agent, i) => {
                const p = nodePos(i, agentChain.length);
                const leftPct = (p.x / VIEW) * 100;
                const topPct = (p.y / VIEW) * 100;
                const st = stateOf(i);
                // push label outward from node so it doesn't overlap the circle
                const angle = -90 + (360 / agentChain.length) * i;
                const rad = (angle * Math.PI) / 180;
                const labelOffset = 56;
                const offX = Math.cos(rad) * labelOffset;
                const offY = Math.sin(rad) * labelOffset;
                return (
                  <div
                    key={agent.id}
                    className="absolute -translate-x-1/2 flex flex-col items-center w-[120px]"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      transform: `translate(calc(-50% + ${offX}px), calc(-50% + ${offY}px))`,
                    }}
                  >
                    <span
                      className={`text-[11.5px] font-medium text-center leading-tight transition-colors ${
                        st === "pending" ? "text-(--color-ink-3)" : "text-(--color-ink-1)"
                      }`}
                    >
                      {agent.name}
                    </span>
                    {st === "active" && (
                      <span className="text-[10px] text-(--color-signal) font-mono mt-0.5">
                        выполняется
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* ---- Agent log ---- */}
        <Card className="col-span-1">
          <div className="p-5 border-b border-(--color-border-soft)">
            <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em]">
              Agent Log
            </div>
          </div>
          <div className="p-3 flex flex-col gap-1">
            {agentChain.map((agent, i) => {
              const st = stateOf(i);
              return (
                <div
                  key={agent.id}
                  className={`rounded-md px-3 py-2.5 transition-colors ${
                    st === "active" ? "bg-(--color-surface-raised)" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="shrink-0">
                      {st === "done" && (
                        <Check className="h-3.5 w-3.5 text-(--color-good)" />
                      )}
                      {st === "active" && (
                        <Loader2 className="h-3.5 w-3.5 text-(--color-signal) animate-spin" />
                      )}
                      {st === "pending" && (
                        <div className="h-3.5 w-3.5 rounded-full border border-(--color-border)" />
                      )}
                    </div>
                    <span
                      className={`text-[12.5px] font-mono ${
                        st === "pending" ? "text-(--color-ink-3)" : "text-(--color-ink-1)"
                      }`}
                    >
                      {agent.nameEn}
                    </span>
                  </div>
                  {st !== "pending" && (
                    <p className="text-[12px] text-(--color-ink-2) leading-relaxed mt-1.5 pl-6">
                      {agent.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {allDone && (
            <div className="p-5 border-t border-(--color-border-soft)">
              <div className="text-[12px] text-(--color-good) flex items-center gap-1.5 font-medium">
                <Check className="h-3.5 w-3.5" />
                Рекомендация руководителю готова
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
