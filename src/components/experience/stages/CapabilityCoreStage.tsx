import { useEffect } from "react";
import { motion } from "framer-motion";

/** Act 6. The core appears — it's now clear it coordinates everything the
 *  user just watched connect. */
const EASE = [0.16, 1, 0.3, 1] as const;

export function CapabilityCoreStage({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 7000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8">
      <motion.div
        className="w-28 h-28 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,127,255,0.9) 0%, rgba(245,183,49,0.4) 55%, transparent 100%)" }}
        initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [0.6, 1.08, 1], opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      />
      <motion.div className="text-center"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 1 }}
      >
        <div className="font-display text-[28px] md:text-[34px] text-gradient-accent leading-tight">
          Capability Intelligence Platform
        </div>
        <div className="text-[14px] text-(--color-ink-3) font-mono mt-2">
          Платформа управления стратегическими компетенциями
        </div>
        <p className="text-[14px] text-(--color-ink-2) mt-5 max-w-[540px] mx-auto leading-relaxed">
          Вы только что соединили людей и стратегию. Именно это система делает
          каждый день — в масштабе всей организации.
        </p>
      </motion.div>
    </div>
  );
}
