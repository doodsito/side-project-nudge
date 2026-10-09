import Link from "next/link";
import {
  ArrowRight,
  Flag,
  Globe2,
  Landmark,
  Layers3,
  LockKeyhole,
  MousePointerClick,
  PieChart,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Button } from "@/components/ui/button";
import { COURSE_WORLDS } from "@/lib/course-worlds";
import {
  completedLessonCount,
  FOUNDATION_LESSON_COUNT,
  FOUNDATION_WORLD,
  type CourseProgress,
} from "@/lib/course-progress";

const WORLD_ICONS = [
  Wallet,
  TrendingUp,
  Globe2,
  ShieldCheck,
  Layers3,
  PieChart,
  Landmark,
  MousePointerClick,
  Flag,
] as const;

/** The signed-in learning journey: one open world, with the later worlds visible. */
export function CourseWorlds({ progress }: { progress: CourseProgress }) {
  const firstWorld = COURSE_WORLDS[0]!;
  const lockedWorlds = COURSE_WORLDS.slice(1);
  const completed = completedLessonCount(progress, FOUNDATION_WORLD);

  return (
    <>
      <section className="overflow-hidden rounded-4xl border border-border bg-ink text-ink-foreground shadow-lift">
        <div className="relative p-6 sm:p-9 lg:p-11">
          <div
            className="absolute -top-20 -right-20 size-56 rounded-full bg-primary opacity-40 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-20 left-1/3 size-48 rounded-full bg-mint opacity-15 blur-3xl"
            aria-hidden
          />
          <div className="relative max-w-3xl">
            <p className="text-[11px] font-extrabold uppercase text-mint">Your learning journey</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-balance sm:text-5xl">
              Nine worlds. One decision at a time.
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-foreground/70 sm:text-lg">
              Build the foundations, practise with virtual money and unlock the knowledge behind
              your first investment decisions.
            </p>
          </div>
          <div className="relative mt-8 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-ink-foreground/10 px-4 py-2 font-bold">
              0 of 9 worlds
            </span>
            <span className="rounded-full bg-ink-foreground/10 px-4 py-2 text-ink-foreground/70">
              World 1 is ready
            </span>
          </div>
        </div>
      </section>

      <section aria-labelledby="worlds-heading" className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Journey map</Eyebrow>
            <h2
              id="worlds-heading"
              className="mt-2 font-display text-2xl font-extrabold sm:text-3xl"
            >
              Choose your world
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Complete a world to open the next one. Locked worlds stay visible so you always know
            where the journey is heading.
          </p>
        </div>

        <article className="relative mt-6 overflow-hidden rounded-4xl border border-primary/25 bg-primary-soft p-6 shadow-soft sm:p-8">
          <div
            className="absolute -right-12 -bottom-16 size-48 rounded-full bg-brand-lime opacity-60 blur-2xl"
            aria-hidden
          />
          <div className="relative grid items-center gap-7 md:grid-cols-[auto_minmax(0,1fr)_auto]">
            <div className="grid size-20 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-soft sm:size-24">
              <Wallet className="size-9 sm:size-11" aria-hidden />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-extrabold uppercase text-primary-foreground">
                  World {firstWorld.number}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[10px] font-extrabold uppercase text-market-up">
                  <Sparkles className="size-3" aria-hidden /> Ready to explore
                </span>
              </div>
              <h3 className="mt-4 max-w-xl font-display text-2xl font-extrabold text-balance sm:text-3xl">
                {firstWorld.title}
              </h3>
              <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                {firstWorld.description}
              </p>
              <p className="mt-4 text-sm font-bold">
                {completed} of {FOUNDATION_LESSON_COUNT} lessons complete · About 35 minutes
              </p>
              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-primary/10"
                aria-label={`World 1 progress: ${completed} of ${FOUNDATION_LESSON_COUNT} lessons`}
              >
                <span
                  className="block h-full rounded-full bg-primary transition-[width] duration-500"
                  style={{ width: `${(completed / FOUNDATION_LESSON_COUNT) * 100}%` }}
                />
              </div>
            </div>
            <Button asChild size="lg" className="group w-full md:w-auto">
              <Link href={`/dashboard/courses/${firstWorld.slug}`}>
                Enter world
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Button>
          </div>
        </article>

        <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lockedWorlds.map((world) => {
            const Icon = WORLD_ICONS[world.number - 1] ?? LockKeyhole;
            return (
              <li key={world.slug}>
                <article
                  aria-label={`World ${world.number}: ${world.title}. Locked.`}
                  className="flex h-full min-h-64 flex-col rounded-3xl border border-dashed border-border-strong bg-surface-2 p-5 text-muted-foreground"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid size-12 place-items-center rounded-2xl border border-border bg-surface">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-extrabold uppercase">
                      <LockKeyhole className="size-3" aria-hidden /> Locked
                    </span>
                  </div>
                  <p className="mt-6 text-[11px] font-extrabold uppercase">World {world.number}</p>
                  <h3 className="mt-2 font-display text-xl font-extrabold text-foreground/70 text-balance">
                    {world.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed">{world.description}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
