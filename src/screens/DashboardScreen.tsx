import { ArrowRight, Building2, Target, Users, TrendingUp } from "lucide-react";
import { Card, CardHeader } from "@/components/Card";
import { MetricStat } from "@/components/MetricStat";
import { RiskBadge } from "@/components/RiskBadge";
import { orgUnit } from "@/data/mockData";
import { bi } from "@/lib/bi";

function toneFor(v: number): "good" | "warn" | "risk" {
  if (v >= 70) return "good";
  if (v >= 50) return "warn";
  return "risk";
}

export function DashboardScreen({ onAnalyze }: { onAnalyze: () => void }) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">

      {/* ---- Header ---- */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-(--color-signal) font-mono mb-3">
            {bi("Capability Readiness Dashboard", "Готовность компетенций")}
          </div>
          <h1 className="font-display text-[36px] text-(--color-ink-1) leading-tight text-balance max-w-[640px]">
            Готовность организации к
            <span className="text-gradient"> AI-трансформации</span>
          </h1>
        </div>
        <button
          onClick={onAnalyze}
          className="group flex items-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold text-white hover:scale-105 transition-all duration-200 shrink-0"
          style={{
            background: "linear-gradient(135deg, #7C6EFF, #4FA8FF)",
            boxShadow: "0 4px 20px rgba(124,110,255,0.35)",
          }}
        >
          Проанализировать организацию
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* ---- Org identity ---- */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-xl border border-(--color-border) bg-(--color-border)">
        {[
          { icon: <Building2 className="h-4 w-4" />, label: "Организация / Подразделение", value: `${orgUnit.organization} · ${orgUnit.division}` },
          { icon: <Users className="h-4 w-4" />, label: "Сотрудников в периметре", value: orgUnit.headcount.toLocaleString("ru-RU") },
          { icon: <Target className="h-4 w-4" />, label: "Стратегическая цель", value: orgUnit.strategicGoal },
        ].map((item) => (
          <div key={item.label} className="bg-(--color-surface) p-5">
            <div className="flex items-center gap-2 text-(--color-ink-3) mb-2">
              {item.icon}
              <span className="text-[11px] uppercase tracking-[0.1em] font-mono">{item.label}</span>
            </div>
            <div className="text-[14px] text-(--color-ink-1) font-medium">{item.value}</div>
          </div>
        ))}
      </div>

      {/* ---- Core metrics ---- */}
      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-xl border border-(--color-border) bg-(--color-border)">
        <div className="bg-(--color-surface) p-6">
          <MetricStat label="Готовность" value={orgUnit.readiness} tone={toneFor(orgUnit.readiness)} caption="Сводный индекс" />
        </div>
        <div className="bg-(--color-surface) p-6">
          <MetricStat label="Покрытие компетенций" value={orgUnit.competencyCoverage} tone={toneFor(orgUnit.competencyCoverage)} caption="Доля закрытых ролей" />
        </div>
        <div className="bg-(--color-surface) p-6">
          <MetricStat label="Покрытие наставничества" value={orgUnit.mentorshipCoverage} tone={toneFor(orgUnit.mentorshipCoverage)} caption="Доступность экспертов" />
        </div>
        <div className="bg-(--color-surface) p-6">
          <MetricStat label="Готовность команд" value={orgUnit.teamReadiness} tone={toneFor(orgUnit.teamReadiness)} caption="Под стратегические задачи" />
        </div>
      </div>

      {/* ---- Risks + trajectory ---- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="md:col-span-2">
          <CardHeader eyebrow="Risk Radar" title="Основные риски" />
          <div className="px-5 pb-5 flex flex-wrap gap-2">
            {orgUnit.risks.map((r) => <RiskBadge key={r.name} risk={r} />)}
          </div>
          <div className="px-5 pb-5 pt-3 border-t border-(--color-border-soft)">
            <p className="text-[13px] text-(--color-ink-2) leading-relaxed">
              Основной риск — дефицит экспертизы в{" "}
              <span className="text-(--color-ink-1) font-medium">Agentic AI</span> и{" "}
              <span className="text-(--color-ink-1) font-medium">AI Governance</span>. Без целевой программы это напрямую блокирует стратегическую цель.
            </p>
          </div>
        </Card>

        {/* Trajectory card with glow */}
        <Card glow>
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-(--color-good)" />
              <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em]">Прогноз готовности</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-display text-[32px] text-(--color-ink-3)">{orgUnit.readiness}%</span>
              <ArrowRight className="h-4 w-4 text-(--color-ink-3)" />
              <span className="font-display text-[32px] text-gradient">{orgUnit.targetReadiness}%</span>
            </div>
            <p className="text-[12.5px] text-(--color-ink-2) leading-relaxed">
              При запуске 90-дневной программы развития компетенций за <span className="text-(--color-ink-1) font-medium">{orgUnit.timelineMonths} месяцев</span>.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
