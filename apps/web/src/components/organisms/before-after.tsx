import { ArrowDown, ArrowRight, Check, X } from "lucide-react";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Reveal } from "@/components/atoms/reveal";
import { Section } from "@/components/atoms/section";
import { SectionIntro } from "@/components/molecules/section-intro";

export function BeforeAfter() {
  const before = [
    "You know the definitions but freeze when you have to act.",
    "You borrow someone else’s conviction without understanding their situation.",
    "You delay starting because every mistake feels too expensive.",
  ];
  const after = [
    "You know which facts matter before making a choice.",
    "You can explain the trade-offs in your own words.",
    "You recognise when to act, when to wait and what to review.",
  ];
  return (
    <Section>
      <SectionIntro
        label="The change that matters"
        title="Don’t make your first decision with real money."
      />
      <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Reveal className="rounded-3xl border border-border bg-surface-2 p-7 sm:p-9">
          <Eyebrow>Before Nudge</Eyebrow>
          <h3 className="mt-4 font-display text-3xl font-extrabold">
            More content. Same hesitation.
          </h3>
          <ul className="mt-7 space-y-5">
            {before.map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <X className="mt-0.5 size-5 shrink-0 text-market-down" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="grid place-items-center">
          <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
            <ArrowRight className="hidden size-4 lg:block" />
            <ArrowDown className="size-4 lg:hidden" />
          </span>
        </div>
        <Reveal delay={100} className="rounded-3xl border border-mint/40 bg-mint-soft p-7 sm:p-9">
          <Eyebrow>After practising</Eyebrow>
          <h3 className="mt-4 font-display text-3xl font-extrabold">A process you can repeat.</h3>
          <ul className="mt-7 space-y-5">
            {after.map((item) => (
              <li key={item} className="flex gap-3 font-semibold">
                <Check className="mt-0.5 size-5 shrink-0 text-market-up" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
