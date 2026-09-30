import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/atoms/reveal";
import { Section } from "@/components/atoms/section";
import { PracticeButton } from "@/components/molecules/practice-button";
import { SectionIntro } from "@/components/molecules/section-intro";

const STEPS = [
  [
    "01",
    "Meet a fictional situation.",
    "Alex planned a contribution. Markets have fallen. Explore what changes and what does not.",
  ],
  [
    "02",
    "Choose with virtual money.",
    "Choose an action in the case. The amounts are fictional and no transaction takes place.",
  ],
  [
    "03",
    "Explain your reasoning.",
    "Compare the trade-offs, see how your answers shape the explanation and check your understanding.",
  ],
];
export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-ink text-ink-foreground">
      <SectionIntro inverse label="How Nudge works" title="Choose. Understand. Try again." />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {STEPS.map(([n, title, copy], i) => (
          <Reveal
            key={n}
            delay={i * 100}
            className="relative border-t border-ink-foreground/20 py-7 md:pr-8"
          >
            <span className="text-xs font-bold text-mint">STEP {n}</span>
            <h3 className="mt-7 font-display text-2xl font-extrabold">{title}</h3>
            <p className="mt-3 leading-relaxed text-ink-foreground/65">{copy}</p>
            {i < 2 && (
              <ArrowRight className="absolute top-7 right-3 hidden size-5 text-mint md:block" />
            )}
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10">
        <PracticeButton location="how_it_works" />
      </Reveal>
    </Section>
  );
}
