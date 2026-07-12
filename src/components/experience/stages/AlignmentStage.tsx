import { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Act 5. Only now does AI appear — not as a chat window, not as a logo.
 * It notices what the user already began: specific people finding specific
 * projects. Four named pairs light up one at a time, connected by a drawn
 * thread — matching, not merging. This directly continues the visual
 * language the user just built with their own cursor in InteractiveField.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const PAIRS = [
  { human: "Инженер с опытом в материалах", org: "Проект новых сплавов" },
  { human: "Специалист по данным", org: "Цифровой двойник производства" },
  { human: "Молодой руководитель проекта", org: "Стратегическая инициатива" },
  { human: "Наставник с 20-летним стажем", org: "Программа передачи знаний" },
];

const POS = [
  { hx: 78, hy: 22, ox: 22, oy: 22 },
  { hx: 82, hy: 44, ox: 18, oy: 44 },
  { hx: 76, hy: 66, ox: 24, oy: 66 },
  { hx: 84, hy: 86, ox: 20, oy: 86 },
];

export function AlignmentStage({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1200 + PAIRS.length * 1700 + 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="absolute inset-0">
      <motion.p
        className="absolute top-[8%] left-1/2 -translate-x-1/2 text-[14px] md:text-[16px] text-(--color-ink-2) font-mono text-center px-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: EASE }}
      >
        AI замечает совпадения
      </motion.p>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="alignGradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="var(--color-warn)" />
            <stop offset="100%" stopColor="var(--color-signal)" />
          </linearGradient>
        </defs>
        {POS.map((p, i) => (
          <motion.path
            key={i}
            d={`M ${p.hx} ${p.hy} Q ${(p.hx + p.ox) / 2} ${(p.hy + p.oy) / 2 - 5} ${p.ox} ${p.oy}`}
            fill="none" stroke="url(#alignGradient)" strokeWidth={0.35} strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.2 + i * 1.7 }}
          />
        ))}
      </svg>

      {PAIRS.map((pair, i) => (
        <div key={i}>
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
            style={{ left: `${POS[i].hx}%`, top: `${POS[i].hy}%` }}
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 + i * 1.7 }}
          >
            <div className="h-4 w-4 rounded-full" style={{ background: "radial-gradient(circle, rgba(245,183,49,0.85) 0%, transparent 100%)", boxShadow: "0 0 10px rgba(245,183,49,0.5)" }} />
            <span className="text-[12px] font-mono text-(--color-ink-2) max-w-[160px]">{pair.human}</span>
          </motion.div>
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 flex-row-reverse text-right"
            style={{ left: `${POS[i].ox}%`, top: `${POS[i].oy}%` }}
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 + i * 1.7 }}
          >
            <div className="h-4 w-4 border-2 rotate-45" style={{ borderColor: "var(--color-signal)", background: "rgba(139,127,255,0.3)" }} />
            <span className="text-[12px] font-mono text-(--color-ink-2) max-w-[160px]">{pair.org}</span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
