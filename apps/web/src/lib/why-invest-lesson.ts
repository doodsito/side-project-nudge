export const WHY_INVEST_STEPS = [
  "welcome",
  "meaning",
  "compound",
  "risk",
  "question",
  "complete",
] as const;

export type WhyInvestStep = (typeof WHY_INVEST_STEPS)[number];

export const WHY_INVEST_CORRECT_ANSWER = 1;

/** Simplified illustrations; neither sequence describes or predicts a market return. */
export const COMPOUND_EXAMPLE = {
  start: 1000,
  annualRate: 0.05,
  afterTenYears: 1629,
  afterTwentyYears: 2653,
  withoutCompounding: 2000,
} as const;

export const RISK_EXAMPLE = {
  start: 1000,
  duringDrop: 800,
  afterRecovery: 1300,
} as const;
