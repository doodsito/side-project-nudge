type Horizon = "short" | "medium" | "long";
type Savings = "limited" | "some" | "strong";
type Reaction = "low" | "medium" | "high";
type Style = "regular" | "occasional" | "none";
export type Decision = "planned" | "wait" | "more";
export type Profile = { horizon?: Horizon; savings?: Savings; reaction?: Reaction; style?: Style };
export type Step = "profile" | "scenario" | "feedback" | "summary";
type Option = { value: string; title: string; detail: string };
export type Question = { key: keyof Profile; number: string; title: string; options: Option[] };
export const QUESTIONS: Question[] = [
  {
    key: "horizon",
    number: "01",
    title: "When might you need this money?",
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
    options: [
      { value: "limited", title: "Less than 1 month", detail: "My safety buffer is limited" },
      { value: "some", title: "1–3 months", detail: "I have some room for surprises" },
      { value: "strong", title: "More than 3 months", detail: "My short-term needs are covered" },
    ],
  },
  {
    key: "reaction",
    number: "03",
    title: "How would a temporary 20% fall feel?",
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
export const DECISIONS = [
  {
    value: "planned",
    title: "Invest the €500 as planned",
    detail: "Continue the contribution you had already scheduled",
  },
  {
    value: "wait",
    title: "Wait until markets feel calmer",
    detail: "Keep the contribution in cash for now",
  },
  {
    value: "more",
    title: "Invest more because prices are lower",
    detail: "Increase this month’s contribution above €500",
  },
] as const;
export const FACTORS = {
  horizon: {
    short: ["SHORTER", "You may need the money sooner, so a recovery has less time to unfold."],
    medium: ["MEDIUM", "You have some time, but your future need for the money still matters."],
    long: ["LONG", "A longer horizon gives temporary market falls more time to recover."],
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
      "You described large temporary swings as part of a long-term journey.",
    ],
  },
  style: {
    regular: ["REGULAR", "You prefer a repeatable schedule rather than reacting to headlines."],
    occasional: ["FLEXIBLE", "Your contributions depend on when money is available."],
    none: ["UNDEFINED", "Building a contribution rule may matter before changing one."],
  },
} as const;

export function makeFeedback(p: Required<Profile>, d: Decision) {
  const cautious = p.horizon === "short" || p.savings === "limited" || p.reaction === "low";
  if (cautious)
    return {
      title:
        "Before thinking about market timing, your situation suggests there may be more important questions to review.",
      body: `A ${p.horizon === "short" ? "shorter time horizon" : "more sensitive response to losses"}${p.savings === "limited" ? " and limited emergency buffer" : ""} can make access to cash and the size of potential losses more important than whether prices look cheaper this week.`,
      close:
        d === "more"
          ? "Increasing the contribution could also increase a risk you already said may be hard to carry."
          : "Pausing to review those constraints is different from trying to predict the market.",
    };
  if (d === "planned")
    return {
      title: "Your decision is consistent with the plan you described.",
      body: "Your horizon is long, your short-term savings buffer is stronger and you told us you prefer a regular investing routine.",
      close:
        "The market changed this week. The assumptions behind your plan did not necessarily change.",
    };
  if (d === "more")
    return {
      title: "Lower prices may fit your situation, but they are not enough on their own.",
      body: "Your profile suggests more capacity to tolerate a decline, yet increasing the contribution still changes the amount of risk you planned to take.",
      close:
        "A price fall can be relevant. Your overall allocation, cash needs and original contribution rule still matter.",
    };
  return {
    title: "Waiting may feel safer, but calm markets are not guaranteed to arrive on schedule.",
    body: "Your profile suggests you have time, a stronger savings buffer and capacity to tolerate volatility. Waiting changes the regular plan you described.",
    close:
      "The useful question is whether your circumstances changed — not whether this week felt uncomfortable.",
  };
}
