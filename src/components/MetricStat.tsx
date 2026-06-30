import { cn } from "@/lib/cn";

interface Props {
  label: string;
  value: number;
  suffix?: string;
  tone?: "neutral" | "good" | "warn" | "risk";
  caption?: string;
  large?: boolean;
}

const toneText: Record<NonNullable<Props["tone"]>, string> = {
  neutral: "text-gradient",
  good:    "text-(--color-good)",
  warn:    "text-(--color-warn)",
  risk:    "text-(--color-risk)",
};
const toneBar: Record<NonNullable<Props["tone"]>, string> = {
  neutral: "from-(--color-grad-from) to-(--color-grad-to)",
  good:    "from-(--color-good) to-emerald-300",
  warn:    "from-(--color-warn) to-orange-300",
  risk:    "from-(--color-risk) to-rose-300",
};

export function MetricStat({ label, value, suffix = "%", tone = "neutral", caption, large }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-pres-label text-(--color-ink-3)">{label}</div>
      <div className={cn(
        "font-display leading-none",
        large ? "text-pres-metric-lg" : "text-pres-metric",
        toneText[tone]
      )}>
        {value}
        <span className={cn(
          "font-sans ml-1",
          large ? "text-[28px]" : "text-[22px]",
          "text-(--color-ink-3)"
        )}>{suffix}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
        <div className={cn(
          "h-full rounded-full bg-gradient-to-r transition-all duration-1000",
          toneBar[tone]
        )} style={{ width: `${value}%` }} />
      </div>
      {caption && <div className="text-pres-sm text-(--color-ink-3)">{caption}</div>}
    </div>
  );
}
