import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  glow = false,
  glass = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  glass?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-300",
        glass
          ? "glass"
          : "bg-(--color-surface) border-(--color-border)",
        glow && "glow-signal border-(--color-signal)/30",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-3">
      <div>
        {eyebrow && (
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-1.5">
            {eyebrow}
          </div>
        )}
        <h3 className="text-(--color-ink-1) font-semibold text-[15px]">{title}</h3>
      </div>
      {action}
    </div>
  );
}
