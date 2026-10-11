# RUNWAY — UI/UX Design Prompt Pack
### Generate the whole frontend design *before* the coding agent starts, so it spends tokens on building, not inventing

**Companion to:** `RUNWAY_AGENT_BRIEF.md` (the agent brief). This file produces the **design assets** that the brief tells the agent to follow.

---

## 0. READ THIS FIRST (rules, time, and honesty)

1. **Event rule check.** PROMPT RUN disqualifies "work developed outside the official 6-hour window."
   - Safest path: run these tools **inside** the window, and **time-box the design to ~35 minutes** (see §8).
   - If you want to design *before* the clock starts, ask the organizers whether pre-event mockups are allowed. Do **not** pre-generate app code.
   - Treat design output as a **reference** (PNGs + a design-token file). The coding agent should **rebuild** it in Next.js + Tailwind + shadcn/ui, not paste exported HTML into the project.
2. **Free tiers change often.** The limits below came from public reviews dated 2026 and **they disagree with each other**. Open each tool's pricing/settings page and check your real quota before relying on it.
3. **Don't burn all your credits on one tool.** Run the Stitch pack first. Use an alternative only if Stitch output is weak or you hit its limit.

---

## 1. THE TOOLS (free tier + download)

| # | Tool | Free? | What you can download | Best for | Watch out for |
|---|---|---|---|---|---|
| 1 | **Google Stitch** (stitch.withgoogle.com) | Free (Google Labs), monthly generation limits; check in Settings | Figma paste, HTML/CSS, Tailwind, React/JSX, `.zip`, `DESIGN.md`, MCP | **Best overall.** Multi-screen design, design system, desktop + mobile | Beta: if a download button fails, use "Code to clipboard" or screenshots. Figma layers can be messy |
| 2 | **v0 by Vercel** (v0.app) | Free plan with small monthly credits and a daily message cap | React + Tailwind + shadcn/ui code, GitHub sync, Vercel deploy | **Closest match to our stack** (Next.js + Tailwind + shadcn) | Outputs *code, not design files*. Credits drain fast. Keep it UI-only |
| 3 | **Banani** (banani.co) | Free plan with limited monthly generations (sources differ on exact number) | Figma export, HTML/CSS, MCP for coding agents | Fast multi-screen concepts, editable canvas | Free exports may be capped; verify before you rely on it |
| 4 | **Magic Patterns** (magicpatterns.com) | Free plan, limited monthly credits and 1 project | React/Tailwind code, Figma export | Applies one **design system** consistently across screens | Free-tier export options may be restricted; verify |
| 5 | **UX Pilot** (uxpilot.ai) | Free tier, small credit pool (about 7 screens per reviews) | Figma export, code export | Wireframes → hi-fi, screen flows | Free credits run out quickly. Spend them only on your 2–3 hero screens |

**Not verified, so not in the top 5:** Figma Make, Lovable, Uizard. Check them yourself if all five above fail you.

**Recommended order:** Stitch → (if needed) v0 for one polished hero screen as code reference → Banani/Magic Patterns/UX Pilot as backups.

---

## 2. THE MASTER DESIGN BRIEF (source of truth — every prompt below derives from this)

### 2.1 Product
**Runway** is a consumer finance app for Gen Z (age 18–24, students and first-job earners in India). The user has a limited **₹10,000 over 30 days**. The app connects income, balance, spending, commitments, savings goals, subscriptions, unexpected expenses, risk and health. The signature idea: **before you commit to any spend, you see a "ghost future" of how it changes everything.**

### 2.2 Experience principles
1. **Consequences are visible.** Any change updates balance, daily allowance, forecast, goals, risk and health on screen.
2. **One glance = one answer.** The hero number is "₹ per day I can safely spend."
3. **Real fintech, not a template.** Confident, calm, a little playful. No stock-dashboard feel.
4. **Never color alone.** Every status has an icon and a label too.

