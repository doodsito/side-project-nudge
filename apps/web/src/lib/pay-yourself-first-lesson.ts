export const PAY_YOURSELF_FIRST_STEPS = [
  "welcome",
  "recap",
  "decision",
  "consequence",
  "concept",
  "habit",
  "change",
  "complete",
] as const;

export type PayYourselfFirstStep = (typeof PAY_YOURSELF_FIRST_STEPS)[number];

export const PREVIOUS_REMAINDER = 100;
export const TRANSPORT_PASS = 65;
export const POTENTIAL_CAPACITY = PREVIOUS_REMAINDER - TRANSPORT_PASS;
export const EXAMPLE_TRANSFER = 20;
export const FLEXIBLE_BALANCE = POTENTIAL_CAPACITY - EXAMPLE_TRANSFER;
export const EXTRA_ELECTRICITY = 25;
export const REVISED_CAPACITY = POTENTIAL_CAPACITY - EXTRA_ELECTRICITY;

export const ORDER_OPTIONS = [
  { value: "wait", label: "Wait and save whatever is left", correct: false },
  { value: "move", label: "Move €20 after checking upcoming needs", correct: true },
] as const;

export const HABIT_OPTIONS = [
  { value: "reminder", label: "Set a reminder after payday" },
  { value: "transfer", label: "Schedule a transfer after payday" },
] as const;

export const CHANGE_OPTIONS = [
  { value: "keep", label: "Keep the €20 transfer unchanged", correct: false },
  { value: "review", label: "Review it and reduce or pause it", correct: true },
  { value: "overdraft", label: "Use an overdraft to keep the plan", correct: false },
] as const;
