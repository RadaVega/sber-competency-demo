import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Globe } from "lucide-react";
import { Card } from "@/components/Card";
import { TalentSourceSwitcher } from "@/components/TalentSourceSwitcher";
import { CapabilityGapWow } from "@/components/CapabilityGapWow";
import { type TalentSourceMode } from "@/data/tochkaSborki";
import { bi } from "@/lib/bi";
import type { ModeConfig } from "@/data/modes";

const internalContour = [
  { label: bi("Employees", "Сотрудники"), count: 500 },
  { label: bi("Managers", "Руководители"), count: 48 },
  { label: bi("Experts", "Эксперты"), count: 31 },
  { label: bi("Mentors", "Наставники"), count: 19 },
];

const externalContour = [
  { label: bi("Students", "Студенты"), count: 1240 },
  { label: bi("Specialists", "Специалисты"), count: 870 },
  { label: bi("Experts", "Эксперты"), count: 215 },
  { label: bi("Mentors", "Наставники"), count: 94 },
  { label: bi("Project Teams", "Проектные команды"), count: 67 },
  { label: bi("Alumni", "Alumni"), count: 430 },
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
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Команда
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {bi("Talent Ecosystem", "Экосистема талантов")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            Два контура. Одна цель.
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <TalentSourceSwitcher value={sourceMode} onChange={setSourceMode} />
          <button
            onClick={onNext}
            className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0"
          >
            {bi("External Talent", "Внешние таланты")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Dual contour */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Internal */}
        <Card className={sourceMode === "external" ? "opacity-40 transition-opacity" : "transition-opacity"}>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-9 w-9 rounded-lg flex items-center justify-center"
                style={{ background: mode.accentColor + "22" }}
              >
                <Building2 className="h-5 w-5" style={{ color: mode.accentColor }} />
              </div>
              <div>
                <div className="text-[14px] font-medium text-(--color-ink-1)">
                  {bi("Internal Talent", "Внутренние таланты")}
                </div>
                <div className="text-[12px] text-(--color-ink-3)">{mode.org}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {internalContour.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-(--color-border-soft) bg-(--color-surface-raised) px-4 py-3"
                >
                  <div className="font-display text-[24px] text-(--color-ink-1) leading-none mb-1">
                    {item.count}
                  </div>
                  <div className="text-[11.5px] text-(--color-ink-3)">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* External — Tochka Sborki */}
        <Card
          className={sourceMode === "internal" ? "opacity-40 transition-opacity" : "transition-opacity"}
          glow={sourceMode !== "internal"}
        >
          <div className="p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-lg bg-(--color-signal-soft) flex items-center justify-center">
                <Globe className="h-5 w-5 text-(--color-signal)" />
              </div>
              <div>
                <div className="text-[14px] font-medium text-(--color-ink-1)">
                  {bi("Tochka Sborki Ecosystem", "Экосистема Точки Сборки")}
                </div>
                <div className="text-[12px] text-(--color-ink-3)">
                  tochka-sborki-five.vercel.app
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {externalContour.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-(--color-signal)/20 bg-(--color-signal-soft) px-4 py-3"
                >
                  <div className="font-display text-[24px] text-(--color-signal) leading-none mb-1">
                    {item.count}
                  </div>
                  <div className="text-[11.5px] text-(--color-ink-3)">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* WOW demo */}
      <CapabilityGapWow accentColor={mode.accentColor} />

      {/* Mode message */}
      <Card className="mt-6">
        <div className="p-5">
          <p className="text-[13px] text-(--color-ink-2) leading-relaxed">
            {mode.hybridMessage}
          </p>
        </div>
      </Card>
    </div>
  );
}
