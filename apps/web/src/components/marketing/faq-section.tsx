"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/marketing/reveal";
import { Section } from "@/components/marketing/section";
import { SectionIntro } from "@/components/marketing/section-intro";
import { track } from "@/lib/analytics";
import type { Dictionary } from "@/lib/dictionaries";

export function FAQSection({ t }: { t: Dictionary["faq"] }) {
  return (
    <Section id="faq" className="bg-surface-2">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <SectionIntro label={t.label} title={t.title} text={t.text} />
        <Reveal delay={100}>
          <Accordion type="single" collapsible>
            {t.items.map(([q, a]) => (
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
