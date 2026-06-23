import { createContext, useContext, useState, type ReactNode } from "react";

export type LiveMode = "demo" | "live";

interface LiveModeCtx {
  mode: LiveMode;
  toggle: () => void;
  isLive: boolean;
}

const Ctx = createContext<LiveModeCtx>({
  mode: "demo",
  toggle: () => {},
  isLive: false,
});

export function LiveModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<LiveMode>("demo");
  return (
    <Ctx.Provider
      value={{
        mode,
        toggle: () => setMode((m) => (m === "demo" ? "live" : "demo")),
        isLive: mode === "live",
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useLiveMode() {
  return useContext(Ctx);
}
