import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { modes, modeOrder, type ModeId } from "@/data/modes";
import { cn } from "@/lib/cn";

export function ModeSwitcher({
  active,
  onChange,
}: {
  active: ModeId;
  onChange: (id: ModeId) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const config = modes[active];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-md border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-[12px] text-(--color-ink-1) hover:bg-(--color-surface-raised) transition-colors"
      >
        <span className="text-(--color-ink-3) font-mono uppercase tracking-[0.08em]">
          Demo Mode
        </span>
        <span className="font-medium">{config.org}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-(--color-ink-3) transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-(--color-border) bg-(--color-surface) shadow-xl z-30 overflow-hidden">
          {modeOrder.map((id) => {
            const m = modes[id];
            return (
              <button
                key={id}
                onClick={() => {
                  onChange(id);
                  setOpen(false);
                }}
                className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-(--color-surface-raised) transition-colors border-b border-(--color-border-soft) last:border-b-0"
              >
                <div
                  className="h-6 w-6 rounded-[5px] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                  style={{ background: m.accentColor, color: "#0B0E14" }}
                >
                  {m.badgeLetter}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-(--color-ink-1) font-medium">{m.org}</div>
                  <div className="text-[11px] text-(--color-ink-3) leading-snug mt-0.5 truncate">
                    {m.scenarioName}
                  </div>
                </div>
                {id === active && (
                  <Check className="h-3.5 w-3.5 text-(--color-signal) shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
