// Fictional case data is independent of the learner's answers.
export const PRACTICE_CASE = {
  id: "first-paycheque",
  version: 2,
  title: "Alex has €100 to set aside. Where should it go?",
  context:
    "Alex just started a first job and is considering investing. Upcoming costs are still unknown.",
  facts: [
    { label: "After essentials", value: "€100" },
    { label: "Accessible savings", value: "€200" },
    { label: "Markets this week", value: "Down 10%" },
  ],
  objective: "Compare accessible savings with a first investment before reacting to market prices.",
  takeaway:
    "Money you may need soon serves a different purpose from money you can leave invested. Before reacting to a market fall, check your cash buffer, upcoming needs and time horizon. Lower prices do not guarantee future gains.",
  decisions: [
    {
      value: "planned",
      title: "Invest the €100 now",
      detail: "Put this month's remaining money into a first investment",
      consequence: "€100 leaves Alex's available cash and becomes exposed to market movements.",
      tradeoff:
        "Alex can start practising an investing routine, but the €200 emergency buffer stays unchanged. A market fall alone does not show whether this is the right time for Alex to invest.",
    },
    {
      value: "wait",
      title: "Keep the €100 in accessible savings",
      detail: "Add it to the cash available for unexpected costs",
      consequence: "Alex's accessible savings rise from €200 to €300; this €100 is not invested.",
      tradeoff:
        "Alex has more cash for an unexpected expense, but this amount does not take part in any market recovery while it stays in savings.",
    },
    {
      value: "split",
      title: "Split the €100 between both",
      detail: "Keep €50 in savings and invest €50",
      consequence:
        "Alex's accessible savings rise to €250, while €50 becomes exposed to market movements.",
      tradeoff:
        "This starts investing with a smaller amount and adds some cash. It still leaves questions about upcoming costs and how much accessible savings Alex needs.",
    },
  ],
  checkpoint: {
    question: "Which detail would help Alex think through this choice?",
    options: [
      {
        value: "headline",
        title: "A prediction that markets will recover next week",
        correct: false,
        explanation:
          "A prediction cannot tell Alex what will happen. Look for a detail about when this money might be needed.",
      },
      {
        value: "need",
        title: "Whether Alex has an upcoming expense or might need the cash soon",
        correct: true,
        explanation:
          "Yes. The timing of Alex's needs helps explain what should stay accessible and what could be left invested. The market fall alone cannot answer that question.",
      },
      {
        value: "crowd",
        title: "Whether friends are investing after the fall",
        correct: false,
        explanation:
          "Friends may have different needs and savings. Their choices do not tell Alex when this €100 might be needed.",
      },
    ],
  },
} as const;

export type Decision = (typeof PRACTICE_CASE.decisions)[number]["value"];
export const DECISIONS = PRACTICE_CASE.decisions;
