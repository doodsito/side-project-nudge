// Fictional case data is independent of the learner's answers.
export const PRACTICE_CASE = {
  id: "market-fall",
  version: 1,
  title: "Alex planned to invest €500. What changes after a market fall?",
  context:
    "Alex is a fictional investor with €10,000 already invested and a €500 contribution planned this month. Markets have just fallen 10%. These are case assumptions, not your finances or a suggested amount.",
  objective: "Separate a change in market prices from a change in someone's circumstances.",
  takeaway:
    "A price fall alone does not settle a decision. The money's purpose, when it is needed, available cash and tolerance for losses all matter. No option guarantees a return.",
  decisions: [
    {
      value: "planned",
      title: "Keep Alex's €500 contribution",
      detail: "Use the amount already planned in this fictional case",
      consequence: "€500 moves from available cash into investments that can rise or fall.",
      tradeoff:
        "The scheduled amount stays the same, but that does not establish whether the plan fits the person's needs.",
    },
    {
      value: "wait",
      title: "Keep the €500 in cash for now",
      detail: "Postpone Alex's contribution",
      consequence: "The €500 stays available in cash rather than being added to investments.",
      tradeoff:
        "That contribution avoids market movements while it stays in cash, including any rise. Waiting does not make the next entry point predictable.",
    },
    {
      value: "more",
      title: "Increase Alex's contribution",
      detail: "Invest more than the planned €500",
      consequence: "More than €500 leaves available cash and becomes exposed to market movements.",
      tradeoff:
        "A lower price is not a guarantee of recovery. Increasing the amount also changes the cash available for other needs.",
    },
  ],
  checkpoint: {
    question: "What would change the context of Alex's decision?",
    options: [
      {
        value: "headline",
        title: "A prediction that prices will recover tomorrow",
        correct: false,
        explanation:
          "A prediction does not guarantee what markets will do. Look for a change in Alex's needs or circumstances.",
      },
      {
        value: "need",
        title: "Alex now needs this money for an unexpected expense",
        correct: true,
        explanation:
          "Exactly. A new need for the money changes the decision's context. The same price movement can mean different things in different situations.",
      },
      {
        value: "crowd",
        title: "More people online say they are investing",
        correct: false,
        explanation:
          "Other people's choices do not tell us whether Alex can still set this money aside. Look at Alex's circumstances.",
      },
    ],
  },
} as const;

export type Decision = (typeof PRACTICE_CASE.decisions)[number]["value"];
export const DECISIONS = PRACTICE_CASE.decisions;
