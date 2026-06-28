import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward, X } from "lucide-react";
import type { ModeId } from "@/data/modes";

// Duration each screen gets before auto-advancing (ms)
const STEP_DURATION = 22_000; // 22s per screen ≈ 3.5 min for 10 screens

interface WalkthroughStep {
  screenId: string;
  narration: string;
}

const walkthroughSteps: Record<ModeId, WalkthroughStep[]> = {
  sber: [
    { screenId: "why",           narration: "ЦИПР-2026 поставил вопрос: кто реализует стратегию? Вот ответ." },
    { screenId: "initiative",    narration: "Выберите стратегическую задачу. Система покажет, что нужно для её реализации." },
    { screenId: "dashboard",     narration: "Готовность организации — 54%. Три критических риска. Это исходная точка." },
    { screenId: "employee",      narration: "Один сотрудник. 62% готовности к целевой роли. Четыре критических пробела." },
    { screenId: "mentor",        narration: "Система находит внутренних экспертов, закрывающих именно эти пробелы." },
    { screenId: "team",          narration: "Формируем команду под инициативу. Видим, где покрытие недостаточно." },
    { screenId: "ecosystem",     narration: "Подключаем Точку Сборки. Покрытие растёт с 67% до 89%." },
    { screenId: "orchestration", narration: "7 агентов оркестрируют процесс. Секунды вместо недель." },
    { screenId: "executive",     narration: "Рекомендация: 12 AI Champions, 90 дней, +27% готовности." },
    { screenId: "division",      narration: "Готовность каждого подразделения. Видим где риск в Рисках и комплаенс." },
  ],
  vk: [
    { screenId: "why",        narration: "Знания живут в сообществах. Платформа делает это видимым." },
    { screenId: "initiative", narration: "Выберите продуктовую инициативу VK." },
    { screenId: "team-build", narration: "AI анализирует, какие роли нужны и где они есть." },
    { screenId: "talent",     narration: "Находим внутренних экспертов за секунды." },
    { screenId: "simulator",  narration: "Симулятор: как программа развития ускорит запуск на 40%." },
    { screenId: "ecosystem",  narration: "Внешняя экосистема Точки Сборки закрывает дефицит." },
    { screenId: "executive",  narration: "8 специалистов. 40% быстрее. Вот рекомендация." },
  ],
  rosatom: [
    { screenId: "why",        narration: "Критические компетенции не должны уходить. Платформа их сохраняет." },
    { screenId: "initiative", narration: "Выберите стратегический проект Росатома." },
    { screenId: "map",        narration: "Карта компетенций по стратегическим проектам страны." },
    { screenId: "experts",    narration: "Сеть экспертов и наставников по каждому направлению." },
    { screenId: "ecosystem",  narration: "Внешний кадровый резерв снижает риск потери экспертизы." },
    { screenId: "pipeline",   narration: "Конвейер: от студента до стратегической инициативы." },
  ],
  yandex: [
    { screenId: "why",        narration: "Скорость развития компетенций определяет скорость продуктов." },
    { screenId: "initiative", narration: "Выберите технологическое направление Яндекса." },
    { screenId: "builder",    narration: "Продуктовая команда за секунды — кто готов прямо сейчас." },
    { screenId: "ecosystem",  narration: "Гибридная сеть талантов ускоряет запуск новых направлений." },
    { screenId: "pipeline",   narration: "Конвейер компетенций: плотность талантов растёт непрерывно." },
  ],
};

export function ExecutiveWalkthrough({
  companyMode,
  onNavigate,
  onClose,
}: {
  companyMode: ModeId;
  onNavigate: (screenId: string) => void;
  onClose: () => void;
}) {
  const steps     = walkthroughSteps[companyMode];
  const [idx, setIdx]       = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef  = useRef<number>(Date.now());

  function goTo(i: number) {
    const clamped = Math.max(0, Math.min(steps.length - 1, i));
    setIdx(clamped);
    onNavigate(steps[clamped].screenId);
    setProgress(0);
    startRef.current = Date.now();
  }

  useEffect(() => {
    onNavigate(steps[0].screenId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!playing) { if (timerRef.current) clearInterval(timerRef.current); return; }
    startRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(100, (elapsed / STEP_DURATION) * 100);
      setProgress(pct);
      if (elapsed >= STEP_DURATION) {
        if (idx < steps.length - 1) {
          goTo(idx + 1);
        } else {
          setPlaying(false);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }
    }, 100);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, idx]);

  const current = steps[idx];
  const totalSec = Math.round((steps.length * STEP_DURATION) / 1000);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[720px] px-4">
      <div className="glass rounded-2xl shadow-2xl border border-(--color-signal)/20 overflow-hidden">

        {/* Progress bar */}
        <div className="h-0.5 w-full bg-(--color-border-soft)">
          <div
            className="h-full bg-gradient-to-r from-(--color-grad-from) to-(--color-grad-to) transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="px-5 py-4 flex items-center gap-4">
          {/* Step counter */}
          <div className="text-[11px] font-mono text-(--color-signal) shrink-0">
            {String(idx + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
          </div>

          {/* Narration */}
          <p className="flex-1 text-[13px] text-(--color-ink-1) leading-snug">
            {current.narration}
          </p>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setPlaying(p => !p)}
              className="h-8 w-8 rounded-lg glass-subtle flex items-center justify-center text-(--color-ink-2) hover:text-(--color-ink-1) transition-colors"
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={() => goTo(idx + 1)}
              disabled={idx >= steps.length - 1}
              className="h-8 w-8 rounded-lg glass-subtle flex items-center justify-center text-(--color-ink-2) hover:text-(--color-ink-1) transition-colors disabled:opacity-30"
            >
              <SkipForward className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-lg glass-subtle flex items-center justify-center text-(--color-ink-3) hover:text-(--color-risk) transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Step dots */}
        <div className="px-5 pb-3 flex items-center gap-1.5">
          {steps.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="group">
              <div className={`rounded-full transition-all duration-300 ${
                i === idx
                  ? "w-6 h-1.5 bg-(--color-signal)"
                  : i < idx
                  ? "w-2 h-1.5 bg-(--color-good)"
                  : "w-2 h-1.5 bg-(--color-border)"
              } group-hover:bg-(--color-signal)/60`} />
            </button>
          ))}
          <span className="ml-auto text-[10px] font-mono text-(--color-ink-3)">
            ~{Math.round(totalSec / 60)} мин
          </span>
        </div>
      </div>
    </div>
  );
}
