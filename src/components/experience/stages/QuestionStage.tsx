import { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Act 1. Full darkness, one question, then nothing — until the user makes
 * the first move. That's the whole point: the user becomes a participant
 * in the system's birth from their very first action, not the eleventh
 * screen they click through.
 */
export function QuestionStage({ onEngaged }: { onEngaged: () => void }) {
  useEffect(() => {
    let fired = false;
    function fire() {
      if (fired) return;
      fired = true;
      onEngaged();
    }
    window.addEventListener("pointermove", fire, { once: true });
    window.addEventListener("pointerdown", fire, { once: true });
    window.addEventListener("keydown", fire, { once: true });
    return () => {
      window.removeEventListener("pointermove", fire);
      window.removeEventListener("pointerdown", fire);
      window.removeEventListener("keydown", fire);
    };
  }, [onEngaged]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 gap-8">
      <motion.p
        className="font-display text-[26px] md:text-[38px] text-(--color-ink-1) text-center leading-snug max-w-[760px]"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        Почему большинство стратегий
        <br />
        так трудно реализовать?
      </motion.p>
      <motion.p
        className="text-[12.5px] text-(--color-ink-3) font-mono"
        initial={{ opacity: 0 }} animate={{ opacity: [0, 0.7, 0.7, 0.3, 0.7] }}
        transition={{ duration: 4, delay: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        Сдвиньте курсор, чтобы начать
      </motion.p>
    </div>
  );
}
