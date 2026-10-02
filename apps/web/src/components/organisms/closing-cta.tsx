import { Eyebrow } from "@/components/atoms/eyebrow";
import { Reveal } from "@/components/atoms/reveal";
import { Section } from "@/components/atoms/section";
import { EarlyAccessForm } from "@/components/molecules/early-access-form";
import { PracticeButton } from "@/components/molecules/practice-button";

// The last push: try a decision now, or join the early access list.
export function ClosingCTA({
  label,
  title,
  text,
  primary,
  formTitle,
}: {
  label: string;
  title: string;
  text: string;
  primary: string;
  formTitle: string;
}) {
  return (
    <Section id="early-access" className="bg-ink text-ink-foreground">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <Reveal>
          <Eyebrow inverse>{label}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight font-extrabold sm:text-5xl">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-ink-foreground/65">{text}</p>
          <PracticeButton location="v2_closing" className="mt-8 w-full sm:w-auto">
            {primary}
          </PracticeButton>
        </Reveal>
        <Reveal delay={100} className="rounded-3xl bg-surface p-6 text-foreground sm:p-8">
          <h3 className="mb-5 font-display text-2xl font-extrabold">{formTitle}</h3>
          <EarlyAccessForm />
        </Reveal>
      </div>
    </Section>
  );
}
