import type { Track } from "@/lib/tracks";

export const BUILD_YOUR_SAFETY_NET_STEPS = [
  "welcome",
  "purpose",
  "snapshot",
  "factors",
  "comparison",
  "decision",
  "rebuild",
  "complete",
] as const;

export type BuildYourSafetyNetStep = (typeof BUILD_YOUR_SAFETY_NET_STEPS)[number];

// Alex continues with the same income and monthly saving used in lesson 3.
export const TAKE_HOME_PAY = 1850;
export const MONTHLY_SAVING = 90;
export const ESSENTIAL_MONTHLY_COSTS = 1350;
export const CURRENT_BUFFER = 360;
export const DISRUPTION_COST = 300;
export const BUFFER_AFTER_USE = CURRENT_BUFFER - DISRUPTION_COST;
export const TIGHTER_MONTH_CAPACITY = 100;
export const REBUILD_CONTRIBUTION = 50;
export const REBUILD_MARGIN = TIGHTER_MONTH_CAPACITY - REBUILD_CONTRIBUTION;

export const FACTOR_OPTIONS = [
  { value: "universal", correct: false },
  { value: "personal", correct: true },
  { value: "largest", correct: false },
] as const;

export const DECISION_OPTIONS = [
  { value: "finished", correct: false },
  { value: "accessible", correct: true },
  { value: "long-term", correct: false },
] as const;

export const REBUILD_OPTIONS = [
  { value: "all-at-once", correct: false },
  { value: "adapt", correct: true },
  { value: "stop", correct: false },
] as const;

export function isLessonFourAvailable(track: Track) {
  return track === "fr" || track === "us";
}
