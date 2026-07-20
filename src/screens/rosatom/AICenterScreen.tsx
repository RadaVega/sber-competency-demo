import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/Card";
import { TwoQuestionsClose } from "@/components/TwoQuestionsClose";
import { bi } from "@/lib/bi";
import { useViewMode } from "@/lib/ViewModeContext";
import { aiCenterQuestions, aiCenterEmployeeQuestions } from "@/data/rosatomData";

export function AICenterScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { isVP } = useViewMode();
  const questions = isVP ? aiCenterQuestions : aiCenterEmployeeQuestions;
  const [selected, setSelected] = useState(0);

  // Reset selection when perspective flips — the two question sets don't correspond 1:1
  useEffect(() => { setSelected(0); }, [isVP]);

  const qa = questions[selected];
  const maxVal = qa.chartData ? Math.max(...qa.chartData.map((d) => d.value)) : 100;

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--color-border) pb-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-3 font-mono">
            <ArrowLeft className="h-3.5 w-3.5" /> Формирование команды
          </button>
          <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
            {isVP
              ? bi("AI Strategic Execution Center", "Центр управления стратегической реализацией")
              : bi("Personal AI Advisor", "Персональный AI-советник")}
          </div>
          <h1 className="font-display text-[34px] text-(--color-ink-1) leading-tight">
            {isVP ? "Задайте вопрос — ответ построен на данных этой диагностики" : "Задайте вопрос о своём пути — ответ построен на данных этой диагностики"}
          </h1>
        </div>
        <button onClick={onNext} className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-5 py-3 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all shrink-0">
          Прогноз компетенций 2035
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="flex flex-col gap-2">
          {questions.map((q, i) => (
            <button
              key={q.question}
              onClick={() => setSelected(i)}
              className={`text-left rounded-xl border px-4 py-3 text-[13px] transition-all ${
                i === selected
                  ? "border-(--color-signal)/40 bg-(--color-signal-soft) text-(--color-ink-1)"
                  : "border-(--color-border) text-(--color-ink-2) hover:text-(--color-ink-1)"
              }`}
            >
              {q.question}
            </button>
          ))}
        </div>

        <Card className="p-6 border-(--color-signal)/25">
          <div className="flex items-center gap-2 mb-4 text-[11px] text-(--color-signal) font-mono uppercase tracking-[0.08em]">
            <Sparkles className="h-3.5 w-3.5" />
            AI-ответ
          </div>
          <p className="text-[15px] text-(--color-ink-1) leading-relaxed mb-6">{qa.answer}</p>

          {qa.chartData && (
            <div className="flex flex-col gap-3 pt-4 border-t border-(--color-border-soft)">
              {qa.chartData.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-[12px] text-(--color-ink-2) mb-1">
                    <span>{d.label}</span>
                    <span>{d.value}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
                    <div
                      className="h-full rounded-full bg-(--color-signal) transition-all duration-700"
                      style={{ width: `${(d.value / maxVal) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <TwoQuestionsClose
        vpQuestion="Сколько сейчас стоит организации один неправильный ответ на этот вопрос?"
        employeeQuestion="Если бы у вас был прямой канал к любому нужному эксперту компании — какой вопрос вы бы задали первым?"
      />
    </div>
  );
}
