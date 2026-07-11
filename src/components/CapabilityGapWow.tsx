import { useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Card } from "@/components/Card";
import { hybridCoverage } from "@/data/tochkaSborki";
import { bi } from "@/lib/bi";
import { cn } from "@/lib/cn";

export function CapabilityGapWow({ accentColor }: { accentColor: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-(--color-border-soft)">
        <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-1">
          {bi("Capability Gap", "Дефицит компетенций")} · интерактивная демонстрация
        </div>
        <p className="text-[13px] text-(--color-ink-2)">
          Что происходит с покрытием компетенций при подключении внешней
          экосистемы?
        </p>
      </div>

      {/* Gap badges */}
      <div className="px-6 py-4 flex flex-wrap gap-2 border-b border-(--color-border-soft)">
        {hybridCoverage.gaps.map((g) => (
          <span
            key={g}
            className="inline-flex items-center gap-1.5 rounded-full border border-(--color-risk)/30 bg-(--color-risk-soft) px-3 py-1 text-[12px] font-medium text-(--color-risk)"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {g}
          </span>
        ))}
      </div>

      {/* The comparison */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Internal only */}
        <div>
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-3">
            {bi("Internal Only", "Только внутренние ресурсы")}
          </div>
          <div className="font-display text-[48px] text-(--color-warn) leading-none mb-3">
            {hybridCoverage.internalOnly}%
          </div>
          <div className="h-2 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
            <div
              className="h-full rounded-full bg-(--color-warn) transition-all duration-700"
              style={{ width: `${hybridCoverage.internalOnly}%` }}
            />
          </div>
          <p className="text-[12px] text-(--color-ink-3) mt-2">
            Без внешнего контура — 3 критических дефицита не закрыты
          </p>
        </div>

        {/* Hybrid */}
        <div>
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-3">
            {bi("Hybrid Talent Network", "Гибридная сеть талантов")}
          </div>
          <div
            className={cn(
              "font-display text-[48px] leading-none mb-3 transition-colors duration-700",
              revealed ? "text-(--color-good)" : "text-(--color-ink-3)"
            )}
          >
            {revealed ? `${hybridCoverage.withEcosystem}%` : "?"}
          </div>
          <div className="h-2 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
            <div
              className="h-full rounded-full bg-(--color-good) transition-all duration-700"
              style={{
                width: revealed ? `${hybridCoverage.withEcosystem}%` : "0%",
              }}
            />
          </div>
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="mt-3 flex items-center gap-2 rounded-md px-4 py-2 text-[12.5px] font-medium text-(--color-canvas) hover:brightness-110 transition-all"
              style={{ background: accentColor }}
            >
              <Zap className="h-3.5 w-3.5" />
              Подключить Точку Сборки
            </button>
          ) : (
            <p className="text-[12px] text-(--color-good) mt-2 font-medium">
              +{hybridCoverage.withEcosystem - hybridCoverage.internalOnly}% через внешний контур
            </p>
          )}
        </div>
      </div>

      {/* Breakdown — shown after reveal */}
      {revealed && (
        <div className="px-6 pb-6">
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-3">
            {bi("External Fill", "Покрытие из внешней экосистемы")}
          </div>
          <div className="divide-y divide-(--color-border-soft) rounded-lg border border-(--color-border) overflow-hidden">
            {hybridCoverage.externalFill.map((f) => (
              <div
                key={f.gap}
                className="grid grid-cols-[auto_1fr] gap-4 px-4 py-3 bg-(--color-surface)"
              >
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-(--color-good) shrink-0" />
                  <span className="text-[13px] font-medium text-(--color-ink-1) whitespace-nowrap">
                    {f.gap}
                  </span>
                </div>
                <span className="text-[12.5px] text-(--color-ink-2) text-right">
                  {f.source}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
