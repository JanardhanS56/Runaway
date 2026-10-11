# RUNWAY — Master Brief for the AI Coding Agent
### PROMPT RUN 2026 · Goal: Rank #1 on the FAIE leaderboard

> **Read this entire file before writing any code.** It is the single source of truth.
> If anything in a later chat message conflicts with a **HARD RULE** here, the HARD RULE wins
> unless the human (Janardhan) explicitly overrides it.

---

## 0. READ ORDER & HOW TO USE THIS FILE

| Section | Read when |
|---|---|
| §1 Mission & why this matters | Always, first |
| §2 Event rules + §3 Scoring (FAIE) | Before choosing anything |
| §4 Problem statement (verbatim) | Before every feature decision |
| §5 Product concept | Before designing screens |
| §6 Priorities: FOCUS / IGNORE | Before starting any task, and whenever tempted to add scope |
| §7 Architecture | Before scaffolding |
| §8 Finance math | Before writing `domain/` |
| §9 Features by tier | While planning each slice |
| §10 Design system | Before any UI |
| §11 A11y / Perf / Responsive | Before every submission |
| §12 Schedule & submission strategy | Continuously |
| §13 Agent behavior rules | Always |
| §14 Definition of done | Before every submit |

---

## 1. MISSION & WHY THIS MATTERS

**The human:** Janardhan S, a B.E. Artificial Intelligence & Data Science student (SDIT, Mangaluru, 2024–2028), competing **solo** in **PROMPT RUN 2026**, a 6-hour online Vibe Coding web development hackathon.

**The stakes:** Final rank on a live leaderboard decides Winner / Runner-Up / Second Runner-Up. He wants **Rank #1**. This is a high-visibility win that goes straight onto his resume and portfolio.

**Why the agent's behavior matters:**
- It is an **automated engine (FAIE), not a human or AI judge**. It rewards measurable technical quality: functionality, performance, accessibility, responsiveness, code quality, and alignment. It does **not** reward ambition that doesn't work.
- **Only the LATEST valid submission counts.** A worse late submission *replaces* a better earlier one. There are only **3 submissions**.
- Therefore the winning strategy is: **a rigorously working, polished, accessible, fast app with one unforgettable signature feature**, not a sprawling one.

**One-line product thesis:** *Your ₹10,000 is fuel, 30 days is your runway. Every decision is previewed as a ghost future before you commit, and every consequence is visible and connected.*

---

## 2. EVENT CONTEXT (binding)

| Field | Value |
|---|---|
| Event | PROMPT RUN ("Prompt. Build. Run.") |
| Date | Oct 11, 2026 |
| Format | Fully online, **individual only** |
| Duration | **6 hours** from challenge reveal |
| Domain | Web Development, Vibe Coding (AI assistance explicitly allowed) |
| Evaluator | **FAIE** — Frontend Arena Intelligent Evaluation Engine (automated, rule-based) |
| Ranking | Live official leaderboard |
| Submissions | **3** — **latest valid one is final; best score is NOT kept** |

Example: Sub1=72 → Sub2=86 → Sub3=79 ⇒ **Final = 79**.

### HARD RULES (violating any = disqualification risk)
1. **Modern framework stack only.** No raw HTML-only, CSS-only, vanilla-JS-only, or static HTML/CSS/JS sites. Framework-generated output is fine.
2. **Individual work.** The human makes final decisions, tests, and submits.
3. **No plagiarism / substantial copying** of existing projects. Libraries, component kits and public docs are fine.
4. **Never tamper** with the evaluator, leaderboard, scoring or submission system.
5. **Time window:** work must be done within the official 6-hour window. Planning docs such as this file are fine. **Do not generate application code before the human says the clock has started.**
6. **No late submissions.** After the deadline = not considered.
7. **Project must be reachable and testable** (deployed, no login wall). A broken or inaccessible build is the participant's fault.

### Allowed
AI coding assistants, component libraries, design systems, animation libraries, public APIs, dev/debug tools, public docs and open-source resources.

---

## 3. WHAT FAIE SCORES (optimize **all 8**, not just features)

1. **UI/UX Quality**
2. **Functionality** — must work end-to-end
3. **Performance**
4. **Code Quality**
5. **Responsiveness** — mobile / tablet / desktop
6. **Accessibility**
7. **Problem Statement Alignment**
8. **Overall Technical Implementation**

Because it is rule-based, **assume it checks things a script can check**: loads without console errors, interactive elements function, semantic HTML, ARIA/labels, contrast, keyboard focus, viewport behavior, bundle/Lighthouse-type metrics, and keyword/feature alignment with the problem statement. Build so these pass **by construction**.

