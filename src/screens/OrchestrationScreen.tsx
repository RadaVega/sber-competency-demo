import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Check, Loader2 } from "lucide-react";
import { Card } from "@/components/Card";
import { agentChain } from "@/data/mockData";
import { bi } from "@/lib/bi";
import { useLiveMode } from "@/lib/LiveModeContext";

// SVG canvas
const VIEW   = 680;
const CX     = VIEW / 2;
const CY     = VIEW / 2;
const HUB_R  = 70;
const RING_R = 84;        // decorative outer ring on hub
const DIST   = 220;       // center-to-node distance
const NR     = 42;        // node radius
const STEP   = 950;
const GAP    = 180;

type SS = "pending" | "active" | "done";

function pos(i: number, n: number) {
  const a = (Math.PI * 2 * i) / n - Math.PI / 2;
  return { x: CX + DIST * Math.cos(a), y: CY + DIST * Math.sin(a) };
}

// Label offset so it never overlaps the node
function labelPos(i: number, n: number) {
  const a = (Math.PI * 2 * i) / n - Math.PI / 2;
  const d = DIST + NR + 22;
  return { x: CX + d * Math.cos(a), y: CY + d * Math.sin(a) };
}

// Icons per agent (emoji for SVG text)
const agentIcons = ["🔍", "🌐", "🧩", "📊", "🎓", "👥", "📋"];

