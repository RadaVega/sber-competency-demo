import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowDown, BookOpen, Share2, Brain, Users2 } from "lucide-react";
import { Card } from "@/components/Card";
import { bi } from "@/lib/bi";
import { BRAND_RU } from "@/data/branding";
import type { ModeConfig } from "@/data/modes";

/**
 * The one deliberately-sanctioned new screen in the whole app — sits right
 * after Problem, before any technology (Knowledge Graph, AI, dashboards,
 * architecture). The idea: understand the *principle* before seeing any
 * *mechanism*. Everything after this screen — graphs, agents, dashboards —
 * should read as instruments that build organisational memory, not as
 * product features in their own right.
 *
 * Deliberately built as a calm, static screen (Card-based, like the rest
 * of the app's in-flow screens) rather than a heavy animated sequence —
 * the family recipe book metaphor doesn't need motion to land, it needs
 * quiet and room to read.
 */

const STAIRCASE = [
  "Данные", "Знания", "Опыт", "Экспертиза", "Организационная память",
  "Лучшие управленческие решения", "Стратегическая реализация", "Новый проект", "Новый опыт",
];

const LEVELS = [
  {
    icon: BookOpen,
    title: "Знания",
    question: "ЧТО существует",
    detail: "Документы, стандарты, инструкции, проекты. LLM уже умеют это искать — это только первый уровень.",
  },
  {
    icon: Share2,
    title: "Опыт",
    question: "ПОЧЕМУ были приняты именно такие решения",
    detail: "Какие ошибки уже были. Что сработало. Что не сработало. Что нельзя повторять. Это значительно ценнее документов.",
  },
  {
    icon: Users2,
    title: "Экспертиза",
    question: "КТО действительно способен решить подобную задачу",
    detail: "Не по должности. Не по сертификату. Не по резюме. А потому что уже успешно решал подобные задачи. Самый ценный уровень.",
  },
];

const AI_QUESTIONS = [
  "Почему было принято именно это решение?",
  "Какие ошибки уже были?",
  "Кто действительно способен решить подобную задачу?",
  "Где уже существует нужная экспертиза?",
  "Какой следующий проект может использовать этот опыт?",
];

