import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { Section } from "@/components/marketing/section";
import { PracticeButton } from "@/components/marketing/practice-button";
import { SectionIntro } from "@/components/marketing/section-intro";
import type { Dictionary } from "@/lib/dictionaries";

export function HowItWorks({ t }: { t: Dictionary["how"] }) {
  return (
    <Section id="how-it-works" className="bg-ink text-ink-foreground">
      <SectionIntro inverse label={t.label} title={t.title} />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {t.steps.map(([n, title, copy], i) => (
          <Reveal
            key={n}
            delay={i * 100}
            className="relative border-t border-ink-foreground/20 py-7 md:pr-8"
          >
            <span className="text-xs font-bold text-mint">
              {t.step} {n}
            </span>
            <h3 className="mt-7 font-display text-2xl font-extrabold">{title}</h3>
            <p className="mt-3 leading-relaxed text-ink-foreground/65">{copy}</p>
            {i < 2 && (
              <ArrowRight className="absolute top-7 right-3 hidden size-5 text-mint md:block" />
            )}
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10">
        <PracticeButton location="how_it_works">{t.cta}</PracticeButton>
      </Reveal>
    </Section>
  );
}
