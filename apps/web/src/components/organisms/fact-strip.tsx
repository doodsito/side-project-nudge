import { Reveal } from "@/components/atoms/reveal";

// A row of short, verifiable facts. Never put an invented number here (AGENTS.md).
export function FactStrip({ facts }: { facts: Array<[string, string]> }) {
  return (
    <section className="border-y border-border bg-surface px-5 py-10 sm:px-8">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
        {facts.map(([value, label], i) => (
          <Reveal as="li" key={label} delay={i * 80} className="text-center">
            <span className="block font-display text-3xl font-extrabold text-primary sm:text-4xl">
              {value}
            </span>
            <span className="mt-1 block text-sm font-semibold text-muted-foreground">{label}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
