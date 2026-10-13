import type { Metadata } from "next";
import { BRAND, SITE_URL } from "@/lib/brand";
import { llmsTxtAlternate } from "@/lib/metadata";
import { PracticeFlow } from "./practice-flow";

export const metadata: Metadata = {
  title: `Your First Paycheck | ${BRAND}`,
  description:
    "Help Alex see where a first paycheck goes and what money is left to save. No account required.",
  openGraph: {
    title: `Your First Paycheck | ${BRAND}`,
    description: "A short beginner lesson about what is left after a month of spending.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { ...llmsTxtAlternate, canonical: `${SITE_URL}/practice` },
};

export default function PracticePage() {
  return <PracticeFlow />;
}
