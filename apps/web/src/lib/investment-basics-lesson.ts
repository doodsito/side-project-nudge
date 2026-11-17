export const INVESTMENT_WORLD = "investment-world";

export const INVESTMENT_BASICS_STEPS = [
  "hook",
  "discovery",
  "mechanisms",
  "matching",
  "value",
  "quiz",
] as const;

export type InvestmentBasicsStep = (typeof INVESTMENT_BASICS_STEPS)[number];
export type QuestionId = "hook" | "value" | "quizShare" | "quizMechanisms" | "quizRisk";
export type MechanismId = "own" | "lend" | "fund";

export const QUESTION_OPTIONS = {
  hook: ["seller", "company", "app"],
  value: ["floor", "vary", "automatic"],
  quizShare: ["ownership", "loan", "guarantee"],
  quizMechanisms: ["fundHolds", "fundLendsOnly", "sameThing"],
  quizRisk: ["gainOrLoss", "alwaysGain", "noLoss"],
} as const;

export const CORRECT_OPTIONS: Record<QuestionId, string> = {
  hook: "seller",
  value: "vary",
  quizShare: "ownership",
  quizMechanisms: "fundHolds",
  quizRisk: "gainOrLoss",
};

export const MATCHING_ITEMS = ["companyPart", "stateLoan", "fundPart"] as const;
export type MatchingItem = (typeof MATCHING_ITEMS)[number];
export const MATCHING_ANSWERS: Record<MatchingItem, MechanismId> = {
  companyPart: "own",
  stateLoan: "lend",
  fundPart: "fund",
};

/** Fisher–Yates: each permutation is equally likely with independent uniform draws. */
export function shuffleOptions<T>(options: readonly T[], random: () => number = Math.random): T[] {
  const shuffled = [...options];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const swap = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swap]] = [shuffled[swap]!, shuffled[index]!];
  }
  return shuffled;
}

export function newQuestionOrder(random: () => number = Math.random) {
  return Object.fromEntries(
    (Object.keys(QUESTION_OPTIONS) as QuestionId[]).map((id) => [
      id,
      shuffleOptions(QUESTION_OPTIONS[id], random),
    ]),
  ) as Record<QuestionId, string[]>;
}
