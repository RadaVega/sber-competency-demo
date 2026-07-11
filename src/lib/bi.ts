/**
 * Every label that represents a named concept or screen title in this
 * platform is bilingual: "Русский (English)". Route concept/section labels
 * through bi() rather than hardcoding text, so the format stays consistent
 * across all four demo modes.
 *
 * Scope: eyebrow labels (the small uppercase overline above each screen
 * title), nav items, and platform names go through bi(). Long-form body
 * copy, headlines, and data values stay single-language Russian — the
 * audience is Russian-speaking executives. The bilingual pairing exists to
 * keep the *system's architectural vocabulary* (Enterprise Capability
 * Intelligence, Knowledge Graph...) legible where it matters, in a form
 * that reads Russian-first rather than English-first.
 */
export function bi(en: string, ru: string): string {
  return `${ru} (${en})`;
}
