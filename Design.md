# RUNWAY: Build Plan for PROMPT RUN 2026

## 1. Approach Selection

| Approach | Idea | Verdict |
|---|---|---|
| A. Tracker+ | Dashboard, expense list, budget bars, a "what-if" form bolted on | Every competitor builds this. The simulator feels like an afterthought. |
| **B. Runway (pick this)** | The **30-day timeline is the product**. One deterministic finance engine drives every screen, and every decision is previewed as a ghost future before you commit. | It matches the brief's "interconnected consequences" exactly. |
| C. Gamified RPG | Quests, XP, avatars | It looks fun but hurts the "real financial product" feel and costs time. |

**Concept:** ₹10,000 is your fuel and 30 days is your runway. The app answers one question: *"Will I make it to day 30, and what does this decision do to that?"*

## 2. Stack (confirm and I'll scaffold)

- **Next.js (App Router) + TypeScript (strict)**, deployed on Vercel.
- **Tailwind + shadcn/ui** (Radix underneath gives you accessibility for free), **Framer Motion**, **Lucide**.
- **Zustand + `persist`** with a **Zod**-validated, versioned schema.
- **d3-scale and d3-shape only** for charts, with hand-rolled SVG. Recharts adds a lot of bundle weight, and custom SVG gives full control over the ghost line, confidence band and ARIA.
- **Vitest** for the engine tests.
- **No database.** localStorage plus seeded demo data is enough. One optional Route Handler in Hour 5 if you want "backend tech" points (see §9).

## 3. Architecture: the Rigid Core

The innovation is **one pure, deterministic engine with zero React inside it**. The UI is a dumb projection of it.

```
LedgerEvent[]  ──fold──▶  WorldState(day)  ──derive──▶  Snapshot
                                  ▲                          │
              hypothetical events │                          ▼
                simulate(base, draft) ──▶ { before, after, delta, verdict }
```

### Layers (strict one-way imports: `domain` ← `store` ← `features` ← `app`)

```
src/
  domain/            # pure TS, no React, 100% unit-tested
    types.ts         # LedgerEvent union, Goal, Commitment, Subscription, Shock
    ledger.ts        # fold(events, day) -> WorldState
    forecast.ts      # balanceCurve(), bands
    risk.ts          # seeded Monte Carlo -> P(shortfall), runwayDay
    health.ts        # score 0-100 with explainable components
    simulate.ts      # simulate(base, draft[]) -> Comparison
    advisor.ts       # safer alternatives (max-safe amount, best day, split)
    parse.ts         # natural-language quick add ("120 chai")
    seed.ts          # demo scenario
  store/             # Zustand slices: ledger, clock, sandbox, ui + persist/migrate
  features/          # cockpit, lab, money, goals, shocks, health
  components/        # ui (shadcn), charts (RunwayChart, DayStrip, Gauge), AnimatedNumber
  app/               # routes
```

### Core types (event-sourced: state is never edited, only derived)

```ts
type LedgerEvent =
  | { id: string; day: number; kind: 'income'; amount: number; label: string }
  | { id: string; day: number; kind: 'expense'; amount: number; category: Category; label: string }
  | { id: string; day: number; kind: 'commitment'; amount: number; label: string; recurEvery?: number }
  | { id: string; day: number; kind: 'subscription'; amount: number; label: string; renewEvery: 30 }
  | { id: string; day: number; kind: 'goalTransfer'; amount: number; goalId: string }
  | { id: string; day: number; kind: 'shock'; amount: number; label: string; resolvedBy: 'balance' | 'goal' | 'skipped' };

type Snapshot = {
  balance: number; safeToSpend: number; dailyAllowance: number;
  endForecast: { low: number; mid: number; high: number };
  riskP: number; riskLevel: 'low'|'medium'|'high'; runwayDay: number | null;
  goals: { id: string; saved: number; etaDay: number | null; onTrack: boolean }[];
  health: { score: number; components: HealthComponent[] };
};
```

### Why this wins on "Code Quality" and "Technical Implementation"

- `simulate()` **never mutates** state. It forks the event list, applies hypothetical events, derives a second snapshot, and returns the diff. A property test proves `simulate(base, [])` returns the base unchanged.
- **Determinism:** Monte Carlo uses a seeded PRNG (mulberry32). The same state always gives the same risk, so there is no flicker and the tests are stable.
- **Invariants tested:** balance equals the sum of events, allowance is never NaN or negative, and the day is clamped to 1–30.
- **Resilience:** Zod parses persisted state. If it is corrupt or the version changed, it falls back to seed data and the app never white-screens.

