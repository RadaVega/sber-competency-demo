/**
 * Recurring "step 5" from the directorial brief: two open questions —
 * one for the VP, one for the employee — placed at the end of a technical
 * screen, deliberately left unanswered. Not a summary, not a conclusion;
 * the point is that the question keeps living in the viewer's head after
 * they've moved on to the next screen.
 *
 * Shared because this beat repeats across nearly every screen in a fully
 * restructured scenario — keeping it as one component means the pattern
 * stays consistent (and easy to retire/adjust) rather than drifting into
 * five slightly different implementations.
 */
export function TwoQuestionsClose({
  vpQuestion,
  employeeQuestion,
}: {
  vpQuestion: string;
  employeeQuestion: string;
}) {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="rounded-xl border border-(--color-signal)/25 px-5 py-5">
        <div className="text-[10.5px] text-(--color-signal) font-mono uppercase tracking-[0.08em] mb-2.5">
          Вопрос руководителю
        </div>
        <p className="text-[14px] text-(--color-ink-1) leading-relaxed">{vpQuestion}</p>
      </div>
      <div className="rounded-xl border border-(--color-good)/25 px-5 py-5">
        <div className="text-[10.5px] text-(--color-good) font-mono uppercase tracking-[0.08em] mb-2.5">
          Вопрос сотруднику
        </div>
        <p className="text-[14px] text-(--color-ink-1) leading-relaxed">{employeeQuestion}</p>
      </div>
    </div>
  );
}
