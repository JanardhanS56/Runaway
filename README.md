<div align="center">

# ✈️ Runway

### *Know exactly how long your money lasts. Then make it last longer.*

**A 30-day personal finance cockpit for the generation that lives paycheck to paycheck, freelance invoice to freelance invoice.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-runway--v2.vercel.app-6366f1?style=for-the-badge)](https://runway-v2.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Zustand](https://img.shields.io/badge/Zustand-State_Engine-orange?style=for-the-badge)](https://zustand-demo.pmnd.rs)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06b6d4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## 🧠 The Problem

Most budgeting apps ask: *"Where did your money go?"*

**Runway asks a better question: *"How long until it's gone — and what can you do about it right now?"***

When you're a college student, freelancer, or early-career professional in India, you don't need 12-month projections or portfolio rebalancing tools. You need to know:

- **Can I afford this today without breaking next week?**
- **Which subscription is quietly bleeding me?**
- **If my phone breaks tomorrow, how do I survive it?**

Runway answers all three — in real time, with no bank connection required.

---

## ✨ Features

### 🛫 Cockpit — Your 30-Day Mission Control

The Cockpit is the nerve centre of your financial month. Every number visible on this screen is a *live calculation*, not a static input.

| Metric | What it tells you |
|---|---|
| **Daily Allowance** | Safe-to-spend per day after reserving for bills, goals, and a ₹1,000 shock cushion |
| **30-Day Runway Scrubber** | Interactive timeline — tap any past day to inspect what happened |
| **End Forecast** | Projected balance at Day 30 given current burn rate |
| **Risk Gauge** | Colour-coded live assessment (Safe / Watch / Critical) |
| **Allowance Ring** | Visual % of today's budget consumed |

The scrubber supports both **single-day advance** (simulate step-by-step) and **fast-forward to Day 30** for stress-testing end-of-month scenarios. Commitment payments and subscription auto-renewals fire automatically as you advance.

---

### ⚡ Decision Lab — Pre-Flight Financial Simulator

Before you spend, **simulate**. The Decision Lab lets you model any financial decision and see its downstream impact before committing a single rupee.

```
[You type]  → Cancel Netflix (₹499/mo)
[Runway]    → +₹114 to daily allowance  |  +₹1,248 to end forecast  |  Risk: Safe ✅
```

**Capabilities:**
- Ghost chart overlay — see *before* and *after* curves on the same graph
- Impact delta chips — instant ₹ and % change on allowance + forecast
- **Subscription Cancel Simulator** — deep-linked from the Money page; pre-fills the lab with exact subscription amount
- Decision types: `expense`, `income`, `subscription`, `goal contribution`
- One-click **Commit to Reality** — applies the decision to the live store, updates all dashboards instantly

---

### 💸 Money — Ledger, Subscriptions & Commitments

Three views in one page, all reading from the same live state:

**Transactions Ledger**
- Full searchable log with category tags and tone coding (income / expense / bill / subscription / shock)
- Real-time totals: income vs. spend vs. net for the month

**Subscription Audit Panel**
- All active subscriptions with monthly + annual cost
- Cancellation triggers the Decision Lab pre-filled for that subscription — simulate first, cancel only if it makes sense
- Annual burn surfaced prominently (e.g. Netflix: *₹5,988/yr* — most people don't think in those terms)

**Upcoming Commitments**
- Bills with due-day countdown
- One-click "Mark Paid" deducts from balance and logs a transaction

---

### 🎯 Goals — Pace-Aware Savings Tracker

Goals aren't just milestones here — they're **integrated into your daily allowance calculation**. Every ₹ you allocate to a goal reduces your `safeToSpend`, which reduces your `dailyAllowance`.

- **Pace Slider** — drag to allocate ₹/month to savings goals; Cockpit updates in real time
- Progress bars per goal with ETA projection
- Priority tiers: `Essential`, `Planned`, `Fun`
- Create custom goals with target amount and initial savings

---

### 🧨 Life Happens — Shock Deck (Unexpected Expense Resolver)

The most unique feature in Runway. Financial emergencies are a *when*, not an *if*. The shock deck simulates exactly that.

**Sample shocks in the deck:**
- 📱 Screen Shattered — ₹1,200
- 🦷 Emergency Dentist — ₹1,500
- 🎉 Friend's Birthday Trip — ₹850
- 🔬 College Lab Supplies — ₹650

When a shock fires, Runway surfaces a **resolution modal** with three options:
1. **Absorb from balance** — takes the hit, forecasts the damage
2. **Draw from a savings goal** — dips into your emergency buffer or a non-essential goal
3. **Defer / borrow** — logs it as ₹0 impact with a deferred tag for honest accounting

All three paths update the live store, re-derive all forecasts, and log a `shock` tone transaction.

---

### ⌘K Command Palette

Press `⌘K` (or `Ctrl+K`) anywhere in the app to open the command palette. Supported commands:

```
add income 2000          → logs a +₹2,000 income transaction
add expense 500 food     → logs a −₹500 expense under Food
trigger shock            → fires a random shock event
open decision lab        → navigates to simulator
```

The palette uses a regex-based natural language parser — no dropdowns, no forms, just intent.

---

### 🩺 Financial Health Score

A composite score (0–100) built from five weighted pillars:

| Pillar | Weight | Signal |
|---|---|---|
| Runway Buffer | 25% | Projected end balance vs. ₹1,000 shock threshold |
| Spend Pace | 20% | Current balance vs. safe zone |
| Subscription Load | 20% | Active subscription count and % of budget consumed |
| Commitment Health | 20% | Unpaid bills and due-day proximity |
| Goal Pace | 15% | Monthly savings allocation relative to targets |

Each pillar is expandable with a plain-English explanation of exactly why the score is what it is.

---

## 🏗️ Architecture

### State Engine

All application state lives in a single **Zustand store** with `persist` middleware (localStorage). No backend. No API keys. No auth. Fully offline-capable.

```
useRunwayStore
├── State:  balance, currentDay, transactions[], subscriptions[],
│           commitments[], goals[], goalPace, activeShock
└── Selectors (derived, never stored):
    ├── getDailyAllowance()   → balance - bills - goalPace/2 - shock cushion ÷ daysLeft
    ├── getEndForecast()      → balance - unpaid bills - (daysLeft × dailyBurn)
    ├── getRiskPercentage()   → derived from endForecast thresholds
    └── getHealthScore()      → weighted composite of 5 financial pillars
```

**Key design principle:** selectors are pure functions called at render time. Nothing is pre-calculated and stored — every UI element derives its value from the same source of truth on every render. This means every action (pay a bill, cancel a sub, resolve a shock) instantly propagates to every page with zero prop-drilling.

### Hydration Safety

Because Zustand persists to localStorage, SSR and client renders can diverge. All persisted-state derived values are gated behind a custom `useHydrated()` hook that returns `false` on the server and `true` after client mount — eliminating React hydration mismatches entirely.

```ts
// src/lib/useHydrated.ts
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}
```

### Routing

| Route | Page |
|---|---|
| `/` | Cockpit — 30-day dashboard |
| `/decision-lab` | Simulator (accepts `?cancel=&amount=` query params) |
| `/money` | Ledger, subscriptions, commitments |
| `/goals` | Goal tracker + pace slider |
| `/health` | Financial health score breakdown |

---

## 🗂️ Project Structure

```
runway/
├── app/
│   ├── globals.css          # Full design system — tokens, animations, components
│   ├── layout.tsx           # Root layout with font and metadata
│   ├── page.tsx             # Cockpit dashboard
│   ├── decision-lab/        # Simulator + ghost chart overlay
│   ├── money/               # Ledger, subs audit, commitments
│   ├── goals/               # Goal tracker + pace control
│   └── health/              # Health score with pillar breakdown
├── src/
│   ├── store/
│   │   └── useRunwayStore.ts  # Single source of truth (Zustand + persist)
│   ├── components/
│   │   ├── ShockModal.tsx     # Life Happens resolver
│   │   └── CommandPalette.tsx # ⌘K natural language interface
│   ├── domain/
│   │   └── types.ts           # Domain model types
│   └── lib/
│       └── useHydrated.ts     # SSR hydration guard hook
├── components/              # Shadcn UI primitives
└── public/                  # Static assets
```

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | RSC + streaming, file-based routing, Vercel-native |
| Language | TypeScript (strict) | End-to-end type safety across domain model |
| State | Zustand + persist | Zero-boilerplate, localStorage persistence, no context hell |
| Styling | Tailwind CSS + Custom Design System | Utility-first with bespoke token layer for the fintech aesthetic |
| Icons | Lucide React | Consistent, tree-shaken, accessible |
| Animation | CSS transitions + keyframes | No runtime overhead, 60fps micro-interactions |
| Package Manager | pnpm | Fast installs, strict dependency isolation |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `≥ 20.9`
- pnpm `≥ 9.0`

### Local Development

```bash
# Clone
git clone https://github.com/JanardhanS56/Runway.git
cd Runway

# Install
pnpm install

# Start dev server (Turbopack)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
pnpm typecheck   # Strict type-check — zero errors expected
pnpm build       # Optimized production bundle
pnpm start       # Serve production build
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with Turbopack HMR |
| `pnpm build` | Generate optimized production bundle |
| `pnpm start` | Serve production build locally |
| `pnpm typecheck` | Run `tsc --noEmit` — strict mode, zero tolerance |

---

## 🎮 Demo Walkthrough

The app ships with a realistic seed state:

- **Day 9** of a 30-day month
- **₹5,400** starting balance after partial income
- 5 transactions already logged (food, freelance income, Spotify, groceries, initial deposit)
- 3 active subscriptions (Spotify ₹199, Netflix ₹499, iCloud+ ₹75)
- 3 upcoming commitments (phone bill ₹850 due Day 12, internet ₹499 due Day 20, rent ₹1,200 due Day 28)
- 3 goals (emergency buffer, Goa trip, laptop fund)

**To reset to this state:** click "Reset Demo State" in the sidebar at any time.

**To explore the shock deck:** advance to Day 11, 16, or 22 using the scrubber — a shock event fires automatically.

---

## 🏆 Hackathon Context

> **Challenge:** *Broke But Functional — Survive the Month*
> Build a tool that helps someone with limited financial resources make it through a 30-day period without running out of money.

Runway directly addresses every evaluation dimension:

| Criterion | Implementation |
|---|---|
| **Problem Alignment** | Entire UX designed around the 30-day survival constraint — not generic budgeting |
| **Functionality** | 6 fully functional, interconnected pages/views with real-time state propagation |
| **UI/UX** | Fintech-grade dark mode design system, micro-animations, ARIA labels, keyboard navigation |
| **Code Quality** | TypeScript strict, single source of truth store, zero prop drilling, modular architecture |
| **Innovation** | Decision Lab simulator, ⌘K command palette, automatic shock events, subscription cancel flow |
| **Responsiveness** | Mobile nav, responsive grid layouts, tested across viewport sizes |
| **Accessibility** | Semantic HTML, `aria-label` on all interactive elements, keyboard-navigable |
| **Documentation** | You're reading it |

---

## 📄 License

MIT © 2024 Janardhan S.

---

<div align="center">

*Built with obsessive attention to detail for people who need their money to last.*

**[🚀 Try Runway Live](https://runway-v2.vercel.app)**

</div>
