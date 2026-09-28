import { createFileRoute } from "@tanstack/react-router";
import { PracticeExperience } from "@/components/practice/practice-experience";
import { BRAND } from "@/lib/brand";
export const Route = createFileRoute("/practice")({
  head: () => ({ meta: [
    { title: `Practice an Investing Decision | ${BRAND}` },
    { name: "description", content: "Build a learning profile, make a simulated investing decision and receive a personalised educational explanation." },
    { property: "og:title", content: `Practice an Investing Decision | ${BRAND}` },
    { property: "og:description", content: "Make a realistic investing decision with virtual money and understand the factors behind it." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://practice-first.lovable.app/practice" }] }),
  component: PracticeExperience,
});
