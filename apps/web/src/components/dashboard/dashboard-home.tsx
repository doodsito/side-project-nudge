import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WorldOnePath } from "@/components/dashboard/world-one-path";
import { FOUNDATION_LESSONS, foundationLessonHref } from "@/lib/course-worlds";
import {
  completedLessonCount,
  FOUNDATION_WORLD,
  hasCompletedLesson,
  INTRO_WORLD,
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
  const lessonCount = FOUNDATION_LESSONS.length;
  const completed = Math.min(completedLessonCount(progress, FOUNDATION_WORLD), lessonCount);
  const introComplete = hasCompletedLesson(progress, INTRO_WORLD, 1);
  const introCurrent = !introComplete && completed === 0;
  const nextLesson = FOUNDATION_LESSONS.find(
    ({ number }) => !hasCompletedLesson(progress, FOUNDATION_WORLD, number),
  )?.number;
  const progressSteps = completed + (introComplete ? 1 : 0);
  const progressTotal = lessonCount + 1;
  const progressLabel = copy.pathProgressLabel(progressSteps, progressTotal);

  const introNode = {
    worldNumber: 0,
    lessonNumber: 1,
    markerNumber: 0,
    title: courseCopy.intro.title,
    description: courseCopy.intro.description,
    notions: courseCopy.intro.notions,
    duration: courseCopy.intro.duration,
    state: introComplete
      ? ("completed" as const)
      : introCurrent
        ? ("current" as const)
        : ("available" as const),
    status: introComplete
      ? courseCopy.intro.completed
      : introCurrent
        ? copy.currentLesson
        : copy.availableLesson,
    sectionLabel: courseCopy.intro.label,
    nodeLabel: `${courseCopy.intro.label}: ${courseCopy.intro.title}`,
    startLabel: courseCopy.intro.start,
    reviewLabel: courseCopy.intro.review,
    lockedExplanation: "",
    href: "/lessons/why-invest",
    id: "world-0-intro",
  };

  const worldOneNodes = FOUNDATION_LESSONS.map((lesson, index) => {
    const done = hasCompletedLesson(progress, FOUNDATION_WORLD, lesson.number);
    const href = foundationLessonHref(lesson.number, track);
    const isNext = !introCurrent && !done && lesson.number === nextLesson && Boolean(href);
    const isAvailable = introCurrent && !done && lesson.number === 1 && Boolean(href);
    const lessonCopy = foundationCopy.lessons[index]!;
    const state = done
      ? ("completed" as const)
      : isNext
        ? ("current" as const)
        : isAvailable
          ? ("available" as const)
          : ("locked" as const);
    const status = done
      ? foundationCopy.completed
      : state === "current"
        ? copy.currentLesson
        : state === "available"
          ? copy.availableLesson
          : courseCopy.locked;

    return {
      worldNumber: 1,
      lessonNumber: lesson.number,
      markerNumber: lesson.number,
      title: lessonCopy.title,
      description: lessonCopy.description,
      notions: lessonCopy.notions,
      duration: lesson.duration,
      state,
      status,
      sectionLabel: `${foundationCopy.label} · ${foundationCopy.lesson} ${lesson.number}`,
      nodeLabel: `${foundationCopy.lesson} ${lesson.number}: ${lessonCopy.title}`,
      startLabel: foundationCopy.start,
      reviewLabel: foundationCopy.review,
      lockedExplanation: foundationCopy.lockedExplanation,
      ...(href && (done || isNext || isAvailable) ? { href } : {}),
      id: `lesson-${lesson.number}`,
    };
  });

  const currentWorldOne = worldOneNodes.find(({ state }) => state === "current");

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-3">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {copy.learnTitle}
        </h1>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="min-w-0 text-xs font-semibold leading-relaxed text-muted-foreground sm:text-sm">
            {courseCopy.intro.label} <ArrowRight className="mx-1 inline size-3" aria-hidden />
            {foundationCopy.label}
          </p>
          <p className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
            {progressSteps}/{progressTotal}
          </p>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-soft"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={progressTotal}
          aria-valuenow={progressSteps}
          aria-label={progressLabel}
        >
          <span
            className="block h-full rounded-full bg-mint transition-[width] duration-500"
            style={{ width: `${(progressSteps / progressTotal) * 100}%` }}
          />
        </div>
        <div className="mt-1.5 flex min-h-9 justify-end">
          {introCurrent ? (
            <Link
              href="#lesson-1"
              className="inline-flex min-h-9 items-center gap-1 font-semibold text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {courseCopy.intro.skip} <ArrowRight className="size-4" aria-hidden />
            </Link>
          ) : currentWorldOne ? (
            <Link
              href={`#lesson-${currentWorldOne.lessonNumber}`}
              className="inline-flex min-h-9 items-center gap-1 font-semibold text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {copy.resumeLesson(currentWorldOne.lessonNumber)}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          ) : null}
        </div>
      </header>

      <section aria-labelledby="learn-path-heading">
        <h2 id="learn-path-heading" className="sr-only">
          {foundationCopy.pathLabel}
        </h2>
        <WorldOnePath
          lessons={[introNode, ...worldOneNodes]}
          progressLabel={progressLabel}
          lockedLabel={courseCopy.locked}
          notionsLabel={foundationCopy.notionsLabel}
          mascotAlt={foundationCopy.mascotAlt}
          closeLabel={foundationCopy.closePreview}
          worldZeroLabel={courseCopy.intro.label}
          worldOneLabel={foundationCopy.label}
        />
      </section>
    </div>
  );
}
