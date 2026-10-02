import { Check } from "lucide-react";
import { Reveal } from "@/components/atoms/reveal";
import { Section } from "@/components/atoms/section";
import { SectionIntro } from "@/components/molecules/section-intro";

// Problem, agitate, solve: the visitor's hesitation, why it lasts, and the way out.
export function PainSection({
  label,
  title,
  greeting,
  questions,
  problem,
  agitate,
  solveTitle,
  solve,
}: {
  label: string;
  title: string;
  greeting: string;
  questions: string[];
  problem: string[];
  agitate: string[];
  solveTitle: string;
  solve: string;
}) {
  return (
    <Section id="why-now" className="border-b border-border bg-surface-2">
      <SectionIntro label={label} title={title} />
      <div className="mt-16 grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <Reveal>
          <p className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
            {greeting}
          </p>
        </Reveal>
        <ul className="space-y-5">
          {questions.map((item, i) => (
            <Reveal
              as="li"
              key={item}
              delay={i * 90}
              className="flex gap-4 border-b border-border pb-5 text-lg font-semibold"
            >
              <Check className="mt-1 size-5 shrink-0 text-market-up" aria-hidden />
              {item}
            </Reveal>
          ))}
        </ul>
      </div>
      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <Reveal className="space-y-4 font-display text-2xl leading-snug font-bold sm:text-3xl">
          {problem.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </Reveal>
        <Reveal delay={120} className="space-y-4 text-lg leading-relaxed text-muted-foreground">
          {agitate.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </Reveal>
      </div>
      <Reveal className="mt-16 rounded-3xl bg-ink px-6 py-10 text-center text-ink-foreground sm:px-12 sm:py-14">
        <p className="mx-auto max-w-4xl font-display text-3xl font-extrabold sm:text-5xl">
          {solveTitle}
        </p>
        <p className="mt-4 text-lg text-ink-foreground/70">{solve}</p>
      </Reveal>
    </Section>
  );
}
