import { createContext, useContext, useState, type ReactNode } from "react";

export type ViewMode = "vp" | "employee";

interface ViewModeCtx {
  mode: ViewMode;
  toggle: () => void;
  isVP: boolean;
}

const Ctx = createContext<ViewModeCtx>({ mode: "vp", toggle: () => {}, isVP: true });

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ViewMode>("vp");
  return (
    <Ctx.Provider value={{ mode, toggle: () => setMode(m => m === "vp" ? "employee" : "vp"), isVP: mode === "vp" }}>
      {children}
    </Ctx.Provider>
  );
}

export function useViewMode() { return useContext(Ctx); }