### 2.3 Design tokens (use exactly)
```text
Theme: dark-first (a light variant is optional)
Background      #0B0D12
Surface         #12151C
Surface-raised  #181C26
Border          #1F2430
Text primary    #E8EAF0
Text secondary  #9AA3B5
Accent (lime)   #C6F432   (primary actions, hero ring, key highlights)
Secondary       #7C5CFF   (ghost/simulation layer, "what-if" elements)
Safe            #34D399
Warning         #FBBF24
Danger          #FB7185
Radius          16px cards, 12px inputs/buttons, 999px chips
Spacing         8px grid
Fonts           Sora (headings + all numbers), Inter (body). Tabular numerals on every ₹ amount.
Icons           Lucide (outline, 1.5px stroke)
Motion hints    spring number tick-ups, ghost line draws in, chips slide in
```
All text/background pairs must meet **WCAG AA (4.5:1)**.

### 2.4 Signature components (describe these exactly in every relevant prompt)
- **DayStrip:** a row of 30 small rounded cells, one per day. Past days are colored by spend vs allowance (green / amber / red + a tiny icon), today has a glowing lime outline, future days are shaded by forecast risk. It doubles as the timeline scrubber.
- **Hero allowance ring:** big **"₹231 / day"** in the center, ring shows how much of today's allowance is used.
- **Runway chart:** area line of projected balance across 30 days, a soft confidence band, a "today" marker, and a **dashed violet ghost line** when simulating.
- **Delta chip:** compact pill: label, old → new value, and ▲/▼ with signed difference. Color + icon + text.
- **Health gauge:** semicircle 0–100 with component rows beneath.
- **Verdict banner:** Safe / Risky / Don't, with a one-line reason.
- **Risk badge:** Low / Medium / High with the probability %.

### 2.5 Shared demo data (use these exact numbers so every screen is consistent)
```text
Today: Day 9 of 30 (21 days left)
Balance: ₹5,400
Upcoming income: ₹2,500 (side-gig payout, Day 15)
Upcoming commitments: Phone recharge ₹299 (Day 12), Bus pass ₹600 (Day 20)
Subscriptions: Spotify ₹119 (Day 14), Netflix ₹199 (Day 18), Cloud storage ₹130 (Day 25)
Goals: Headphones ₹900 saved of ₹3,000 (target Day 28) · Trip fund ₹400 saved of ₹2,000 (target Day 30)
Safety buffer: ₹1,000
Safe to spend: ₹4,853
Daily allowance: ₹231 / day   (spent today ₹140, left today ₹91)
Forecast at Day 30: ₹1,180 (range ₹240 – ₹2,050)
Risk: Low, 8%
Health score: 78 / 100
Recent transactions: Chai ₹30 · Lunch ₹140 · Cab ₹210 · Snacks ₹90 · Spotify ₹119

DECISION LAB EXAMPLE: "Sneakers ₹2,499 on Day 10"
  Balance          ₹5,400 → ₹2,901   ▼ ₹2,499
  Daily allowance  ₹231 → ₹112       ▼ ₹119
  Forecast Day 30  ₹1,180 → −₹1,319  ▼ ₹2,499
  Headphones goal  on track → misses Day 28
  Risk             Low 8% → High 71%
  Health           78 → 38           ▼ 40
  Verdict: DON'T — "This puts you in the red by Day 26."
  Safer ways:
    1) Spend ₹1,100 instead   → risk Medium 19%
    2) Buy on Day 16, after your payout → risk Medium 24%
    3) Split into 2 × ₹1,250  → risk Medium 33%

LIFE HAPPENS EXAMPLE: "Cracked phone screen ₹1,200"
  Pay from balance    → allowance ₹231 → ₹174
  Dip into Trip fund  → Trip goal slips 6 days
  Skip / delay        → risk +9%
```

### 2.6 Screen inventory
1. **Cockpit** (home) — desktop + mobile
2. **Decision Lab** — desktop + mobile
3. **Money** — tabs: Transactions · Subscriptions · Commitments
4. **Goals**
5. **Health** (score breakdown)
6. **Life Happens** modal
7. **Quick-add command palette** ("120 chai" → parsed preview)
8. **States:** empty, loading skeleton, error, 404

