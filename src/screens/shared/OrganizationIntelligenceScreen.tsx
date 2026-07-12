import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * The hidden third perspective — unlocked only after the viewer has
 * actually experienced both the VP and Employee realities (tracked in
 * App.tsx via seenRoles). This is not a role. It's the system's own view:
 * individual people, departments, and projects dissolve away, leaving a
 * single living network — "the organisation's digital twin of
 * competencies." Five things become visible here that neither the VP nor
 * the Employee view shows on its own.
 *
 * Deliberately built as a standalone overlay (not a nav screen inside any
 * one company mode) since the whole point is that this view sits above
 * any single perspective, synthesizing what both of them saw.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

interface Insight {
  id: string;
  title: string;
  description: string;
  x: number; y: number;
  color: string;
}

const INSIGHTS: Insight[] = [
  {
    id: "teams",
    title: "Где рождаются сильные команды",
    description: "Плотные кластеры связей между экспертами и проектами — здесь команды формируются быстрее и результативнее остальных.",
    x: 26, y: 28, color: "var(--color-good)",
  },
  {
    id: "energy",
    title: "Где стратегия теряет энергию",
    description: "Разрыв между приоритетами и реальными компетенциями — здесь инициативы объявлены, но буксуют месяцами.",
    x: 74, y: 24, color: "var(--color-risk)",
  },
  {
    id: "knowledge",
    title: "Где знания застревают",
    description: "Критическая экспертиза сосредоточена в одной точке без путей передачи — риск потери при уходе одного человека.",
    x: 22, y: 72, color: "var(--color-warn)",
  },
  {
    id: "mentor",
    title: "Где нужен наставник, а не новый сотрудник",
    description: "Пробел компетенций закрывается быстрее передачей знаний внутри организации, чем внешним наймом.",
    x: 78, y: 74, color: "var(--color-signal)",
  },
  {
    id: "future",
    title: "Какие компетенции станут критическими через 3–5 лет",
    description: "Траектория роста стратегических инициатив показывает, где дефицит проявится раньше, чем его заметят.",
    x: 50, y: 50, color: "#7C6EFF",
  },
];

interface Particle { x: number; y: number; delay: number }

export function OrganizationIntelligenceScreen({ onClose }: { onClose: () => void }) {
  const [dissolved, setDissolved] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const particles = useMemo<Particle[]>(() => Array.from({ length: 70 }, () => ({
    x: Math.random() * 96 + 2, y: Math.random() * 90 + 6, delay: Math.random() * 0.8,
  })), []);

  useEffect(() => {
    const t1 = setTimeout(() => setDissolved(true), 2200);
    const t2 = setTimeout(() => setShowInsights(true), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const activeInsight = INSIGHTS.find((i) => i.id === active) ?? null;

  return (
    <div className="fixed inset-0 z-50 bg-(--color-canvas) overflow-hidden overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 text-[12px] font-mono text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors px-3 py-1.5 rounded-lg hover:bg-(--color-surface-raised)"
      >
        <X className="h-3.5 w-3.5" /> Закрыть
      </button>

      <div className="relative min-h-screen flex flex-col items-center pt-20 pb-16 px-6">
        <motion.div
          className="text-center mb-2"
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            Скрытая третья точка зрения
          </div>
          <h1 className="font-display text-[32px] md:text-[40px] text-gradient-accent leading-tight">
            Интеллект организации
          </h1>
          <p className="text-[14px] text-(--color-ink-3) font-mono mt-2">
            Цифровой двойник компетенций организации
          </p>
          <p className="text-[14px] text-(--color-ink-2) mt-4 max-w-[560px] mx-auto leading-relaxed">
            Это уже не взгляд человека и не взгляд руководителя. Это взгляд самой системы —
            единая живая сеть вместо отдельных людей, отделов и проектов.
          </p>
        </motion.div>

        {/* Network visualization */}
        <div className="relative w-full max-w-[880px] aspect-[16/10] mt-6">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Individual entities — dissolve away */}
            <AnimatePresence>
              {!dissolved && particles.map((p, i) => (
                <motion.circle
                  key={`p-${i}`} cx={p.x} cy={p.y} r={0.5}
                  fill="var(--color-ink-3)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0, transition: { duration: 1.4, delay: p.delay * 0.3, ease: EASE } }}
                  transition={{ duration: 0.8, delay: p.delay, ease: EASE }}
                />
              ))}
            </AnimatePresence>

            {/* Living network — settles in once dissolved */}
            {dissolved && INSIGHTS.map((a, i) =>
              INSIGHTS.slice(i + 1).map((b) => (
                <motion.line
                  key={`${a.id}-${b.id}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="var(--color-border)" strokeWidth={0.12}
                  initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
                />
              ))
            )}
            {dissolved && activeInsight && INSIGHTS.filter((i) => i.id !== activeInsight.id).map((other) => (
              <motion.line
                key={`active-${other.id}`}
                x1={activeInsight.x} y1={activeInsight.y} x2={other.x} y2={other.y}
                stroke={activeInsight.color} strokeWidth={0.25}
                initial={{ opacity: 0 }} animate={{ opacity: 0.55 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            ))}
          </svg>

          {/* Cluster nodes */}
          {dissolved && INSIGHTS.map((insight, i) => {
            const isActive = active === insight.id;
            return (
              <motion.button
                key={insight.id}
                onClick={() => setActive(isActive ? null : insight.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ left: `${insight.x}%`, top: `${insight.y}%` }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: isActive ? 1.35 : [1, 1.08, 1] }}
                transition={{
                  opacity: { duration: 1, delay: 0.4 + i * 0.15, ease: EASE },
                  scale: isActive
                    ? { duration: 0.5, ease: EASE }
                    : { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                }}
              >
                <div
                  className="h-9 w-9 md:h-11 md:w-11 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${insight.color} 0%, transparent 72%)`,
                    boxShadow: `0 0 ${isActive ? 22 : 14}px ${insight.color}`,
                    opacity: isActive ? 1 : 0.85,
                  }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Insight cards */}
        <AnimatePresence>
          {showInsights && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10 max-w-[1100px] w-full"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: EASE }}
            >
              {INSIGHTS.map((insight, i) => {
                const isActive = active === insight.id;
                return (
                  <motion.button
                    key={insight.id}
                    onClick={() => setActive(isActive ? null : insight.id)}
                    className="glass rounded-xl p-4 text-left transition-all"
                    style={{
                      borderColor: isActive ? insight.color : undefined,
                      boxShadow: isActive ? `0 0 20px ${insight.color}33` : undefined,
                    }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 * i, ease: EASE }}
                  >
                    <span className="h-2 w-2 rounded-full inline-block mb-2.5" style={{ background: insight.color }} />
                    <div className="text-[13px] text-(--color-ink-1) font-medium leading-snug mb-1.5">
                      {insight.title}
                    </div>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.4 }}
                        className="text-[12px] text-(--color-ink-3) leading-relaxed mt-1.5"
                      >
                        {insight.description}
                      </motion.p>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {showInsights && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            className="text-[12.5px] text-(--color-ink-3) text-center mt-8 max-w-[520px] leading-relaxed"
          >
            Не HR-система. Не AI-ассистент. Инструмент стратегического управления организацией.
          </motion.p>
        )}
      </div>
    </div>
  );
}
