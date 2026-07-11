import type { ArchTermPair } from "@/data/branding";
import { cn } from "@/lib/cn";

/**
 * Displays the Russian business concept as the primary, larger term,
 * with the fixed English architecture term (smaller, muted) beneath it.
 * Used throughout the Enterprise Capability Intelligence narrative so the
 * Russian framing carries the primary reading, while the English term
 * stays visible for architectural/international legibility.
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
  const ruSize = size === "lg" ? "text-pres-xl" : size === "sm" ? "text-pres-sm" : "text-pres-base";
  const enSize = size === "lg" ? "text-pres-sm" : "text-pres-xs";

  return (
    <div className={cn("flex flex-col", align === "center" && "items-center text-center", className)}>
      <span className={cn(ruSize, "text-(--color-ink-1) font-semibold leading-snug")}>
        {term.ru}
      </span>
      {term.en && (
        <span className={cn(enSize, "text-(--color-ink-3) font-mono leading-snug")}>{term.en}</span>
      )}
    </div>
  );
}