### 2.7 Layout rules
- **Desktop (1440):** left sidebar nav (Cockpit, Decision Lab, Money, Goals, Health) + top bar ("Day 9 of 30", Advance day, Fast-forward, theme toggle, Quick add) + bento grid.
- **Mobile (390):** top bar + bottom tab bar (5 tabs) + floating "+" button; single-column stacked cards.
- Build only with patterns that map cleanly to **Tailwind CSS + shadcn/ui** (cards, tabs, dialogs, command palette, sliders, badges, tables, toasts).

### 2.8 Microcopy tone
Casual, warm, specific: "You're ₹340 ahead of pace." "Sneakers? That puts you in the red by Day 26." No lorem ipsum, no "Coming soon."

---

## 3. GOOGLE STITCH PROMPT PACK (do these in order)

**Setup:** open Stitch → New project → choose **Web** for desktop screens. For mobile versions, generate the same screen again with **Mobile** selected. Stitch generates a few connected screens per prompt, so use the batches below. After Step 0, say "use the Runway design system" in every later prompt.

### Step 0 — Design system (paste first)
```text
Create a design system called "Runway" for a Gen Z personal-finance web and mobile app.

Style: dark-first modern fintech. Calm, confident, a little playful. Not a generic dashboard template.

Colors: background #0B0D12, surface #12151C, raised surface #181C26, border #1F2430, primary text #E8EAF0, secondary text #9AA3B5. Primary accent electric lime #C6F432 for key actions and highlights. Secondary violet #7C5CFF reserved for "simulation / what-if / ghost future" elements. Status colors: safe #34D399, warning #FBBF24, danger #FB7185.

Typography: Sora for headings and ALL numbers/currency (tabular numerals), Inter for body text.

Shape: 16px radius cards, 12px radius buttons and inputs, fully rounded chips. 8px spacing grid. Soft 1px borders, very subtle shadows, no heavy gradients.

Icons: Lucide outline icons, 1.5px stroke.

Rules: every status uses color AND an icon AND a text label (never color alone). All text meets WCAG AA contrast (4.5:1). Large touch targets (44px minimum) on mobile. Use only patterns easily built with Tailwind CSS and shadcn/ui: cards, tabs, dialogs, command palette, sliders, badges, tables, toasts.
```

### Batch A — Cockpit (desktop + mobile)
```text
Using the Runway design system, design the HOME screen "Cockpit" for a personal-finance app where a user manages ₹10,000 over 30 days. Make TWO screens: desktop (1440px) and mobile (390px).

DESKTOP layout:
- Left sidebar nav: Cockpit (active), Decision Lab, Money, Goals, Health. App logo "Runway".
- Top bar: "Day 9 of 30", buttons "Advance day" and "Fast-forward", theme toggle, a primary "+ Quick add" button.
- Under the top bar: the DayStrip — a row of 30 small rounded day cells. Days 1-8 colored green/amber/red (with a tiny check/alert icon), Day 9 has a glowing lime outline, days 10-30 are muted and shaded by forecast risk. Hovering a cell implies a tooltip.
- Hero card (largest): a circular ring with big text "₹231 / day" in the center and caption "safe to spend today". Beneath: "₹140 spent · ₹91 left today". Small friendly line: "You're ₹340 ahead of pace."
- Three stat cards beside it: Balance ₹5,400 · Safe to spend ₹4,853 · Day-30 forecast ₹1,180 (range ₹240 – ₹2,050).
- Runway chart card: area line of projected balance across 30 days, soft confidence band, a "today" marker, a legend. Include a small caption: "Dashed violet line appears when you simulate a decision."
- Health card: semicircle gauge "78 / 100" with three mini rows (Runway, Spend pace, Savings) each with a tiny bar and one-line reason.
- Risk badge: "Low risk · 8%" with an icon.
- Upcoming bills list: Phone recharge ₹299 (Day 12), Spotify ₹119 (Day 14), Netflix ₹199 (Day 18), Bus pass ₹600 (Day 20).
- Goals card: Headphones ₹900 / ₹3,000 and Trip fund ₹400 / ₹2,000 with progress rings.
- Recent transactions: Chai ₹30, Lunch ₹140, Cab ₹210, Snacks ₹90.
- A "Life Happens" call-to-action card: "Surprise expense? See what it does to your month."
Use a bento-grid arrangement.

MOBILE layout: top bar with "Day 9 of 30", DayStrip as a horizontally scrollable row, hero ring, three stat cards in a horizontal row or stacked, runway chart, health gauge, risk badge, upcoming bills, goals, transactions. Bottom tab bar with 5 tabs (Cockpit, Lab, Money, Goals, Health) and a floating "+" button.
```

