import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Globe } from "lucide-react";
import { Card } from "@/components/Card";
import { TalentSourceSwitcher } from "@/components/TalentSourceSwitcher";
import { CapabilityGapWow } from "@/components/CapabilityGapWow";
import { type TalentSourceMode } from "@/data/tochkaSborki";
import { bi } from "@/lib/bi";
import { cn } from "@/lib/cn";
import type { ModeConfig } from "@/data/modes";

const internalContour = [
  { label: "Сотрудники (Employees)", count: 500 },
  { label: "Managers (Руководители)", count: 48 },
  { label: "Experts (Эксперты)", count: 31 },
  { label: "Mentors (Наставники)", count: 19 },
];

const externalContour = [
  { label: "Students (Студенты)", count: 1240 },
  { label: "Specialists (Специалисты)", count: 870 },
  { label: "Experts (Эксперты)", count: 215 },
  { label: "Mentors (Наставники)", count: 94 },
  { label: "Project Teams (Команды)", count: 67 },
  { label: "Alumni", count: 430 },
];

export function TalentEcosystemScreen({
  mode,
  onBack,
  onNext,
}: {
  mode: ModeConfig;
  onBack: () => void;
  onNext: () => void;
}) {
  const [sourceMode, setSourceMode] = useState<TalentSourceMode>("hybrid");

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">

      {/* ---- Header ---- */}
      <div className="mb-8 border-b border-(--color-border) pb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Команда
        </button>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-2">
              {bi("Talent Ecosystem", "Экосистема талантов")}
            </div>
            <h1 className="font-display text-[30px] text-(--color-ink-1) leading-tight">
              Два контура. Одна цель.
            </h1>
          </div>
          <div className="flex items-center gap-3 shrink-0 mt-1">
            <TalentSourceSwitcher value={sourceMode} onChange={setSourceMode} />
            <button
              onClick={onNext}
              className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-4 py-2 text-[12.5px] font-medium text-(--color-canvas) hover:brightness-110 transition-all"
            >
              {bi("External", "Внешние таланты")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ---- Dual contour ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

        {/* Internal */}
        <Card className={cn("transition-opacity duration-300", sourceMode === "external" && "opacity-35")}>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: mode.accentColor + "22" }}
              >
                <Building2 className="h-4 w-4" style={{ color: mode.accentColor }} />
              </div>
              <div>
                <div className="text-[13px] font-medium text-(--color-ink-1)">
                  {bi("Internal Talent", "Внутренние таланты")}
                </div>
                <div className="text-[11px] text-(--color-ink-3)">{mode.org}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {internalContour.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-(--color-border-soft) bg-(--color-surface-raised) px-4 py-3"
                >
                  <div className="font-display text-[22px] text-(--color-ink-1) leading-none mb-1">
                    {item.count}
                  </div>
                  <div className="text-[11px] text-(--color-ink-3) leading-tight">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* External */}
        <Card
          className={cn("transition-opacity duration-300", sourceMode === "internal" && "opacity-35")}
          glow={sourceMode !== "internal"}
        >
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-(--color-signal-soft) flex items-center justify-center shrink-0">
                <Globe className="h-4 w-4 text-(--color-signal)" />
              </div>
              <div>
                <div className="text-[13px] font-medium text-(--color-ink-1)">
                  {bi("Tochka Sborki", "Точка Сборки")}
                </div>
                <div className="text-[11px] text-(--color-ink-3)">tochka-sborki-five.vercel.app</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {externalContour.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-(--color-signal)/15 bg-(--color-signal-soft) px-4 py-3"
                >
                  <div className="font-display text-[22px] text-(--color-signal) leading-none mb-1">
                    {item.count.toLocaleString("ru-RU")}
                  </div>
                  <div className="text-[11px] text-(--color-ink-3) leading-tight">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* ---- WOW demo ---- */}
      <CapabilityGapWow accentColor={mode.accentColor} />

      {/* ---- Mode message ---- */}
      <Card className="mt-5">
        <div className="px-5 py-4">
          <p className="text-[13px] text-(--color-ink-2) leading-relaxed">{mode.hybridMessage}</p>
        </div>
      </Card>
    </div>
  );
}
