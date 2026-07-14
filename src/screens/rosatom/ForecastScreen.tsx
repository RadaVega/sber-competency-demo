import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/Card";
import { bi } from "@/lib/bi";
import { capabilityForecasts } from "@/data/rosatomData";
import { useViewMode } from "@/lib/ViewModeContext";

function competitionLevel(specialistsToday: number): { label: string; tone: string } {
  if (specialistsToday <= 8) return { label: "Низкая — специалистов почти нет", tone: "text-(--color-good)" };
  if (specialistsToday <= 12) return { label: "Умеренная", tone: "text-(--color-warn)" };
  return { label: "Высокая — направление уже насыщено", tone: "text-(--color-ink-3)" };
}

export function ForecastScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { isVP } = useViewMode();

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
            <ArrowLeft className="h-3.5 w-3.5" /> Центр AI-управления
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {isVP
              ? bi("Capability Forecast 2035", "Прогноз экспертизы 2035")
              : bi("Where Demand Is Heading", "Куда будет расти спрос")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            {isVP
              ? "Какие компетенции понадобятся — и когда начинать готовить специалистов"
              : "В каком направлении расти, пока конкурентов ещё мало"}
          </h1>
        </div>
        <button onClick={onNext} className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0">
          Технологический суверенитет
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {capabilityForecasts.map((f) => {
          const competition = competitionLevel(f.specialistsToday);
          return (
            <Card key={f.competency} className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <div className="text-[15px] text-(--color-ink-1) font-medium">{f.competency}</div>
                {isVP ? (
                  <div className="text-[12px] text-(--color-ink-3) font-mono">
                    Сегодня: {f.specialistsToday} · Нужно к 2035: {f.specialistsNeeded} · Начать подготовку: {f.prepStartYear}
                  </div>
                ) : (
                  <div className="text-[12px] font-mono flex items-center gap-3">
                    <span className="text-(--color-ink-3)">Открытых позиций к 2035: {f.specialistsNeeded - f.specialistsToday}</span>
                    <span className={competition.tone}>Конкуренция сегодня: {competition.label}</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Сегодня", value: f.today },
                  { label: "+3 года", value: f.in3 },
                  { label: "+5 лет", value: f.in5 },
                  { label: "+10 лет", value: f.in10 },
                ].map((point) => (
                  <div key={point.label}>
                    <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.06em] mb-2">{point.label}</div>
                    <div className="h-24 flex items-end rounded-md bg-(--color-border-soft) overflow-hidden">
                      <div
                        className="w-full rounded-md bg-(--color-signal) transition-all duration-700"
                        style={{ height: `${point.value}%` }}
                      />
                    </div>
                    <div className="text-[12px] text-(--color-ink-2) mt-1.5">{point.value}%</div>
                  </div>
                ))}
              </div>
              {!isVP && (
                <p className="text-[12px] text-(--color-ink-3) mt-4 pt-4 border-t border-(--color-border-soft) leading-relaxed">
                  {f.prepStartYear <= 2026
                    ? "Подготовку по этому направлению стоит начинать уже сейчас — спрос обгонит предложение раньше, чем через 3 года."
                    : "У вас есть время подготовиться до того, как спрос резко вырастет."}
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
