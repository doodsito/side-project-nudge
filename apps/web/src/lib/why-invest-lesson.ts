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

/** A deliberately simple arithmetic example, not an estimated market return. */
export const COMPOUND_EXAMPLE = {
  start: 100,
  afterOneYear: 110,
  afterTwoYears: 121,
  afterDrop: 80,
} as const;
