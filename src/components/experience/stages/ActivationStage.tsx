import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * The culmination after alignment: the user has connected a few things by
 * hand and watched AI finish a few more. Now they press one button and see
 * what that same idea looks like at real scale — not four connections, but
 * a whole organisation lighting up at once. Visually staged like a star
 * igniting: a bright flash, then a burst of light radiating outward,
 * settling into the steady core that CapabilityCoreStage picks up from.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const PARTICLE_COUNT = 90;

interface Burst { angle: number; dist: number; size: number; delay: number; color: string }

const COLORS = ["var(--color-signal)", "var(--color-warn)", "var(--color-good)"];

export function ActivationStage({ onDone }: { onDone: () => void }) {
  const [activated, setActivated] = useState(false);

  const particles = useMemo<Burst[]>(() => Array.from({ length: PARTICLE_COUNT }, () => ({
    angle: Math.random() * Math.PI * 2,
    dist: 16 + Math.random() * 34,
    size: 1.5 + Math.random() * 2.5,
    delay: Math.random() * 0.35,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  })), []);

  function activate() {
    setActivated(true);
    setTimeout(onDone, 3400);
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!activated ? (
          <motion.div
            key="prompt"
            className="flex flex-col items-center gap-6 px-8 text-center"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <motion.div
              className="w-6 h-6 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(139,127,255,0.8) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="text-[15px] md:text-[17px] text-(--color-ink-2) max-w-[480px] leading-relaxed">
              Вы только что соединили несколько пар вручную — и поручили AI ускорить остальное.
              <br />
              Так это выглядит в масштабе всей организации.
            </p>
            <button
              onClick={activate}
              className="text-[14px] font-mono text-(--color-ink-1) px-6 py-3 rounded-xl glass border-(--color-signal)/30 hover:border-(--color-signal)/60 transition-colors"
            >
              Активировать платформу
            </button>
          </motion.div>
        ) : (
          <motion.div key="burst" className="absolute inset-0" initial={{ opacity: 1 }}>
            {/* Ignition flash */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ width: 40, height: 40, background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(139,127,255,0.7) 40%, transparent 75%)" }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 6, 3.5], opacity: [1, 0.9, 0] }}
              transition={{ duration: 1.1, ease: EASE }}
            />

            {/* Radiating particles — the "many auto connections" burst */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {particles.map((p, i) => {
                const x = 50 + Math.cos(p.angle) * p.dist;
                const y = 50 + Math.sin(p.angle) * p.dist;
                return (
                  <motion.circle
                    key={i} r={p.size / 10}
                    fill={p.color}
                    initial={{ cx: 50, cy: 50, opacity: 0 }}
                    animate={{ cx: [50, x], cy: [50, y], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.8 + p.delay, delay: p.delay, ease: "easeOut" }}
                  />
                );
              })}
              {particles.slice(0, 24).map((p, i) => {
                const x = 50 + Math.cos(p.angle) * (p.dist * 0.6);
                const y = 50 + Math.sin(p.angle) * (p.dist * 0.6);
                return (
                  <motion.line
                    key={`ray-${i}`} x1={50} y1={50} x2={x} y2={y}
                    stroke={p.color} strokeWidth={0.1}
                    initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0] }}
                    transition={{ duration: 1.1, delay: p.delay * 0.5, ease: EASE }}
                  />
                );
              })}
            </svg>

            {/* Settled core — persists, hands off visually into CapabilityCoreStage */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(139,127,255,0.85) 0%, rgba(245,183,49,0.4) 55%, transparent 100%)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 1.6, ease: EASE }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