## 4. The Finance Math (lock it before building UI)

```
committed      = Σ upcoming commitments + subscription renewals (today..day30)
goalReserve    = Σ planned goal contributions still due
buffer         = 10% of ₹10,000 (= ₹1,000, the "shock cushion")
safeToSpend    = balance + upcomingIncome − committed − goalReserve − buffer
dailyAllowance = max(0, safeToSpend / daysLeft)
paceDiscretionary = 0.6·(trailing 7-day avg spend) + 0.4·(budgeted pace)
endForecast.mid   = balance + upcomingIncome − committed − paceDiscretionary·daysLeft − E[shocks]
```

**Risk** comes from 300 seeded runs. Each run draws shocks from a deck (phone repair 4%/day at ₹1,500, friend's birthday 6% at ₹600, and so on) and jitters daily spend by ±25%.
- `riskP` is the fraction of runs where balance drops below 0 before day 30.
- Low is under 10%, Medium is 10–35%, High is over 35%.
- `low` and `high` for the band are the P10 and P90 end balances.

**Health score (0–100), always explainable:**

| Component | Weight | Measures |
|---|---|---|
| Runway | 25 | Projected end balance vs buffer |
| Spend pace | 20 | Actual spend vs allowance |
| Savings | 20 | Goal progress vs plan |
| Commitment coverage | 15 | Can you cover everything due? |
| Risk | 15 | 1 − riskP |
| Subscription load | 5 | Subscriptions as a share of budget |

Each component returns `{score, weight, reason}`, and the reason is shown in the UI ("Subscriptions are 14% of your budget, so aim for under 10%").

## 5. Signature Features (what separates you from the pack)

1. **The Decision Lab.** This is the centerpiece.
   - You enter an amount, a type (one-time, recurring, subscription, goal transfer, skip) and a day.
   - The chart overlays a **dashed ghost future** on your real runway, with the confidence band.
   - **Delta chips** (animated ▲▼) show balance, daily allowance, forecast, goal ETA, risk and health score before and after.
   - A verdict reads *Safe / Risky / Don't*, with a one-line reason.
   - **"Find a safer way"** is the standout. `advisor.ts` binary-searches the max amount that keeps risk under 20%, tries delaying to the best day, and tries splitting into 2 payments. It returns 2–3 one-tap alternatives.
   - Presets: sneakers ₹2,499, weekend trip ₹1,800, add Netflix ₹199/mo, cancel Spotify, ₹500 to goal.
   - **Commit** writes the events to the ledger. **Discard** drops the draft.
   - A shareable link encodes the draft in the URL (`/lab?d=...`).
2. **Time Machine.** A day scrubber and **Advance Day** button run the month. Income and commitments auto-post on their due days. A day summary toast appears, and **Fast-forward to day 30** gives judges an instant full-lifecycle demo.
3. **Life Happens (shock deck).** Surprise events (cracked screen ₹1,200, friend's wedding ₹800) force a choice: pay from balance, dip into a goal, or skip. Each choice shows its consequences through the same `simulate()`.
4. **Quick-add command bar (⌘K / "+" FAB).** Type "120 chai" or "499 netflix day 12" and a regex parser turns it into a ledger event. It is a cheap feature that feels like AI.
5. **Subscription audit.** Cost per month and per year ("₹199/mo = ₹2,388/yr"), renewal countdown, and a one-tap "simulate cancel" that reuses the Lab.
6. **Goals with trade-offs.** Each goal has a pace ring and ETA. A savings-aggressiveness slider live-updates daily allowance, which makes the interconnection visible.

## 6. Routes

| Route | Screen |
|---|---|
| `/` | **Cockpit**: allowance hero, DayStrip, runway chart, health gauge, risk, upcoming bills, goals |
| `/lab` | Decision Lab |
| `/money` | Tabs: Transactions · Subscriptions · Commitments |
| `/goals` | Goals and savings trade-off |
| `/health` | Score breakdown with component reasons and tips |
| `not-found` | Styled 404 |

## 7. Design System

**Direction:** dark-first fintech with one confident accent, light theme included via tokens.

- **Tokens:** bg `#0B0D12`, surface `#12151C`, border `#1F2430`, text `#E8EAF0`, accent lime `#C6F432`, secondary violet `#7C5CFF`, safe `#34D399`, warn `#FBBF24`, danger `#FB7185`. Check all text pairs at ≥4.5:1.
- **Type:** Sora for display and numbers, Inter for body, loaded via `next/font` (zero layout shift). Use `tabular-nums` on every ₹ value.
- **Hero:** a giant **"₹187 / day"** inside a ring that shows how much of today's allowance is used.
- **DayStrip (the signature visual):** 30 cells across the top, one per day.
  - Past days are coloured by spend vs allowance.
  - Today has a glowing marker.
  - Future days are shaded by forecast risk.
  - Hovering or focusing a cell opens that day's events.
  - It doubles as the scrubber.
- **Layout:** bento grid on desktop, a sidebar plus a mobile bottom tab bar, and cards that stack single-column under 640px.
- **Motion:** spring-animated numbers, ghost line draw-in, and delta chips that slide in. Everything respects `prefers-reduced-motion`.
- **Voice:** real microcopy ("You're ₹340 ahead of pace"), with no lorem and no stub buttons.

## 8. FAIE Optimization Checklist

- **Functionality:**
  - **First load must be a fully populated demo state.** FAIE hits the URL with empty storage, so there is no onboarding wall.
  - Provide "Reset demo" and "Start fresh" buttons.
  - Every button works.
- **Accessibility:**
  - Semantic landmarks, a skip link, visible focus rings, and full keyboard use of the DayStrip and Lab.
  - Chart `role="img"` with a text summary plus a "View as table" toggle.
  - `aria-live="polite"` on delta updates, and risk never conveyed by colour alone (icon plus label).
- **Performance:**
  - Server-render the shell and lazy-load the chart and Lab with `dynamic()`.
  - Keep the Monte Carlo at 300 runs, memoized selectors, and no images (SVG only).
  - Target Lighthouse 95+ on mobile.
- **Responsiveness:** test at 360, 768 and 1280px.
- **Code quality:** ESLint, Prettier, strict TS, small typed modules, and JSDoc on the engine.
- **Alignment:** the problem statement's keywords (income, balance, commitments, goals, subscriptions, unexpected expenses, risk, health) each get a visible home. Use the same words in the UI.

## 9. 6-Hour Schedule

| Time | Work | Exit gate |
|---|---|---|
| **0:00–0:20** | Read the real problem statement, map it to screens, lock scope | Feature list frozen |
| **0:20–1:00** | Scaffold, tokens, shadcn, layout shell, **deploy empty app to Vercel** | Live URL |
| **1:00–2:15** | `domain/` engine plus Vitest. **No UI until the tests pass.** | Green tests |
| **2:15–3:30** | Cockpit, ledger, DayStrip, chart, seed data | Core flow works |
| **3:30** | **Submission #1** (safe baseline, deployed) | Learn the FAIE score |
| **3:30–4:45** | Decision Lab, advisor, Time Machine, shocks | The wow flow works |
| **4:45–5:30** | Goals, subscriptions, ⌘K, a11y pass, mobile pass, polish | Checklist green |
| **5:30** | **Submission #2** | Strongest verified build |
| **5:30–5:50** | Fix only what #1 and #2 flagged | Strict improvement only |
| **5:50** | Submit #3 **only if** it beats #2, else stop | |

I'm suggesting an earlier first submit than your intent file's Hour 5. Since only the latest counts, submission #1 costs you nothing if #2 overwrites it. It gives you real FAIE feedback early, as long as #1 is a build you would be fine ending on.

## 10. Traps (NO, don't do these)

- **No real auth, bank APIs or multi-user sync.** It's a time sink with no score upside.
- **No heavy chart or animation libraries** beyond Framer Motion.
- **No AI chat feature.** The regex quick-add gives the same wow for 20 minutes of work.
- **No new features after 5:00.** Polish only.
- **Optional backend points:** one `/api/shocks` Route Handler serving the shock deck with loading and error states. Add it in Hour 5 only if you're ahead.

## 11. Before Each Submission

Core flow works · no console errors · no placeholder text · 360px layout fine · keyboard-only run-through · Lighthouse 90+ · deployed URL loads with empty storage · incognito test.