import { Check, type LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Reveal } from "@/components/atoms/reveal";
import { Section } from "@/components/atoms/section";
import { PracticeButton } from "@/components/molecules/practice-button";
import { SectionIntro } from "@/components/molecules/section-intro";
import { cn } from "@/lib/utils";

type ValueProp = {
  label: string;
  title: string;
  text: string;
  points: string[];
  icon: LucideIcon;
};

// Alternating rows: the benefit on one side, a panel that sums it up on the other.
export function ValueProps({
  id,
  label,
  title,
  items,
  cta,
}: {
  id: string;
  label: string;
  title: string;
  items: ValueProp[];
  cta: string;
}) {
  return (
    <Section id={id}>
      <SectionIntro label={label} title={title} />
      <div className="mt-16 space-y-16 sm:space-y-24">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <Reveal className={cn("min-w-0", i % 2 === 1 && "lg:order-2")}>
                <Eyebrow>{item.label}</Eyebrow>
                <h3 className="mt-4 font-display text-2xl leading-tight font-extrabold sm:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
                <PracticeButton location={`v2_value_${i + 1}`} className="mt-7">
                  {cta}
                </PracticeButton>
              </Reveal>
              <Reveal
                delay={100}
                className="rounded-3xl border border-border bg-surface-2 p-7 sm:p-10"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <Icon className="size-7" aria-hidden />
                </span>
                <ul className="mt-8 space-y-3">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 font-semibold shadow-soft"
                    >
                      <Check className="size-5 shrink-0 text-market-up" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
