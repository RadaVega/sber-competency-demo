import { ArrowRight, Building2, Target, Users, TrendingUp } from "lucide-react";
import { Card, CardHeader } from "@/components/Card";
import { MetricStat } from "@/components/MetricStat";
import { RiskBadge } from "@/components/RiskBadge";
import { orgUnit } from "@/data/mockData";
import { bi } from "@/lib/bi";

function tone(v: number): "good" | "warn" | "risk" {
  return v >= 70 ? "good" : v >= 50 ? "warn" : "risk";
}

export function DashboardScreen({ onAnalyze }: { onAnalyze: () => void }) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-12">

      <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-(--color-border) pb-10">
        <div>
          <div className="text-pres-label text-(--color-signal) mb-4">
            {bi("Capability Readiness Dashboard", "Готовность организации")}
          </div>
          <h1 className="font-display text-pres-hero leading-tight text-balance max-w-[640px]">
            Готовность к{" "}
            <span className="text-gradient-accent">AI-трансформации</span>
          </h1>
        </div>
        <button
          onClick={onAnalyze}
          className="group flex items-center gap-3 rounded-2xl px-8 py-4 text-pres-lg font-semibold text-white hover:scale-105 transition-all shrink-0"
          style={{ background: "linear-gradient(135deg, #21A038, #8B7FFF)", boxShadow: "0 6px 28px rgba(33,160,56,0.35)" }}
        >
          Проанализировать организацию
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Org strip */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-border)">
        {[
          { icon: <Building2 className="h-5 w-5" />, label: "Организация", value: `${orgUnit.organization} · ${orgUnit.division}` },
          { icon: <Users className="h-5 w-5" />,     label: "Сотрудников",  value: orgUnit.headcount.toLocaleString("ru-RU") },
          { icon: <Target className="h-5 w-5" />,    label: "Стратегическая цель", value: orgUnit.strategicGoal },
        ].map((item) => (
          <div key={item.label} className="bg-(--color-surface) p-6">
            <div className="flex items-center gap-2 text-(--color-ink-3) mb-3">
              {item.icon}
              <span className="text-pres-label">{item.label}</span>
            </div>
            <div className="text-pres-lg text-(--color-ink-1) font-semibold">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-border)">
        <div className="bg-(--color-surface) p-8"><MetricStat label="Готовность" value={orgUnit.readiness} tone={tone(orgUnit.readiness)} caption="Сводный индекс" /></div>
        <div className="bg-(--color-surface) p-8"><MetricStat label="Покрытие компетенций" value={orgUnit.competencyCoverage} tone={tone(orgUnit.competencyCoverage)} caption="Доля закрытых ролей" /></div>
        <div className="bg-(--color-surface) p-8"><MetricStat label="Покрытие наставничества" value={orgUnit.mentorshipCoverage} tone={tone(orgUnit.mentorshipCoverage)} caption="Доступность экспертов" /></div>
        <div className="bg-(--color-surface) p-8"><MetricStat label="Готовность команд" value={orgUnit.teamReadiness} tone={tone(orgUnit.teamReadiness)} caption="Под стратегические задачи" /></div>
      </div>

      {/* Risk + Trajectory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader eyebrow="Risk Radar" title="Основные риски" />
          <div className="px-6 pb-6 flex flex-wrap gap-3">
            {orgUnit.risks.map((r) => <RiskBadge key={r.name} risk={r} />)}
          </div>
          <div className="px-6 pb-6 pt-3 border-t border-(--color-border-soft)">
            <p className="text-pres-base text-(--color-ink-2) leading-relaxed">
              Основной риск — дефицит экспертизы в{" "}
              <span className="text-(--color-ink-1) font-semibold">Agentic AI</span> и{" "}
              <span className="text-(--color-ink-1) font-semibold">AI Governance</span>.
              Без целевой программы это напрямую блокирует стратегическую цель.
            </p>
          </div>
        </Card>

        <Card glow>
          <div className="p-8 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-(--color-good)" />
              <div className="text-pres-label text-(--color-ink-3)">Прогноз готовности</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-pres-metric-sm text-(--color-ink-3)">{orgUnit.readiness}%</span>
              <ArrowRight className="h-5 w-5 text-(--color-ink-3)" />
              <span className="font-display text-pres-metric-sm text-gradient">{orgUnit.targetReadiness}%</span>
            </div>
            <p className="text-pres-base text-(--color-ink-2) leading-relaxed">
              При запуске 90-дневной программы за{" "}
              <span className="text-(--color-ink-1) font-semibold">{orgUnit.timelineMonths} месяцев</span>.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
