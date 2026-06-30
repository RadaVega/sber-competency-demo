import { cn } from "@/lib/cn";
import type { RiskArea } from "@/data/types";

const styles: Record<RiskArea["severity"], string> = {
  high:   "bg-(--color-risk-soft) text-(--color-risk) border-(--color-risk)/25",
  medium: "bg-(--color-warn-soft) text-(--color-warn) border-(--color-warn)/25",
  low:    "bg-(--color-good-soft) text-(--color-good) border-(--color-good)/25",
};

export function RiskBadge({ risk }: { risk: RiskArea }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-pres-sm font-semibold", styles[risk.severity])}>
      <span className="h-2 w-2 rounded-full bg-current" />
      {risk.name}
    </span>
  );
}
