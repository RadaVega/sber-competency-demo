import { ArrowRight, Building2, Target, Users } from "lucide-react";
import { Card, CardHeader } from "@/components/Card";
import { MetricStat } from "@/components/MetricStat";
import { RiskBadge } from "@/components/RiskBadge";
import { orgUnit } from "@/data/mockData";
import { bi } from "@/lib/bi";

function toneFor(value: number): "good" | "warn" | "risk" {
  if (value >= 70) return "good";
  if (value >= 50) return "warn";
  return "risk";
}

export function DashboardScreen({ onAnalyze }: { onAnalyze: () => void }) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      {/* ---- Header ---- */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Capability Readiness Dashboard", "Готовность компетенций")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight text-balance max-w-[640px]">
            Готовность организации к AI-трансформации
          </h1>
        </div>
        <button
          onClick={onAnalyze}
          className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
        >
          Проанализировать организацию
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* ---- Org identity strip ---- */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-lg border border-(--color-border) bg-(--color-border)">
        <IdentityCell
          icon={<Building2 className="h-4 w-4" />}
          label="Организация / Подразделение"
          value={`${orgUnit.organization} · ${orgUnit.division}`}
        />
        <IdentityCell
          icon={<Users className="h-4 w-4" />}
          label="Сотрудников в периметре"
          value={orgUnit.headcount.toLocaleString("ru-RU")}
        />
        <IdentityCell
          icon={<Target className="h-4 w-4" />}
          label="Стратегическая цель"
          value={orgUnit.strategicGoal}
        />
      </div>

      {/* ---- Core metrics ---- */}
      <div className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-lg border border-(--color-border) bg-(--color-border)">
        <div className="bg-(--color-surface) p-6">
          <MetricStat
            label="Готовность"
            value={orgUnit.readiness}
            tone={toneFor(orgUnit.readiness)}
            caption="Сводный индекс готовности"
          />
        </div>
        <div className="bg-(--color-surface) p-6">
          <MetricStat
            label="Покрытие компетенций"
            value={orgUnit.competencyCoverage}
            tone={toneFor(orgUnit.competencyCoverage)}
            caption="Доля закрытых ролей"
          />
        </div>
        <div className="bg-(--color-surface) p-6">
          <MetricStat
            label="Покрытие наставничества"
            value={orgUnit.mentorshipCoverage}
            tone={toneFor(orgUnit.mentorshipCoverage)}
            caption="Доступность экспертов"
          />
        </div>
        <div className="bg-(--color-surface) p-6">
          <MetricStat
            label="Готовность команд"
            value={orgUnit.teamReadiness}
            tone={toneFor(orgUnit.teamReadiness)}
            caption="Под стратегические задачи"
          />
        </div>
      </div>

      {/* ---- Risks + trajectory ---- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader eyebrow="Risk Radar" title="Основные риски" />
          <div className="px-5 pb-6 flex flex-wrap gap-2">
            {orgUnit.risks.map((r) => (
              <RiskBadge key={r.name} risk={r} />
            ))}
          </div>
          <div className="px-5 pb-5 pt-1 border-t border-(--color-border-soft) mt-1">
            <p className="text-[13px] text-(--color-ink-2) pt-4 leading-relaxed">
              Основной риск — дефицит экспертизы в{" "}
              <span className="text-(--color-ink-1)">Agentic AI</span> и{" "}
              <span className="text-(--color-ink-1)">AI Governance</span>. Без
              целевой программы развития это напрямую ограничивает скорость
              внедрения стратегической цели.
            </p>
          </div>
        </Card>

        <Card glow>
          <CardHeader eyebrow="Trajectory" title="Прогноз готовности" />
          <div className="px-5 pb-6">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-display text-[28px] text-(--color-ink-2)">
                {orgUnit.readiness}%
              </span>
              <ArrowRight className="h-4 w-4 text-(--color-ink-3)" />
              <span className="font-display text-[28px] text-(--color-good)">
                {orgUnit.targetReadiness}%
              </span>
            </div>
            <p className="text-[13px] text-(--color-ink-2) leading-relaxed">
              При запуске программы ускоренного развития компетенций — за{" "}
              <span className="text-(--color-ink-1)">{orgUnit.timelineMonths} месяцев</span>.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function IdentityCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-(--color-surface) p-5">
      <div className="flex items-center gap-2 text-(--color-ink-3) mb-2">
        {icon}
        <span className="text-[11px] uppercase tracking-[0.1em] font-mono">{label}</span>
      </div>
      <div className="text-[14px] text-(--color-ink-1) font-medium">{value}</div>
    </div>
  );
}