### Batch B — Decision Lab (desktop + mobile) — **your most important screen**
```text
Using the Runway design system, design the "Decision Lab" screen where a user simulates a spending decision BEFORE committing to it. Make TWO screens: desktop (1440px) and mobile (390px). Same sidebar/top bar as Cockpit, Decision Lab active.

Show this exact scenario: the user is previewing "Sneakers ₹2,499 on Day 10".

DESKTOP layout:
- Left panel "Your decision": amount input (₹2,499), segmented control for type (One-time · Recurring · Subscription · Goal transfer · Skip), a day selector (Day 10), a category dropdown. Below it, preset chips: "Sneakers ₹2,499", "Weekend trip ₹1,800", "Add Netflix ₹199/mo", "Cancel Spotify", "₹500 to goal".
- Center: a large runway chart. The REAL projected balance is a solid lime line with a soft band; the SIMULATED future is a DASHED VIOLET "ghost line" that dips below zero around Day 26. Mark the zero line and a "today" marker. Shade the area where the ghost goes negative in a soft danger tint.
- A row of SIX delta chips, each showing label, old → new value, and a signed difference with an arrow icon:
  Balance ₹5,400 → ₹2,901 (▼ ₹2,499)
  Daily allowance ₹231 → ₹112 (▼ ₹119)
  Day-30 forecast ₹1,180 → −₹1,319 (▼ ₹2,499)
  Headphones goal: on track → misses Day 28
  Risk: Low 8% → High 71%
  Health: 78 → 38 (▼ 40)
- A verdict banner in danger style with an icon: "DON'T — This puts you in the red by Day 26."
- A card "Find a safer way" with three one-tap alternatives, each showing the new risk:
  1) "Spend ₹1,100 instead" — Medium risk 19%
  2) "Buy on Day 16, after your payout" — Medium risk 24%
  3) "Split into 2 × ₹1,250" — Medium risk 33%
- Action buttons: primary "Commit decision", secondary "Discard", and a "Copy share link" icon button.

MOBILE: stack in this order — decision form (compact), preset chips (horizontal scroll), runway chart with ghost line, the six delta chips in a 2-column grid, verdict banner, safer-way cards, sticky bottom action bar with Commit and Discard.
```

### Batch C — Money (3 tab states)
```text
Using the Runway design system, design the "Money" screen with three tabs: Transactions, Subscriptions, Commitments. Make THREE desktop screens (1440px), one per active tab, same sidebar/top bar, Money active.

TRANSACTIONS tab: filter chips by category, a search field, and a clean table grouped by day (Day 9, Day 8, Day 7) with category icon, label, amount. Rows: Chai ₹30, Lunch ₹140, Cab ₹210, Snacks ₹90, Spotify ₹119. A total for each day.

SUBSCRIPTIONS tab: a header "Subscriptions are 4% of your budget" with a small gauge. Cards: Spotify ₹119/mo (₹1,428/year, renews in 5 days), Netflix ₹199/mo (₹2,388/year, renews in 9 days), Cloud storage ₹130/mo (₹1,560/year, renews in 16 days). Each card has a "Simulate cancel" button and a small "cost per use" note.

COMMITMENTS tab: a timeline list of upcoming commitments — Phone recharge ₹299 (Day 12), Bus pass ₹600 (Day 20) — with a countdown chip, plus a summary "₹899 committed before Day 30".
```

### Batch D — Goals + Health
```text
Using the Runway design system, design two desktop screens (1440px) and one mobile screen (390px).

GOALS (desktop): two goal cards with progress rings and ETA — Headphones ₹900 / ₹3,000 (target Day 28, status "On track") and Trip fund ₹400 / ₹2,000 (target Day 30, status "Slightly behind"). A "Savings aggressiveness" slider (Chill · Balanced · Hustle) with a live preview line below: "At Balanced, your daily allowance is ₹231/day." Include an "Add goal" button.

HEALTH (desktop): large gauge "78 / 100" with the label "Healthy". Below, six component rows, each with name, weight, mini progress bar, score, and a one-line reason: Runway (25%), Spend pace (20%), Savings (20%), Commitment coverage (15%), Risk (15%), Subscription load (5%). Example reason: "Subscriptions are 4% of your budget — under the 10% target." A small "Ways to improve" card.

GOALS (mobile): stacked goal cards and the slider.
```

