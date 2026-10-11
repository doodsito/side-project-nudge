import { Eyebrow } from "@/components/shared/eyebrow";
import { Reveal } from "@/components/marketing/reveal";
import { Section } from "@/components/marketing/section";
import { EarlyAccessForm } from "@/components/marketing/early-access-form";
import type { Dictionary } from "@/lib/dictionaries";

export function EarlyAccessSection({ t }: { t: Dictionary["earlyAccess"] }) {
  return (
    <Section id="early-access" className="bg-primary-soft">
      <Reveal className="grid items-end gap-10 lg:grid-cols-[1fr_.8fr]">
        <div>
          <Eyebrow>{t.label}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">{t.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t.text}</p>
        </div>
        <EarlyAccessForm t={t} />
      </Reveal>
    </Section>
  );
}