---

## 4. THE PROBLEM STATEMENT (verbatim — do not paraphrase away anything)

> Build a modern, interactive personal finance experience for Gen Z that helps users manage a limited ₹10,000 budget over 30 days and make informed financial decisions.
>
> The application should go beyond basic expense tracking by connecting income, balance, spending, commitments, savings goals, subscriptions, unexpected expenses, financial risk, and financial health.
>
> Users should be able to simulate financial decisions before taking them and clearly understand how each decision affects their remaining balance, daily allowance, savings goals, monthly forecast, financial risk, and overall financial health.
>
> The experience should feel like a real consumer-facing financial product where financial decisions have visible and interconnected consequences.

### Requirement checklist (every item needs a VISIBLE home in the UI, using these exact words where natural)

| Requirement | Where it lives |
|---|---|
| ₹10,000 budget / 30 days | Cockpit hero, DayStrip (30 cells) |
| Income | Ledger events, "Upcoming income", forecast |
| Balance | Cockpit, every Snapshot |
| Spending | Transactions, pace, DayStrip colors |
| Commitments | `/money` Commitments tab, "Upcoming bills" |
| Savings goals | `/goals`, pace rings, ETA |
| Subscriptions | `/money` Subscriptions tab, audit |
| Unexpected expenses | "Life Happens" shock deck |
| Financial risk | Risk badge + probability, Lab verdict |
| Financial health | Health gauge + `/health` breakdown |
| **Simulate before deciding** | **Decision Lab** (the centerpiece) |
| Impact on balance, daily allowance, goals, forecast, risk, health | **Delta chips** (all six, every time) |
| Interconnected consequences | One engine; every screen reads the same Snapshot |
| Feels like a real product | Polished microcopy, seeded realistic data, no placeholders |

**Gen Z framing:** casual, punchy microcopy; relatable categories (chai, food delivery, Spotify, OTT, recharge, outings, cab); mobile-first.

---

## 5. PRODUCT CONCEPT: "RUNWAY"

The **30-day timeline is the product.** The core question: *"Will I make it to day 30, and what does this decision do to that?"*

**Signature moments (these win demos and impress automated + human reviewers alike):**
1. **Ghost future** — the Decision Lab overlays a dashed projected line over the real runway before you commit.
2. **Delta chips** — six animated before/after deltas appear instantly.
3. **"Find a safer way"** — the advisor proposes concrete alternatives (smaller amount, better day, split).
4. **Time Machine** — advance day by day, or fast-forward to day 30, so the full lifecycle is demonstrable in seconds.
5. **Life Happens** — a surprise expense forces a trade-off, and the consequences ripple through everything.

---

## 6. PRIORITIES — WHAT TO FOCUS ON vs. IGNORE

### 🎯 FOCUS (spend ~85% of effort here)
- **The finance engine** (`domain/`) — correct, pure, tested. Everything depends on it.
- **The Decision Lab** — the highest-value feature. It is the problem statement's core ask.
- **First-load populated demo state** — the evaluator arrives with empty storage. It must see a rich, working app instantly.
- **Interconnection** — change one thing and ≥4 other displayed values visibly react.
- **Cockpit + DayStrip + runway chart** — the first impression.
- **Accessibility, responsiveness, performance, zero console errors** — cheap points that are easy to lose.
- **Polish of microcopy and motion** (respecting reduced-motion).

### 🚫 IGNORE (do NOT build, discuss, or "just quickly add")
- Authentication, accounts, multi-user, sync
- Real bank/UPI/payment integrations
- A chatbot / LLM runtime feature (use the regex quick-add instead)
- Heavy chart/animation libraries (Recharts, GSAP, Three.js) — use d3-scale + d3-shape SVG and Framer Motion
- Multi-currency, i18n, notifications, PWA/offline extras
- Admin panels, settings sprawl, social features
- Pixel-perfect secondary pages while the Lab or engine still has gaps
- Any feature not traceable to the §4 checklist

### ⚠️ Tripwires — if the agent catches itself doing these, STOP and tell the human "NO, that's a trap, let's focus on X instead":
- Adding scope after **hour 5:00**
- Refactoring working code for aesthetics in the last hour
- Perfecting a screen that is already ≥ "good" while another is missing
- Installing a new heavy dependency
- Anything that risks the deployed build staying green

---

## 7. ARCHITECTURE (rigid by design)

