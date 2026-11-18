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
import { cn } from "@/lib/utils";

export function FAQSection({
  t,
  className,
  layout = "split",
}: {
  t: Dictionary["faq"];
  className?: string;
  layout?: "split" | "centered";
}) {
  return (
    <Section id="faq" className={cn("bg-surface-2", className)}>
      <div
        className={cn(
          layout === "centered" ? "mx-auto max-w-4xl" : "grid gap-10 lg:grid-cols-[.8fr_1.2fr]",
        )}
      >
        {layout === "centered" ? (
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl">
              {t.title}
            </h2>
            {t.text && (
              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-xl">
                {t.text}
              </p>
            )}
          </Reveal>
        ) : (
          <SectionIntro label={t.label} title={t.title} text={t.text} />
        )}
        <Reveal delay={100} className={cn(layout === "centered" && "mt-12 sm:mt-16")}>
          <Accordion type="single" collapsible>
            {t.items.map(([q, a]) => (
              <AccordionItem key={q} value={q} className="border-border">
                <AccordionTrigger
                  onClick={() => track("faq_opened", { question: q })}
                  icon={layout === "centered" ? "plus" : "chevron"}
                  className={cn(
                    "py-5 text-left font-display text-base font-bold hover:no-underline",
                    layout === "centered" && "text-lg font-semibold sm:text-xl",
                  )}
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
