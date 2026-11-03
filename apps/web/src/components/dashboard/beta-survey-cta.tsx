import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries";

/** The dashboard's call to answer the beta survey, shown until the member has answered. */
export function BetaSurveyCta({ t }: { t: Dictionary["betaSurvey"]["cta"] }) {
  return (
    <section
      aria-labelledby="beta-survey-cta-heading"
      className="mb-6 flex flex-col gap-4 rounded-3xl border-2 border-border bg-surface p-5 shadow-[0_4px_0_var(--nudge-learn-neutral-200)] sm:flex-row sm:items-center"
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Image
          src="/brand/mascot/nudge-encourage.webp"
          alt=""
          width={1305}
          height={1205}
          sizes="72px"
          className="w-16 shrink-0 sm:w-[4.5rem]"
        />
        <div className="min-w-0">
          <h2 id="beta-survey-cta-heading" className="font-display text-xl font-extrabold">
            {t.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
        </div>
      </div>
      <Button
        asChild
        size="xl"
        className="rounded-2xl bg-mint font-display font-extrabold text-ink shadow-[0_4px_0_var(--nudge-learn-teal-500)] hover:bg-mint/90 active:translate-y-1 active:shadow-none"
      >
        <Link href="/beta-survey">
          {t.button} <ArrowRight aria-hidden />
        </Link>
      </Button>
    </section>
  );
}
