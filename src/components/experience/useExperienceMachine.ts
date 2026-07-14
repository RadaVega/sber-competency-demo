import { useCallback, useReducer } from "react";

/**
 * The Interactive Strategic Experience is a state machine, not a video.
 * Every stage transition is explicit and independently triggerable — a
 * stage advances only when its own component decides it's satisfied
 * (an interaction threshold, a timer, or a user choice), never on a
 * fixed global clock. This file owns ONLY the state logic; every stage
 * component (in ./stages) owns its own presentation and decides when to
 * call `next()`.
 */

export const STAGE_ORDER = [
  "idle",
  "question",
  "worlds",
  "ecosystem",
  "core",
  "roleSelection",
] as const;

export type Stage = (typeof STAGE_ORDER)[number] | "companyFlow" | "employeeFlow";
export type Role = "vp" | "employee";
export type Company = "sber" | "rosatom" | "vk" | "yandex";

interface ExperienceState {
  stage: Stage;
  role: Role | null;
  company: Company | null;
  /** Increments every reset — lets stage components key off it to fully
   *  re-initialize internal animation state without unmounting the tree. */
  epoch: number;
}

type Action =
  | { type: "NEXT" }
  | { type: "SELECT_ROLE"; role: Role; company: Company }
  | { type: "RESET" }
  | { type: "SKIP_TO_ROLE_SELECTION" };

const initialState: ExperienceState = { stage: "idle", role: null, company: null, epoch: 0 };

function reducer(state: ExperienceState, action: Action): ExperienceState {
  switch (action.type) {
    case "NEXT": {
      const idx = STAGE_ORDER.indexOf(state.stage as (typeof STAGE_ORDER)[number]);
      if (idx === -1 || idx === STAGE_ORDER.length - 1) return state;
      return { ...state, stage: STAGE_ORDER[idx + 1] };
    }
    case "SELECT_ROLE":
      return { ...state, role: action.role, company: action.company, stage: action.role === "vp" ? "companyFlow" : "employeeFlow" };
    case "SKIP_TO_ROLE_SELECTION":
      return { ...state, stage: "roleSelection" };
    case "RESET":
      return { stage: "idle", role: null, company: null, epoch: state.epoch + 1 };
    default:
      return state;
  }
}

export function useExperienceMachine() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const next = useCallback(() => dispatch({ type: "NEXT" }), []);
  const selectRole = useCallback((role: Role, company: Company) => dispatch({ type: "SELECT_ROLE", role, company }), []);
  const skipToRoleSelection = useCallback(() => dispatch({ type: "SKIP_TO_ROLE_SELECTION" }), []);
  const resetExperience = useCallback(() => dispatch({ type: "RESET" }), []);

  return { stage: state.stage, role: state.role, company: state.company, epoch: state.epoch, next, selectRole, skipToRoleSelection, resetExperience };
}
