import { Eyebrow } from "@/components/atoms/eyebrow";
import { Reveal } from "@/components/atoms/reveal";
import { Section } from "@/components/atoms/section";
import { PracticeButton } from "@/components/molecules/practice-button";

export function FinalCTA() {
  return (
    <Section className="bg-ink text-ink-foreground">
      <Reveal className="mx-auto max-w-4xl text-center">
        <Eyebrow inverse>Practice before the pressure</Eyebrow>
        <h2 className="mt-4 font-display text-4xl leading-tight font-extrabold sm:text-6xl">
          Make your first mistake with virtual money — not your savings.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-foreground/65">
          Try a realistic investing decision now. In three minutes, you will know more about how you
          think as an investor.
        </p>
        <PracticeButton className="mt-8 w-full sm:w-auto" />
      </Reveal>
    </Section>
  );
}
