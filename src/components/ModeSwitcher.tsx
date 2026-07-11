import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { modes, modeOrder, type ModeId } from "@/data/modes";
import { cn } from "@/lib/cn";

export function ModeSwitcher({ active, onChange }: { active: ModeId; onChange: (id: ModeId) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const c = modes[active];
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 rounded-xl glass-subtle px-4 py-2 text-pres-sm text-(--color-ink-1) hover:border-(--color-signal)/30 transition-colors">
        <span className="text-pres-xs text-(--color-ink-3) font-mono uppercase tracking-wide">Модель</span>
        <span className="font-semibold">{c.org}</span>
        <ChevronDown className={cn("h-4 w-4 text-(--color-ink-3) transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl glass border border-(--color-signal)/15 shadow-2xl z-30 overflow-hidden">
          {modeOrder.map(id => {
            const m = modes[id];
            return (
              <button key={id} onClick={() => { onChange(id); setOpen(false); }}
                className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-(--color-surface-raised) transition-colors border-b border-(--color-border-soft) last:border-b-0">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center text-[13px] font-bold shrink-0 mt-0.5"
                  style={{ background: m.accentColor, color: "#06091A", boxShadow: `0 0 12px ${m.accentColor}44` }}>
                  {m.badgeLetter}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-pres-base text-(--color-ink-1) font-semibold">{m.org}</div>
                  <div className="text-pres-xs text-(--color-ink-3) mt-0.5 truncate">{m.scenarioName}</div>
                </div>
                {id === active && <Check className="h-4 w-4 text-(--color-signal) shrink-0 mt-1" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
