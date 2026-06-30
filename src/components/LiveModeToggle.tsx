import { useLiveMode } from "@/lib/LiveModeContext";
import { cn } from "@/lib/cn";

export function LiveModeToggle() {
  const { toggle, isLive } = useLiveMode();
  return (
    <button
      onClick={toggle}
      title={isLive ? "Switch to Demo" : "Switch to Live (GigaChat)"}
      className={cn(
        "flex items-center gap-2 rounded-xl px-4 py-2 text-pres-sm font-mono font-medium transition-all duration-300",
        isLive ? "glass border-(--color-good)/30 text-(--color-good) glow-good"
               : "glass-subtle text-(--color-ink-3) hover:text-(--color-ink-2)"
      )}
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className={cn("absolute inline-flex h-full w-full rounded-full", isLive && "animate-ping bg-(--color-good) opacity-75")} />
        <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", isLive ? "bg-(--color-good)" : "bg-(--color-ink-3)")} />
      </span>
      {isLive ? <span>LIVE <span className="opacity-60 font-normal text-[11px]">GigaChat</span></span> : <span>DEMO</span>}
    </button>
  );
}
