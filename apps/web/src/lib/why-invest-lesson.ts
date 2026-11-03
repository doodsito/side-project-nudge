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
  monthlyContribution: 50,
  annualRate: 0.07,
  years: 25,
} as const;

export function calculateCompoundComparison(years: number) {
  const wholeYears = Math.max(0, Math.min(COMPOUND_EXAMPLE.years, Math.round(years)));
  const months = wholeYears * 12;
  const monthlyRate = Math.pow(1 + COMPOUND_EXAMPLE.annualRate, 1 / 12) - 1;
  let contributions = 0;
  let reinvestedValue = 0;
  let gainsSetAside = 0;

  for (let month = 0; month < months; month += 1) {
    reinvestedValue *= 1 + monthlyRate;
    gainsSetAside += contributions * monthlyRate;
    contributions += COMPOUND_EXAMPLE.monthlyContribution;
    reinvestedValue += COMPOUND_EXAMPLE.monthlyContribution;
  }

  const valueWithoutReinvestment = contributions + gainsSetAside;

  return {
    years: wholeYears,
    contributions,
    reinvestedValue,
    gainsSetAside,
    valueWithoutReinvestment,
    reinvestmentDifference: reinvestedValue - valueWithoutReinvestment,
  };
}

export const RISK_EXAMPLE = {
  start: 1000,
  duringDrop: 800,
  afterRecovery: 1300,
} as const;
