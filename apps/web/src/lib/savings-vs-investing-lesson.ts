import type { Track } from "@/lib/tracks";

export const SAVINGS_VS_INVESTING_STEPS = [
  "welcome",
  "difference",
  "same-amount",
  "alex",
  "near-term",
  "long-term",
  "reflection",
  "complete",
] as const;

export type SavingsVsInvestingStep = (typeof SAVINGS_VS_INVESTING_STEPS)[number];
export type SavingsVsInvestingQuestion = Extract<
  SavingsVsInvestingStep,
  "same-amount" | "near-term" | "long-term" | "reflection"
>;

export const EXAMPLE_AMOUNT = 500;

export const SAVINGS_VS_INVESTING_OPTIONS = {
  "same-amount": [
    { value: "amount", correct: false },
    { value: "time-and-access", correct: true },
    { value: "always-invest", correct: false },
  ],
  "near-term": [
    { value: "available", correct: true },
    { value: "invest", correct: false },
    { value: "use-buffer", correct: false },
  ],
  "long-term": [
    { value: "compare", correct: true },
    { value: "guaranteed-growth", correct: false },
    { value: "no-risk", correct: false },
  ],
  reflection: [
    { value: "ten-years-or-more", correct: null },
    { value: "one-to-ten-years", correct: null },
    { value: "within-a-year", correct: null },
    { value: "unsure", correct: null },
  ],
} as const;

export function isLessonEightAvailable(track: Track) {
  return track === "fr" || track === "us";
}