### Stack — **DEFAULT; confirm with the human before scaffolding**
- **Next.js (App Router) + TypeScript (strict)**, deployed on **Vercel**
- **Tailwind CSS + shadcn/ui** (Radix → built-in accessibility)
- **Framer Motion**, **Lucide React**
- **Zustand + `persist`**, validated by **Zod** with a versioned schema + migration fallback to seed
- **d3-scale + d3-shape** for custom SVG charts
- **Vitest** for engine tests
- **No database.** localStorage + seed data. (Optional: one Route Handler `/api/shocks` serving the shock deck, with loading/error states, only if ahead of schedule in Hour 5.)

### Data flow (the core idea)
```
LedgerEvent[]  ──fold──▶  WorldState(day)  ──derive──▶  Snapshot
                                  ▲                          │
              hypothetical events │                          ▼
                simulate(base, draft[]) ──▶ { before, after, delta, verdict }
```
State is **event-sourced**: never mutate balances, only append events and re-derive. The UI is a pure projection of the engine.

### Layering (strict one-way imports): `domain` ← `store` ← `features` ← `app`
```
src/
  domain/          # pure TS, NO React, 100% unit-tested
    types.ts       # LedgerEvent union, Goal, Commitment, Subscription, Shock
    ledger.ts      # fold(events, day) -> WorldState
    forecast.ts    # balanceCurve(), confidence bands
    risk.ts        # seeded Monte Carlo -> P(shortfall), runwayDay
    health.ts      # 0-100 score with explainable components
    simulate.ts    # simulate(base, draft[]) -> Comparison
    advisor.ts     # safer alternatives (max-safe amount, best day, split)
    parse.ts       # regex quick-add: "120 chai", "499 netflix day 12"
    seed.ts        # realistic demo scenario
  store/           # zustand slices: ledger, clock, sandbox, ui + persist/migrate
  features/        # cockpit, lab, money, goals, shocks, health
  components/      # ui (shadcn), charts (RunwayChart, DayStrip, Gauge), AnimatedNumber
  app/             # routes
```

