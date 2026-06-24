import { cn } from "@/lib/cn";
import { type TalentSourceMode } from "@/data/tochkaSborki";

// Short labels for the compact toggle — full bilingual in tooltip only
const labels: Record<TalentSourceMode, { short: string; full: string }> = {
  internal: { short: "Internal",  full: "Internal Workforce (Внутренние сотрудники)" },
  external: { short: "External",  full: "External Ecosystem (Внешняя экосистема)" },
  hybrid:   { short: "Hybrid ✦", full: "Hybrid Talent Network (Гибридная сеть талантов)" },
};

const modes: TalentSourceMode[] = ["internal", "external", "hybrid"];

export function TalentSourceSwitcher({
  value,
  onChange,
}: {
  value: TalentSourceMode;
  onChange: (m: TalentSourceMode) => void;
}) {
  return (
    <div className="flex items-center gap-0.5 p-1 rounded-lg border border-(--color-border) bg-(--color-surface) shrink-0">
      {modes.map((m) => {
        const l = labels[m];
        return (
          <button
            key={m}
            onClick={() => onChange(m)}
            title={l.full}
            className={cn(
              "rounded-md px-3 py-1.5 text-[11.5px] font-mono transition-colors whitespace-nowrap",
              value === m
                ? "bg-(--color-surface-raised) text-(--color-ink-1) shadow-sm"
                : "text-(--color-ink-3) hover:text-(--color-ink-2)"
            )}
          >
            {l.short}
          </button>
        );
      })}
    </div>
  );
}
