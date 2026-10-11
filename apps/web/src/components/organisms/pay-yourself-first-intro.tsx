import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, PiggyBank, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Button } from "@/components/ui/button";

/** A clear hand-off into the next lesson while its interactive content is being designed. */
export function PayYourselfFirstIntro() {
  return (
    <>
      <Button asChild variant="ghost" className="-ml-3 min-h-11">
        <Link href="/dashboard/courses/financial-foundation#lesson-2">
          <ArrowLeft aria-hidden /> World 1
        </Link>
      </Button>

      <section className="relative mt-5 overflow-hidden rounded-4xl border border-primary/20 bg-primary-soft p-6 shadow-lift sm:p-10 lg:p-14">
        <div
          className="absolute -top-16 -right-12 size-56 rounded-full bg-brand-lime opacity-60 blur-3xl"
          aria-hidden
        />
        <div className="relative max-w-3xl">
          <span className="grid size-20 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-soft">
            <PiggyBank className="size-9" aria-hidden />
          </span>
          <div className="mt-8">
            <Eyebrow>World 1 · Lesson 2</Eyebrow>
          </div>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-balance sm:text-5xl">
            Pay yourself first
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            You completed your first lesson. Now explore why putting money aside before spending can
            make saving easier and more consistent.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-extrabold text-foreground">
            <Check className="size-4" aria-hidden /> Lesson 2 unlocked
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-6">
            <p className="inline-flex items-center gap-2 text-sm font-extrabold text-primary">
              <Sparkles className="size-4" aria-hidden /> Coming next
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              The complete interactive lesson will be built next. Your progress is already saved to
              your account, so you can safely leave and come back.
            </p>
          </div>

          <Button asChild size="lg" className="group mt-8">
            <Link href="/dashboard/courses/financial-foundation">
              View your progress
              <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
