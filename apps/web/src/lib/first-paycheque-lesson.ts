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
export type ExpenseType = "essential" | "flexible";

export const BUDGET_ITEMS = [
  {
    label: "Rent & bills",
    amount: 850,
    type: "essential",
    note: "Alex needs these to keep their home running this month.",
  },
  {
    label: "Groceries",
    amount: 280,
    type: "essential",
    note: "Food for the month belongs in Alex's essential spending.",
  },
  {
    label: "Transport",
    amount: 90,
    type: "essential",
    note: "Alex relies on transport to get to work.",
  },
  {
    label: "Subscriptions",
    amount: 80,
    type: "flexible",
    note: "Alex could review or change these if priorities shift.",
  },
  {
    label: "Plans & extras",
    amount: 450,
    type: "flexible",
    note: "Fun matters too, but this amount is easier to adjust than rent.",
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

export const CONCEPT_OPTIONS = [
  { value: "spending", label: "Free spending money", correct: false },
  { value: "investing", label: "Money ready to invest", correct: false },
  { value: "capacity", label: "Potential saving capacity", correct: true },
] as const;

export const TRANSFER_OPTIONS = [
  { value: "yes", label: "Yes, all €100", correct: false },
  { value: "not-yet", label: "Not yet", correct: true },
] as const;

export function isExpenseAnswerCorrect(index: number, answer: ExpenseType | null) {
  return BUDGET_ITEMS[index]?.type === answer;
}
