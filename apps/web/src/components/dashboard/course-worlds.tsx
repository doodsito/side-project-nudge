import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COURSE_WORLDS, foundationLessonHref } from "@/lib/course-worlds";
import {
  completedLessonCount,
  FOUNDATION_LESSON_COUNT,
  FOUNDATION_WORLD,
  hasCompletedLesson,
  INTRO_WORLD,
  type CourseProgress,
} from "@/lib/course-progress";
import type { Dictionary } from "@/lib/dictionaries";
import type { Track } from "@/lib/tracks";

/** The member's course map, using the same lesson destinations as Home and World 1. */
export function CourseWorlds({
  progress,
  copy,
  track,
}: {
  progress: CourseProgress;
  copy: Dictionary["learning"]["courses"];
  track: Track;
}) {
  const activeWorld = COURSE_WORLDS[1]!;
  const introComplete = hasCompletedLesson(progress, INTRO_WORLD, 1);
  const completed = Math.min(
    completedLessonCount(progress, FOUNDATION_WORLD),
    FOUNDATION_LESSON_COUNT,
  );
  const nextLesson = Array.from({ length: FOUNDATION_LESSON_COUNT }, (_, index) => index + 1).find(
    (number) => !hasCompletedLesson(progress, FOUNDATION_WORLD, number),
  );
  const lessonHref = nextLesson ? foundationLessonHref(nextLesson, track) : undefined;
  const worldHref = `/dashboard/courses/${activeWorld.slug}`;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{copy.yourCourses}</h1>

      <section
        aria-labelledby="intro-world-heading"
        className="mt-5 rounded-3xl border border-primary/25 bg-primary-soft p-5 shadow-soft sm:p-8"
      >
        <div className="flex items-center justify-between gap-3 text-sm font-semibold text-primary">
          <span>{copy.intro.label}</span>
          <span>{introComplete ? copy.intro.completed : copy.intro.duration}</span>
        </div>
        <h2
          id="intro-world-heading"
          className="mt-3 font-display text-xl font-extrabold text-balance sm:text-2xl"
        >
          {copy.intro.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {copy.intro.description}
        </p>
        <div
          className="mt-5 h-2 overflow-hidden rounded-full bg-surface"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={introComplete ? 1 : 0}
          aria-label={copy.intro.progressLabel(introComplete ? 1 : 0)}
        >
          <span
            className="block h-full rounded-full bg-mint"
            style={{ width: introComplete ? "100%" : "0%" }}
          />
        </div>
        <Button asChild size="lg" className="mt-5 w-full sm:w-auto">
          <Link href="/lessons/why-invest">
            {introComplete ? copy.intro.review : copy.intro.start} <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </section>

      <section
        aria-labelledby="active-world-heading"
        className="mt-4 rounded-3xl border border-primary/25 bg-surface p-5 shadow-soft sm:p-8"
      >
        <div className="flex items-center justify-between gap-3 text-sm font-semibold text-primary">
          <span>{`${copy.world} ${activeWorld.number}`}</span>
          <span className="rounded-full bg-primary-soft px-3 py-1">
            {completed}/{FOUNDATION_LESSON_COUNT}
          </span>
        </div>
        <h2
          id="active-world-heading"
          className="mt-3 font-display text-xl font-extrabold text-balance sm:text-2xl"
        >
          {copy.worlds[0]!.title}
        </h2>
        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-primary-soft"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={FOUNDATION_LESSON_COUNT}
          aria-valuenow={completed}
          aria-label={copy.worldProgress(completed, FOUNDATION_LESSON_COUNT)}
        >
          <span
            className="block h-full rounded-full bg-mint"
            style={{ width: `${(completed / FOUNDATION_LESSON_COUNT) * 100}%` }}
          />
        </div>

        <div className="mt-5 border-t border-border pt-5">
          {nextLesson ? (
            <>
              <p className="text-sm font-semibold text-muted-foreground">{copy.nextLesson}</p>
              <h3 className="mt-1 font-display text-lg font-bold text-balance">
                {copy.foundation.lessons[nextLesson - 1]!.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {copy.foundation.lesson} {nextLesson}
              </p>
              {lessonHref && (
                <Button asChild size="lg" className="mt-5 w-full sm:w-auto">
                  <Link href={lessonHref}>
                    {copy.foundation.start} <ArrowRight aria-hidden />
                  </Link>
                </Button>
              )}
            </>
          ) : (
            <p className="text-sm font-semibold text-primary">{copy.foundation.completed}</p>
          )}
          <Link
            href={worldHref}
            className="mt-4 block w-fit min-h-11 content-center font-semibold text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            {copy.viewAllLessons}
          </Link>
        </div>
      </section>

      <section aria-labelledby="course-roadmap-heading" className="mt-8">
        <h2 id="course-roadmap-heading" className="font-display text-lg font-bold">
          {copy.roadmap}
        </h2>
        <ol className="mt-4 border-l-2 border-border pl-5">
          {COURSE_WORLDS.slice(2).map((world) => {
            const worldCopy = copy.worlds[world.number - 1]!;
            return (
              <li key={world.slug} className="relative pb-3 last:pb-0">
                <span
                  className="absolute top-5 -left-[1.875rem] size-4 rounded-full border-2 border-border-strong bg-background"
                  aria-hidden
                />
                <article
                  aria-label={`${copy.world} ${world.number}: ${worldCopy.title}. ${copy.locked}.`}
                  className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-border bg-surface-2 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground">
                      {copy.world} {world.number}
                    </p>
                    <h3 className="font-semibold text-foreground/80 text-balance">
                      {worldCopy.title}
                    </h3>
                  </div>
                  <LockKeyhole className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                </article>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
