import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { bi } from "@/lib/bi";
import { BRAND_RU } from "@/data/branding";
import type { ModeConfig } from "@/data/modes";

/**
 * The one deliberately-sanctioned new screen in the app — sits right after
 * Problem, before any technology (Knowledge Graph, AI, dashboards,
 * architecture). Rebuilt around the seven-beat structure from the
 * "Inception, not a presentation" brief: Question -> Analogy -> Plain
 * explanation -> How it looks here -> Two open questions (VP + employee,
 * left unanswered) -> One small insight -> only then, the technology.
 *
 * Deliberately layered for two readers at once, not two versions: a fast
 * reader gets the whole idea from the question + analogy alone (10-15s);
 * someone who wants to understand gets the explanation and the org-specific
 * tie-in without ever needing AI/HR/architecture vocabulary.
 */

export function OrganizationalMemoryScreen({
  mode,
  onBack,
  onNext,
}: {
  mode: ModeConfig;
  onBack: () => void;
  onNext: () => void;
}) {
  const [revealed, setRevealed] = useState(1);

  useEffect(() => {
    if (revealed >= 6) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), 4200);
    return () => clearTimeout(t);
  }, [revealed]);

  return (
    <div className="mx-auto max-w-[760px] px-8 py-14">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-10 font-mono"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Назад
      </button>

      {/* 1. Вопрос — short, unanswered, meant to open a dialogue, not close it */}
      <p className="font-display text-[28px] md:text-[34px] text-(--color-ink-1) leading-snug text-center mb-16">
        Почему после ухода одного человека
        <br />
        организация может потерять годы развития?
      </p>

      {/* 2. Аналогия — from ordinary life, not corporate, not IT */}
      {revealed >= 2 && (
        <div className="mb-12 animate-screen-in">
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-3 text-center">
            {bi("An ordinary story", "Обычная история")}
          </div>
          <p className="text-[16px] text-(--color-ink-1) leading-relaxed text-center max-w-[600px] mx-auto">
            Мама печёт пирог. Рецепт живёт только у неё в голове. Каждый раз
            получается немного иначе — где-то удачнее, где-то нет, но никто
            не записывает почему. Когда мама перестаёт готовить, дочь начинает
            с чистого листа — с теми же ошибками, с которых начинала когда-то мама.
          </p>
        </div>
      )}

      {/* 3. Простое объяснение — 3-4 sentences, no jargon */}
      {revealed >= 3 && (
        <div className="mb-12 animate-screen-in">
          <p className="text-[14.5px] text-(--color-ink-2) leading-relaxed text-center max-w-[560px] mx-auto">
            Ценность создаёт не сам рецепт. Ценность создаёт способность улучшать
            его каждый раз заново — фиксировать, что сработало, а что нет, чтобы
            следующая попытка начиналась не с нуля, а с лучшей версии предыдущей.
            Без этого даже отличный результат исчезает вместе с человеком, который
            его получил.
          </p>
        </div>
      )}

      {/* 4. Как это выглядит в организации — concrete, specific */}
      {revealed >= 4 && (
        <div className="mb-12 animate-screen-in glass-subtle rounded-xl px-6 py-5">
          <p className="text-[14px] text-(--color-ink-1) leading-relaxed text-center max-w-[560px] mx-auto">
            В {mode.org} это выглядит так: после завершения проекта знание остаётся
            только в головах пяти человек, которые в нём участвовали. Следующая
            команда снова тратит месяцы на то, что уже было известно —
            просто никто не может до этого знания добраться.
          </p>
        </div>
      )}

      {/* 5. Два вопроса — deliberately left open, not answered here */}
      {revealed >= 5 && (
        <div className="mb-12 animate-screen-in grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="rounded-xl border border-(--color-signal)/25 px-5 py-5">
            <div className="text-[10.5px] text-(--color-signal) font-mono uppercase tracking-[0.08em] mb-2.5">
              Вопрос руководителю
            </div>
            <p className="text-[14px] text-(--color-ink-1) leading-relaxed">
              Что сегодня исчезнет из вашей организации, если завтра уйдут
              три самых сильных эксперта?
            </p>
          </div>
          <div className="rounded-xl border border-(--color-good)/25 px-5 py-5">
            <div className="text-[10.5px] text-(--color-good) font-mono uppercase tracking-[0.08em] mb-2.5">
              Вопрос сотруднику
            </div>
            <p className="text-[14px] text-(--color-ink-1) leading-relaxed">
              Если завтра вы уйдёте в отпуск на месяц — что останется
              после вашей работы?
            </p>
          </div>
        </div>
      )}

      {/* 6. Одна мысль — no more than one */}
      {revealed >= 6 && (
        <div className="mb-16 animate-screen-in text-center">
          <p className="font-display text-[22px] md:text-[26px] text-(--color-ink-1) leading-snug max-w-[600px] mx-auto">
            Организация становится сильнее не тогда, когда люди работают больше.
            <br />
            <span className="text-gradient-accent">
              А тогда, когда каждый проект делает умнее всю организацию.
            </span>
          </p>
        </div>
      )}

      {/* 7. Only now — the bridge to the technology */}
      {revealed >= 6 && (
        <div className="flex flex-col items-center gap-4 animate-screen-in">
          <p className="text-[13px] text-(--color-ink-3) text-center max-w-[480px] leading-relaxed">
            {BRAND_RU} существует, чтобы задать эти два вопроса раньше, чем
            ответ на них станет кризисом. Дальше — как именно это выглядит в {mode.org}.
          </p>
          <button
            onClick={onNext}
            className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-6 py-3.5 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all"
          >
            Посмотреть, как это устроено
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}
