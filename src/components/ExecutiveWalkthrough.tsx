import { useEffect, useRef, useState } from "react";
import { Play, Pause, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ModeId } from "@/data/modes";
import { useViewMode } from "@/lib/ViewModeContext";

const STEP_DURATION = 20_000; // 20s per screen

interface Step { screenId: string; title: string; narration: string; employeeNarration?: string; }

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
    { screenId: "problem",       title: "Проблема",
      narration: "У организации — стратегия. У человека — жизнь. Пять стратегических программ Росатома нуждаются в специалистах, которых не хватает, а знания уходят вместе с уходящими на пенсию экспертами.",
      employeeNarration: "У организации — стратегия. У человека — жизнь. Где-то рядом есть программа, которой вы нужны прямо сейчас, — но узнать об этом до сих пор можно было только случайно." },
    { screenId: "architecture",  title: "Архитектура",
      narration: "Enterprise Capability Intelligence сохраняет граф экспертов и граф знаний — поверх существующей Enterprise AI Platform." },
    { screenId: "why",           title: "Два взгляда",
      narration: "Директор программы видит: не хватает специалистов по SMR и литиевым технологиям. Инженер видит: не понимаю, как здесь вырасти. Платформа не выбирает одну сторону — она соединяет обе конкретными парами «потребность программы ↔ цель специалиста».",
      employeeNarration: "Директор программы видит дефицит специалистов. Вы видите вопрос: где я могу вырасти? Платформа не заставляет выбирать между этими двумя взглядами — она превращает их в одну общую задачу." },
    { screenId: "dashboard",     title: "Стратегическая реализация",
      narration: "Это не HR-дашборд. Пять стратегических программ, их прогресс, риски и дефицит специалистов — на одном экране для директора программы." },
    { screenId: "map",           title: "Карта компетенций",
      narration: "Тепловая карта критических компетенций страны — от реакторных технологий до AI для инженерии. Где риск дефицита — сразу видно.",
      employeeNarration: "Та же карта — но теперь это карта возможностей. Где риск для компании выше, там для вас меньше конкурентов и выше шанс стать заметным специалистом." },
    { screenId: "knowledgeRisk", title: "Риск потери знаний",
      narration: "Уникальных экспертов мало, средний возраст растёт. Платформа считает вероятность потери критической экспертизы и говорит, что делать.",
      employeeNarration: "Уникальных экспертов мало, средний возраст растёт. Для вас это не риск компании — это шанс стать одним из немногих, кто унаследует редкую экспертизу." },
    { screenId: "graph",         title: "Граф инженерных знаний",
      narration: "Эксперт → компетенция → проект → технология → наставник → следующее поколение инженеров. Знания компании становятся видимыми.",
      employeeNarration: "Эксперт → компетенция → проект → технология → наставник → следующее поколение инженеров. На этом графе есть место и для вас — платформа показывает, как в него войти." },
    { screenId: "experts",       title: "Сеть экспертов",           narration: "Эксперты и наставники по каждому направлению. Передача знаний — управляемый процесс, а не случайность." },
    { screenId: "teamBuilder",   title: "Формирование команды",
      narration: "Выбираем программу — AI собирает команду: кто уже внутри, кого не хватает, какой риск у проекта.",
      employeeNarration: "Выбираем профиль — AI находит программу, которой вы нужны: что вы получите, кто станет наставником, какой у неё приоритет." },
    { screenId: "aiCenter",      title: "Центр AI-управления",
      narration: "Какие программы под риском? Каких специалистов не хватает? Директор задаёт вопрос — получает ответ с данными и графиками.",
      employeeNarration: "Какой проект нуждается во мне? Кто может стать моим наставником? Сотрудник задаёт вопрос — получает ответ с данными и графиками, а не общими словами." },
    { screenId: "forecast",      title: "Прогноз компетенций 2035",
      narration: "Сегодня, через 3, 5 и 10 лет — сколько специалистов есть и сколько понадобится. Подготовку нужно начинать заранее, не в момент кризиса.",
      employeeNarration: "Та же кривая роста — но теперь это ответ на вопрос, куда расти, пока конкурентов ещё мало. Спрос виден на годы вперёд." },
    { screenId: "sovereignty",   title: "Технологический суверенитет", narration: "Доля отечественных технологий, уровень импортозамещения, критические зависимости — платформа поддерживает задачи технологической независимости." },
    { screenId: "future",        title: "Живая система",
      narration: "Вот путь от двух разных миров к одной живой системе: стратегия видит людей, люди видят свой путь, а баланс между ними поддерживается непрерывно — как в живой экосистеме, а не отчётом раз в квартал. Это и есть инструмент стратегического управления организацией, а не ещё одна HR-система.",
      employeeNarration: "Вот путь от двух разных миров к одной живой системе: организация наконец видит вас, а вы наконец видите свой путь — не по приказу и не случайно, а потому что система непрерывно находит, где вы нужны больше всего." },
  ],
  yandex: [
    { screenId: "problem",        title: "Проблема",
      narration: "Новая идея — генеративный поиск, голосовой интерфейс, автономный транспорт. Но похожие исследования уже идут в трёх командах, и никто об этом не знает.",
      employeeNarration: "У вас есть идея. Но вы не знаете, кто в компании уже решал похожую задачу — и чему у них можно научиться за неделю, а не за квартал." },
    { screenId: "architecture",   title: "Архитектура",
      narration: "Enterprise Capability Intelligence — связующий слой между стратегией и Enterprise AI Platform Яндекса." },
    { screenId: "why",            title: "Два взгляда",
      narration: "Руководитель видит скорость запуска продуктов. Инженер видит, куда перейти и чему научиться. Платформа соединяет оба взгляда — не выбирая между ними." },
    { screenId: "initiative",     title: "Новая возможность",
      narration: "Генеративный поиск в Маркете. AI-ассистент в Практикуме. Персонализация Дзена. Выбираем идею — AI анализирует, что уже исследовано, кем и с каким результатом." },
    { screenId: "knowledgeGraph", title: "Граф знаний",
      narration: "Не Dashboard — живая карта организации. Исследования, продукты, команды, эксперты, компетенции, технологии — каждый завершённый проект становится вершиной графа, а не закрытым тикетом.",
      employeeNarration: "Каждый узел — это работа, которую кто-то уже сделал. Нажмите на любой — и увидите, кто стоит за исследованием, какой продукт из него вырос и с кем можно поговорить уже сегодня." },
    { screenId: "opportunityMap", title: "Карта возможностей",
      narration: "Не дефицит специалистов — карта дублирования. Три команды параллельно исследуют одну и ту же архитектуру, не зная друг о друге.",
      employeeNarration: "Та же карта — но это ответ на вопрос, куда расти. Где меньше всего экспертов сейчас — там больше всего шансов стать заметным через год." },
    { screenId: "builder",        title: "Рождение команды",
      narration: "Продуктовая команда собирается не вручную. AI предлагает лучшее сочетание людей — кто готов сейчас, кто через 2 недели, где реальный дефицит." },
    { screenId: "compounding",    title: "Накопление интеллекта",
      narration: "Проект заканчивается — знания остаются. AI подсказывал команде на каждом шаге, а после завершения методика становится частью графа: следующая команда стартует на 38% быстрее. Самая ценная технология Яндекса — не отдельный AI, а организация, которая после каждого проекта становится умнее." },
    { screenId: "future",         title: "Будущее",
      narration: "Каждый новый проект увеличивает интеллектуальный капитал организации. Capability Intelligence Platform превращает этот процесс в непрерывный цикл." },
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
  const { isVP } = useViewMode();
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
                {isVP || !current.employeeNarration ? current.narration : current.employeeNarration}
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
              Демонстрация для руководителя · ~{totalMin} мин · {companyMode.toUpperCase()}
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
