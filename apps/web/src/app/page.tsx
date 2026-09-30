import type { Metadata } from "next";
import { EarlyAccessSection } from "@/components/organisms/early-access-section";
import { FAQSection } from "@/components/organisms/faq-section";
import { HeroSection } from "@/components/organisms/hero-section";
import { HowItWorks } from "@/components/organisms/how-it-works";
import { MiniChallenge } from "@/components/organisms/mini-challenge";
import { MarketingTemplate } from "@/components/templates/marketing-template";
import { BRAND, SITE_URL } from "@/lib/brand";

// Lives here rather than in faq-section.tsx: the FAQ structured data below is
// built on the server, which cannot read values from a "use client" file.
const FAQS: Array<[string, string]> = [
  [
    "Do I need investing experience?",
    "No. Nudge starts with the decisions first-time investors face and explains the concepts as they become useful.",
  ],
  [
    "Will I use real money?",
    "No. Nudge uses simulated portfolios and virtual money for educational practice.",
  ],
  [
    "Does Nudge tell me what to buy?",
    "No. Nudge helps you understand the reasoning behind investment decisions rather than recommending specific financial products.",
  ],
  [
    "How is this different from a finance video?",
    "Videos explain concepts. Nudge asks you to make the decision first, then teaches the concepts through the consequences and reasoning behind that choice.",
  ],
  [
    "Is this financial advice?",
    "No. Nudge is designed for educational purposes and simulated practice. It does not provide personalised investment recommendations.",
  ],
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

export const metadata: Metadata = {
  title: `Practise Investing Decisions | ${BRAND}`,
  description:
    "Practise realistic investing decisions with virtual money and understand the reasoning before your savings are on the line.",
  openGraph: {
    title: `Practise investing before real money is on the line | ${BRAND}`,
    description:
      "Build an investing decision process through realistic simulations, virtual money and personalised educational feedback.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: `${SITE_URL}/` },
};

export default function HomePage() {
  return (
    <>
      <MarketingTemplate>
        <HeroSection />
        <MiniChallenge />
        <HowItWorks />
        <FAQSection faqs={FAQS} />
        <EarlyAccessSection />
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
