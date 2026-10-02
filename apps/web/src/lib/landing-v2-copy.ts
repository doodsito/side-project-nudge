// Copy of the alternative landing page at /v2, validated by Robin on 2026-10-01.
// English only for now; the French version follows if this page is kept.

export const LANDING_V2 = {
  nav: [
    ["How it works", "#how-it-works"],
    ["Why Nudge", "#why-nudge"],
    ["FAQ", "#faq"],
  ] as Array<[string, string]>,
  hero: {
    label: "Free · Virtual money · No account needed",
    title: "Invest your first euro with confidence.",
    highlight: "Practise the decisions first, with virtual money.",
    text: "You know you should invest. What holds you back is not knowing what to do when it counts. Nudge puts you in short, realistic situations, lets you decide with virtual euros, then shows you the reasoning behind every trade-off.",
    primary: "Try your first decision, free",
    secondary: "Join early access",
    reassurance: ["No account needed", "No real money", "Never investment advice"],
  },
  facts: [
    ["€0", "to start"],
    ["100%", "virtual money"],
    ["1 case", "ready to try today"],
    ["0", "products to sell you"],
  ] as Array<[string, string]>,
  pain: {
    label: "Sound familiar?",
    title: "Stuck before your first investment? It's not a money problem. It's a practice problem.",
    greeting: "Dear first-job starter,",
    questions: [
      "Do you have savings sleeping on a current account because you don't know where to start?",
      "Have you opened a broker app, scrolled for ten minutes, then closed it?",
      "Are you afraid one wrong move will cost money you worked hard for?",
    ],
    problem: [
      "You're not lazy. And you're not bad with money.",
      "Nobody ever let you practise the decisions before they were real.",
    ],
    agitate: [
      "Videos and finfluencers tell you WHAT to buy.",
      "They never show you HOW to decide for your own situation.",
      "So you borrow someone else's conviction, or you wait. And the question gets bigger every month.",
    ],
    solveTitle: "You don't need a finance degree, a hot tip or a big amount.",
    solve: "You need practice, somewhere your mistakes cost NOTHING.",
  },
  steps: {
    label: "How it works",
    title: "Get a feel for investing in 3 simple steps.",
  },
  valueProps: {
    label: "Why Nudge",
    title: "Everything you need to make your first decisions with confidence.",
    items: [
      {
        icon: "wallet",
        label: "Virtual money",
        title: "Practise with virtual money, so a mistake teaches you instead of costing you.",
        text: "Every case uses fictional euros. Try the bold choice, the careful one and the middle path, and see what each one changes.",
        points: ["Fictional amounts", "Try every option", "Start again anytime"],
      },
      {
        icon: "book",
        label: "The reasoning",
        title: "See the reasoning behind each choice, not just whether you were right.",
        text: "After each decision, Nudge explains what your choice protects, what it puts at risk and which facts should have weighed most.",
        points: ["Trade-offs explained", "A question to check yourself", "No single right answer"],
      },
      {
        icon: "idea",
        label: "What matters",
        title: "Learn the few ideas that really matter before you put money in.",
        text: "Time horizon, cash for the unexpected, market falls and diversification. Ideas you meet inside a situation, when they are useful.",
        points: ["Time horizon", "Market falls", "Diversification"],
      },
      {
        icon: "shield",
        label: "Nothing to sell",
        title: "Never be sold anything, so you can trust what you learn.",
        text: "Nudge teaches. It does not recommend a product, a security or an amount, and it never promises a return.",
        points: ["No product pushed", "No promised returns", "No stock tips"],
      },
    ] as Array<{
      icon: "wallet" | "book" | "idea" | "shield";
      label: string;
      title: string;
      text: string;
      points: string[];
    }>,
  },
  comparison: {
    label: "The difference",
    title: "Learn how to decide, not just what to buy.",
    columns: ["Nudge", "Finance videos", "Broker apps", "Learning with real money"],
    rows: [
      ["No real money at risk", [true, true, false, false]],
      ["Explains the reasoning behind a choice", [true, false, false, false]],
      ["Pushes no product", [true, false, false, true]],
      ["You make the decision yourself", [true, false, true, true]],
    ] as Array<[string, boolean[]]>,
    note: "A general comparison of approaches, not of specific companies.",
  },
  commitments: {
    label: "Our commitments",
    title: "Built to be trusted, not to be loud.",
    items: [
      [
        "Education only",
        "Nudge never tells you what to buy and never promises a return. You stay in charge of your money.",
      ],
      [
        "Nothing invented",
        "No fake user numbers, reviews or logos. When we show a figure, it is real.",
      ],
      [
        "Minimal data",
        "To join early access we ask for an email and a profile. Nothing else, and you can leave anytime.",
      ],
    ] as Array<[string, string]>,
  },
  faqs: [
    [
      "Is this investment advice?",
      "No. Nudge is an educational simulation. It explains the reasoning behind decisions and never recommends a product, a security or an amount.",
    ],
    [
      "Do I need money to use Nudge?",
      "No. Every case uses virtual euros. You never connect a bank account or invest real money.",
    ],
    [
      "Is it free?",
      "Yes. The practice case is free and needs no account. Joining early access is free too.",
    ],
    [
      "Who is it for?",
      "Students and young working adults who know they should start investing but have never taken the first step.",
    ],
    [
      "What do you do with my email?",
      "We use it to send product and early-access updates. We never sell it, and you can unsubscribe at any time.",
    ],
    [
      "When does the app launch?",
      "We are building it now. Join early access and you will be among the first to try new cases.",
    ],
  ] as Array<[string, string]>,
  closing: {
    label: "Practice before it counts",
    title: "Your first decision takes a few minutes. Make it here, before it counts.",
    text: "Try a realistic decision now, then join early access to be among the first to practise new cases.",
    primary: "Try your first decision, free",
    formTitle: "Get new cases first",
  },
};
