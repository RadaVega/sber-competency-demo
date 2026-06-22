# How this app was built — and how to build it this way yourself

This doc is for you or anyone else who picks up this project: not just *what*
was built, but *why it was sequenced this way*. If you ever need to extend
this app, repeat the same order of operations.

## The core principle: foundation before features

Every chunk after Chunk 1 was just "add files, register them, build." That
was only possible because Chunk 1 didn't build a screen — it built the
**things every future screen would need**:

1. **Design tokens first, components second, screens last.**
   `src/index.css` (`@theme` block) was written before a single screen
   existed. Every color, every font, every spacing decision lives in one
   place. If you build screens before tokens, you end up with 8 screens each
   inventing their own shade of grey — then a rebrand means touching 8 files
   instead of 1.

2. **Shared types before shared data, shared data before screens.**
   `src/data/types.ts` → `src/data/mockData.ts` → `src/screens/*.tsx`, in
   that order, every time. A screen should never define its own ad-hoc
   shape for "what is an employee" — it imports `Employee` from `types.ts`.
   This is what made Chunk 8 (the multi-tenant expansion) cheap instead of a
   rewrite: VK/Rosatom/Yandex just got their own `vkData.ts` / `rosatomData.ts`
   / `yandexData.ts` files following the same pattern, no changes to the
   type-design philosophy.

3. **Reusable primitives before composed screens.**
   `Card`, `CardHeader`, `MetricStat`, `RiskBadge` were built in Chunk 1
   before Screen 1 was assembled — Screen 1 is *composed from* them, not
   built from scratch. Every screen since has reused these same four
   components. This is why the whole app — 15 screens across 4 companies —
   feels visually consistent: there's structurally only one way to build a
   metric tile or a card header.

4. **One thin routing shell, never N copies of routing logic.**
   `App.tsx` doesn't know what's *inside* any screen. It only knows: here's
   the current mode, here's that mode's screen list, here's the active
   screen id, render it. When VK/Rosatom/Yandex were added, `App.tsx` grew
   by a few branches, not a rewrite — because it was never coupled to Sber's
   specifics in the first place.

## The actual sequence, chunk by chunk, and what each one unlocked

| Chunk | What was built | What it unlocked later |
|---|---|---|
| **1** | Vite/TS/Tailwind scaffold, design tokens, `Card`/`MetricStat`/`RiskBadge`, `types.ts`, nav shell, Screen 1 | Every screen after this just composes existing primitives — no new design decisions needed |
| **2** | `claudeClient.ts` (mock-fallback pattern) + Vercel Edge Function for server-side API calls | The pattern any future "AI button" reuses — VK/Rosatom/Yandex's analyze buttons (Chunk 9) will just call this same shape |
| **3-5** | Remaining Sber screens, including the radial-hub orchestration screen | Proved the primitives scale to a complex custom visualization (SVG + animation), not just cards and metrics |
| **6** | Sber's last 2 screens + the **multi-tenant architecture**: `modes.ts` registry, `ModeSwitcher`, per-mode mini-apps (`SberApp`, `VKApp`, ...) | This is the one structural change that mattered most — it turned a single-company demo into a 4-company platform without touching a single existing screen |
| **7** | Bilingual labels (`bi()` helper, applied to eyebrows/nav/platform names) | A presentation-layer change that touched many files but zero architecture — exactly the kind of change the foundation was built to absorb cheaply |

## The pattern for adding a 5th company (or a 9th screen)

Because of the above, adding scope now follows a fixed recipe:

1. Add one file: `src/data/<company>Data.ts` (mock data, typed).
2. Add one file: `src/screens/<company>/<Company>App.tsx` (mini-app: owns
   screen-id union type + local `useState` + renders the right screen).
3. Add N files: `src/screens/<company>/<Screen>.tsx` (each composed from
   `Card`/`MetricStat`/`RiskBadge`, never inventing new visual primitives
   unless the content genuinely needs one — like the orchestration screen did).
4. Register the company in `src/data/modes.ts` (one object).
5. Add 3 lines to `App.tsx`: import, a `useState` hook, a render branch.

No step touches an existing screen. That's the test for whether the
foundation is doing its job — if adding scope ever requires editing
unrelated files, the architecture has drifted and needs tightening before
adding more.

## What to keep doing as this grows

- **Resist inventing a new visual pattern per screen.** Every time a screen
  needs "just one more" custom component, ask whether `Card` + existing
  primitives can do it with different data, first.
- **Mock-fallback every external call**, the way `claudeClient.ts` does.
  Demos fail on stage when they depend on network/API keys being present —
  build the safe path first, the live path second.
- **Keep mode logic out of shared components.** `Card`, `MetricStat`, etc.
  should never check `if (mode === "vk")`. If a component needs to vary by
  company, that's a sign it should take a prop, not branch internally.
