"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/atoms/reveal";
import { Section } from "@/components/atoms/section";
import { SectionIntro } from "@/components/molecules/section-intro";
import { track } from "@/lib/analytics";

export function FAQSection({ faqs }: { faqs: Array<[string, string]> }) {
  return (
    <Section id="faq" className="bg-surface-2">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <SectionIntro
          label="Before you begin"
          title="Good questions deserve clear answers."
          text="Nudge is designed to help beginners build judgement, not to make investment choices for them."
        />
        <Reveal delay={100}>
          <Accordion type="single" collapsible>
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger
                  onClick={() => track("faq_opened", { question: q })}
                  className="py-5 text-left font-display text-base font-bold hover:no-underline"
                >
                  {q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
