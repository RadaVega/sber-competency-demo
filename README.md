# Competency Intelligence Demo — Сбер

Executive-facing prototype showing how Agentic AI helps a large organization
understand its competencies, find gaps, match mentors, plan development, and
assemble teams for strategic initiatives.

Built to sit visually alongside Palantir / Copilot / Glean / McKinsey Digital
— a calm, dark, data-dense "ops desk" aesthetic, not a marketing landing page.

## Stack

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · Recharts · lucide-react

(Matches the stack used by Sber's own `ai-forever/giga_agent` orchestrator
front-end, so this can eventually plug into a real GigaAgent backend.)

## Run locally in VS Code

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. Hot reload is on — every chunk below is
just new files dropped into `src/screens/` and registered in `src/App.tsx`.

## Project structure

```
src/
  data/
    types.ts         # shared domain types — extend, don't duplicate
    mockData.ts       # all mock content, sourced from the brief
  components/
    Card.tsx          # surface + header primitive
    MetricStat.tsx     # the big-number readout (dashboard signature element)
    RiskBadge.tsx      # severity-colored risk pill
  screens/
    DashboardScreen.tsx   # Screen 1 — done
  lib/
    cn.ts             # classnames helper
  App.tsx             # nav shell — registers screens, swaps active one
  index.css           # design tokens (@theme block) — single source of truth
```

## Design system (src/index.css)

- Canvas `#0B0E14`, surfaces `#11151D` / `#161B25` — near-black blue, not pure
  black, so it reads as a serious internal tool rather than a dark-mode toy.
- Signal accent: amber `#E8A33D` — used once per view, for the primary action
  or the most important number. Status colors (good/warn/risk) are separate
  from the signal accent on purpose, so "this needs attention" never competes
  visually with "click this."
- Sber green `#21A038` appears only in the wordmark — a quiet brand thread,
  not the UI's primary color. Keeps the product feeling like serious internal
  tooling built *for* Sber rather than a consumer Sber app.
- Type: Fraunces (display numbers/headlines), Inter (UI text), IBM Plex Mono
  (labels, eyebrows, data — gives the dashboard a "terminal/ops" texture).

## Architecture: multi-tenant demo

A single deployment now serves four scenarios, switchable live via the
**Demo Mode** dropdown (top right of the nav bar) — no rebuild needed:

| Mode | Platform name | Main question | Screens |
|---|---|---|---|
| **Sber** | Workforce Intelligence Layer | Есть ли у организации компетенции для AI-трансформации? | Dashboard → Employee → Mentor → Plan → Team → Orchestration → Executive → Division Readiness (8) |
| **VK** | Team Assembly Engine | Как быстрее запускать новые продукты и инициативы? | Strategic Initiative Builder → Internal Talent Discovery → Team Readiness Simulator → Executive Recommendation (4) |
| **Rosatom** | Critical Capability Development Platform | Какие компетенции необходимы для стратегических проектов страны? | National Capability Map → Expert Network (2) |
| **Yandex** | Capability Acceleration Platform | Как быстрее создавать сильные продуктовые команды? | Product Team Builder (1) |

```
src/
  data/
    modes.ts            # mode registry: org, platform name, accent color, badge
    mockData.ts          # Sber mock data (+ divisions for the readiness screen)
    vkData.ts             # VK mock data
    rosatomData.ts         # Rosatom mock data
    yandexData.ts           # Yandex mock data
  components/
    ModeSwitcher.tsx     # the Demo Mode dropdown
    Card.tsx / MetricStat.tsx / RiskBadge.tsx / CompetencyRadar.tsx
  screens/
    sber/SberApp.tsx     # mode shell: owns Sber's screen state + nav list
    vk/VKApp.tsx          # same pattern for VK
    rosatom/RosatomApp.tsx
    yandex/YandexApp.tsx   # Yandex is single-screen, no internal nav needed
    DashboardScreen.tsx, EmployeeScreen.tsx, ... # individual Sber screens
    vk/VKInitiativeScreen.tsx, ...                # individual VK screens
    rosatom/CapabilityMapScreen.tsx, ...           # individual Rosatom screens
  App.tsx               # thin shell: TopBar + ModeSwitcher + routes to the active mode's mini-app
```

