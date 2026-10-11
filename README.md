# Runaway

Runway is a personal‑finance dashboard concept for exploring a 30‑day spending runway. It brings a daily allowance, balance forecast, upcoming commitments, goals, and financial health into one interface, with a Decision Lab for previewing the effect of choices.

The current app is a front‑end prototype with sample data. It does not require environment variables or a backend service.

## Getting started

### Requirements

- Node.js 20.9 or later
- pnpm (the version declared in `package.json` is recommended)

### Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the local development server |
| `pnpm typecheck` | Check TypeScript types |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build locally |

To verify a production build:

```bash
pnpm typecheck
pnpm build
pnpm start
```

## Project structure

```text
app/                  Next.js App Router pages and global styles
  decision-lab/       Decision Lab
  goals/              Goals
  health/             Financial health
  money/              Transactions and commitments
components/           Shared UI components
lib/                  Shared utilities
public/               App icons and static assets
```

## Tech stack

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- Lucide icons

## Continuous integration

GitHub Actions runs the TypeScript check and production build for pushes and pull requests.
# Runaway
=======
# Runway

Runway is a personal-finance dashboard concept for exploring a 30-day spending runway. It brings a daily allowance, balance forecast, upcoming commitments, goals, and financial health into one interface, with a Decision Lab for previewing the effect of choices.

The current app is a front-end prototype with sample data. It does not require environment variables or a backend service.

## Getting started

### Requirements

- Node.js 20.9 or later
- pnpm (the version declared in `package.json` is recommended)

### Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the local development server |
| `pnpm typecheck` | Check TypeScript types |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build locally |

To verify a production build:

```bash
pnpm typecheck
pnpm build
pnpm start
```

## Project structure

```text
app/                  Next.js App Router pages and global styles
  decision-lab/       Decision Lab
  goals/              Goals
  health/             Financial health
  money/              Transactions and commitments
components/           Shared UI components
lib/                  Shared utilities
public/               App icons and static assets
```

## Tech stack

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- Lucide icons

## Continuous integration

GitHub Actions runs the TypeScript check and production build for pushes and pull requests.
>>>>>>> 8d86f9a (Initial commit)
