import type { Track } from "@/lib/tracks";

export const DEBT_VS_INVESTING_STEPS = [
  "welcome",
  "snapshot",
  "rate",
  "interpret",
  "example",
  "compare",
  "decision",
  "change",
  "checklist",
  "complete",
] as const;

export type DebtVsInvestingStep = (typeof DEBT_VS_INVESTING_STEPS)[number];

export const EXTRA_MONTHLY = 100;
export const DEBT_BALANCE = 600;
export const ANNUAL_RATE = 12;
export const INVESTMENT_YEARS = 10;
export const FULL_YEAR_COST_EXAMPLE = (DEBT_BALANCE * ANNUAL_RATE) / 100;
export const LOWER_RATE = 0;
export const LOWER_RATE_MONTHS = 9;

export const RATE_OPTIONS = [
  { value: "total", correct: false },
  { value: "monthly", correct: false },
  { value: "annual", correct: true },
] as const;

export const DECISION_OPTIONS = [
  { value: "guaranteed-return", correct: false },
  { value: "extra-payment", correct: true },
  { value: "use-safety-net", correct: false },
] as const;

export const CHANGE_OPTIONS = [
  { value: "always-repay", correct: false },
  { value: "always-invest", correct: false },
  { value: "reassess", correct: true },
] as const;

export function isLessonSixAvailable(track: Track) {
  return track === "fr" || track === "us";
}
