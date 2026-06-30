import { ArrowLeft, ArrowRight, UserCheck } from "lucide-react";
import { Card } from "@/components/Card";
import { mentors, employee } from "@/data/mockData";
import { bi } from "@/lib/bi";

export function MentorScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-12">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-(--color-border) pb-10">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-pres-sm text-(--color-ink-3) hover:text-(--color-ink-1) transition-colors mb-4 font-mono">
            <ArrowLeft className="h-4 w-4" /> Сотрудник
          </button>
          <div className="text-pres-label text-(--color-signal) mb-4">{bi("Mentor Matching", "Подбор наставников")}</div>
          <h1 className="font-display text-pres-hero leading-tight">Поиск наставника</h1>
          <p className="text-pres-lg text-(--color-ink-2) mt-3 max-w-[560px]">
            На основании пробелов <span className="text-(--color-ink-1) font-semibold">{employee.name}</span>:{" "}
            {employee.criticalGaps.slice(0, 2).join(", ")} и др.
          </p>
        </div>
        <button onClick={onNext} className="group flex items-center gap-3 rounded-2xl px-7 py-4 text-pres-lg font-semibold text-white hover:scale-105 transition-all shrink-0"
          style={{ background: "linear-gradient(135deg, #21A038, #8B7FFF)", boxShadow: "0 6px 24px rgba(33,160,56,0.3)" }}>
          План развития <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mentors.map((m, i) => (
          <Card key={m.id} className="flex flex-col">
            <div className="p-6 flex items-start justify-between border-b border-(--color-border-soft)">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-(--color-surface-raised) border border-(--color-border) flex items-center justify-center text-(--color-ink-2) font-display text-pres-xl">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-pres-lg text-(--color-ink-1) font-semibold leading-tight">{m.name}</div>
                  <div className="text-pres-sm text-(--color-ink-3) mt-1">{m.role}</div>
                </div>
              </div>
              {i === 0 && (
                <span className="rounded-full bg-(--color-signal-soft) text-(--color-signal) text-pres-xs font-mono uppercase tracking-[0.08em] px-3 py-1.5">
                  Top match
                </span>
              )}
            </div>
            <div className="p-6 flex flex-col gap-5 flex-1">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-pres-metric-sm text-(--color-good)">{m.matchPercent}</span>
                  <span className="text-pres-base text-(--color-ink-3)">% совпадение</span>
                </div>
                <div className="h-2 w-full rounded-full bg-(--color-border-soft) overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-(--color-good) to-emerald-300" style={{ width: `${m.matchPercent}%` }} />
                </div>
              </div>
              <div>
                <div className="text-pres-label text-(--color-ink-3) mb-3">Сильные стороны</div>
                <div className="flex flex-wrap gap-2">
                  {m.strengths.map((s) => (
                    <span key={s} className="rounded-full border border-(--color-border) bg-(--color-surface-raised) px-3 py-1.5 text-pres-sm text-(--color-ink-2)">{s}</span>
                  ))}
                </div>
              </div>
              <p className="text-pres-base text-(--color-ink-2) leading-relaxed mt-auto pt-4 border-t border-(--color-border-soft)">{m.reason}</p>
              <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-(--color-border) px-5 py-3 text-pres-base font-semibold text-(--color-ink-1) hover:bg-(--color-surface-raised) transition-colors">
                <UserCheck className="h-4 w-4" /> Назначить наставником
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
