import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { foundationLessonHref } from "@/lib/course-worlds";
import {
  completedLessonCount,
  FOUNDATION_LESSON_COUNT,
  FOUNDATION_WORLD,
  hasCompletedLesson,
  type CourseProgress,
} from "@/lib/course-progress";
import type { Dictionary } from "@/lib/dictionaries";
import type { Track } from "@/lib/tracks";

export function DashboardHome({
  progress,
  track,
  copy,
  courseCopy,
  foundationCopy,
}: {
  progress: CourseProgress;
  track: Track;
  copy: Dictionary["dashboard"]["homeScreen"];
  courseCopy: Dictionary["learning"]["courses"];
  foundationCopy: Dictionary["learning"]["courses"]["foundation"];
}) {
  const completed = Math.min(
    completedLessonCount(progress, FOUNDATION_WORLD),
    FOUNDATION_LESSON_COUNT,
  );
  const nextLesson = Array.from({ length: FOUNDATION_LESSON_COUNT }, (_, index) => index + 1).find(
    (lesson) => !hasCompletedLesson(progress, FOUNDATION_WORLD, lesson),
  );
  const complete = nextLesson === undefined;
  const lessonCopy = nextLesson ? foundationCopy.lessons[nextLesson - 1] : undefined;
  const lessonHref = nextLesson ? foundationLessonHref(nextLesson, track) : undefined;
  const courseHref = "/dashboard/courses/financial-foundation";

  return (
    <div className="mx-auto max-w-2xl">
      <header>
        <p className="text-sm font-semibold text-primary">{copy.eyebrow}</p>
        <h1
          id="home-heading"
          className="mt-1 font-display text-2xl font-extrabold text-balance sm:text-3xl"
        >
          {complete
            ? copy.completeHeading
            : completed === 0
              ? copy.startHeading
              : copy.continueHeading}
        </h1>
      </header>

      <section
        aria-labelledby="next-lesson-heading"
        className="mt-5 rounded-3xl border border-primary/25 bg-surface p-6 shadow-soft sm:p-8"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-primary">{courseCopy.worlds[0]!.title}</p>
          <span className="shrink-0 rounded-full bg-primary-soft px-3 py-1 text-sm font-bold text-primary">
            {completed}/{FOUNDATION_LESSON_COUNT}
          </span>
        </div>

        <p className="mt-5 text-sm font-bold text-primary">
          {complete ? copy.worldComplete : `${foundationCopy.lesson} ${nextLesson}`}
        </p>
        <h2
          id="next-lesson-heading"
          className="mt-1 font-display text-2xl font-extrabold leading-snug text-balance sm:text-3xl"
        >
          {complete ? foundationCopy.title : lessonCopy!.title}
        </h2>
        {!complete && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {lessonCopy!.description}
          </p>
        )}

        <div className="mt-5 border-t border-border pt-5">
          <p className="text-sm font-medium text-muted-foreground">{foundationCopy.progress}</p>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-primary-soft"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={FOUNDATION_LESSON_COUNT}
            aria-valuenow={completed}
            aria-label={courseCopy.worldProgress(completed, FOUNDATION_LESSON_COUNT)}
          >
            <span
              className="block h-full rounded-full bg-mint transition-[width] duration-500"
              style={{ width: `${(completed / FOUNDATION_LESSON_COUNT) * 100}%` }}
            />
          </div>
        </div>

        <Button asChild size="lg" className="mt-6 w-full sm:w-auto">
          <Link href={complete ? courseHref : (lessonHref ?? `${courseHref}#lesson-${nextLesson}`)}>
            {complete ? copy.review : lessonHref ? foundationCopy.start : copy.explore}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </section>

      <section aria-labelledby="course-map-heading" className="mt-4">
        <Link
          href="/dashboard/courses"
          className="flex min-h-16 items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft transition-colors hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-ring"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            <BookOpen className="size-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <h2 id="course-map-heading" className="font-semibold">
              {copy.explore}
            </h2>
            <span className="block text-sm text-muted-foreground">{courseCopy.mapLabel}</span>
          </span>
          <ChevronRight className="size-5 shrink-0 text-primary" aria-hidden />
        </Link>
      </section>
    </div>
  );
}
