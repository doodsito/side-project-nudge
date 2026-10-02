import type { Metadata } from "next";
import { BRAND, SITE_URL } from "@/lib/brand";
import { PracticeFlow } from "./practice-flow";

export const metadata: Metadata = {
  title: `Practise a First Money Decision | ${BRAND}`,
  description:
    "Make a simulated first saving or investing decision, compare the trade-offs and check what you learned. No account required.",
  openGraph: {
    title: `Practise a First Money Decision | ${BRAND}`,
    description: "Help Alex weigh accessible savings and a first investment in one fictional case.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: `${SITE_URL}/practice` },
};

export default function PracticePage() {
  return <PracticeFlow />;
}
