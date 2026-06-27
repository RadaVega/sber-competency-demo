import { useViewMode } from "@/lib/ViewModeContext";
import { cn } from "@/lib/cn";
import { Building2, User } from "lucide-react";

export function ViewModeSwitcher() {
  const { mode, toggle } = useViewMode();
  const isVP = mode === "vp";

  return (
    <div className="flex items-center gap-0.5 p-1 rounded-xl glass-subtle">
      <button
        onClick={() => !isVP && toggle()}
        className={cn(
          "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11.5px] font-mono transition-all",
          isVP
            ? "bg-(--color-surface-raised) text-(--color-ink-1)"
            : "text-(--color-ink-3) hover:text-(--color-ink-2)"
        )}
      >
        <Building2 className="h-3 w-3" />
        VP / Директор
      </button>
      <button
        onClick={() => isVP && toggle()}
        className={cn(
          "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11.5px] font-mono transition-all",
          !isVP
            ? "bg-(--color-surface-raised) text-(--color-ink-1)"
            : "text-(--color-ink-3) hover:text-(--color-ink-2)"
        )}
      >
        <User className="h-3 w-3" />
        Сотрудник
      </button>
    </div>
  );
}
