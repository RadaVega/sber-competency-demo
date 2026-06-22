import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-(--color-surface) border-(--color-border)",
        glow && "shadow-[0_0_0_1px_rgba(232,163,61,0.15)]",
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
          <div className="text-[11px] uppercase tracking-[0.12em] text-(--color-ink-3) font-mono mb-1">
            {eyebrow}
          </div>
        )}
        <h3 className="text-(--color-ink-1) font-medium text-[15px]">{title}</h3>
      </div>
      {action}
    </div>
  );
}
