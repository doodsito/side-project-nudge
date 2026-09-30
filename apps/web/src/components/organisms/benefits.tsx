import { Reveal } from "@/components/atoms/reveal";
import { Section } from "@/components/atoms/section";
import { SectionIntro } from "@/components/molecules/section-intro";
import { cn } from "@/lib/utils";

const BENEFITS = [
  [
    "01",
    "Make mistakes while they still cost €0.",
    "Test your instincts with virtual money, see where your reasoning breaks down and learn before the consequences are real.",
  ],
  [
    "02",
    "Know what to consider before you click buy or sell.",
    "Use your goal, timeline, safety buffer and tolerance for risk to make a decision — not a headline or someone else’s hot take.",
  ],
  [
    "03",
    "See the trade-offs before they feel personal.",
    "Explore what each choice protects, what it puts at risk and what would make it more or less appropriate for you.",
  ],
  [
    "04",
    "Face your first real market drop with a plan.",
    "Build a repeatable decision process now, so a red screen later does not turn uncertainty into panic.",
  ],
];
export function Benefits() {
  return (
    <Section id="benefits">
      <SectionIntro
        label="What’s in it for you"
        title="Turn financial knowledge into decisions you can trust."
        text="Nudge closes the gap between understanding investing in theory and knowing what you would actually do."
      />
      <div className="mt-14 grid gap-x-14 md:grid-cols-2">
        {BENEFITS.map(([n, title, copy], i) => (
          <Reveal
            key={n}
            delay={(i % 2) * 80}
            className={cn("border-t border-border-strong py-9", i % 2 === 1 && "md:translate-y-16")}
          >
            <span className="font-display text-5xl font-extrabold text-primary/30">{n}</span>
            <h3 className="mt-5 max-w-md font-display text-2xl font-extrabold sm:text-3xl">
              {title}
            </h3>
            <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">{copy}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
