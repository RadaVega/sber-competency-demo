import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Card, CardHeader } from "@/components/Card";
import { MetricStat } from "@/components/MetricStat";
import { lazy, Suspense } from "react";
const CompetencyRadar = lazy(() => import("@/components/CompetencyRadar").then(m => ({ default: m.CompetencyRadar })));
import { AISourceBadge } from "@/components/AISourceBadge";
import { employee } from "@/data/mockData";
import { analyzeEmployee, type AnalysisResult } from "@/lib/claudeClient";
import { useLiveMode } from "@/lib/LiveModeContext";
import { bi } from "@/lib/bi";

type Status = "idle" | "loading" | "done";

function toneFor(value: number): "good" | "warn" | "risk" {
  if (value >= 70) return "good";
  if (value >= 50) return "warn";
  return "risk";
}

export function EmployeeScreen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const { isLive } = useLiveMode();

  async function handleAnalyze() {
    setStatus("loading");
    const r = await analyzeEmployee(employee, isLive);
    setResult(r);
    setStatus("done");
  }

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      {/* ---- Header ---- */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Готовность организации
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Employee Competency Analysis", "Анализ компетенций сотрудника")}
          </div>
          <h1 className="font-display text-pres-hero text-(--color-ink-1) leading-tight">
            Анализ сотрудника
          </h1>
        </div>

        {status === "done" && (
          <button
            onClick={onNext}
            className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
          >
            Найти наставника
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ---- Employee card ---- */}
        <Card className="col-span-1 h-fit">
          <CardHeader eyebrow="Сотрудник" title={employee.name} />
          <div className="px-5 pb-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-(--color-border-soft)">
              <div>
                <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-1">
                  Текущая роль
                </div>
                <div className="text-[13px] text-(--color-ink-1)">{employee.role}</div>
              </div>
              <div>
                <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-1">
                  Целевая роль
                </div>
                <div className="text-[13px] text-(--color-ink-1)">{employee.targetRole}</div>
              </div>
            </div>

            <div>
              <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-2">
                Текущие компетенции
              </div>
              <div className="flex flex-wrap gap-1.5">
                {employee.currentCompetencies.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-(--color-border) bg-(--color-surface-raised) px-2.5 py-1 text-[12px] text-(--color-ink-2)"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {status === "idle" && (
              <button
                onClick={handleAnalyze}
                className="w-full flex items-center justify-center gap-3 rounded-xl px-5 py-4 text-pres-base font-semibold text-white hover:scale-105 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                Анализировать компетенции
              </button>
            )}

            {status === "loading" && (
              <div className="w-full flex items-center justify-center gap-2 rounded-md border border-(--color-border) px-4 py-3 text-[13px] text-(--color-ink-2)">
                <Loader2 className="h-4 w-4 animate-spin" />
                Агент анализирует профиль...
              </div>
            )}

            {status === "done" && result && (
              <AISourceBadge source={result.source} provider={result.provider} />
            )}
          </div>
        </Card>

        {/* ---- Results ---- */}
        <div className="md:col-span-2">
          {status !== "done" && (
            <Card className="h-full flex items-center justify-center min-h-[420px]">
              <p className="text-(--color-ink-3) text-[13px] max-w-[280px] text-center">
                Нажмите «Анализировать компетенции», чтобы запустить AI-агент
                и получить оценку готовности.
              </p>
            </Card>
          )}

          {status === "done" && result && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-lg border border-(--color-border) bg-(--color-border)">
                <div className="bg-(--color-surface) p-6">
                  <MetricStat
                    label="Готовность к текущей роли"
                    value={result.readinessCurrentRole}
                    tone={toneFor(result.readinessCurrentRole)}
                  />
                </div>
                <div className="bg-(--color-surface) p-6">
                  <MetricStat
                    label="Готовность к целевой роли"
                    value={result.readinessTargetRole}
                    tone={toneFor(result.readinessTargetRole)}
                  />
                </div>
              </div>

              <Card>
                <CardHeader eyebrow="Gap Analysis" title="Критические пробелы" />
                <div className="px-5 pb-5 flex flex-wrap gap-2">
                  {result.criticalGaps.map((g) => (
                    <span
                      key={g}
                      className="inline-flex items-center gap-2 rounded-full border border-(--color-risk)/30 bg-(--color-risk-soft) px-4 py-2 text-pres-sm font-semibold text-(--color-risk)"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {g}
                    </span>
                  ))}
                </div>
              </Card>

              <Card>
                <CardHeader eyebrow="Profile" title="Компетенции: текущий vs целевой профиль" />
                <div className="px-2 pb-4">
                  <Suspense fallback={<div className="h-[340px] flex items-center justify-center text-pres-label text-(--color-ink-3)">Loading chart…</div>}>
                    <CompetencyRadar data={result.radar} />
                  </Suspense>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
