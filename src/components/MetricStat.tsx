import { cn } from "@/lib/cn";

interface MetricStatProps {
  label: string;
  value: number;
  suffix?: string;
  tone?: "neutral" | "good" | "warn" | "risk";
  caption?: string;
  large?: boolean;
}

const toneGradient: Record<NonNullable<MetricStatProps["tone"]>, string> = {
  neutral: "text-gradient",
  good:    "text-(--color-good)",
  warn:    "text-(--color-warn)",
  risk:    "text-(--color-risk)",
};

const toneBar: Record<NonNullable<MetricStatProps["tone"]>, string> = {
  neutral: "from-(--color-grad-from) to-(--color-grad-to)",
  good:    "from-(--color-good) to-emerald-400",
  warn:    "from-(--color-warn) to-orange-400",
  risk:    "from-(--color-risk) to-rose-400",
};

export function MetricStat({
  label,
  value,
  suffix = "%",
  tone = "neutral",
  caption,
  large = false,
}: MetricStatProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-ink-3) font-mono">
        {label}
      </div>
      <div className={cn(
        "font-display leading-none",
        large ? "text-[56px]" : "text-[44px]",
        tone === "neutral" ? "text-gradient" : toneGradient[tone]
      )}>
        {value}
        <span className={cn(
          "ml-0.5",
          large ? "text-[26px]" : "text-[22px]",
          "text-(--color-ink-3) font-sans"
        )}>{suffix}</span>
      </div>
      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-1000",
            toneBar[tone]
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      {caption && (
        <div className="text-[12px] text-(--color-ink-3) leading-snug">{caption}</div>
      )}
    </div>
  );
}
