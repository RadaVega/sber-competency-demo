import { ArrowLeft, RotateCcw } from "lucide-react";
import { ArchTerm } from "@/components/ArchTerm";
import { archTerms, applicableOrgs, BRAND_EN, BRAND_RU } from "@/data/branding";
import type { ModeConfig } from "@/data/modes";

const ecosystemLayers = [
  { label: "Существующие корпоративные системы", sub: "CRM, ERP, HRM, документооборот" },
  { label: "Корпоративная ИИ-платформа",          sub: archTerms.aiPlatform.en },
  { label: "Среда выполнения ИИ-агентов",         sub: archTerms.agentRuntime.en },
];

const futurePoints = [
  "От разовых пилотов — к постоянной операционной модели реализации стратегии.",
  "От ручного поиска экспертов — к живому графу критической экспертизы, обновляемому в реальном времени.",
  "От отдельных AI-инструментов — к единому слою, работающему поверх любой Enterprise AI Platform.",
  "От реакции на дефицит — к управлению готовностью организации заранее.",
];

export function FutureScreen({
  mode,
  onBack,
  onRestart,
}: {
  mode: ModeConfig;
  onBack: () => void;
  onRestart: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1100px] px-8 py-14">

      <div className="mb-12 border-b border-(--color-border) pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-pres-sm text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-4 font-mono">
          <ArrowLeft className="h-4 w-4" /> Назад
        </button>
        <div className="text-pres-label text-(--color-signal) mb-3">Enterprise AI Ecosystem</div>
        <h1 className="font-display text-pres-h1 leading-tight max-w-[760px]">
          <span className="text-(--color-ink-1)">Это не отдельный продукт. </span>
          <span className="text-gradient-accent">Это слой архитектуры.</span>
        </h1>
        <p className="text-pres-lg text-(--color-ink-2) mt-4 max-w-[680px] leading-relaxed">
          {BRAND_EN} работает поверх существующей корпоративной AI-инфраструктуры —
          не заменяет её, а делает реализацию стратегии управляемой.
        </p>
      </div>

      {/* Ecosystem stack — this sits on top of existing infra */}
      <div className="mb-12">
        <div className="text-pres-label text-(--color-ink-3) mb-5">Где это работает</div>
        <div className="flex flex-col gap-2">
          <div className="glass rounded-2xl border border-(--color-signal)/40 glow-signal px-6 py-5">
            <ArchTerm term={{ ru: BRAND_RU, en: BRAND_EN }} size="lg" />
          </div>
          <div className="h-5 w-px bg-gradient-to-b from-(--color-signal)/40 to-transparent mx-auto" />
          {ecosystemLayers.map((layer, i) => (
            <div key={layer.label} className="flex flex-col items-center">
              <div className="w-full glass-subtle rounded-2xl px-6 py-4 flex items-center justify-between">
                <span className="text-pres-base text-(--color-ink-1) font-medium">{layer.label}</span>
                <span className="text-pres-xs text-(--color-ink-3) font-mono">{layer.sub}</span>
              </div>
              {i < ecosystemLayers.length - 1 && (
                <div className="h-5 w-px bg-(--color-border) my-0.5" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Applicability reminder */}
      <div className="mb-12 flex flex-wrap items-center gap-3">
        <span className="text-pres-sm text-(--color-ink-3) font-mono">Применимо для:</span>
        {applicableOrgs.map((org) => (
          <span key={org} className="glass-subtle rounded-full px-4 py-1.5 text-pres-sm text-(--color-ink-2)">{org}</span>
        ))}
      </div>

      {/* Future direction */}
      <div className="mb-12">
        <div className="text-pres-label text-(--color-signal) mb-5">Куда движется Enterprise AI</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {futurePoints.map((point, i) => (
            <div key={i} className="glass rounded-2xl p-5 flex gap-4">
              <span className="font-display text-pres-h3 text-gradient shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-pres-base text-(--color-ink-2) leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing statement */}
      <div className="glass rounded-2xl border border-(--color-good)/20 p-8 text-center mb-6">
        <p className="text-pres-xl text-(--color-ink-1) font-medium leading-relaxed max-w-[680px] mx-auto">
          Современные Enterprise AI-платформы дают организации интеллект.
          <br />
          <span className="text-gradient-accent">{BRAND_RU}</span> даёт организации способность
          становиться умнее после каждого проекта.
        </p>
      </div>

      {/* The second metaphor, carried through quietly: not an archive, a school */}
      <div className="glass rounded-2xl border border-(--color-border) p-8 text-center mb-6">
        <p className="text-pres-lg text-(--color-ink-2) leading-relaxed max-w-[700px] mx-auto">
          Россия всегда развивалась через научные школы — Курчатова, Королёва, Ландау, Капицы.
          Основатель уходил, но мышление школы продолжало жить в учениках, потому что оно было
          передано, а не заперто в одной голове.
        </p>
        <p className="text-pres-lg text-(--color-ink-1) font-medium leading-relaxed max-w-[700px] mx-auto mt-4">
          <span className="text-gradient-accent">{BRAND_RU}</span> делает то же самое частью
          инфраструктуры организации — не архив и не база знаний, а живая школа, которая становится
          сильнее после каждого завершённого проекта.
        </p>
      </div>

      {/* The Aha moment — the emotional climax of the whole scenario */}
      <div className="glass rounded-2xl border border-(--color-signal)/25 p-10 text-center mb-6">
        <p className="text-pres-xl text-(--color-ink-1) leading-relaxed max-w-[700px] mx-auto">
          После каждого завершённого проекта организация либо становится умнее —
          <br />
          либо начинает следующий проект заново.
        </p>
        <p className="font-display text-pres-h2 text-gradient-accent leading-tight mt-6 max-w-[720px] mx-auto">
          {BRAND_RU} делает интеллект организации не побочным результатом работы,
          а её главным стратегическим активом.
        </p>
      </div>

      {/* Человек / Организация / Россия — the three levels answered in one chain */}
      <div className="glass rounded-2xl border border-(--color-border) p-8 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-pres-label text-(--color-signal) mb-2">Человек</div>
            <p className="text-pres-sm text-(--color-ink-2) leading-relaxed">
              получает работу, которая не исчезает бесследно
            </p>
          </div>
          <div>
            <div className="text-pres-label text-(--color-signal) mb-2">Организация</div>
            <p className="text-pres-sm text-(--color-ink-2) leading-relaxed">
              получает интеллект, который растёт с каждым проектом, а не теряется вместе с людьми
            </p>
          </div>
          <div>
            <div className="text-pres-label text-(--color-signal) mb-2">Россия</div>
            <p className="text-pres-sm text-(--color-ink-2) leading-relaxed">
              получает организации, способные реализовывать стратегические приоритеты быстрее,
              чем раньше казалось возможным
            </p>
          </div>
        </div>
      </div>

      {/* The concrete first engagement — sells a project, not a licence */}
      <div className="glass rounded-2xl border border-(--color-good)/25 p-8 mb-6">
        <div className="text-pres-label text-(--color-good) mb-3 text-center">Что можно сделать уже завтра</div>
        <p className="text-pres-lg text-(--color-ink-1) font-medium leading-relaxed max-w-[680px] mx-auto text-center">
          {mode.consultingPitchRu}
        </p>
      </div>

      {/* The final question — the beginning of consulting, not a "Continue" button */}
      <div className="text-center mb-10 px-4">
        <p className="font-display text-pres-h2 text-(--color-ink-1) leading-snug max-w-[680px] mx-auto">
          Если бы это была ваша организация — что бы вы хотели увидеть в первую очередь?
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="group flex items-center gap-3 rounded-2xl px-7 py-3.5 text-pres-base font-semibold glass-subtle text-(--color-ink-2) hover:text-(--color-ink-1) transition-all"
        >
          <RotateCcw className="h-4 w-4" />
          Начать диагностику заново
        </button>
      </div>
    </div>
  );
}
