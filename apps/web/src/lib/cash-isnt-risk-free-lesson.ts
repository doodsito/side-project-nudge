import type { Track } from "@/lib/tracks";

export const CASH_ISNT_RISK_FREE_STEPS = [
  "welcome",
  "snapshot",
  "inflation",
  "price-example",
  "balance",
  "interest-example",
  "interest",
  "near-term",
  "long-term",
  "checklist",
  "complete",
] as const;

export type CashIsntRiskFreeStep = (typeof CASH_ISNT_RISK_FREE_STEPS)[number];

export const STARTING_CASH = 1_000;
export const INFLATION_RATE = 3;
export const CASH_RATE = 0;
export const SAVINGS_RATE = 2;
export const PRICE_AFTER_INFLATION = STARTING_CASH * (1 + INFLATION_RATE / 100);
export const CASH_AFTER_YEAR = STARTING_CASH * (1 + CASH_RATE / 100);
export const CASH_PURCHASING_GAP = PRICE_AFTER_INFLATION - CASH_AFTER_YEAR;
export const SAVINGS_AFTER_YEAR = STARTING_CASH * (1 + SAVINGS_RATE / 100);
export const SAVINGS_PURCHASING_GAP = PRICE_AFTER_INFLATION - SAVINGS_AFTER_YEAR;
export const NEAR_TERM_MONTHS = 2;
export const LONG_TERM_YEARS = 10;

export const INFLATION_OPTIONS = [
  { value: "every-price", correct: false },
  { value: "average-prices", correct: true },
  { value: "account-withdrawal", correct: false },
] as const;

export const BALANCE_OPTIONS = [
  { value: "debited", correct: false },
  { value: "less-purchasing-power", correct: true },
  { value: "no-risk", correct: false },
] as const;

export const INTEREST_OPTIONS = [
  { value: "fully-protected", correct: false },
  { value: "slower-than-prices", correct: true },
  { value: "invest-everything", correct: false },
] as const;

export const NEAR_TERM_OPTIONS = [
  { value: "access-and-stability", correct: true },
  { value: "highest-return", correct: false },
  { value: "promised-return", correct: false },
] as const;

export const LONG_TERM_OPTIONS = [
  { value: "invest-everything", correct: false },
  { value: "keep-everything-cash", correct: false },
  { value: "compare-tradeoffs", correct: true },
] as const;

export function isLessonSevenAvailable(track: Track) {
  return track === "fr" || track === "us";
}
