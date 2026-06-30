import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className, glow = false, glass = false }: {
  children: ReactNode; className?: string; glow?: boolean; glass?: boolean;
}) {
  return (
    <div className={cn(
      "rounded-2xl border transition-all duration-300",
      glass ? "glass" : "bg-(--color-surface) border-(--color-border)",
      glow && "glow-signal border-(--color-signal)/30",
      className
    )}>
      {children}
    </div>
  );
}

export function CardHeader({ eyebrow, title, action }: {
  eyebrow?: string; title: string; action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
      <div>
        {eyebrow && (
          <div className="text-pres-label text-(--color-signal) mb-2">{eyebrow}</div>
        )}
        <h3 className="text-pres-h3 font-semibold text-(--color-ink-1)">{title}</h3>
      </div>
      {action}
    </div>
  );
}
