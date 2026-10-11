import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EarlyAccessSection } from "@/components/marketing/early-access-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { MiniChallenge } from "@/components/marketing/mini-challenge";
import { MarketingTemplate } from "@/components/layout/marketing-template";
import { BRAND, SITE_URL } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";
import { llmsTxtAlternate } from "@/lib/metadata";
import { isTrack, TRACK_INFO, TRACKS } from "@/lib/tracks";

export async function generateMetadata({ params }: PageProps<"/[track]">): Promise<Metadata> {
  const { track } = await params;
  if (!isTrack(track)) return {};
  const t = getDictionary(track).meta;
  return {
    title: `${t.title} | ${BRAND}`,
    description: t.description,
    openGraph: {
      title: `${t.ogTitle} | ${BRAND}`,
      description: t.ogDescription,
      type: "website",
      locale: TRACK_INFO[track].lang.replace("-", "_"),
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      ...llmsTxtAlternate,
      canonical: `${SITE_URL}/${track}`,
      languages: {
        ...Object.fromEntries(
          TRACKS.map((other) => [TRACK_INFO[other].lang, `${SITE_URL}/${other}`]),
        ),
        "x-default": `${SITE_URL}/`,
      },
    },
  };
}

export default async function HomePage({ params }: PageProps<"/[track]">) {
  const { track } = await params;
  if (!isTrack(track)) notFound();
  const t = getDictionary(track);
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: TRACK_INFO[track].lang,
    mainEntity: t.faq.items.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
  return (
    <>
      <MarketingTemplate track={track} t={t}>
        <HeroSection t={t.hero} window={t.heroWindow} />
        <MiniChallenge t={t.challenge} />
        <HowItWorks t={t.how} />
        <FAQSection t={t.faq} />
        <EarlyAccessSection t={t.earlyAccess} />
      </MarketingTemplate>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
