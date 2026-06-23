import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/Card";
import { externalTalent, externalTeams, type TalentCategory } from "@/data/tochkaSborki";
import { bi } from "@/lib/bi";

const categoryMeta: Record<TalentCategory, { label: string; color: string; bg: string }> = {
  student: { label: bi("Student", "Студент"), color: "text-(--color-warn)", bg: "bg-(--color-warn-soft)" },
  specialist: { label: bi("Specialist", "Специалист"), color: "text-(--color-good)", bg: "bg-(--color-good-soft)" },
  expert: { label: bi("Expert", "Эксперт"), color: "text-(--color-signal)", bg: "bg-(--color-signal-soft)" },
  mentor: { label: bi("Mentor", "Наставник"), color: "text-(--color-ink-1)", bg: "bg-(--color-surface-raised)" },
  team: { label: bi("Team", "Команда"), color: "text-(--color-risk)", bg: "bg-(--color-risk-soft)" },
};

const potentialMeta = {
  high: "text-(--color-good)",
  medium: "text-(--color-warn)",
  low: "text-(--color-risk)",
};

export function ExternalTalentDiscoveryScreen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {bi("Talent Ecosystem", "Экосистема талантов")}
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("External Talent Discovery", "Поиск внешних талантов")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            Точка Сборки — внешний контур
          </h1>
          <p className="text-[13px] text-(--color-ink-2) mt-3">
            Студенты, специалисты, эксперты и команды, готовые к участию в
            стратегических инициативах.
          </p>
        </div>
        <button
          onClick={onNext}
          className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
        >
          {bi("Talent Pipeline", "Конвейер талантов")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Individual talent cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        {externalTalent.map((t) => {
          const cat = categoryMeta[t.category];
          const pot = potentialMeta[t.developmentPotential];
          return (
            <Card key={t.id}>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-(--color-surface-raised) border border-(--color-border) flex items-center justify-center text-(--color-ink-2) font-display text-[15px]">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-[13.5px] font-medium text-(--color-ink-1) leading-tight">
                        {t.name}
                      </div>
                      <div className="text-[11px] text-(--color-ink-3) mt-0.5">
                        {t.university ?? t.experience}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10.5px] font-mono uppercase tracking-[0.06em] px-2 py-1 rounded-full ${cat.color} ${cat.bg}`}>
                    {cat.label}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[22px] text-(--color-good)">{t.readiness}%</span>
                  <span className="text-[12px] text-(--color-ink-3)">готовность</span>
                  <span className={`text-[12px] font-medium ml-auto ${pot}`}>
                    потенциал ↑{t.developmentPotential === "high" ? "высокий" : t.developmentPotential === "medium" ? "средний" : "низкий"}
                  </span>
                </div>

                <div className="h-1 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
                  <div
                    className="h-full rounded-full bg-(--color-good) transition-all duration-700"
                    style={{ width: `${t.readiness}%` }}
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-(--color-border-soft)">
                  {t.competencies.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-(--color-border) bg-(--color-surface-raised) px-2 py-0.5 text-[11.5px] text-(--color-ink-2)"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Project teams */}
      <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-4">
        {bi("Project Teams", "Проектные команды")}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {externalTeams.map((team) => (
          <Card key={team.id}>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[14px] font-medium text-(--color-ink-1)">{team.name}</div>
                  <div className="text-[12px] text-(--color-ink-3)">{team.focus}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-[22px] text-(--color-signal)">{team.size}</div>
                  <div className="text-[10px] text-(--color-ink-3) font-mono">человек</div>
                </div>
              </div>
              <div className="text-[12px] text-(--color-ink-3) mb-3">
                {team.projectsCompleted} завершённых проектов
              </div>
              <div className="flex flex-wrap gap-1.5">
                {team.competencies.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-(--color-border) bg-(--color-surface-raised) px-2 py-0.5 text-[11px] text-(--color-ink-2)"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
