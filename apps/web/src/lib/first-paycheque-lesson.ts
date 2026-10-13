import type { Track } from "@/lib/tracks";

export const LESSON_STEPS = [
  "welcome",
  "story",
  "budget",
  "result",
  "concept-check",
  "concept",
  "transfer",
  "complete",
] as const;

export type LessonStep = (typeof LESSON_STEPS)[number];
// The skip quiz is not one of the eight screens: it lets a learner who already
// knows the idea go straight to "complete".
export type LessonView = LessonStep | "skip-quiz";
export type ExpenseType = "need" | "want";

export function currencySymbol(track: Track) {
  return track === "us" ? "$" : "€";
}

/** Writes an amount in the track's currency: $1,850 (US) or 1 850 € (France). */
export function formatMoney(amount: number, track: Track) {
  if (track === "us") return `$${amount.toLocaleString("en-US")}`;
  return `${amount.toLocaleString("fr-FR")}\u00a0€`;
}

export const BUDGET_ITEMS = [
  {
    amount: 850,
    type: "need",
  },
  {
    amount: 280,
    type: "need",
  },
  {
    amount: 90,
    type: "need",
  },
  {
    amount: 80,
    type: "want",
  },
  {
    amount: 450,
    type: "want",
  },
] as const satisfies ReadonlyArray<{
  amount: number;
  type: ExpenseType;
}>;

export const SALARY = 1850;
export const TOTAL_SPENT = BUDGET_ITEMS.reduce((total, item) => total + item.amount, 0);
export const REMAINING = SALARY - TOTAL_SPENT;

type LessonOption = {
  value: string;
  correct: boolean;
};

export const CONCEPT_OPTIONS: ReadonlyArray<LessonOption> = [
  {
    value: "spending",
    correct: false,
  },
  {
    value: "investing",
    correct: false,
  },
  {
    value: "might-save",
    correct: true,
  },
];

// The transfer question: the same idea, a different person and different numbers.
export const SAM = { earned: 600, spent: 475, bill: 25 } as const;
const SAM_LEFT = SAM.earned - SAM.spent;
const SAM_FREE = SAM_LEFT - SAM.bill;

export const TRANSFER_OPTIONS = [
  {
    value: "all",
    amount: SAM_LEFT,
    correct: false,
  },
  {
    value: "free",
    amount: SAM_FREE,
    correct: true,
  },
  {
    value: "none",
    amount: 0,
    correct: false,
  },
] as const satisfies ReadonlyArray<LessonOption & { amount: number }>;

// The skip quiz: new numbers, so nobody passes by remembering Alex.
// 3 out of 3 skips the lesson; anything less starts it from the story.
export const SKIP_QUIZ = [
  {
    id: "left",
    options: [
      { value: "2200", amount: 2200 },
      { value: "200", amount: 200 },
      { value: "1000", amount: 1000 },
    ],
    answer: "200",
  },
  {
    id: "need",
    options: [{ value: "rent" }, { value: "streaming" }, { value: "concert" }],
    answer: "rent",
  },
  {
    id: "promised",
    options: [
      { value: "200", amount: 200 },
      { value: "150", amount: 150 },
      { value: "50", amount: 50 },
    ],
    answer: "150",
  },
] as const;

export type SkipQuizAnswers = Partial<Record<(typeof SKIP_QUIZ)[number]["id"], string>>;

export function scoreSkipQuiz(answers: SkipQuizAnswers) {
  const missed = SKIP_QUIZ.filter((question) => answers[question.id] !== question.answer).map(
    (question) => question.id,
  );
  return { passed: missed.length === 0, missed };
}

export function isExpenseAnswerCorrect(index: number, answer: ExpenseType | null) {
  return BUDGET_ITEMS[index]?.type === answer;
}