Each mode is a self-contained "mini-app" (its own screen-id union type, its
own nav list, its own internal `useState`) so modes can't leak state into
each other, and a fifth scenario is just one more file in `screens/<name>/`
plus one entry in `src/data/modes.ts` — no changes to `App.tsx` beyond the
mode registry.

**Bilingual labels:** every screen's eyebrow (the small uppercase overline
above each title), every nav item, and every platform name now render as
`English (Русский)` — via `src/lib/bi(en, ru)`. Scope is deliberate: this
covers the system's *vocabulary* (Agentic AI, Capability Readiness,
Mentor Matching...), not full UI translation — body copy, headlines, and
data values stay single-language Russian, since the audience is Russian-
speaking executives and doubling every sentence would hurt readability more
than it helps.

## Roadmap — remaining chunks

- [x] **Chunk 1** — Scaffold, design system, Sber Screen 1 (Dashboard)
- [x] **Chunk 2** — Sber Screen 2 (Employee analysis) + live Claude API wiring
- [x] **Chunk 3** — Sber Screens 3-4 (Mentor matching, Development plan)
- [x] **Chunk 4** — Sber Screen 5 (Team formation)
- [x] **Chunk 5** — Sber Screen 6 (Agent Orchestration, radial hub, centerpiece)
- [x] **Chunk 6** — Sber Screens 7-8 (Executive Recommendation, Division
      Readiness) + full multi-tenant architecture: VK, Rosatom, Yandex modes
      with their own screens, mode switcher
- [x] **Chunk 7** — Bilingual labels (`English (Русский)`) across all four
      modes: eyebrows, nav items, platform names
- [x] **Chunk 8** — VK's Strategic Initiative Builder and Yandex's Product
      Team Builder now call live Claude (`api/analyze-initiative.ts`,
      `api/analyze-team.ts`), same mock-fallback pattern as Sber's Employee
      screen. Rosatom's screens stay static by design — the brief explicitly
      frames Rosatom around capabilities, not an AI-driven free-text input
- [x] **Chunk 9** — Polish pass: screen-transition fade-in (respects
      `prefers-reduced-motion`), global keyboard focus rings on every
      button/input/link, mobile-responsive grids and headers across all 15
      screens, `vercel.json` + `.env.example` for deployment

## Status: feature-complete

All 9 planned chunks are done. The platform now covers:
- 4 demo modes (Sber/VK/Rosatom/Yandex), switchable live, no rebuild
- 15 screens total
- 3 screens wired to live Claude analysis with automatic mock fallback
- Bilingual labeling on every eyebrow, nav item, and platform name
- Mobile-responsive layout and keyboard accessibility throughout

### Deploying to Vercel

1. Push this repo to GitHub (or `vercel --prod` directly from this folder).
2. Import the repo in Vercel — `vercel.json` handles build/output config,
   nothing else to configure.
3. Add `ANTHROPIC_API_KEY` in Project Settings → Environment Variables to
   enable live AI analysis on the 3 wired screens (optional — works fine
   without it).

### Enabling live AI analysis — all three interactive modes

The same `ANTHROPIC_API_KEY` environment variable powers all three live
endpoints:

| Screen | Endpoint |
|---|---|
| Sber → Employee Analysis | `api/analyze-employee.ts` |
| VK → Strategic Initiative Builder | `api/analyze-initiative.ts` |
| Yandex → Product Team Builder | `api/analyze-team.ts` |

Set `ANTHROPIC_API_KEY` once in Vercel and all three light up. Locally
without it (or without `vercel dev`), all three fall back to mock data
automatically — same green/grey status dot convention in every screen.

## Deployment

```bash
npm run build   # outputs to dist/
```

Connect the repo to Vercel — zero config needed, Vite is auto-detected.

### Enabling live AI analysis (Screen 2)

Screen 2 calls `api/analyze-employee.ts`, a Vercel Edge Function, so the
Anthropic API key never reaches the browser.

1. In Vercel → Project → Settings → Environment Variables, add
   `ANTHROPIC_API_KEY`.
2. Deploy. The "Анализировать компетенции" button will now call Claude live.

**Without a key** (e.g. running `npm run dev` locally without `vercel dev`),
the app automatically falls back to realistic mock data — the demo always
works, and a small status dot under the button tells you which mode you're
in (green = live Claude analysis, grey = offline demo data).

To test the live path locally: `npm i -g vercel`, then `vercel dev` instead
of `npm run dev` (reads `.env.local` for `ANTHROPIC_API_KEY`).
