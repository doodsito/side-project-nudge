import type { Metadata } from "next";
import { BookOpen, Lightbulb, ShieldCheck, Wallet } from "lucide-react";
import { HeroProductWindow } from "@/components/molecules/hero-product-window";
import { BeforeAfter } from "@/components/organisms/before-after";
import { ClosingCTA } from "@/components/organisms/closing-cta";
import { Commitments } from "@/components/organisms/commitments";
import { ComparisonTable } from "@/components/organisms/comparison-table";
import { FactStrip } from "@/components/organisms/fact-strip";
import { FAQSection } from "@/components/organisms/faq-section";
import { HowItWorks } from "@/components/organisms/how-it-works";
import { LandingHero } from "@/components/organisms/landing-hero";
import { PainSection } from "@/components/organisms/pain-section";
import { ValueProps } from "@/components/organisms/value-props";
import { MarketingTemplate } from "@/components/templates/marketing-template";
import { BRAND } from "@/lib/brand";
import { LANDING_V2 } from "@/lib/landing-v2-copy";

// An alternative homepage, compared with / before deciding which one to keep.
export const metadata: Metadata = {
  title: `${BRAND} — Invest your first euro with confidence`,
  description:
    "Practise investing decisions with virtual money and understand the reasoning behind every trade-off before your own money is on the line.",
  robots: { index: false, follow: false },
};

const ICONS = { wallet: Wallet, book: BookOpen, idea: Lightbulb, shield: ShieldCheck };

export default function LandingV2Page() {
  const { hero, pain, steps, valueProps, comparison, commitments, closing } = LANDING_V2;
  return (
    <MarketingTemplate navItems={LANDING_V2.nav} navCtaHref="#early-access">
      <LandingHero {...hero} secondaryHref="#early-access" visual={<HeroProductWindow />} />
      <FactStrip facts={LANDING_V2.facts} />
      <PainSection {...pain} />
      <BeforeAfter />
      <HowItWorks label={steps.label} title={steps.title} />
      <ValueProps
        id="why-nudge"
        label={valueProps.label}
        title={valueProps.title}
        items={valueProps.items.map((item) => ({ ...item, icon: ICONS[item.icon] }))}
        cta={hero.primary}
      />
      <ComparisonTable {...comparison} />
      <Commitments {...commitments} />
      <FAQSection faqs={LANDING_V2.faqs} />
      <ClosingCTA {...closing} />
    </MarketingTemplate>
  );
}
