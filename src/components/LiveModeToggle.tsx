import { useLiveMode } from "@/lib/LiveModeContext";
import { cn } from "@/lib/cn";

export function LiveModeToggle() {
  const { toggle, isLive } = useLiveMode();

  return (
    <button
      onClick={toggle}
      title={isLive ? "Переключить в Demo режим" : "Переключить в Live режим (GigaChat)"}
      className={cn(
        "relative flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-mono font-medium transition-all duration-300 border",
        isLive
          ? "bg-(--color-good-soft) border-(--color-good)/40 text-(--color-good)"
          : "bg-(--color-surface) border-(--color-border) text-(--color-ink-3) hover:text-(--color-ink-2)"
      )}
    >
      {/* Indicator dot */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full",
            isLive ? "animate-ping bg-(--color-good) opacity-75" : "bg-(--color-ink-3)"
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            isLive ? "bg-(--color-good)" : "bg-(--color-ink-3)"
          )}
        />
      </span>

      {/* Label */}
      {isLive ? (
        <span>
          LIVE
          <span className="opacity-60 font-normal ml-1.5">GigaChat Lite</span>
        </span>
      ) : (
        <span>DEMO</span>
      )}
    </button>
  );
}
