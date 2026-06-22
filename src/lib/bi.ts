/**
 * Every label that represents a named concept or screen title in this
 * platform is bilingual: "English (Русский)". Route concept/section labels
 * through bi() rather than hardcoding text, so the format stays consistent
 * across all four demo modes.
 *
 * Scope: eyebrow labels (the small uppercase overline above each screen
 * title), nav items, and platform names go through bi(). Long-form body
 * copy, headlines, and data values stay single-language (Russian) — the
 * audience is Russian-speaking executives, and doubling every sentence
 * would hurt readability more than it helps. The bilingual pairing exists
 * to make the *system's vocabulary* (Agentic AI, Capability Readiness,
 * Executive Recommendation...) legible to an international/English-reading
 * stakeholder skimming the product, not to translate the whole UI.
 */
export function bi(en: string, ru: string): string {
  return `${en} (${ru})`;
}