### Core types
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
  riskP: number; riskLevel: 'low' | 'medium' | 'high'; runwayDay: number | null;
  goals: { id: string; saved: number; etaDay: number | null; onTrack: boolean }[];
  health: { score: number; components: HealthComponent[] };
};
```

### Engine invariants (write these as tests FIRST)
- `simulate(base, [])` returns a result equal to base (no drift).
- `simulate` **never mutates** its inputs.
- Same inputs → same outputs (seeded PRNG, mulberry32).
- Balance equals the sum of all events up to the day.
- `dailyAllowance` is finite and never negative; day is clamped to 1–30.
- Corrupt/old localStorage → falls back to seed, **never** a crash.

---

## 8. FINANCE MATH (lock before building UI)

```
committed      = Σ upcoming commitments + subscription renewals (today..day30)
goalReserve    = Σ planned goal contributions still due
buffer         = 10% of ₹10,000 = ₹1,000  (shock cushion)
safeToSpend    = balance + upcomingIncome − committed − goalReserve − buffer
dailyAllowance = max(0, safeToSpend / daysLeft)
paceDiscretionary = 0.6·(trailing 7-day avg spend) + 0.4·(budgeted pace)
endForecast.mid   = balance + upcomingIncome − committed − paceDiscretionary·daysLeft − E[shocks]
```

**Risk:** 300 seeded runs. Each draws shocks from a deck (e.g., phone repair 4%/day @ ₹1,500; friend's birthday 6% @ ₹600) and jitters daily spend ±25%.
- `riskP` = fraction of runs where balance < 0 before day 30.
- Low < 10% · Medium 10–35% · High > 35%.
- Band `low`/`high` = P10 / P90 end balance.

**Health score (0–100), always explainable** (each returns `{score, weight, reason}` and the UI shows the reason):

| Component | Weight | Measures |
|---|---|---|
| Runway | 25 | Projected end balance vs buffer |
| Spend pace | 20 | Actual spend vs allowance |
| Savings | 20 | Goal progress vs plan |
| Commitment coverage | 15 | Can everything due be covered? |
| Risk | 15 | 1 − riskP |
| Subscription load | 5 | Subscriptions as share of budget (target < 10%) |

**Seed scenario guidance** (realistic and slightly stressed so the Lab is interesting on first load): ₹10,000 total money over 30 days from pocket money + one side-gig payment mid-month; commitments like phone recharge and a transport pass; 3–4 subscriptions (e.g., Spotify, OTT, cloud storage); 2 goals (e.g., headphones, trip fund); a handful of past-day expenses so the DayStrip and pace are non-empty on load. Start on ~day 8–10 so there is both history and future.

---

## 9. FEATURES BY TIER

### Tier 1 — MUST SHIP (core of submission #1)
- Cockpit: allowance hero, DayStrip, runway chart, health gauge, risk badge, upcoming bills, goals summary
- Ledger + transactions list; quick add (button/FAB + ⌘K)
- Seeded demo state on first load; "Reset demo" / "Start fresh"
- Engine: ledger, forecast, risk, health, simulate (tested)
- Responsive shell: sidebar (desktop) / bottom tabs (mobile)

### Tier 2 — THE WINNERS (core of submission #2)
- **Decision Lab:** inputs (amount, type: one-time / recurring / subscription / goal transfer / skip, day) · presets (sneakers ₹2,499, weekend trip ₹1,800, add Netflix ₹199/mo, cancel Spotify, ₹500 to goal) · ghost line + band over real runway · 6 delta chips · verdict (Safe / Risky / Don't + one-line reason) · Commit / Discard · shareable link encoding the draft (`/lab?d=...`)
- **Advisor ("Find a safer way"):** max amount keeping risk < 20% (binary search), best day, split into 2 → 2–3 one-tap alternatives
- **Time Machine:** day scrubber + Advance Day + Fast-forward to day 30; income/commitments auto-post on due days; day summary toast
- **Life Happens:** shock deck; choose pay from balance / dip into goal / skip; consequences via `simulate()`

### Tier 3 — POLISH (only if Tiers 1–2 are solid)
- Subscription audit (monthly + yearly cost, renewal countdown, "simulate cancel" reuses the Lab)
- Goals trade-off slider (savings aggressiveness live-updates allowance)
- `/health` breakdown page with component reasons and tips
- "View chart as table" toggle; styled 404; optional `/api/shocks`

---

## 10. DESIGN SYSTEM (winning visual direction)

**Direction:** dark-first fintech, one confident accent, light theme via tokens. Real-product feel, not a template.

**Tokens**
- bg `#0B0D12` · surface `#12151C` · border `#1F2430` · text `#E8EAF0`
- accent lime `#C6F432` · secondary violet `#7C5CFF`
- safe `#34D399` · warn `#FBBF24` · danger `#FB7185`
- Verify **every** text/background pair ≥ 4.5:1 (≥ 3:1 for large text and UI components).

**Type:** Sora (display/numbers) + Inter (body) via `next/font` (zero layout shift). `tabular-nums` on all ₹ values.

**Signature visuals**
- **Hero:** giant "₹187 / day" inside a ring showing how much of today's allowance is used.
- **DayStrip:** 30 cells; past = colored by spend vs allowance; today = glowing marker; future = shaded by forecast risk; hover/focus opens that day's events; doubles as the scrubber.
- **Runway chart:** custom SVG area + confidence band + dashed ghost line.
- **Delta chips:** animated ▲▼ with color **and** icon **and** text (never color alone).

**Layout:** bento grid on desktop; sidebar + bottom tab bar on mobile; single-column stacking under 640px.
**Motion:** spring-animated numbers, ghost-line draw-in, chip slide-ins. Respect `prefers-reduced-motion`.
**Copy:** real, punchy, Gen Z-friendly ("You're ₹340 ahead of pace"). **No lorem ipsum, no stub buttons, no "coming soon."**

**Routes:** `/` Cockpit · `/lab` Decision Lab · `/money` (Transactions · Subscriptions · Commitments) · `/goals` · `/health` · styled `not-found`.

---

## 11. QUALITY GATES (cheap points that are easy to lose)

**Accessibility**
- Landmarks (`header/nav/main`), skip-to-content link, one `h1` per page, logical heading order
- Visible focus rings; everything operable by keyboard (DayStrip and Lab included)
- Charts: `role="img"` + text summary + "view as table" toggle
- `aria-live="polite"` on delta/verdict updates; every icon button has an accessible name
- Risk and status never conveyed by color alone

**Performance (target Lighthouse ≥ 95 mobile)**
- Server-render the shell; lazy-load chart and Lab with `dynamic()`
- Monte Carlo capped at 300 runs; memoized selectors; no raster images (SVG only)
- No layout shift (`next/font`, reserved chart height)

**Responsiveness:** verify at **360 / 768 / 1280 px**; no horizontal scroll; touch targets ≥ 44px.

