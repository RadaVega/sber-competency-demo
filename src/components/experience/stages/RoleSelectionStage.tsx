import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Role, Company } from "../useExperienceMachine";
import { modes } from "@/data/modes";

/**
 * Act 7. By now the user understands *why* two perspectives exist — they
 * just watched both systems separately, then watched them align.
 *
 * Two beats, not one: first *whose* organisation the viewer wants to
 * explore (someone arriving from a Rosatom or VK conversation should never
 * land on Sber screens with no visible way out), then *whose eyes* they
 * want to see it through. The company choice is a quick, low-ceremony
 * beat — logos/names only; the role choice keeps its full narrative
 * weight since that's the emotional payoff of the whole intro.
 */
const EASE = [0.16, 1, 0.3, 1] as const;

const COMPANIES: { id: Company; org: string; accentColor: string; badgeLetter: string }[] = [
  { id: "sber", org: modes.sber.org, accentColor: modes.sber.accentColor, badgeLetter: modes.sber.badgeLetter },
  { id: "rosatom", org: modes.rosatom.org, accentColor: modes.rosatom.accentColor, badgeLetter: modes.rosatom.badgeLetter },
  { id: "vk", org: modes.vk.org, accentColor: modes.vk.accentColor, badgeLetter: modes.vk.badgeLetter },
  { id: "yandex", org: modes.yandex.org, accentColor: modes.yandex.accentColor, badgeLetter: modes.yandex.badgeLetter },
];

export function RoleSelectionStage({ onSelect }: { onSelect: (role: Role, company: Company) => void }) {
  const [company, setCompany] = useState<Company | null>(null);

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {!company ? (
          <motion.div
            key="company"
            className="flex flex-col items-center gap-10 max-w-[720px] w-full"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.p
              className="font-display text-[22px] md:text-[28px] text-(--color-ink-1) text-center leading-snug"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            >
              Чью организацию вы хотите исследовать?
            </motion.p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {COMPANIES.map((c, i) => (
                <motion.button
                  key={c.id}
                  onClick={() => setCompany(c.id)}
                  className="glass rounded-2xl p-6 flex flex-col items-center gap-3 hover:scale-[1.03] transition-transform"
                  style={{ borderColor: `${c.accentColor}40` }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 1.1 + i * 0.15 }}
                >
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center text-[15px] font-bold"
                    style={{ background: `${c.accentColor}22`, color: c.accentColor }}
                  >
                    {c.badgeLetter}
                  </div>
                  <span className="text-[13.5px] text-(--color-ink-1) font-medium">{c.org}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="role"
            className="flex flex-col items-center gap-10 max-w-[860px] w-full"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <motion.p
              className="font-display text-[22px] md:text-[28px] text-(--color-ink-1) text-center leading-snug max-w-[620px]"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            >
              С какой точки зрения вы хотите продолжить исследование этой организации?
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <motion.button
                onClick={() => onSelect("vp", company)}
                className="glass rounded-2xl p-8 text-left border-(--color-signal)/25 hover:border-(--color-signal)/50"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 1.1 }}
              >
                <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-(--color-signal) mb-3">
                  Руководитель
                </div>
                <p className="text-[16px] text-(--color-ink-1) leading-relaxed">
                  Как реализовать стратегию быстрее и эффективнее?
                </p>
              </motion.button>
              <motion.button
                onClick={() => onSelect("employee", company)}
                className="glass rounded-2xl p-8 text-left border-(--color-good)/25 hover:border-(--color-good)/50"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 1.4 }}
              >
                <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-(--color-good) mb-3">
                  Сотрудник
                </div>
                <p className="text-[16px] text-(--color-ink-1) leading-relaxed">
                  Как найти своё место, развиваться и влиять на результат?
                </p>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
