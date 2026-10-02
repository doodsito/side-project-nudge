import type { Decision } from "./practice-case";
export { DECISIONS, type Decision } from "./practice-case";

type Horizon = "short" | "medium" | "long";
type Savings = "limited" | "some" | "strong";
type Reaction = "low" | "medium" | "high";
type Style = "regular" | "occasional" | "none";
export type Profile = { horizon?: Horizon; savings?: Savings; reaction?: Reaction; style?: Style };
export type Step = "profile" | "scenario" | "feedback" | "summary";
type Option<K extends keyof Profile> = {
  value: NonNullable<Profile[K]>;
  title: string;
  detail: string;
};
export type Question = {
  [K in keyof Required<Profile>]: {
    key: K;
    number: string;
    title: string;
    help: string;
    options: Option<K>[];
  };
}[keyof Profile];

// Validate at the boundary rather than asserting that a partial profile is complete.
export function isCompleteProfile(value: unknown): value is Required<Profile> {
  if (!value || typeof value !== "object") return false;
  return QUESTIONS.every((question) =>
    question.options.some((option) => option.value === Reflect.get(value, question.key)),
  );
}

export function updateProfile(profile: Profile, key: keyof Profile, value: string): Profile {
  const question = QUESTIONS.find((item) => item.key === key);
  if (!question?.options.some((option) => option.value === value)) return profile;
  return { ...profile, [key]: value };
}

export function resolveStep(step: string, _profile: Profile, decision: Decision | null): Step {
  if (step === "scenario") return "scenario";
  if (step === "feedback" || step === "summary" || step === "profile")
    return decision ? step : "scenario";
  return "scenario";
}
export const QUESTIONS: Question[] = [
  {
    key: "horizon",
    number: "01",
    title: "When might you need money you set aside?",
    help: "Think about money for a future goal, separate from everyday spending. You can use imagined answers for this exercise.",
    options: [
      { value: "short", title: "Under 3 years", detail: "I may need this money soon" },
      { value: "medium", title: "3–10 years", detail: "I have time, but not indefinitely" },
      { value: "long", title: "More than 10 years", detail: "This is long-term capital" },
    ],
  },
  {
    key: "savings",
    number: "02",
    title: "How much emergency savings do you have?",
    help: "Count months of essential expenses, such as rent, food and bills, that your accessible savings could cover.",
    options: [
      { value: "limited", title: "Less than 1 month", detail: "My safety buffer is limited" },
      { value: "some", title: "1–3 months", detail: "I have some room for surprises" },
      {
        value: "strong",
        title: "More than 3 months",
        detail: "My buffer covers more than 3 months",
      },
    ],
  },
  {
    key: "reaction",
    number: "03",
    title: "How would a 20% fall feel?",
    help: "Imagine €100 invested becoming worth €80. A recovery is not guaranteed, and we do not know when it might happen.",
    options: [
      { value: "low", title: "I’d lose sleep", detail: "A 20% fall would feel intolerable" },
      {
        value: "medium",
        title: "Uncomfortable, but manageable",
        detail: "I could wait if the plan still made sense",
      },
      { value: "high", title: "Part of the journey", detail: "I accept large temporary swings" },
    ],
  },
  {
    key: "style",
    number: "04",
    title: "How do you plan to invest?",
    help: "Having no plan yet is a valid starting point. Your answer does not commit you to investing.",
    options: [
      {
        value: "regular",
        title: "A fixed monthly amount",
        detail: "I prefer a regular investing routine",
      },
      {
        value: "occasional",
        title: "Occasional contributions",
        detail: "I invest when money is available",
      },
      {
        value: "none",
        title: "I don’t have a plan yet",
        detail: "I’m still working out my approach",
      },
    ],
  },
];
export const FACTORS = {
  horizon: {
    short: ["SHORTER", "You may need the money sooner, so a recovery has less time to unfold."],
    medium: ["MEDIUM", "You have some time, but your future need for the money still matters."],
    long: [
      "LONG",
      "You described a horizon of more than 10 years. More time does not guarantee a recovery.",
    ],
  },
  savings: {
    limited: [
      "LIMITED",
      "A limited emergency buffer can make liquidity more important than market timing.",
    ],
    some: [
      "MODERATE",
      "You have some room for surprises, but an unexpected expense could affect the plan.",
    ],
    strong: ["STRONG", "Your short-term savings are less dependent on this contribution."],
  },
  reaction: {
    low: ["LOWER TOLERANCE", "Large temporary losses may be difficult to stay invested through."],
    medium: [
      "MODERATE",
      "Volatility feels uncomfortable, but may be tolerable when the plan still fits.",
    ],
    high: [
      "HIGHER TOLERANCE",
      "You described large swings as tolerable. That does not tell us when you will need the money.",
    ],
  },
  style: {
    regular: ["REGULAR", "You prefer a repeatable schedule rather than reacting to headlines."],
    occasional: ["FLEXIBLE", "Your contributions depend on when money is available."],
    none: ["UNDEFINED", "Building a contribution rule may matter before changing one."],
  },
} as const;

export function makeFeedback(p: Required<Profile>, d: Decision) {
  const constraints: string[] = [];
  if (p.horizon === "short") constraints.push("You may need the money within three years.");
  if (p.savings === "limited")
    constraints.push("Your stated emergency savings cover less than one month of expenses.");
  if (p.reaction === "low") constraints.push("You said a 20% fall would feel intolerable.");

  const titles: Record<Decision, string> = {
    planned: "Starting to invest changes the cash available.",
    wait: "Adding to savings keeps the money accessible.",
    split: "Splitting the money changes both balances.",
  };
  return {
    title: constraints.length ? "Look at the constraints before the price." : titles[d],
    body: constraints.length
      ? constraints.join(" ") +
        " These answers raise questions about cash needs or potential losses before choosing what to do with the €100."
      : "Your answers are shown below. They help explore the case; they do not establish that any contribution is right for you.",
    close:
      p.style === "regular"
        ? "You described a regular routine. Alex's €100 is a fictional amount, not a recommendation for that routine."
        : p.style === "occasional"
          ? "You described occasional contributions. Alex's €100 is a case assumption, not the routine you described."
          : "You said you do not have a plan yet. Alex's €100 belongs to the fictional case, not to you.",
  };
}
