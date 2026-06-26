import { cn } from "@/lib/cn";
import type { RiskArea } from "@/data/types";

const severityStyle: Record<RiskArea["severity"], string> = {
  high:   "bg-(--color-risk-soft) text-(--color-risk) border-(--color-risk)/25",
  medium: "bg-(--color-warn-soft) text-(--color-warn) border-(--color-warn)/25",
  low:    "bg-(--color-good-soft) text-(--color-good) border-(--color-good)/25",
};

export function RiskBadge({ risk }: { risk: RiskArea }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium",
      severityStyle[risk.severity]
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {risk.name}
    </span>
  );
}
