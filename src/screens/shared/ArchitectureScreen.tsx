import { ArrowRight, ArrowLeft } from "lucide-react";
import { ArchTerm } from "@/components/ArchTerm";
import { archTerms, applicableOrgs, BRAND_EN, BRAND_RU } from "@/data/branding";
import type { ModeConfig } from "@/data/modes";

const stack = [
  { term: archTerms.strategicInitiatives, glow: false },
  { term: { ru: BRAND_RU, en: BRAND_EN }, glow: true },
  { term: archTerms.aiPlatform, glow: false },
  { term: archTerms.agentRuntime, glow: false },
  { term: archTerms.enterpriseSystems, glow: false },
];

const components = [
  archTerms.capabilityGraph,
  archTerms.expertGraph,
  archTerms.knowledgeGraph,
  archTerms.teamIntelligence,
  archTerms.knowledgeServices,
  archTerms.businessOutcomes,
];

export function ArchitectureScreen({
  mode,
  onBack,
  onNext,
}: {
  mode: ModeConfig;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1200px] px-8 py-12">

      {/* Header */}
      <div className="mb-12 border-b border-(--color-border) pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-pres-sm text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-4 font-mono">
          <ArrowLeft className="h-4 w-4" /> Почему стратегии не реализуются?
        </button>
        <div className="text-pres-label text-(--color-signal) mb-3">Enterprise Architecture</div>
        <h1 className="font-display text-pres-h1 leading-tight max-w-[700px]">
          <span className="text-(--color-ink-1)">Архитектурная концепция: </span>
          <span className="text-gradient-accent">{BRAND_EN}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* ---- Layered stack ---- */}
        <div className="lg:col-span-3">
          <div className="text-pres-label text-(--color-ink-3) mb-5">Стек реализации стратегии</div>
          <div className="flex flex-col gap-2">
            {stack.map((layer, i) => (
              <div key={layer.term.en} className="flex flex-col items-center">
                <div
                  className={`w-full rounded-2xl px-6 py-5 transition-all ${
                    layer.glow
                      ? "glass border border-(--color-signal)/40 glow-signal"
                      : "glass-subtle"
                  }`}
                >
                  <ArchTerm term={layer.term} size={layer.glow ? "lg" : "base"} />
                </div>
                {i < stack.length - 1 && (
                  <div className="h-5 w-px bg-gradient-to-b from-(--color-signal)/40 to-transparent my-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ---- Components + applicability ---- */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <div className="text-pres-label text-(--color-ink-3) mb-4">Компоненты системы</div>
            <div className="glass rounded-2xl p-5 flex flex-col gap-4">
              {components.map((c) => (
                <div key={c.en} className="flex items-center justify-between gap-4 pb-3 border-b border-(--color-border-soft) last:border-0 last:pb-0">
                  <ArchTerm term={c} size="sm" />
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ background: mode.accentColor }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-pres-label text-(--color-ink-3) mb-4">
              Подходит для организаций, использующих современные корпоративные AI-платформы
            </div>
            <div className="flex flex-wrap gap-2">
              {applicableOrgs.map((org) => (
                <span key={org} className="glass-subtle rounded-full px-4 py-2 text-pres-sm text-(--color-ink-2)">
                  {org}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-end">
        <button
          onClick={onNext}
          className="group flex items-center gap-3 rounded-2xl px-8 py-4 text-pres-lg font-semibold text-white hover:scale-105 transition-all"
          style={{ background: `linear-gradient(135deg, ${mode.accentColor}, #8B7FFF)`, boxShadow: `0 8px 32px ${mode.accentColor}44` }}
        >
          Интерактивный демонстратор
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
