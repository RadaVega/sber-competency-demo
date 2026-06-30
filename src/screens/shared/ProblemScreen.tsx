import { ArrowRight, ArrowDown } from "lucide-react";
import { problemCascade, BRAND_RU } from "@/data/branding";
import type { ModeConfig } from "@/data/modes";

export function ProblemScreen({
  mode,
  onNext,
}: {
  mode: ModeConfig;
  onNext: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1000px] px-8 py-14">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-pres-label text-(--color-signal) mb-4">
          {mode.org} · Enterprise Architecture
        </div>
        <h1 className="font-display text-pres-hero text-(--color-ink-1) leading-tight max-w-[720px] mx-auto text-balance">
          Почему стратегии не реализуются?
        </h1>
      </div>

      {/* Cascade */}
      <div className="flex flex-col items-center gap-1 mb-10">
        {problemCascade.map((step, i) => {
          const isFirst = i === 0;
          const isLast  = i === problemCascade.length - 1;
          return (
            <div key={step} className="w-full flex flex-col items-center">
              <div
                className={`w-full max-w-[560px] rounded-xl px-6 py-4 text-center transition-all ${
                  isFirst
                    ? "glass border border-(--color-signal)/30 glow-signal"
                    : isLast
                    ? "glass border border-(--color-risk)/30"
                    : "glass-subtle"
                }`}
              >
                <span
                  className={`text-pres-lg font-medium ${
                    isFirst ? "text-(--color-signal)" : isLast ? "text-(--color-risk)" : "text-(--color-ink-1)"
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < problemCascade.length - 1 && (
                <ArrowDown className="h-5 w-5 text-(--color-ink-3) my-1.5 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Resolution */}
      <div className="flex flex-col items-center gap-4">
        <ArrowDown className="h-6 w-6 text-(--color-good)" />
        <div className="glass rounded-2xl border border-(--color-good)/30 px-8 py-6 text-center max-w-[560px] glow-good">
          <div className="text-pres-label text-(--color-good) mb-2">Решение</div>
          <div className="font-display text-pres-h2 text-gradient-accent leading-tight">
            {BRAND_RU}
          </div>
        </div>

        <button
          onClick={onNext}
          className="group mt-4 flex items-center gap-3 rounded-2xl px-8 py-4 text-pres-lg font-semibold text-white hover:scale-105 transition-all"
          style={{
            background: `linear-gradient(135deg, ${mode.accentColor}, #8B7FFF)`,
            boxShadow: `0 8px 32px ${mode.accentColor}44`,
          }}
        >
          Как это работает
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

    </div>
  );
}
