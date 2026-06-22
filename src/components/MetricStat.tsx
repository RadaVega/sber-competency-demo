import { cn } from "@/lib/cn";

interface MetricStatProps {
  label: string;
  value: number;
  suffix?: string;
  tone?: "neutral" | "good" | "warn" | "risk";
  caption?: string;
}

const toneColor: Record<NonNullable<MetricStatProps["tone"]>, string> = {
  neutral: "text-(--color-ink-1)",
  good: "text-(--color-good)",
  warn: "text-(--color-warn)",
  risk: "text-(--color-risk)",
};

const toneBar: Record<NonNullable<MetricStatProps["tone"]>, string> = {
  neutral: "bg-(--color-signal)",
  good: "bg-(--color-good)",
  warn: "bg-(--color-warn)",
  risk: "bg-(--color-risk)",
};

export function MetricStat({
  label,
  value,
  suffix = "%",
  tone = "neutral",
  caption,
}: MetricStatProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[11px] uppercase tracking-[0.12em] text-(--color-ink-3) font-mono">
        {label}
      </div>
      <div className={cn("font-display text-[42px] leading-none", toneColor[tone])}>
        {value}
        <span className="text-[22px] text-(--color-ink-3) ml-0.5">{suffix}</span>
      </div>
      <div className="h-1 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", toneBar[tone])}
          style={{ width: `${value}%` }}
        />
      </div>
      {caption && <div className="text-[12px] text-(--color-ink-2)">{caption}</div>}
    </div>
  );
}
