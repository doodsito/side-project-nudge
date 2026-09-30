import { Eyebrow } from "@/components/atoms/eyebrow";
import { Reveal } from "@/components/atoms/reveal";
import { Section } from "@/components/atoms/section";
import { EarlyAccessForm } from "@/components/molecules/early-access-form";

export function EarlyAccessSection() {
  return (
    <Section id="early-access" className="bg-primary-soft">
      <Reveal className="grid items-end gap-10 lg:grid-cols-[1fr_.8fr]">
        <div>
          <Eyebrow>Nudge early access</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            Keep practising before real money is on the line.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Join the early access list to be among the first to practise new investing scenarios
            with Nudge.
          </p>
        </div>
        <EarlyAccessForm />
      </Reveal>
    </Section>
  );
}
