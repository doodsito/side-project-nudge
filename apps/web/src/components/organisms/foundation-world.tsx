import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3, Flag, LockKeyhole, Sparkles, Wallet } from "lucide-react";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Button } from "@/components/ui/button";
import { FOUNDATION_LESSONS } from "@/lib/course-worlds";
import { cn } from "@/lib/utils";

/** The path inside World 1. Only the first lesson is open in the MVP. */
export function FoundationWorld() {
  return (
    <>
      <Button asChild variant="ghost" className="-ml-3 min-h-11">
        <Link href="/dashboard/courses">
          <ArrowLeft aria-hidden /> All worlds
        </Link>
      </Button>

      <section className="relative mt-5 overflow-hidden rounded-4xl bg-ink p-6 text-ink-foreground shadow-lift sm:p-9 lg:p-11">
        <div
          className="absolute -top-14 -right-10 size-48 rounded-full bg-primary opacity-50 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-24 left-1/4 size-56 rounded-full bg-mint opacity-15 blur-3xl"
          aria-hidden
        />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="text-[11px] font-extrabold uppercase text-mint">
              World 1 · Money foundations
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold text-balance sm:text-5xl">
              Build your financial foundation
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-foreground/70 sm:text-lg">
              Before investing, learn what your money needs to do today, soon and much later.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-ink-foreground/10 p-4">
              <dt className="text-xs text-ink-foreground/60">Progress</dt>
              <dd className="mt-1 font-display text-xl font-extrabold">0 / 8</dd>
            </div>
            <div className="rounded-2xl bg-ink-foreground/10 p-4">
              <dt className="text-xs text-ink-foreground/60">Total time</dt>
              <dd className="mt-1 font-display text-xl font-extrabold">~35 min</dd>
            </div>
          </dl>
        </div>
        <div
          className="relative mt-8 h-2 overflow-hidden rounded-full bg-ink-foreground/10"
          aria-label="World progress: 0 of 8 lessons"
        >
          <span className="block h-full w-0 rounded-full bg-brand-lime" />
        </div>
      </section>

      <section aria-labelledby="lesson-path-heading" className="mt-10">
        <div className="max-w-2xl">
          <Eyebrow>Your path</Eyebrow>
          <h2
            id="lesson-path-heading"
            className="mt-2 font-display text-2xl font-extrabold sm:text-3xl"
          >
            Eight decisions before the market
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Start with a first paycheque. Each short lesson opens the next part of the path.
          </p>
        </div>

        <ol className="relative mt-8 grid gap-4 before:absolute before:top-10 before:bottom-20 before:left-7 before:w-px before:bg-border sm:before:left-8 lg:mx-auto lg:max-w-4xl lg:before:left-1/2 lg:before:-translate-x-1/2">
          {FOUNDATION_LESSONS.map((lesson, index) => (
            <li
              key={lesson.number}
              className={cn(
                "relative pl-16 sm:pl-20 lg:w-[calc(50%+2rem)]",
                index % 2 === 0
                  ? "lg:justify-self-start lg:pr-16 lg:pl-0"
                  : "lg:justify-self-end lg:pl-16",
              )}
            >
              <div
                className={cn(
                  "absolute top-6 left-1 z-10 grid size-12 place-items-center rounded-full border-4 border-background font-display font-extrabold sm:left-2",
                  "lg:left-auto",
                  index % 2 === 0 ? "lg:-right-6" : "lg:-left-6",
                  lesson.available
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-surface-2 text-muted-foreground",
                )}
              >
                {lesson.available ? lesson.number : <LockKeyhole className="size-4" aria-hidden />}
              </div>

              <article
                className={cn(
                  "rounded-3xl border p-5 sm:p-6",
                  lesson.available
                    ? "border-primary/30 bg-surface shadow-lift"
                    : "border-dashed border-border-strong bg-surface-2 text-muted-foreground",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p
                    className={cn(
                      "text-[11px] font-extrabold uppercase",
                      lesson.available ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    Lesson {lesson.number}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                    <Clock3 className="size-3.5" aria-hidden /> {lesson.duration}
                  </span>
                </div>
                <h3
                  className={cn(
                    "mt-3 font-display text-xl font-extrabold text-balance",
                    !lesson.available && "text-foreground/70",
                  )}
                >
                  {lesson.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {lesson.description}
                </p>
                {lesson.available && (
                  <div className="mt-5 border-t border-border pt-5">
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Sparkles className="size-3.5 text-primary" aria-hidden /> One practical
                        decision
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Wallet className="size-3.5 text-primary" aria-hidden /> Virtual money
                      </span>
                    </div>
                    <Button asChild size="lg" className="group mt-5 w-full sm:w-auto">
                      <Link href="/practice">
                        Start lesson
                        <ArrowRight
                          className="transition-transform group-hover:translate-x-1"
                          aria-hidden
                        />
                      </Link>
                    </Button>
                  </div>
                )}
              </article>
            </li>
          ))}
        </ol>

        <div className="relative mx-auto mt-5 max-w-xl rounded-4xl border border-primary/25 bg-primary-soft p-6 text-center shadow-soft sm:p-8">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Flag className="size-6" aria-hidden />
          </div>
          <p className="mt-4 text-[11px] font-extrabold uppercase text-primary">World reward</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold">Investing unlocked</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Complete all eight lessons to open the investment universe.
          </p>
        </div>
      </section>
    </>
  );
}
