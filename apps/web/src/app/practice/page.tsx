import type { Metadata } from "next";
import { PracticeExperience } from "@/components/practice/practice-experience";
import { BRAND, SITE_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Practice an Investing Decision | ${BRAND}`,
  description:
    "Build a learning profile, make a simulated investing decision and receive a personalised educational explanation.",
  openGraph: {
    title: `Practice an Investing Decision | ${BRAND}`,
    description:
      "Make a realistic investing decision with virtual money and understand the factors behind it.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: `${SITE_URL}/practice` },
};

export default function PracticePage() {
  return <PracticeExperience />;
}
