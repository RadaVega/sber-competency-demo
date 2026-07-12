import { motion } from "framer-motion";
import type { Role } from "../useExperienceMachine";

/**
 * Act 7. By now the user understands *why* two perspectives exist — they
 * just watched both systems separately, then watched them align. The
 * choice is a continuation of that story, not a landing menu: a question
 * appears alone first, the two paths follow a beat later.
 */
const EASE = [0.16, 1, 0.3, 1] as const;

export function RoleSelectionStage({ onSelect }: { onSelect: (role: Role) => void }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-10 max-w-[860px] w-full">
        <motion.p
          className="font-display text-[22px] md:text-[28px] text-(--color-ink-1) text-center leading-snug max-w-[620px]"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
        >
          С какой точки зрения вы хотите продолжить исследование этой организации?
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <motion.button
            onClick={() => onSelect("vp")}
            className="glass rounded-2xl p-8 text-left border-(--color-signal)/25 hover:border-(--color-signal)/50"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 2.1 }}
          >
            <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-(--color-signal) mb-3">
              Руководитель
            </div>
            <p className="text-[16px] text-(--color-ink-1) leading-relaxed">
              Как реализовать стратегию быстрее и эффективнее?
            </p>
          </motion.button>
          <motion.button
            onClick={() => onSelect("employee")}
            className="glass rounded-2xl p-8 text-left border-(--color-good)/25 hover:border-(--color-good)/50"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 2.4 }}
          >
            <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-(--color-good) mb-3">
              Сотрудник
            </div>
            <p className="text-[16px] text-(--color-ink-1) leading-relaxed">
              Как найти своё место, развиваться и влиять на результат?
            </p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