### Batch E — Modals, palette, and states
```text
Using the Runway design system, design these screens (desktop 1440px unless noted).

1) "Life Happens" modal over the Cockpit: a surprise-expense card "Cracked phone screen ₹1,200" with three choice cards, each showing a consequence preview:
   - "Pay from balance" — daily allowance ₹231 → ₹174
   - "Dip into Trip fund" — Trip goal slips 6 days
   - "Skip / delay" — risk +9%

2) Quick-add command palette (⌘K) over the Cockpit: input with text "120 chai", a live parsed preview card ("Expense · Food & drinks · ₹120 · Today"), a confirm button and keyboard hint chips.

3) Empty state for Transactions (friendly illustration, "No spends yet — you've got ₹231 to play with today.").

4) Loading skeleton of the Cockpit.

5) 404 page in the Runway style with a button "Back to Cockpit" (mobile 390px).
```

### Refinement prompts (use only if needed — each costs credits)
```text
Increase contrast of secondary text to meet WCAG AA and make all numbers use tabular numerals in Sora.
```
```text
Make the DayStrip cells slightly larger, add a tiny status icon in each past day, and make today's glow lime.
```
```text
Tighten spacing on the Cockpit so everything important fits above the fold at 1440x900.
```
```text
Apply the same design to a light theme variant of the Cockpit, keeping lime accent and AA contrast.
```

### Stitch export checklist (do all of these before leaving Stitch)
- [ ] Export the **design system as `DESIGN.md`**.
- [ ] Download the **`.zip`** (if the button fails, use *Code to clipboard* and save to a file).
- [ ] Save **PNG screenshots** of every screen (desktop and mobile).
- [ ] Optionally "Paste to Figma" for a backup.

---

## 4. v0 BY VERCEL (best stack match — use for ONE hero screen as code reference)

Use v0 only for the **Cockpit** or **Decision Lab**. It gives you real React + Tailwind + shadcn/ui structure the agent can learn from.

```text
Build the "Decision Lab" screen of a Gen Z personal-finance app called Runway, using Next.js App Router, TypeScript, Tailwind CSS and shadcn/ui. UI ONLY: no real logic. Use a typed mock-data file for all numbers.

Theme: dark-first. Background #0B0D12, surface #12151C, border #1F2430, text #E8EAF0, accent lime #C6F432, secondary violet #7C5CFF, safe #34D399, warning #FBBF24, danger #FB7185. Fonts: Sora for headings and numbers (tabular numerals), Inter for body. Radius 16px cards, 12px inputs.

Layout: left sidebar (Cockpit, Decision Lab active, Money, Goals, Health) + top bar ("Day 9 of 30", Advance day, Fast-forward, Quick add). Mobile: bottom tab bar.

Content:
- Left panel: amount input (₹2,499), segmented control (One-time, Recurring, Subscription, Goal transfer, Skip), day select (Day 10), preset chips.
- Center: SVG runway chart with a solid lime real line, a soft band, and a dashed violet ghost line dipping below zero near Day 26.
- Six delta chips (label, old → new, signed difference with arrow icon + color):
  Balance ₹5,400 → ₹2,901 · Daily allowance ₹231 → ₹112 · Day-30 forecast ₹1,180 → −₹1,319 · Headphones goal on track → misses Day 28 · Risk Low 8% → High 71% · Health 78 → 38
- Danger verdict banner: "DON'T — This puts you in the red by Day 26."
- "Find a safer way" card with three alternatives (Spend ₹1,100 instead · Buy on Day 16 · Split into 2 × ₹1,250).
- Buttons: Commit decision, Discard, Copy share link.

Requirements: semantic landmarks, visible focus rings, aria-live="polite" on the verdict and chips, status never shown by color alone, WCAG AA contrast, fully responsive at 360, 768 and 1280px. Split into small components (DeltaChip, VerdictBanner, RunwayChart, DecisionForm, SaferWayCard).
```
**Export:** use the Code tab / GitHub sync / download. Keep it as a **reference folder**, not the final app.

