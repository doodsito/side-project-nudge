import type { Track } from "@/lib/tracks";

export const HOW_MUCH_SHOULD_YOU_SAVE_STEPS = [
  "welcome",
  "snapshot",
  "reference",
  "comparison",
  "concept",
  "amount",
  "stress",
  "complete",
] as const;

export type HowMuchShouldYouSaveStep = (typeof HOW_MUCH_SHOULD_YOU_SAVE_STEPS)[number];

export const TAKE_HOME_PAY = 1850;
export const PLANNED_SPENDING = 1670;
export const MONTHLY_CAPACITY = TAKE_HOME_PAY - PLANNED_SPENDING;
export const EXAMPLE_TRANSFER = 90;
export const EXAMPLE_MARGIN = MONTHLY_CAPACITY - EXAMPLE_TRANSFER;
export const LOWER_MONTH_CAPACITY = 100;
export const LOWER_MONTH_MARGIN = LOWER_MONTH_CAPACITY - EXAMPLE_TRANSFER;

export const PERCENTAGE_REFERENCES = [5, 10, 20].map((percentage) => ({
  percentage,
  amount: (TAKE_HOME_PAY * percentage) / 100,
}));

export const REFERENCE_OPTIONS = [
  { value: "capacity", correct: true },
  { value: "percentage", correct: false },
] as const;

export const AMOUNT_OPTIONS = [
  { value: "90", correct: true },
  { value: "180", correct: false },
  { value: "370", correct: false },
] as const;

export const STRESS_OPTIONS = [
  { value: "automatic", correct: false },
  { value: "review", correct: true },
  { value: "increase", correct: false },
] as const;

export function isLessonThreeAvailable(track: Track) {
  return track === "fr" || track === "us";
}
