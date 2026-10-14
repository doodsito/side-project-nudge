import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries";

export function BuildYourSafetyNetIntro({ copy }: { copy: Dictionary["lesson3"]["lesson4"] }) {
  return (
    <>
      <Button asChild variant="ghost" className="-ml-3 min-h-11">
        <Link href="/dashboard/courses/financial-foundation#lesson-4">
          <ArrowLeft aria-hidden /> {copy.back}
        </Link>
      </Button>

      <section className="relative mt-5 overflow-hidden rounded-4xl border border-primary/20 bg-primary-soft p-6 shadow-lift sm:p-10 lg:p-14">
        <div
          className="absolute -top-16 -right-12 size-56 rounded-full bg-brand-lime opacity-60 blur-3xl"
          aria-hidden
        />
        <div className="relative max-w-3xl">
          <span className="grid size-20 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-soft">
            <ShieldCheck className="size-9" aria-hidden />
          </span>
          <div className="mt-8">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-balance sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {copy.intro}
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-extrabold text-foreground">
            <Check className="size-4" aria-hidden /> {copy.badge}
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-6">
            <p className="inline-flex items-center gap-2 text-sm font-extrabold text-primary">
              <Sparkles className="size-4" aria-hidden /> {copy.comingLabel}
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">{copy.comingText}</p>
          </div>

          <Button asChild size="lg" className="group mt-8">
            <Link href="/dashboard/courses/financial-foundation">
              {copy.viewProgress}
              <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