**Code quality:** strict TS, no `any`, ESLint + Prettier clean, small typed modules, JSDoc on engine functions, meaningful names, no dead code.

**Robustness:** error boundaries, Zod-validated persistence, empty/loading/error states for every list and chart, no console errors or warnings.

---

## 12. SCHEDULE & SUBMISSION STRATEGY

| Time | Work | Exit gate |
|---|---|---|
| 0:00–0:20 | Re-read the live problem statement, map to screens, **freeze scope** | Feature list frozen |
| 0:20–1:00 | Scaffold, tokens, shadcn, shell, **deploy empty app to Vercel** | Live URL |
| 1:00–2:15 | `domain/` engine + Vitest. **No UI until tests pass.** | Green tests |
| 2:15–3:30 | Cockpit, ledger, DayStrip, chart, seed data | Core flow works |
| **3:30** | **SUBMISSION #1** (a safe baseline you'd accept as final) | Learn FAIE score |
| 3:30–4:45 | Decision Lab, advisor, Time Machine, shocks | Wow flow works |
| 4:45–5:30 | Goals, subscriptions, ⌘K, a11y + mobile pass, polish | Checklist green |
| **5:30** | **SUBMISSION #2** | Strongest verified build |
| 5:30–5:50 | Fix **only** what FAIE feedback flagged | Strict improvement only |
| 5:50 | **SUBMISSION #3 only if strictly better than #2**, else STOP | |

**Submission rules of thumb**
- Because the latest wins, every submission must be a build the human would be happy to end on.
- Track the submission count visibly (e.g., in the chat or a `SUBMISSIONS.md` note).
- If #2 is strong, **do not risk #3** on speculative changes.
- Never submit an experimental or half-finished build last.

---

## 13. AGENT BEHAVIOR RULES

1. **Be proactive:** deliver complete, copy-pasteable files, not fragments.
2. **Think briefly first:** one or two lines on the logic and which FAIE pillar it serves, then code.
3. **No fluff:** keep conversation extremely brief; ~95% of output is code.
4. **Confirm stack first** (unless already confirmed), then scaffold immediately.
5. **Debug mode:** when the human pastes an error, give the exact fix **and** a one-line explanation of why it happened.
6. **Challenge the human:** if a request risks the build or wastes time, answer "NO, that's a trap, let's focus on X instead."
7. **Remind to test:** after each vertical slice, prompt the human to run locally and click through before moving on.
8. **Vertical slices:** finish one end-to-end flow before starting the next. Working v1 beats broken v2.
9. **Keep it deployed:** the live URL must stay reachable and green at all times.
10. **Ask at most one question at a time**, and only when truly blocking.
11. **Respect the clock:** state the current phase and next exit gate in each milestone message.
12. **Never** ship vanilla JS/HTML, placeholder copy, lorem ipsum, or stub buttons.

---

## 14. DEFINITION OF DONE (run before EVERY submission)

- [ ] Deployed URL loads with **empty storage**, in incognito, with **no login**
- [ ] Seeded demo state is rich and the app is immediately usable
- [ ] Core flow works end-to-end: add expense → numbers change everywhere
- [ ] Decision Lab: draft → ghost line + 6 deltas + verdict → commit → ledger and Cockpit update
- [ ] Time Machine advance and fast-forward work without errors
- [ ] **Zero console errors/warnings**
- [ ] No dead links, placeholders, lorem, or non-functional buttons
- [ ] Layouts verified at 360 / 768 / 1280 px, no horizontal scroll
- [ ] Full keyboard-only walkthrough succeeds; focus always visible
- [ ] Contrast ≥ 4.5:1 verified; no color-only meaning
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95
- [ ] `vitest` green; `tsc --noEmit` and `eslint` clean
- [ ] Submission counter updated; this build is **strictly better** than the last

---

## 15. OPEN QUESTIONS (resolve in the first 5 minutes of the window)

1. **Stack confirmation:** Next.js + TS + Tailwind + shadcn + Framer Motion + Zustand + d3 + localStorage on Vercel — approved?
2. **Submission format:** live URL, repo link, or both? (Assume live URL on Vercel until told otherwise.)
3. **Did the live problem statement change** from §4? If yes, update §4 and §9 first; the architecture in §7 should still hold.

---

### Final reminder to the agent
> The winner is **not** the app with the most features. It is the app that **works flawlessly on first load, makes consequences visibly interconnected, passes every automated check, and has one unforgettable moment (the Decision Lab ghost future).** Protect the deployed build, honor the tripwires, and make every submission count.