import type { ArchTermPair } from "@/data/branding";
import { cn } from "@/lib/cn";

/**
 * Displays a Russian business concept (small, muted) stacked above
 * the fixed English architecture term (larger, primary). Used
 * throughout the Enterprise Capability Intelligence narrative so the
 * English term never gets translated/lost, while the Russian framing
 * carries the business meaning.
 */
export function ArchTerm({
  term,
  size = "base",
  align = "left",
  className,
}: {
  term: ArchTermPair;
  size?: "sm" | "base" | "lg";
  align?: "left" | "center";
  className?: string;
}) {
  const enSize = size === "lg" ? "text-pres-xl" : size === "sm" ? "text-pres-sm" : "text-pres-base";
  const ruSize = size === "lg" ? "text-pres-sm" : "text-pres-xs";

  return (
    <div className={cn("flex flex-col", align === "center" && "items-center text-center", className)}>
      {term.ru && (
        <span className={cn(ruSize, "text-(--color-ink-3) leading-snug")}>{term.ru}</span>
      )}
      <span className={cn(enSize, "text-(--color-ink-1) font-semibold font-mono leading-snug")}>
        {term.en}
      </span>
    </div>
  );
}
