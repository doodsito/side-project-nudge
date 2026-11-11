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
      className="mb-3 flex flex-row items-center gap-2 rounded-2xl border-2 border-border bg-surface p-2.5 shadow-[0_3px_0_var(--nudge-learn-neutral-200)] sm:mb-6 sm:gap-4 sm:rounded-3xl sm:p-5 sm:shadow-[0_4px_0_var(--nudge-learn-neutral-200)]"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
        <Image
          src="/brand/mascot/nudge-encourage.webp"
          alt=""
          width={1305}
          height={1205}
          sizes="(max-width: 639px) 32px, 72px"
          className="w-8 shrink-0 sm:w-[4.5rem]"
        />
        <div className="min-w-0">
          <h2
            id="beta-survey-cta-heading"
            className="font-display text-[13px] leading-tight font-extrabold sm:text-xl"
          >
            {t.title}
          </h2>
          <p className="mt-1 hidden text-sm leading-relaxed text-muted-foreground sm:block">
            {t.text}
          </p>
        </div>
      </div>
      <Button
        asChild
        size="sm"
        className="h-8 shrink-0 rounded-lg bg-mint px-2.5 font-display text-xs font-extrabold text-ink shadow-[0_2px_0_var(--nudge-learn-teal-500)] hover:bg-mint/90 active:translate-y-1 active:shadow-none sm:h-12 sm:rounded-2xl sm:px-6 sm:text-base sm:shadow-[0_3px_0_var(--nudge-learn-teal-500)]"
      >
        <Link href="/beta-survey">
          {t.button} <ArrowRight aria-hidden />
        </Link>
      </Button>
    </section>
  );
}
