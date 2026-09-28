import { createFileRoute } from "@tanstack/react-router";
import { BeforeAfter, Benefits, EarlyAccessSection, FAQS, FAQSection, FinalCTA, Footer, HeroSection, HowItWorks, MiniChallenge, Navbar, ProblemStory } from "@/components/landing/home-sections";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: `Practise Investing Decisions | ${BRAND}` },
    { name: "description", content: "Practise realistic investing decisions with virtual money and understand the reasoning before your savings are on the line." },
    { property: "og:title", content: `Practise investing before real money is on the line | ${BRAND}` },
    { property: "og:description", content: "Build an investing decision process through realistic simulations, virtual money and personalised educational feedback." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://practice-first.lovable.app/" }], scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }) }] }),
  component: Homepage,
});
function Homepage() { return <><Navbar /><main><HeroSection /><ProblemStory /><Benefits /><HowItWorks /><MiniChallenge /><BeforeAfter /><FAQSection /><FinalCTA /><EarlyAccessSection /></main><Footer /></>; }
