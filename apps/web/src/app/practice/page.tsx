import type { Metadata } from "next";
import { getVisitorTrack } from "@/lib/auth";
import { SITE_URL } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";
import { llmsTxtAlternate } from "@/lib/metadata";
import { PracticeFlow } from "./practice-flow";

export async function generateMetadata(): Promise<Metadata> {
  const copy = getDictionary(await getVisitorTrack()).learning.firstPaycheck;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    openGraph: {
      title: copy.metaTitle,
      description: copy.ogDescription,
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    alternates: { ...llmsTxtAlternate, canonical: `${SITE_URL}/practice` },
  };
}

export default function PracticePage() {
  return <PracticeFlow />;
}
