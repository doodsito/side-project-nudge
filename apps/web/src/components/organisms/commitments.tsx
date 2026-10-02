import { Reveal } from "@/components/atoms/reveal";
import { Section } from "@/components/atoms/section";
import { SectionIntro } from "@/components/molecules/section-intro";

// Promises we keep, shown where a landing page would usually put testimonials.
export function Commitments({
  label,
  title,
  items,
}: {
  label: string;
  title: string;
  items: Array<[string, string]>;
}) {
  return (
    <Section>
      <SectionIntro label={label} title={title} />
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {items.map(([name, text], i) => (
          <Reveal
            as="li"
            key={name}
            delay={i * 100}
            className="rounded-3xl border border-border bg-surface p-7 shadow-soft"
          >
            <span className="font-display text-5xl font-extrabold text-primary/30">0{i + 1}</span>
            <h3 className="mt-5 font-display text-2xl font-extrabold">{name}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
