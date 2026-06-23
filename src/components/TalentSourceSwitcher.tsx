import { cn } from "@/lib/cn";
import { type TalentSourceMode, talentSourceLabels } from "@/data/tochkaSborki";
import { bi } from "@/lib/bi";

const modes: TalentSourceMode[] = ["internal", "external", "hybrid"];

export function TalentSourceSwitcher({
  value,
  onChange,
}: {
  value: TalentSourceMode;
  onChange: (m: TalentSourceMode) => void;
}) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg border border-(--color-border) bg-(--color-surface)">
      {modes.map((m) => {
        const l = talentSourceLabels[m];
        return (
          <button
            key={m}
            onClick={() => onChange(m)}
            className={cn(
              "rounded-md px-3 py-1.5 text-[12px] font-mono transition-colors whitespace-nowrap",
              value === m
                ? "bg-(--color-surface-raised) text-(--color-ink-1) shadow-sm"
                : "text-(--color-ink-3) hover:text-(--color-ink-2)"
            )}
          >
            {bi(l.en, l.ru)}
          </button>
        );
      })}
    </div>
  );
}