export function OrchestrationScreen({
  onBack,
  onNext,
  accentColor = "#E8A33D",
}: {
  onBack: () => void;
  onNext: () => void;
  accentColor?: string;
}) {
  const [step, setStep] = useState(-1);
  const [runId, setRunId] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { isLive } = useLiveMode();

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStep(-1);
    agentChain.forEach((_, i) => {
      const t = setTimeout(() => setStep(i), i * (STEP + GAP) + 400);
      timers.current.push(t);
    });
    const done = setTimeout(() => setStep(agentChain.length), agentChain.length * (STEP + GAP) + 400);
    timers.current.push(done);
    return () => timers.current.forEach(clearTimeout);
  }, [runId]);

  const allDone = step === agentChain.length;

  function stateOf(i: number): SS {
    if (step > i) return "done";
    if (step === i) return "active";
    return "pending";
  }

  // derive dark/light accent variants
  const accentGlow  = accentColor + "66"; // 40% alpha

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      {/* Level 1 — plain human observation, no corporate language */}
      <div className="mb-8 text-center">
        <p className="font-display text-[22px] md:text-[26px] text-(--color-ink-1) leading-snug max-w-[620px] mx-auto">
          Почему хороший дирижёр не играет ни на одном инструменте?
        </p>
        <p className="text-[13.5px] text-(--color-ink-2) mt-4 max-w-[560px] mx-auto leading-relaxed">
          Он не быстрее скрипача и не точнее валторниста. Его работа — знать,
          кому вступать и когда, чтобы семьдесят разных инструментов звучали
          как одна мысль, а не как семьдесят отдельных партий.
        </p>
      </div>

      {/* ---- Header ---- */}
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
          <h1 className="font-display text-[30px] text-(--color-ink-1) leading-tight max-w-[600px]">
            Один ответ вместо четырёх систем и трёх недель ожидания
          </h1>
          <p className="text-[13px] text-(--color-ink-2) mt-2 max-w-[560px] leading-relaxed">
            Раньше ответ на кадровый вопрос собирали вручную — из HR, финансов,
            проектного офиса и линейных руководителей. Здесь семь специализированных
            агентов делают то же самое за минуты. Решение всё равно принимает человек — не AI.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setRunId(id => id + 1)}
            className="flex items-center gap-2 rounded-md border border-(--color-border) px-4 py-2.5 text-[13px] font-medium text-(--color-ink-1) hover:bg-(--color-surface-raised) transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Повторить
          </button>
          {allDone && (
            <button
              onClick={onNext}
              className="group flex items-center gap-2 rounded-md px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all"
              style={{ background: accentColor }}
            >
              {bi("Executive Recommendation", "Рекомендация")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ---- Radial diagram ---- */}
        <div className="lg:col-span-2">
          <Card className="relative overflow-hidden">
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

            {/* Glow behind hub */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
              style={{
                width: 220,
                height: 220,
                background: accentGlow,
                opacity: 0.35,
              }}
            />

            <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="w-full h-auto relative z-10">
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={accentColor} stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#161B25" stopOpacity="1" />
                </radialGradient>
              </defs>

              {/* ---- Connection lines ---- */}
              {agentChain.map((ag, i) => {
                const p  = pos(i, agentChain.length);
                const dx = p.x - CX, dy = p.y - CY;
                const len = Math.hypot(dx, dy);
                const ux = dx / len, uy = dy / len;
                const st = stateOf(i);
                const x1 = CX + ux * HUB_R, y1 = CY + uy * HUB_R;
                const x2 = p.x - ux * NR, y2 = p.y - uy * NR;
                return (
                  <g key={ag.id}>
                    {/* background track */}
                    <line x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="#232A37" strokeWidth={2} strokeLinecap="round" />
                    {/* active/done overlay */}
                    <line x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={accentColor}
                      strokeWidth={st === "active" ? 2.5 : 1.5}
                      strokeLinecap="round"
                      opacity={st === "pending" ? 0 : st === "active" ? 0.9 : 0.5}
                      style={{ transition: "opacity 0.5s ease" }}
                    />
                    {/* traveling pulse */}
                    {st === "active" && (
                      <circle r={6} fill={accentColor} opacity={0.95} filter="url(#glow)">
                        <animate attributeName="cx" from={CX} to={p.x} dur={`${STEP}ms`} fill="freeze" key={`cx-${runId}-${i}`} />
                        <animate attributeName="cy" from={CY} to={p.y} dur={`${STEP}ms`} fill="freeze" key={`cy-${runId}-${i}`} />
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur={`${STEP}ms`} fill="freeze" key={`op-${runId}-${i}`} />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* ---- Nodes ---- */}
              {agentChain.map((ag, i) => {
                const p  = pos(i, agentChain.length);
                const lp = labelPos(i, agentChain.length);
                const st = stateOf(i);
                const nodeColor = st === "done"
                  ? "#4FAE82"
                  : st === "active"
                  ? accentColor
                  : "#232A37";
                const nodeFill  = st === "pending" ? "#11151D" : "#161B25";

                return (
                  <g key={ag.id}>
                    {/* pulse ring on active */}
                    {st === "active" && (
                      <circle cx={p.x} cy={p.y} r={NR} fill="none"
                        stroke={accentColor} strokeWidth={1.5} opacity={0.4}>
                        <animate attributeName="r" values={`${NR};${NR + 18}`} dur="1.3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0" dur="1.3s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* node circle */}
                    <circle cx={p.x} cy={p.y} r={NR}
                      fill={nodeFill}
                      stroke={nodeColor}
                      strokeWidth={st === "active" ? 2.5 : 1.5}
                      filter={st !== "pending" ? "url(#glow)" : undefined}
                      style={{ transition: "stroke 0.4s, fill 0.4s" }}
                    />
                    {/* icon */}
                    <text x={p.x} y={p.y - 4} textAnchor="middle"
                      fontSize={18} fontFamily="Inter">
                      {agentIcons[i]}
                    </text>
                    {/* number */}
                    <text x={p.x} y={p.y + 14} textAnchor="middle"
                      fontSize={10} fontFamily="IBM Plex Mono"
                      fill={st === "pending" ? "#5C6680" : "#9AA4B6"}>
                      {String(i + 1).padStart(2, "0")}
                    </text>

                    {/* label outside node — split on space */}
                    {(() => {
                      const words = ag.name.split(" ");
                      const line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
                      const line2 = words.slice(Math.ceil(words.length / 2)).join(" ");
                      const textFill = st === "pending" ? "#5C6680" : "#E7EAF0";
                      return (
                        <g>
                          <text x={lp.x} y={lp.y - 6} textAnchor="middle"
                            fontSize={11} fontFamily="Inter" fontWeight={st === "active" ? "600" : "400"}
                            fill={textFill} style={{ transition: "fill 0.4s" }}>
                            {line1}
                          </text>
                          {line2 && (
                            <text x={lp.x} y={lp.y + 8} textAnchor="middle"
                              fontSize={11} fontFamily="Inter" fontWeight={st === "active" ? "600" : "400"}
                              fill={textFill} style={{ transition: "fill 0.4s" }}>
                              {line2}
                            </text>
                          )}
                        </g>
                      );
                    })()}
                  </g>
                );
              })}

              {/* ---- Hub ---- */}
              {/* decorative outer ring */}
              <circle cx={CX} cy={CY} r={RING_R} fill="none"
                stroke={accentColor} strokeWidth={0.5} opacity={0.3}
                strokeDasharray="4 6" />
              {/* hub body */}
              <circle cx={CX} cy={CY} r={HUB_R}
                fill="url(#hubGrad)"
                stroke={accentColor} strokeWidth={2}
                filter="url(#glow)" />
              {/* hub text */}
              <text x={CX} y={CY - 10} textAnchor="middle"
                fontSize={9} fontFamily="IBM Plex Mono" letterSpacing={2}
                fill="#9AA4B6">
                AGENTIC
              </text>
              <text x={CX} y={CY + 6} textAnchor="middle"
                fontSize={15} fontFamily="Inter" fontWeight="600"
                fill="#E7EAF0">
                Orchestrator
              </text>
              {step >= 0 && step < agentChain.length && (
                <text x={CX} y={CY + 22} textAnchor="middle"
                  fontSize={9} fontFamily="IBM Plex Mono"
                  fill={accentColor}>
                  agent {step + 1}/{agentChain.length}
                </text>
              )}
              {allDone && (
                <text x={CX} y={CY + 22} textAnchor="middle"
                  fontSize={9} fontFamily="IBM Plex Mono"
                  fill="#4FAE82">
                  ✓ complete
                </text>
              )}
            </svg>
          </Card>
        </div>

        {/* ---- Agent log ---- */}
        <Card className="lg:col-span-1 flex flex-col">
          <div className="px-5 py-4 border-b border-(--color-border-soft) flex items-center justify-between">
            <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em]">
              Agent Log
            </div>
            {isLive && (
              <span className="text-[10px] font-mono text-(--color-good) flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-(--color-good) animate-pulse" />
                GigaChat
              </span>
            )}
          </div>
          <div className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
            {agentChain.map((ag, i) => {
              const st = stateOf(i);
              return (
                <div key={ag.id}
                  className={`rounded-lg px-3 py-2.5 transition-all duration-300 ${
                    st === "active" ? "bg-(--color-surface-raised) ring-1" : ""
                  }`}
                  
                >
                  <div className="flex items-center gap-2.5">
                    <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                      {st === "done" && <Check className="h-3.5 w-3.5 text-(--color-good)" />}
                      {st === "active" && <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: accentColor }} />}
                      {st === "pending" && <div className="h-3 w-3 rounded-full border border-(--color-border)" />}
                    </div>
                    <div>
                      <span className={`text-[12px] font-mono ${
                        st === "pending" ? "text-(--color-ink-3)" : "text-(--color-ink-1)"
                      }`}>
                        {ag.nameEn}
                      </span>
                      {st === "active" && (
                        <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.08em]"
                          style={{ color: accentColor }}>
                          running
                        </span>
                      )}
                    </div>
                  </div>
                  {st !== "pending" && (
                    <p className="text-[11.5px] text-(--color-ink-2) leading-relaxed mt-1.5 pl-7">
                      {ag.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {allDone && (
            <div className="px-5 py-4 border-t border-(--color-border-soft) bg-(--color-good-soft) rounded-b-lg">
              <div className="text-[12px] text-(--color-good) flex items-center gap-2 font-medium">
                <Check className="h-4 w-4" />
                Готово за 40 секунд — раньше это занимало три недели согласований
              </div>
            </div>
          )}
        </Card>
      </div>

      <div className="mt-8 rounded-xl border border-(--color-signal)/25 px-5 py-5 max-w-[720px] mx-auto">
        <div className="text-[10.5px] text-(--color-signal) font-mono uppercase tracking-[0.08em] mb-2.5 text-center">
          Вопрос руководителю
        </div>
        <p className="text-[14px] text-(--color-ink-1) leading-relaxed text-center">
          Сколько сейчас разных систем нужно опросить, чтобы получить один
          обоснованный ответ на кадровый вопрос — и кто в компании держит
          в голове, как их свести воедино?
        </p>
      </div>
    </div>
  );
}
