// src/domain/types.ts
/**
 * Core domain types for the Runway finance engine.
 */

export type Category =
  | "food"
  | "transport"
  | "entertainment"
  | "shopping"
  | "bills"
  | "others";

export type LedgerEvent =
  | {
      id: string;
      day: number; // 1‑30
      kind: "income";
      amount: number; // positive
      label: string;
    }
  | {
      id: string;
      day: number;
      kind: "expense";
      amount: number; // positive
      category: Category;
      label: string;
    }
  | {
      id: string;
      day: number;
      kind: "commitment";
      amount: number;
      label: string;
      recurEvery?: number; // days between repeats, optional
    }
  | {
      id: string;
      day: number;
      kind: "subscription";
      amount: number;
      label: string;
      renewEvery: number; // days, usually 30
    }
  | {
      id: string;
      day: number;
      kind: "goalTransfer";
      amount: number;
      goalId: string;
    }
  | {
      id: string;
      day: number;
      kind: "shock";
      amount: number;
      label: string;
      resolvedBy: "balance" | "goal" | "skipped";
    };

export type Snapshot = {
  balance: number;
  safeToSpend: number;
  dailyAllowance: number;
  endForecast: { low: number; mid: number; high: number };
  riskP: number;
  riskLevel: "low" | "medium" | "high";
  runwayDay: number | null;
  goals: { id: string; saved: number; etaDay: number | null; onTrack: boolean }[];
  health: { score: number; components: any[] };
};

/**
 * Utility to ensure day stays within 1‑30.
 */
export const clampDay = (day: number): number => Math.max(1, Math.min(30, Math.floor(day)));
