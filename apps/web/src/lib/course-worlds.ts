import { isLessonFourAvailable } from "@/lib/build-your-safety-net-lesson";
import { isLessonSevenAvailable } from "@/lib/cash-isnt-risk-free-lesson";
import { isLessonSixAvailable } from "@/lib/debt-vs-investing-lesson";
import { isLessonThreeAvailable } from "@/lib/how-much-should-you-save-lesson";
import { isLessonFiveAvailable } from "@/lib/money-youll-need-soon-lesson";
import type { Track } from "@/lib/tracks";

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
    duration: "6 min",
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

/** Use the same available lesson destination on Home and in the course path. */
export function foundationLessonHref(lessonNumber: number, track: Track): string | undefined {
  switch (lessonNumber) {
    case 1:
      return FOUNDATION_LESSONS[0].href;
    case 2:
      return FOUNDATION_LESSONS[1].href;
    case 3:
      return isLessonThreeAvailable(track)
        ? "/dashboard/courses/financial-foundation/how-much-should-you-save"
        : undefined;
    case 4:
      return isLessonFourAvailable(track)
        ? "/dashboard/courses/financial-foundation/build-your-safety-net"
        : undefined;
    case 5:
      return isLessonFiveAvailable(track)
        ? "/dashboard/courses/financial-foundation/money-youll-need-soon"
        : undefined;
    case 6:
      return isLessonSixAvailable(track)
        ? "/dashboard/courses/financial-foundation/debt-vs-investing"
        : undefined;
    case 7:
      return isLessonSevenAvailable(track)
        ? "/dashboard/courses/financial-foundation/cash-isnt-risk-free"
        : undefined;
    case 8:
      return isLessonSevenAvailable(track)
        ? "/dashboard/courses/financial-foundation/savings-vs-investing"
        : undefined;
    default:
      return undefined;
  }
}
