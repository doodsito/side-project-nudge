import type { Track } from "@/lib/tracks";

export const MONEY_YOULL_NEED_SOON_STEPS = [
  "welcome",
  "roles",
  "snapshot",
  "classify",
  "timeline",
  "stability",
  "change",
  "complete",
] as const;

export type MoneyYoullNeedSoonStep = (typeof MONEY_YOULL_NEED_SOON_STEPS)[number];

// Alex keeps the monthly saving capacity established in lessons 3 and 4.
export const MONTHLY_SAVING = 90;
export const PLANNED_COST = 540;
export const ALREADY_SAVED = 180;
export const PLANNED_GAP = PLANNED_COST - ALREADY_SAVED;
export const MONTHS_UNTIL_NEEDED = 6;
export const MONTHLY_PLANNED_AMOUNT = PLANNED_GAP / MONTHS_UNTIL_NEEDED;
export const MONTHLY_OTHER_PRIORITIES = MONTHLY_SAVING - MONTHLY_PLANNED_AMOUNT;
export const EARLIER_MONTHS_UNTIL_NEEDED = 3;
export const EARLIER_MONTHLY_AMOUNT = PLANNED_GAP / EARLIER_MONTHS_UNTIL_NEEDED;
export const EARLIER_MONTHLY_SHORTFALL = EARLIER_MONTHLY_AMOUNT - MONTHLY_SAVING;

export const ROLE_OPTIONS = [
  { value: "emergency", correct: false },
  { value: "planned", correct: true },
  { value: "long-term", correct: false },
] as const;

export const STABILITY_OPTIONS = [
  { value: "growth", correct: false },
  { value: "accessible", correct: true },
  { value: "safety-net", correct: false },
] as const;

export const CHANGE_OPTIONS = [
  { value: "chase", correct: false },
  { value: "review", correct: true },
  { value: "buffer", correct: false },
] as const;

export function isLessonFiveAvailable(track: Track) {
  return track === "fr" || track === "us";
}
