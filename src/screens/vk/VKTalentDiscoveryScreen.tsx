import { ArrowLeft, ArrowRight, Crown, GraduationCap, User } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@/components/Card";
import { vkTalent } from "@/data/vkData";
import { bi } from "@/lib/bi";

const potentialMeta: Record<string, { icon: ReactNode; label: string; color: string }> = {
  leader: {
    icon: <Crown className="h-3.5 w-3.5" />,
    label: "Потенциальный лидер",
    color: "text-(--color-signal)",
  },
  mentor: {
    icon: <GraduationCap className="h-3.5 w-3.5" />,
    label: "Потенциальный наставник",
    color: "text-(--color-good)",
  },
  contributor: {
    icon: <User className="h-3.5 w-3.5" />,
    label: "Контрибьютор",
    color: "text-(--color-ink-2)",
  },
};

export function VKTalentDiscoveryScreen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      {/* Level 1 — plain human observation, no corporate language */}
      <div className="mb-8 text-center">
        <p className="font-display text-[22px] md:text-[26px] text-(--color-ink-1) leading-snug max-w-[620px] mx-auto">
          Почему в любой компании есть люди, которых все хвалят,
          <br />
          но никто не додумался спросить, готовы ли они возглавить проект?
        </p>
        <p className="text-[13.5px] text-(--color-ink-2) mt-4 max-w-[560px] mx-auto leading-relaxed">
          Хорошая репутация не то же самое, что видимость. Человек может
          быть готов к большему годами — просто никто не смотрел на него
          с этой стороны.
        </p>
      </div>

      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Сборка команды
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Internal Talent Discovery", "Поиск внутренних экспертов")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            Поиск внутренних экспертов
          </h1>
        </div>
        <button
          onClick={onNext}
          className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
        >
          Симулятор готовности
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {vkTalent.map((t) => {
          const meta = potentialMeta[t.potential];
          return (
            <Card key={t.name}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-(--color-surface-raised) border border-(--color-border) flex items-center justify-center text-(--color-ink-2) font-display text-[16px]">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-[14px] text-(--color-ink-1) font-medium leading-tight">
                        {t.name}
                      </div>
                      <div className="text-[12px] text-(--color-ink-3) leading-tight mt-0.5">
                        {t.currentRole}
                      </div>
                    </div>
                  </div>
                  <span className="font-display text-[22px] text-(--color-good)">
                    {t.matchPercent}%
                  </span>
                </div>

                <div className="h-1 w-full rounded-full bg-(--color-border-soft) overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full bg-(--color-good) transition-all duration-700"
                    style={{ width: `${t.matchPercent}%` }}
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {t.competencyMatch.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-(--color-border) bg-(--color-surface-raised) px-2.5 py-1 text-[12px] text-(--color-ink-2)"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <div className={`flex items-center gap-1.5 text-[12px] font-medium ${meta.color} pt-3 border-t border-(--color-border-soft)`}>
                  {meta.icon}
                  {meta.label}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
