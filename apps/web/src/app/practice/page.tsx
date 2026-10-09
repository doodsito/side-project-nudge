import type { Metadata } from "next";
import { BRAND, SITE_URL } from "@/lib/brand";
import { llmsTxtAlternate } from "@/lib/metadata";
import { PracticeFlow } from "./practice-flow";

export const metadata: Metadata = {
  title: `Your First Paycheque | ${BRAND}`,
  description:
    "Help Alex understand a first paycheque and learn how to identify potential saving capacity. No account required.",
  openGraph: {
    title: `Your First Paycheque | ${BRAND}`,
    description: "A short interactive lesson about what remains after a month of spending.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { ...llmsTxtAlternate, canonical: `${SITE_URL}/practice` },
};

export default function PracticePage() {
  return <PracticeFlow />;
}
