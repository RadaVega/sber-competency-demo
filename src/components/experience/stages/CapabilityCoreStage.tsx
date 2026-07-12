import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { BRAND_RU, BRAND_EN } from "@/data/branding";

/**
 * Act 3 — the platform reveals itself not as a static logo-like orb, but as
 * a living network: small nodes fade in around a core and connect into it,
 * one at a time. This is the visual definition of "organizational
 * intelligence" — many points becoming one coordinated system — folded
 * directly into the intro instead of living behind a separate unlockable
 * screen.
 *
 * Ends with an explicit bridge line so the viewer knows what the rest of
 * the product actually does about the problem they just watched — the
 * "Aha" only lands if it's immediately followed by "...and here's how."
 */
const EASE = [0.16, 1, 0.3, 1] as const;
const NODE_COUNT = 22;

export function CapabilityCoreStage({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 8200);
    return () => clearTimeout(t);
  }, [onDone]);

  const nodes = useMemo(() => Array.from({ length: NODE_COUNT }, (_, i) => {
    const angle = (i / NODE_COUNT) * Math.PI * 2 + Math.random() * 0.3;
    const r = 14 + Math.random() * 12;
    return {
      x: 50 + Math.cos(angle) * r,
      y: 50 + Math.sin(angle) * r,
      delay: 0.2 + Math.random() * 1.4,
      color: Math.random() > 0.5 ? "var(--color-signal)" : "var(--color-warn)",
    };
  }), []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8">
      <div className="relative w-[280px] h-[220px] md:w-[340px] md:h-[260px]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {nodes.map((n, i) => (
            <motion.line
              key={`line-${i}`} x1={50} y1={50} x2={n.x} y2={n.y}
              stroke={n.color} strokeWidth={0.25}
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1, ease: EASE, delay: n.delay }}
            />
          ))}
          {nodes.map((n, i) => (
            <motion.circle
              key={`node-${i}`} cx={n.x} cy={n.y} r={1.4} fill={n.color}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.9, scale: [0, 1.4, 1] }}
              transition={{ duration: 0.8, ease: EASE, delay: n.delay }}
            />
          ))}
        </svg>
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,127,255,0.9) 0%, rgba(245,183,49,0.4) 55%, transparent 100%)" }}
          initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [0.6, 1.1, 1], opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
      </div>

      <motion.div className="text-center"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 1.6 }}
      >
        <div className="font-display text-[28px] md:text-[34px] text-gradient-accent leading-tight">
          {BRAND_RU}
        </div>
        <div className="text-[14px] text-(--color-ink-3) font-mono mt-2">
          ({BRAND_EN})
        </div>
        <p className="text-[14px] text-(--color-ink-2) mt-5 max-w-[540px] mx-auto leading-relaxed">
          Не отдельные люди. Не отдельная стратегия. Единая живая сеть, которая
          видит оба мира сразу — и соединяет их быстрее, чем это может сделать
          любой человек в одиночку.
        </p>
        <motion.p
          className="text-[13px] text-(--color-signal) font-mono mt-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 3.2 }}
        >
          Дальше — как именно это работает для вашей организации.
        </motion.p>
      </motion.div>
    </div>
  );
}