---

## 5. BANANI (backup for fast multi-screen concepts)

```text
Design a dark-first fintech web app "Runway" for Gen Z managing ₹10,000 over 30 days. Create these screens: (1) Cockpit home, (2) Decision Lab, (3) Money with Subscriptions tab, (4) Goals, (5) Health score.

Style: background #0B0D12, cards #12151C, accent lime #C6F432, violet #7C5CFF for simulation, status colors green #34D399 / amber #FBBF24 / red #FB7185. Sora for headings and numbers, Inter for body. 16px radius, outline icons.

Key elements: a 30-cell day timeline strip; a hero ring "₹231 / day"; a runway line chart with a dashed violet ghost line; six before/after delta chips; a health gauge 78/100; verdict banner "DON'T — This puts you in the red by Day 26."

Use this exact data: Day 9 of 30, balance ₹5,400, safe to spend ₹4,853, forecast ₹1,180, risk Low 8%, health 78. Bills: Phone recharge ₹299, Spotify ₹119, Netflix ₹199, Bus pass ₹600. Goals: Headphones ₹900/₹3,000, Trip fund ₹400/₹2,000.
Every status needs an icon and text label, not color alone. Desktop 1440px.
```
**Export:** Figma and/or HTML/CSS; save PNGs.

---

## 6. MAGIC PATTERNS (backup, strongest at consistent design systems)

Step 1: create a design system with the tokens in §2.3. Step 2: use this prompt.

```text
Using my design system, create a responsive web app UI for "Runway", a Gen Z budgeting app for ₹10,000 over 30 days. Output React with Tailwind.

Pages: Cockpit, Decision Lab, Money (tabs: Transactions, Subscriptions, Commitments), Goals, Health.

Cockpit: sidebar nav, top bar ("Day 9 of 30", Advance day, Fast-forward, Quick add), a 30-cell DayStrip, hero ring "₹231 / day", stat cards (Balance ₹5,400, Safe to spend ₹4,853, Day-30 forecast ₹1,180), runway area chart with confidence band, health gauge 78/100, risk badge "Low · 8%", upcoming bills, goals progress rings.

Decision Lab: decision form (amount, type, day, presets), runway chart with a dashed violet ghost line, six delta chips (balance, daily allowance, forecast, goal ETA, risk, health), verdict banner, three safer alternatives, Commit/Discard buttons.

Accessible (WCAG AA, visible focus, aria-live on results), mobile bottom tabs under 640px, status shown with icon + text + color.
```

---

## 7. UX PILOT (backup — spend the few free credits on 3 hero screens only)

```text
Generate 3 high-fidelity screens for a dark fintech web app "Runway" (Gen Z, ₹10,000 over 30 days): Cockpit, Decision Lab, Health.

Style: bg #0B0D12, surface #12151C, lime accent #C6F432, violet #7C5CFF for what-if elements, status green/amber/red with icons. Sora + Inter fonts, 16px radius.

Cockpit: 30-day timeline strip, hero ring "₹231 / day", balance ₹5,400, forecast ₹1,180, runway chart, health gauge 78, upcoming bills, goals.
Decision Lab: scenario "Sneakers ₹2,499 on Day 10", dashed violet ghost line on the chart, six before/after chips (balance, daily allowance, forecast, goal, risk, health), verdict "DON'T — in the red by Day 26", three safer alternatives.
Health: 78/100 gauge with six weighted component rows and one-line reasons.
Desktop 1440px.
```

---

## 8. TIME-BOXED WORKFLOW (35 minutes, then stop designing)

| Minutes | Action |
|---|---|
| 0–3 | Open Stitch. Paste **Step 0** (design system). |
| 3–10 | Run **Batch A** (Cockpit) and **Batch B** (Decision Lab). These are 80% of your score. |
| 10–18 | Run Batches **C, D, E**. |
| 18–28 | Fix only what is broken: contrast, overflow, wrong numbers. Use refinement prompts sparingly. |
| 28–35 | Export `DESIGN.md`, `.zip`, PNGs. Put them in the `/design` folder. **Stop.** |

