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

/** Writes an amount in the track's currency: $1,850 (US) or €1,850 (France). */
export function formatMoney(amount: number, track: Track) {
  return `${currencySymbol(track)}${amount.toLocaleString("en-US")}`;
}

export type Money = (amount: number) => string;

export const BUDGET_ITEMS = [
  {
    label: "Rent & bills",
    amount: 850,
    type: "need",
    note: "Alex must pay this to keep a home.",
  },
  {
    label: "Groceries",
    amount: 280,
    type: "need",
    note: "Alex needs food every week.",
  },
  {
    label: "Transport",
    amount: 90,
    type: "need",
    note: "Alex needs it to get to work.",
  },
  {
    label: "Subscriptions",
    amount: 80,
    type: "want",
    note: "Nice to have, but Alex could cancel or change them.",
  },
  {
    label: "Going out",
    amount: 450,
    type: "want",
    note: "Fun matters, but Alex could spend less here if needed.",
  },
] as const satisfies ReadonlyArray<{
  label: string;
  amount: number;
  type: ExpenseType;
  note: string;
}>;

export const SALARY = 1850;
export const TOTAL_SPENT = BUDGET_ITEMS.reduce((total, item) => total + item.amount, 0);
export const REMAINING = SALARY - TOTAL_SPENT;

type LessonOption = {
  value: string;
  label: (money: Money) => string;
  correct: boolean;
  feedback: (money: Money) => string;
};

export const CONCEPT_OPTIONS: ReadonlyArray<LessonOption> = [
  {
    value: "spending",
    label: () => "Money to spend on anything",
    correct: false,
    feedback: () => "Not quite. Some of it might already be promised to a bill. Try again.",
  },
  {
    value: "investing",
    label: () => "Money to invest right now",
    correct: false,
    feedback: () =>
      "Not yet. First, Alex should check if any of it is already promised. Try again.",
  },
  {
    value: "might-save",
    label: () => "Money Alex might be able to save",
    correct: true,
    feedback: () =>
      "Yes. It's money left over that Alex might save, once nothing is already promised.",
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
    label: (money: Money) => money(SAM_LEFT),
    correct: false,
    feedback: (money: Money) =>
      `${money(SAM_LEFT)} is left, but ${money(SAM.bill)} is already promised to the phone bill. Try again.`,
  },
  {
    value: "free",
    amount: SAM_FREE,
    label: (money: Money) => money(SAM_FREE),
    correct: true,
    feedback: (money: Money) =>
      `Yes. ${money(SAM_LEFT)} is left, but ${money(SAM.bill)} is already promised. So ${money(SAM_FREE)} is free.`,
  },
  {
    value: "none",
    amount: 0,
    label: (money: Money) => money(0),
    correct: false,
    feedback: () => "Sam can't set it all aside, but some of it is free. Try again.",
  },
] as const satisfies ReadonlyArray<LessonOption & { amount: number }>;

// The skip quiz: new numbers, so nobody passes by remembering Alex.
// 3 out of 3 skips the lesson; anything less starts it from the story.
export const SKIP_QUIZ = [
  {
    id: "left",
    prompt: (money: Money) =>
      `You earn ${money(1200)} this month and spend ${money(1000)}. How much is left?`,
    options: [
      { value: "2200", label: (money: Money) => money(2200) },
      { value: "200", label: (money: Money) => money(200) },
      { value: "1000", label: (money: Money) => money(1000) },
    ],
    answer: "200",
    reason: (money: Money) =>
      `Money in − money out: ${money(1200)} − ${money(1000)} = ${money(200)}.`,
  },
  {
    id: "need",
    prompt: () => "Which of these is a need?",
    options: [
      { value: "rent", label: () => "Rent" },
      { value: "streaming", label: () => "A streaming subscription" },
      { value: "concert", label: () => "Concert tickets" },
    ],
    answer: "rent",
    reason: () => "Rent must be paid to keep a home. The other two are wants.",
  },
  {
    id: "promised",
    prompt: (money: Money) =>
      `You have ${money(200)} left. A ${money(50)} bill is due next week. How much could you set aside?`,
    options: [
      { value: "200", label: (money: Money) => money(200) },
      { value: "150", label: (money: Money) => money(150) },
      { value: "50", label: (money: Money) => money(50) },
    ],
    answer: "150",
    reason: (money: Money) =>
      `The ${money(50)} is already promised, so ${money(200)} − ${money(50)} = ${money(150)}.`,
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
