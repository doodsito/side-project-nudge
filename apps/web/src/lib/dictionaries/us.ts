// Site copy for the US track: American English, amounts in dollars.
// The French copy (fr.ts) follows the same shape.
import { BRAND } from "@/lib/brand";

export const us = {
  skipLink: "Skip to content",
  meta: {
    title: "Practice Investing Decisions",
    description:
      "Practice realistic investing decisions with virtual money and understand the reasoning before your savings are on the line.",
    ogTitle: "Practice investing before real money is on the line",
    ogDescription:
      "Build an investing decision process through realistic simulations, virtual money and personalized educational feedback.",
  },
  nav: {
    main: "Main navigation",
    mobile: "Mobile navigation",
    toggle: "Toggle navigation",
    home: "home",
    challenge: "Try a challenge",
    howItWorks: "How it works",
    logIn: "Log in",
    signUp: "Sign up",
    open: "Open",
    accountMenu: "Account menu",
    account: "Account",
    logOut: "Log out",
  },
  hero: {
    eyebrow: "For students & first-job starters",
    title: "Your first money decisions.",
    titleAccent: "A little clearer.",
    intro:
      "New to saving or investing? Start with Alex’s first paycheck. Choose what to do with $100, explore the trade-offs and check what you learned, without using real money.",
    cta: "Join the waitlist",
    points: ["Free", "One short case", "No account required"],
    scrollHint: "Try a quick question",
  },
  heroWindow: {
    title: "A preview of your first case",
    badge: "Fictional example",
    left: "Alex has $100 left after essentials.",
    savings: "Accessible savings: $200.",
    event: "Markets fall 10%",
    question: "What would you review before acting?",
    options: [
      "Invest the $100 now",
      "Keep the $100 in accessible savings",
      "Split the $100 between both",
    ],
    footer: "Compare savings and investing in the practice case. No real money, no stock tips.",
  },
  challenge: {
    label: "Learn by deciding",
    title: "Start with a small decision.",
    text: "Try this question before the full case. Choose an answer to explore the reasoning.",
    promises: [
      "No “perfect answer” detached from your situation",
      "No stock tips or pressure to trade",
      "No real capital at risk",
    ],
    badge: "20-second challenge",
    count: "1 of 1",
    context: "You planned to invest for 10 years. Markets fall 10% this week.",
    question: "What should you review first?",
    answersLabel: "Challenge answers",
    answers: {
      A: {
        answer: "Which stocks fell the most",
        title: "Price movement is only one piece of the decision.",
        copy: "Knowing what fell tells you what the market did, not whether your goal, timeline or ability to take risk changed. A lower price alone is not a complete reason to act.",
      },
      B: {
        answer: "Whether your goal, timeline or risk capacity changed",
        title: "Start with what changed for you.",
        copy: "Your investment decision should begin with your situation, not with this week’s market movement.",
      },
      C: {
        answer: "What financial influencers are buying",
        title: "Someone else’s decision may not fit your life.",
        copy: "Their goal, time horizon, finances and tolerance for loss may be completely different. Borrowed conviction is fragile when markets move.",
      },
    },
    prompt: `Choose an answer to see how ${BRAND} turns a reaction into a reasoned decision.`,
    checks: [
      ["Goal", "Has the reason you are investing changed?"],
      ["Timeline", "Do you still have roughly the same amount of time?"],
      ["Risk capacity", "Has your financial ability to tolerate losses changed?"],
    ] as Array<[string, string]>,
    takeaway: "Market prices changed. Your plan may not have.",
    nudge: "Want to see how this changes based on your situation?",
    cta: "Try the full practice case",
  },
  how: {
    label: `How ${BRAND} works`,
    title: "Choose. Understand. Try again.",
    step: "STEP",
    steps: [
      [
        "01",
        "Meet a fictional situation.",
        "Alex has $100 left after essentials. Decide what to do with it before answering any personal questions.",
      ],
      [
        "02",
        "Choose with virtual money.",
        "Compare accessible savings, a first investment or a split. The amounts are fictional.",
      ],
      [
        "03",
        "Take one idea away.",
        "See the cash consequence, check your understanding and optionally explore how your context changes the explanation.",
      ],
    ] as Array<[string, string, string]>,
    cta: "Try the practice case",
  },
  faq: {
    label: "Before you begin",
    title: "Good questions deserve clear answers.",
    text: `${BRAND} is designed to help beginners build judgment, not to make investment choices for them.`,
    items: [
      [
        "Do I need investing experience?",
        `No. ${BRAND} starts with the decisions first-time investors face and explains the concepts as they become useful.`,
      ],
      [
        "Will I use real money?",
        `No. ${BRAND} uses simulated portfolios and virtual money for educational practice.`,
      ],
      [
        `Does ${BRAND} tell me what to buy?`,
        `No. ${BRAND} helps you understand the reasoning behind investment decisions rather than recommending specific financial products.`,
      ],
      [
        "How is this different from a finance video?",
        `Videos explain concepts. ${BRAND} asks you to make the decision first, then teaches the concepts through the consequences and reasoning behind that choice.`,
      ],
      [
        "Is this financial advice?",
        `No. ${BRAND} is designed for educational purposes and simulated practice. It does not provide personalized investment recommendations.`,
      ],
    ] as Array<[string, string]>,
  },
  earlyAccess: {
    label: `${BRAND} early access`,
    title: "Keep practicing before real money is on the line.",
    text: `Join the early access list to be among the first to practice new investing scenarios with ${BRAND}.`,
    profileLegend: "Which describes you best?",
    profiles: {
      student: "Student",
      young_professional: "Young professional",
      other: "Other",
    },
    profileError: "Choose the option that describes you best.",
    emailLabel: "Email address",
    submit: "Join early access",
    saving: "Joining…",
    done: "You’re on the list.",
    error: "We couldn’t save your place just now. Please try again.",
    consent: `We’ll only email you about early access and the launch of ${BRAND}. You can leave the list at any time. You must be 15 or older.`,
    privacy: "Privacy policy",
  },
  footer: {
    disclaimer: `${BRAND} is an educational simulation using virtual money. It is not financial advice, a recommendation or a suitability assessment. Investing involves risk, including the possible loss of capital.`,
    rights: "All rights reserved.",
    nav: "Legal and site information",
    privacy: "Privacy",
    terms: "Terms",
    legal: "Legal",
    cookies: "Cookies",
    version: "Version",
  },
  dashboard: {
    home: "dashboard",
    tabsLabel: "Dashboard",
    tabs: { courses: "Courses", portfolio: "Portfolio", account: "Account" },
    logOut: "Log out",
    logOutPending: "Logging out…",
    usComingSoon: "More lessons for the US are coming soon.",
    portfolio: {
      title: "Portfolio",
      intro: "Virtual money only. Nothing here is real.",
      emptyTitle: "Your virtual portfolio starts soon",
      emptyText:
        "The decisions you practice will build a portfolio in virtual dollars, so you can see how your choices play out over time. It is a simulation for learning, not financial advice.",
      cta: "Practice a decision",
    },
    account: {
      title: "Account",
      passwordUpdated: "Password updated. Use it next time you log in.",
      details: "Your details",
      email: "Email",
      signedInWith: "Logged in with",
      google: "Google",
      password: "Email and password",
      code: "Invitation code",
      memberSince: "Member since",
      version: "Version",
      versionText: `Choose the version of ${BRAND} you learn with: its language, market and currency.`,
      versionSaved: "Version updated.",
      versionError: "We couldn’t change your version just now. Please try again.",
      versionSave: "Save",
      versionSaving: "Saving…",
      deleteTitle: "Delete your account",
      deleteEmail: "Email",
      deleteFrom:
        "from the address above. We delete your account and its data within one month. See the",
      deletePrivacy: "Privacy policy",
      deleteRights: "for your other rights.",
      deleteSubject: `Delete my ${BRAND} account`,
    },
  },
};

export type Dictionary = typeof us;