**Stop rules:**
- If a screen is "good enough," move on. The coding agent can refine details.
- If Stitch hits its limit, switch to one backup tool for the **Cockpit and Decision Lab only**.
- Run the scaffold in parallel (another terminal/tab), not after.

---

## 9. HANDOFF — how the coding agent uses the design (saves tokens)

### 9.1 Folder to create in the repo
```text
/design
  DESIGN.md               # exported design system (tokens, type, spacing, components)
  /screens
    cockpit-desktop.png
    cockpit-mobile.png
    lab-desktop.png
    lab-mobile.png
    money-transactions.png
    money-subscriptions.png
    money-commitments.png
    goals.png
    health.png
    life-happens-modal.png
    command-palette.png
    states-empty-loading-404.png
  /reference-code         # optional: Stitch zip / v0 export. READ-ONLY reference.
  UI_HANDOFF.md           # the file below
```

### 9.2 `UI_HANDOFF.md` (create this and keep it short)
```text
# UI Handoff
Source of truth for visuals: /design/screens/*.png and /design/DESIGN.md.
Do NOT redesign. Do NOT invent new layouts. Match the screenshots.

Rules for the agent:
1. Convert DESIGN.md tokens into tailwind.config + CSS variables FIRST (colors, radius, fonts, spacing). Dark theme default; light via data-theme.
2. Build with Tailwind + shadcn/ui. Do NOT paste exported HTML into the app. Rebuild each screen as typed React components.
3. Use /design/reference-code only to understand structure; never copy it wholesale.
4. Component map: DayStrip, HeroRing, RunwayChart (custom d3 SVG), DeltaChip, VerdictBanner, HealthGauge, RiskBadge, SaferWayCard, ShockModal, CommandPalette.
5. Numbers on screen must come from the engine (domain/), not hardcoded. The demo numbers in the mockups are the SEED scenario.
6. If a mockup conflicts with accessibility (contrast, focus, labels), accessibility wins; keep the look as close as possible.
7. If a detail is missing from the mockups, follow DESIGN.md and ask at most one question.
```

### 9.3 Paste this into `RUNWAY_AGENT_BRIEF.md` (new section, replaces the design guesswork in §10)
```text
## 10b. DESIGN HANDOFF (binding)
The UI is already designed. Read /design/UI_HANDOFF.md, /design/DESIGN.md, and view /design/screens/*.png BEFORE building any UI.
- Do not spend tokens inventing visual design. Match the screenshots.
- Seed data in domain/seed.ts must reproduce the mockup numbers exactly (Day 9 of 30, balance ₹5,400, ₹231/day, health 78, risk Low 8%, forecast ₹1,180).
- The Decision Lab sneakers example (₹2,499 on Day 10 → ₹112/day, High 71%, health 38) must work live as a preset.
```

**Important:** the mockup numbers above are illustrative. When the engine is built, tune `seed.ts` so the real engine **outputs** these numbers (or update the mockup copy). Never let the screenshots and the live app disagree on first load.

---

## 10. QUICK FAILURE FIXES

| Problem | Fix |
|---|---|
| Stitch generates only some screens | Re-run the missing one as its own prompt, starting with "Using the Runway design system…" |
| Numbers differ between screens | Paste the §2.5 data block again and say "Use exactly these numbers." |
| Chart looks generic | Say: "Make the ghost line dashed violet, add a confidence band and a today marker." |
| Download button fails | Use "Code to clipboard", or just screenshot the screens. PNGs + `DESIGN.md` are enough. |
| Out of credits | Move to v0 (Cockpit or Lab only), then Banani. Do not restart from scratch. |
| Design too busy | "Reduce visual noise. Keep only hero number, DayStrip, chart, and three cards above the fold." |

---

**Bottom line:** spend ~35 minutes making **Cockpit + Decision Lab** look exceptional, export `DESIGN.md` + PNGs, then let the agent build against them. The ghost-future chart and the six delta chips are the screens judges (and FAIE's alignment checks) will remember.
