export type CourseWorld = {
  number: number;
  slug: string;
  available: boolean;
};

export const COURSE_WORLDS: CourseWorld[] = [
  {
    number: 1,
    slug: "financial-foundation",
    available: true,
  },
  {
    number: 2,
    slug: "why-invest",
    available: false,
  },
  {
    number: 3,
    slug: "investment-world",
    available: false,
  },
  {
    number: 4,
    slug: "risk-and-behaviour",
    available: false,
  },
  {
    number: 5,
    slug: "etfs",
    available: false,
  },
  {
    number: 6,
    slug: "first-portfolio",
    available: false,
  },
  {
    number: 7,
    slug: "investing-in-france",
    available: false,
  },
  {
    number: 8,
    slug: "how-buying-works",
    available: false,
  },
  {
    number: 9,
    slug: "ready-to-invest",
    available: false,
  },
];

export const FOUNDATION_LESSONS = [
  {
    number: 1,
    duration: "4 min",
    href: "/practice",
  },
  {
    number: 2,
    duration: "3 min",
    href: "/dashboard/courses/financial-foundation/pay-yourself-first",
  },
  {
    number: 3,
    duration: "4 min",
    href: "/dashboard/courses/financial-foundation/how-much-should-you-save",
  },
  {
    number: 4,
    duration: "5 min",
  },
  {
    number: 5,
    duration: "4 min",
  },
  {
    number: 6,
    duration: "5 min",
  },
  {
    number: 7,
    duration: "4 min",
  },
  {
    number: 8,
    duration: "5 min",
  },
] as const;