export function OrganizationalMemoryScreen({
  mode,
  onBack,
  onNext,
}: {
  mode: ModeConfig;
  onBack: () => void;
  onNext: () => void;
}) {
  const [morphed, setMorphed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMorphed(true), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto max-w-[1080px] px-8 py-10">
      <div className="mb-10 text-center">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[12px] text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-6 font-mono mx-auto w-fit"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Назад
        </button>
        <div className="text-[11px] uppercase tracking-[0.14em] text-(--color-signal) font-mono mb-3">
          {bi("Organizational Memory", "Организационная память")}
        </div>
        <h1 className="font-display text-[32px] text-(--color-ink-1) leading-tight max-w-[680px] mx-auto">
          Прежде чем показать технологию — принцип
        </h1>
      </div>

      {/* The recipe book metaphor — left without memory, right with memory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        <Card className="p-6">
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-4">
            Без организационной памяти
          </div>
          <p className="text-[14px] text-(--color-ink-2) leading-relaxed">
            Каждый раз мама печёт пирог. Рецепт существует только у неё в голове.
            Когда мама перестаёт готовить — следующее поколение начинает всё
            сначала. Ошибки повторяются. Качество падает.
          </p>
        </Card>
        <Card className="p-6 border-(--color-good)/25">
          <div className="text-[11px] text-(--color-good) font-mono uppercase tracking-[0.08em] mb-4">
            С организационной памятью
          </div>
          <p className="text-[14px] text-(--color-ink-2) leading-relaxed">
            После каждого приготовления рецепт становится лучше. Появляются
            фотографии, советы, типичные ошибки, удачные решения. Следующее
            поколение начинает не с нуля, а с лучшей версии прошлого опыта.
          </p>
        </Card>
      </div>

      {/* Quiet morph — the same idea, now named as what it becomes inside an organisation */}
      <div className="flex flex-col items-center gap-3 mb-14">
        <div
          className="flex items-center gap-4 transition-opacity duration-[1400ms]"
          style={{ opacity: morphed ? 1 : 0.35 }}
        >
          <span className="text-[13px] font-mono text-(--color-ink-3)">Рецепты → проекты</span>
          <span className="text-[13px] font-mono text-(--color-ink-3)">Советы → опыт</span>
          <span className="text-[13px] font-mono text-(--color-ink-3)">Семья → эксперты</span>
        </div>
        <p className="text-[13px] text-(--color-ink-2) text-center max-w-[520px] leading-relaxed">
          Ценность создаёт не рецепт, а способность семьи — или организации —
          постоянно улучшать знания.
        </p>
      </div>

      {/* The pause — no clutter, no buttons nearby */}
      <div className="py-16 text-center">
        <p className="font-display text-[26px] md:text-[32px] text-(--color-ink-1) leading-snug max-w-[720px] mx-auto">
          После каждого завершённого проекта организация либо становится умнее —
          <br />
          <span className="text-gradient-accent">либо начинает следующий проект заново.</span>
        </p>
      </div>

      {/* Three levels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        {LEVELS.map((l) => (
          <Card key={l.title} className="p-6">
            <l.icon className="h-5 w-5 text-(--color-signal) mb-3" />
            <div className="text-[15px] text-(--color-ink-1) font-medium mb-1.5">{l.title}</div>
            <div className="text-[11.5px] text-(--color-ink-3) font-mono uppercase tracking-[0.04em] mb-3">
              {l.question}
            </div>
            <p className="text-[13px] text-(--color-ink-2) leading-relaxed">{l.detail}</p>
          </Card>
        ))}
      </div>

      {/* The cycle */}
      <Card className="mb-10 p-6">
        <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-5 text-center">
          Живой цикл, не архив
        </div>
        <div className="flex flex-col items-center gap-1.5">
          {STAIRCASE.map((step, i) => (
            <div key={step} className="flex flex-col items-center gap-1.5">
              <span className="text-[13px] font-mono text-(--color-ink-2)">{step}</span>
              {i < STAIRCASE.length - 1 && <ArrowDown className="h-3.5 w-3.5 text-(--color-ink-3)" />}
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2 text-(--color-good)">
            <Brain className="h-4 w-4" />
            <span className="text-[13px] font-mono">организация становится ещё умнее — и цикл начинается заново</span>
          </div>
        </div>
      </Card>

      {/* What it's not / what it is */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        <Card className="p-6">
          <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-3">
            Организационная память — это не
          </div>
          <ul className="flex flex-col gap-2 text-[13px] text-(--color-ink-3)">
            <li>Архив документов</li>
            <li>База знаний</li>
            <li>Корпоративная Wiki</li>
            <li>Папка с Lessons Learned</li>
          </ul>
        </Card>
        <Card className="p-6 border-(--color-signal)/25">
          <div className="text-[11px] text-(--color-signal) font-mono uppercase tracking-[0.08em] mb-3">
            Это
          </div>
          <p className="text-[13px] text-(--color-ink-1) leading-relaxed">
            Постоянно развивающаяся сеть, которая связывает знания, опыт, экспертизу,
            людей, проекты и решения — и делает всё это доступным каждому следующему проекту.
          </p>
        </Card>
      </div>

      {/* What makes this different from Enterprise AI */}
      <Card className="mb-10 p-6">
        <div className="text-[11px] text-(--color-ink-3) font-mono uppercase tracking-[0.08em] mb-4">
          Большинство Enterprise AI отвечает на вопрос «Что написано?»
        </div>
        <div className="flex flex-col gap-2.5">
          {AI_QUESTIONS.map((q) => (
            <div key={q} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-(--color-signal) shrink-0" />
              <span className="text-[13.5px] text-(--color-ink-2)">{q}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Closing thought */}
      <div className="text-center mb-10">
        <p className="text-[15px] text-(--color-ink-1) leading-relaxed max-w-[680px] mx-auto">
          {BRAND_RU} не заменяет людей. Он делает так, что знания, опыт и экспертиза,
          полученные каждым человеком, становятся частью интеллекта всей организации.
          <br />
          <span className="text-gradient-accent">
            Организация начинает помнить. Начинает учиться. Начинает принимать лучшие решения —
            даже если люди меняются.
          </span>
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="group flex items-center gap-2 rounded-md bg-(--color-signal) px-6 py-3.5 text-[13px] font-medium text-(--color-canvas) hover:brightness-110 transition-all"
        >
          Посмотреть, как это устроено в {mode.org}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
