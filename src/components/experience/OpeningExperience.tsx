import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useViewMode } from "@/lib/ViewModeContext";
import { useExperienceMachine } from "./useExperienceMachine";
import { QuestionStage } from "./stages/QuestionStage";
import { InteractiveField } from "./stages/InteractiveField";
import { AlignmentStage } from "./stages/AlignmentStage";
import { ActivationStage } from "./stages/ActivationStage";
import { CapabilityCoreStage } from "./stages/CapabilityCoreStage";
import { RoleSelectionStage } from "./stages/RoleSelectionStage";

/**
 * The Interactive Strategic Experience — pure orchestration. This file owns
 * no animation logic and no interaction logic of its own; it just renders
 * whichever stage the state machine (useExperienceMachine) says is current,
 * and wires each stage's "I'm satisfied" callback to next().
 *
 * This is deliberately NOT a video: from ~10 seconds in, the user is
 * dragging their own cursor to weave people together and put strategy in
 * order. AI only appears once the user has already started the work.
 *
 * Runs once per session by default. Fully replayable without a page reload
 * via resetExperience() — see the "Пережить опыт заново" control wired up
 * in App.tsx, which simply calls the reset prop passed down here.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const stageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 1.3, ease: EASE } },
  exit: { opacity: 0, scale: 1.01, transition: { duration: 0.9, ease: EASE } },
};

export function OpeningExperience({ onComplete }: { onComplete: (perspective: "vp" | "employee") => void }) {
  const { stage, role, epoch, next, selectRole, skipToRoleSelection } = useExperienceMachine();
  const { toggle, isVP } = useViewMode();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) skipToRoleSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // idle -> question happens immediately, no interaction required to see the question itself
  useEffect(() => { if (stage === "idle") next(); }, [stage, next]);
  // firstInteraction is a brief acknowledgement beat before people appear
  useEffect(() => {
    if (stage !== "firstInteraction") return;
    const t = setTimeout(next, 550);
    return () => clearTimeout(t);
  }, [stage, next]);

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

        {stage === "people" && (
          <motion.div key="people" className="absolute inset-0" variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <InteractiveField phase="people" epoch={epoch} onPeopleSatisfied={next} onStrategySatisfied={() => {}} />
          </motion.div>
        )}

        {stage === "strategy" && (
          <motion.div key="strategy" className="absolute inset-0" variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <InteractiveField phase="strategy" epoch={epoch} onPeopleSatisfied={() => {}} onStrategySatisfied={next} />
          </motion.div>
        )}

        {stage === "alignment" && (
          <motion.div key="alignment" className="absolute inset-0" variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <AlignmentStage onDone={next} />
          </motion.div>
        )}

        {stage === "activation" && (
          <motion.div key="activation" className="absolute inset-0" variants={stageVariants} initial="initial" animate="animate" exit="exit">
            <ActivationStage onDone={next} />
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
