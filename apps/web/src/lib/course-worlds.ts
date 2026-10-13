export type CourseWorld = {
  number: number;
  slug: string;
  title: string;
  description: string;
  available: boolean;
};

export const COURSE_WORLDS: CourseWorld[] = [
  {
    number: 1,
    slug: "financial-foundation",
    title: "Build your financial foundation",
    description: "Give every euro a job before you ask it to grow.",
    available: true,
  },
  {
    number: 2,
    slug: "why-invest",
    title: "Why invest?",
    description: "See how time, inflation and compounding change the picture.",
    available: false,
  },
  {
    number: 3,
    slug: "investment-world",
    title: "Meet the investment world",
    description: "Discover stocks, bonds, ETFs, crypto, cash and the accounts around them.",
    available: false,
  },
  {
    number: 4,
    slug: "risk-and-behaviour",
    title: "Risk, diversification & psychology",
    description: "Understand uncertainty, spread risk and spot emotional traps.",
    available: false,
  },
  {
    number: 5,
    slug: "etfs",
    title: "Understand ETFs",
    description: "Learn what an ETF contains and which details are worth comparing.",
    available: false,
  },
  {
    number: 6,
    slug: "first-portfolio",
    title: "Build your first portfolio",
    description: "Turn a goal, a horizon and a risk limit into a virtual portfolio.",
    available: false,
  },
  {
    number: 7,
    slug: "investing-in-france",
    title: "Investing in France",
    description: "Match French accounts and savings wrappers to their real purpose.",
    available: false,
  },
  {
    number: 8,
    slug: "how-buying-works",
    title: "How buying actually works",
    description: "Understand brokers, orders, fees and what happens after you press Buy.",
    available: false,
  },
  {
    number: 9,
    slug: "ready-to-invest",
    title: "Your first real investment",
    description: "Bring your knowledge, practice and personal plan together.",
    available: false,
  },
];

export const FOUNDATION_LESSONS = [
  {
    number: 1,
    title: "Where does your money go?",
    description: "Help Alex work out what is really left after the essentials.",
    duration: "4 min",
    href: "/practice",
  },
  {
    number: 2,
    title: "Pay yourself first",
    description: "Explore why saving first feels different from saving what is left.",
    duration: "3 min",
    href: "/dashboard/courses/financial-foundation/pay-yourself-first",
  },
  {
    number: 3,
    title: "How much should you save?",
    description: "Use common percentages as flexible reference points, not fixed rules.",
    duration: "4 min",
  },
  {
    number: 4,
    title: "Build your safety net",
    description: "See why different lives can call for different cash buffers.",
    duration: "5 min",
  },
  {
    number: 5,
    title: "Money you’ll need soon",
    description: "Separate near-term needs from money that can stay invested longer.",
    duration: "4 min",
  },
  {
    number: 6,
    title: "Debt vs investing",
    description: "Compare a certain borrowing cost with an uncertain investment return.",
    duration: "5 min",
  },
  {
    number: 7,
    title: "Cash isn’t risk-free",
    description: "Watch inflation change what the same amount of cash can buy.",
    duration: "4 min",
  },
  {
    number: 8,
    title: "Savings vs investing",
    description: "Choose between accessibility, stability and long-term growth potential.",
    duration: "5 min",
  },
] as const;
