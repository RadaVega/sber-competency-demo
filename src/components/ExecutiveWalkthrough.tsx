import { useEffect, useRef, useState } from "react";
import { Play, Pause, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ModeId } from "@/data/modes";

const STEP_DURATION = 20_000; // 20s per screen

interface Step { screenId: string; title: string; narration: string; }

const steps: Record<ModeId, Step[]> = {
  sber: [
    { screenId: "problem",       title: "Проблема",                     narration: "Стратегия есть. Команды нет. Компетенции распределены по организации, эксперты неизвестны, проект задерживается — бизнес теряет скорость." },
    { screenId: "architecture",  title: "Архитектура",                  narration: "Enterprise Capability Intelligence — слой между стратегией и Enterprise AI Platform. Граф компетенций, граф экспертов, граф знаний." },
    { screenId: "why",           title: "Почему это важно",             narration: "ЦИПР-2026 поставил главный вопрос эпохи. 13 000 участников, 350 соглашений — и ни одного ответа на вопрос: кто реализует стратегию?" },
    { screenId: "initiative",    title: "Стратегическая инициатива",    narration: "Начинаем не с сотрудника. Начинаем со стратегической задачи директора. AI анализирует, что нужно для её реализации — за секунды." },
    { screenId: "dashboard",     title: "Готовность организации",       narration: "Сводный индекс готовности — 54%. Три критических риска. Это реальная картина, а не HR-отчёт. Это данные для совета директоров." },
    { screenId: "employee",      title: "Анализ компетенций",           narration: "GigaChat анализирует профиль сотрудника. Готовность к целевой роли — 62%. Четыре критических пробела видны мгновенно." },
    { screenId: "mentor",        title: "Подбор наставников",           narration: "Система находит конкретных людей внутри компании, которые закрывают именно эти пробелы. Не курсы. Люди." },
    { screenId: "team",          title: "Формирование команды",         narration: "Команда под стратегическую задачу — за одно нажатие. Видно, где покрытие есть, где критический дефицит." },
    { screenId: "ecosystem",     title: "Внешняя экосистема",           narration: "Подключаем Точку Сборки. Покрытие компетенций: 67% → 89%. Нажмите кнопку и посмотрите сами." },
    { screenId: "orchestration", title: "Agentic AI",                   narration: "7 специализированных агентов работают параллельно. Это не один AI. Это оркестр — как авиадиспетчерская система для стратегии." },
    { screenId: "executive",     title: "Рекомендация руководителю",   narration: "12 AI Champions, 90 дней, +27% готовности. Одна страница. Всё необходимое для принятия решения." },
    { screenId: "division",      title: "Готовность подразделений",     narration: "Последний экран — тот, которого нет ни в одной HR-системе. Готовность каждого подразделения к реализации стратегии." },
    { screenId: "future",        title: "Будущее",                      narration: "Это не отдельный продукт — это слой архитектуры поверх существующей Enterprise AI Platform. От стратегии к результату." },
  ],
  vk: [
    { screenId: "problem",    title: "Проблема",                narration: "Продукт нужен быстро. Команды нет. Компетенции разбросаны, эксперты неизвестны — запуск задерживается." },
    { screenId: "architecture", title: "Архитектура",           narration: "Enterprise Capability Intelligence связывает стратегию VK с Enterprise AI Platform через граф экспертов и граф компетенций." },
    { screenId: "why",        title: "Знания в сообществах",   narration: "Знания не живут в оргструктуре. Они живут в людях, сообществах, экспертных сетях. Платформа делает это видимым." },
    { screenId: "initiative", title: "Продуктовая инициатива", narration: "Выберите инициативу VK. AI покажет, какие люди нужны и кто из них уже внутри компании." },
    { screenId: "team-build", title: "Сборка команды",         narration: "Роли, компетенции, покрытие — за секунды. Больше не нужно месяцами искать нужного человека." },
    { screenId: "talent",     title: "Внутренние эксперты",    narration: "Система находит лидеров, наставников, контрибьюторов внутри VK. Сила, которая уже есть." },
    { screenId: "simulator",  title: "Симулятор готовности",   narration: "52% сейчас → 84% после программы. 9 месяцев → 5 месяцев. Сокращение Time-to-Market на 40%." },
    { screenId: "ecosystem",  title: "Точка Сборки",           narration: "Внешняя экосистема закрывает дефицит. 1240 студентов, 215 экспертов, 67 команд — уже готовых к проектам." },
    { screenId: "executive",  title: "Рекомендация",           narration: "8 специалистов. 2 наставника. 3 закрытых дефицита. 40% быстрее. Вот что получает VP после этого демо." },
    { screenId: "future",     title: "Будущее",                 narration: "Архитектурный слой поверх Enterprise AI Platform VK. От разовых пилотов — к постоянной операционной модели." },
  ],
  rosatom: [
    { screenId: "problem",      title: "Проблема",                narration: "Критическая экспертиза распределена по организации. Знания уходят вместе с людьми. Стратегические проекты теряют скорость." },
    { screenId: "architecture", title: "Архитектура",             narration: "Enterprise Capability Intelligence сохраняет граф экспертов и граф знаний — поверх существующей Enterprise AI Platform." },
    { screenId: "why",        title: "Критические компетенции", narration: "Экспертиза не должна уходить вместе с людьми. Платформа сохраняет, передаёт, развивает критические знания." },
    { screenId: "initiative", title: "Стратегический проект",   narration: "Северный морской путь. Литиевые технологии. Малые реакторы. Выберите — и система покажет, кто это реализует." },
    { screenId: "map",        title: "Карта компетенций",        narration: "Зрелость компетенций по каждому стратегическому проекту страны. Где риск высокий — сразу видно." },
    { screenId: "experts",    title: "Сеть экспертов",          narration: "Эксперты и наставники по каждому направлению. Передача знаний — управляемый процесс, а не случайность." },
    { screenId: "ecosystem",  title: "Внешний кадровый резерв", narration: "Внешняя экосистема снижает риск потери уникальной экспертизы. 67% → 89% покрытие критических компетенций." },
    { screenId: "pipeline",   title: "Конвейер талантов",       narration: "От студента до стратегической инициативы. Непрерывный поток — а не точечный найм в момент кризиса." },
    { screenId: "future",     title: "Будущее",                  narration: "Граф экспертов и граф знаний — поверх Enterprise AI Platform Росатома. Технологический суверенитет через управляемую экспертизу." },
  ],
  yandex: [
    { screenId: "problem",      title: "Проблема",              narration: "Направление готово к запуску. Команды нет. Дефицит компетенций — главный тормоз скорости продукта." },
    { screenId: "architecture", title: "Архитектура",           narration: "Enterprise Capability Intelligence — связующий слой между стратегией и Enterprise AI Platform Яндекса." },
    { screenId: "why",        title: "Скорость компетенций",  narration: "Скорость развития компетенций определяет скорость продуктов. Яндекс выигрывает благодаря плотности таланта." },
    { screenId: "initiative", title: "Технологическое направление", narration: "Генеративный поиск. Автономные технологии. Яндекс Облако. Выберите — система покажет команду." },
    { screenId: "builder",    title: "Конструктор команд",    narration: "Продуктовая команда за секунды. Кто готов сейчас, кто через 2 недели, где реальный дефицит." },
    { screenId: "ecosystem",  title: "Гибридная сеть",        narration: "Внутренние + внешние таланты. 67% → 89%. Запуск нового направления ускоряется в 2 раза." },
    { screenId: "pipeline",   title: "Конвейер компетенций",  narration: "Непрерывный поток талантов: от студента до ведущего инженера. Плотность таланта как конкурентное преимущество." },
    { screenId: "future",     title: "Будущее",                narration: "Архитектурный слой поверх Enterprise AI Platform Яндекса. От реакции на дефицит — к управлению готовностью заранее." },
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
  const modeSteps = steps[companyMode];
  const [idx, setIdx]         = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProg]   = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(Date.now());

  function goTo(i: number) {
    const clamped = Math.max(0, Math.min(modeSteps.length - 1, i));
    setIdx(clamped);
    onNavigate(modeSteps[clamped].screenId);
    setProg(0);
    startRef.current = Date.now();
  }

  useEffect(() => { onNavigate(modeSteps[0].screenId); /* eslint-disable-next-line */ }, []);

  useEffect(() => {
    if (!playing) { if (timerRef.current) clearInterval(timerRef.current); return; }
    startRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(100, (elapsed / STEP_DURATION) * 100);
      setProg(pct);
      if (elapsed >= STEP_DURATION) {
        if (idx < modeSteps.length - 1) { goTo(idx + 1); }
        else { setPlaying(false); if (timerRef.current) clearInterval(timerRef.current); }
      }
    }, 80);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    /* eslint-disable-next-line */
  }, [playing, idx]);

  const current   = modeSteps[idx];
  const totalMin  = Math.round((modeSteps.length * STEP_DURATION) / 60000);
  const allDone   = !playing && idx === modeSteps.length - 1;

  return (
    <>
      {/* Dim overlay behind main content */}
      <div className="fixed inset-0 z-40 pointer-events-none" style={{ background: "rgba(4,6,16,0.55)" }} />

      {/* Main panel */}
      <div className="fixed inset-x-0 bottom-0 z-50" style={{ maxHeight: "42vh" }}>
        <div className="glass-dark border-t border-(--color-signal)/25 shadow-2xl h-full flex flex-col">

          {/* ---- Progress timeline ---- */}
          <div className="px-8 pt-5 pb-3">
            <div className="flex items-center gap-2">
              {modeSteps.map((s, i) => {
                const isDone   = i < idx;
                const isActive = i === idx;
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="flex flex-col items-center gap-1.5 group min-w-0"
                    style={{ flex: isActive ? 2 : 1 }}
                  >
                    {/* Fill bar */}
                    <div className="h-1.5 w-full rounded-full overflow-hidden bg-(--color-border)">
                      <div
                        className="h-full rounded-full transition-none"
                        style={{
                          width: isActive ? `${progress}%` : isDone ? "100%" : "0%",
                          background: isActive
                            ? "linear-gradient(90deg, #8B7FFF, #56AEFF)"
                            : isDone ? "#3ED98A" : "transparent",
                        }}
                      />
                    </div>
                    {/* Step label — only show on wide screens */}
                    {isActive && (
                      <span className="text-[11px] font-mono text-(--color-signal) truncate w-full text-center leading-tight hidden sm:block">
                        {s.title}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---- Content ---- */}
          <div className="flex-1 px-8 py-4 flex items-center gap-8 min-h-0">

            {/* Step counter */}
            <div className="shrink-0 text-center">
              <div className="font-display text-[64px] text-gradient leading-none"
                style={{ fontVariantNumeric: "tabular-nums" }}>
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="text-[12px] font-mono text-(--color-ink-3) mt-1">
                из {modeSteps.length}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px self-stretch bg-(--color-border)" />

            {/* Narration */}
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-mono text-(--color-signal) uppercase tracking-[0.12em] mb-2">
                {current.title}
              </div>
              <p className="text-[20px] text-(--color-ink-1) leading-snug font-medium max-w-[640px]">
                {current.narration}
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              {/* Play / Pause */}
              <button
                onClick={() => setPlaying(p => !p)}
                className="h-14 w-14 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "linear-gradient(135deg, #8B7FFF, #56AEFF)", boxShadow: "0 0 24px rgba(139,127,255,0.4)" }}
              >
                {playing
                  ? <Pause className="h-6 w-6 text-white" />
                  : <Play className="h-6 w-6 text-white ml-0.5" />
                }
              </button>

              {/* Prev / Next */}
              <div className="flex gap-2">
                <button
                  onClick={() => goTo(idx - 1)}
                  disabled={idx === 0}
                  className="h-9 w-9 rounded-xl glass-subtle flex items-center justify-center text-(--color-ink-2) hover:text-(--color-ink-1) transition-colors disabled:opacity-25"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => goTo(idx + 1)}
                  disabled={idx >= modeSteps.length - 1}
                  className="h-9 w-9 rounded-xl glass-subtle flex items-center justify-center text-(--color-ink-2) hover:text-(--color-ink-1) transition-colors disabled:opacity-25"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-xl glass-subtle flex items-center justify-center text-(--color-ink-3) hover:text-(--color-risk) transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ---- Footer strip ---- */}
          <div className="px-8 py-2 border-t border-(--color-border-soft) flex items-center justify-between">
            <span className="text-[12px] font-mono text-(--color-ink-3)">
              Executive Walkthrough · ~{totalMin} мин · {companyMode.toUpperCase()}
            </span>
            {allDone ? (
              <span className="text-[12px] font-mono text-(--color-good)">✓ Демонстрация завершена</span>
            ) : (
              <span className="text-[12px] font-mono text-(--color-ink-3)">
                {playing ? "▶ воспроизведение" : "⏸ пауза"} · клик на шаг для перехода
              </span>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
