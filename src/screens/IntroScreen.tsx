import { ArrowRight } from "lucide-react";
import type { ModeConfig } from "@/data/modes";
import { BRAND_RU, CATEGORY_RU, TAGLINE_RU, TAGLINE_STEPS_RU, HERO_DESCRIPTION_RU } from "@/data/branding";

export function IntroScreen({ mode, onStart }: { mode: ModeConfig; onStart: () => void }) {
  return (
    <div className="relative min-h-[calc(100vh-90px)] flex flex-col items-center justify-center px-6 py-14 overflow-hidden">

      {/* Ambient background */}
      <div className="absolute inset-0 ambient-bg pointer-events-none" />
      <div className="absolute inset-0 grid-overlay opacity-[0.12] pointer-events-none" />
      <div className="absolute top-1/4 left-1/6 w-[520px] h-[520px] rounded-full blur-[150px] animate-glow pointer-events-none" style={{ background: "rgba(139,127,255,0.14)" }} />
      <div className="absolute bottom-1/4 right-1/6 w-[380px] h-[380px] rounded-full blur-[130px] animate-glow pointer-events-none" style={{ background: "rgba(86,174,255,0.10)", animationDelay: "2s" }} />

      <div className="relative z-10 w-full max-w-[920px] flex flex-col items-center text-center gap-9">

        {/* Org badge */}
        <div className="flex items-center gap-3">
          <div
            className="h-12 w-12 rounded-2xl flex items-center justify-center text-pres-lg font-bold shadow-lg shrink-0"
            style={{ background: `linear-gradient(135deg, ${mode.accentColor}, ${mode.accentColor}99)`, color: "#06091A", boxShadow: `0 0 26px ${mode.accentColor}44` }}
          >
            {mode.badgeLetter}
          </div>
          <div className="text-left">
            <div className="text-pres-base font-medium text-(--color-ink-1)">{mode.org}</div>
            <div className="text-pres-xs text-(--color-ink-3) font-mono">{mode.scenarioName}</div>
          </div>
        </div>

        {/* Hero */}
        <div>
          <div className="text-pres-label text-(--color-ink-3) mb-4">Интерактивная стратегическая модель</div>
          <h1 className="font-display text-[44px] sm:text-pres-hero text-gradient-accent leading-tight text-balance max-w-[820px] mx-auto mb-5">
            {BRAND_RU}
          </h1>
          <div className="text-pres-sm text-(--color-ink-3) font-mono uppercase tracking-[0.1em] mb-5">
            {CATEGORY_RU}
          </div>
          <p className="text-pres-lg text-(--color-ink-2) leading-relaxed max-w-[700px] mx-auto">
            {HERO_DESCRIPTION_RU}
          </p>
        </div>

        {/* Tagline */}
        <div className="glass rounded-2xl px-8 py-6 max-w-[640px]">
          <div className="font-display text-pres-h2 text-gradient mb-4">{TAGLINE_RU}</div>
          <div className="flex flex-col gap-1.5">
            {TAGLINE_STEPS_RU.map((step, i) => (
              <div key={step} className="flex items-center gap-3 justify-center text-pres-base text-(--color-ink-2)">
                <span className="text-(--color-signal) font-mono text-pres-sm">{String(i + 1).padStart(2, "0")}</span>
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="group relative flex items-center gap-3 rounded-2xl px-10 py-4 text-pres-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${mode.accentColor}, #8B7FFF)`, boxShadow: `0 8px 36px ${mode.accentColor}44` }}
        >
          <span className="relative z-10">Изучить концепцию</span>
          <ArrowRight className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>

      </div>
    </div>
  );
}
