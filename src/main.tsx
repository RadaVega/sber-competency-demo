import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LiveModeProvider } from "@/lib/LiveModeContext.tsx";
import { ViewModeProvider } from "@/lib/ViewModeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LiveModeProvider>
      <ViewModeProvider>
        <App />
      </ViewModeProvider>
    </LiveModeProvider>
  </StrictMode>
);
