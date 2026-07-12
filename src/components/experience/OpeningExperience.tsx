import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useViewMode } from "@/lib/ViewModeContext";
import { useExperienceMachine } from "./useExperienceMachine";
import { QuestionStage } from "./stages/QuestionStage";
import { WorldsStage } from "./stages/WorldsStage";
import { EcosystemStage } from "./stages/EcosystemStage";
import { CapabilityCoreStage } from "./stages/CapabilityCoreStage";
import { RoleSelectionStage } from "./stages/RoleSelectionStage";

/**
 * The Interactive Strategic Experience — pure orchestration. Deliberately
 * kept to four clear beats (question -> two worlds -> living core ->
 * choice) after an earlier, more elaborate version (cursor-driven node
 * chasing, a separate unlockable screen) proved confusing rather than
 * clarifying. Apple-style pacing: each beat lands fully before the next
 * begins, and the final beat makes explicit what the rest of the product
 * does about the problem just shown — the Aha only works if it's answered.
 *
 * Runs once per session. Always skippable. Honours prefers-reduced-motion
 * by jumping straight to the choice with no animated sequence at all.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const stageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 1.3, ease: EASE } },
  exit: { opacity: 0, scale: 1.01, transition: { duration: 0.9, ease: EASE } },
};

export function OpeningExperience({ onComplete }: { onComplete: (perspective: "vp" | "employee") => void }) {
  const { stage, role, next, selectRole, skipToRoleSelection } = useExperienceMachine();
  const { toggle, isVP } = useViewMode();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) skipToRoleSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { if (stage === "idle") next(); }, [stage, next]);

  useEffect(() => {
    if (stage === "companyFlow" || stage === "employeeFlow") {
      if (role && (role === "vp") !== isVP) toggle();
      if (role) onComplete(role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, role]);

  const showSkip = stage !== "roleSelection" && stage !== "companyFlow" && stage !== "employeeFlow";

  return (
    <div className="fixed inset-0 z-50 bg-(--color-canvas) overflow-hidden">
      {showSkip && (
        <button
          onClick={skipToRoleSelection}
          className="absolute top-6 right-6 z-10 text-[12px] font-mono text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors px-3 py-1.5 rounded-lg hover:bg-(--color-surface-raised)"
        >
          Пропустить вступление
        </button>
      )}

      <AnimatePresence mode="wait">
        {stage === "question" && (
          <motion.div key="question" className="absolute inset-0" variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <QuestionStage onEngaged={next} />
          </motion.div>
        )}

        {stage === "worlds" && (
          <motion.div key="worlds" className="absolute inset-0" variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <WorldsStage onDone={next} />
          </motion.div>
        )}

        {stage === "ecosystem" && (
          <motion.div key="ecosystem" className="absolute inset-0" variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <EcosystemStage onDone={next} />
          </motion.div>
        )}

        {stage === "core" && (
          <motion.div key="core" className="absolute inset-0" variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <CapabilityCoreStage onDone={next} />
          </motion.div>
        )}

        {stage === "roleSelection" && (
          <motion.div key="roleSelection" className="absolute inset-0" variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <RoleSelectionStage onSelect={selectRole} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
