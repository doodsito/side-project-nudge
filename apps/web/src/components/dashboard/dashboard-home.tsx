import { ComingNextSection } from "@/components/dashboard/coming-next-section";
import { LearnStartActions } from "@/components/dashboard/learn-start-actions";
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
  userId,
  skipWorldZeroAction,
  markDiscoverySeenAction,
}: {
  progress: CourseProgress;
  track: Track;
  copy: Dictionary["dashboard"]["homeScreen"];
  courseCopy: Dictionary["learning"]["courses"];
  foundationCopy: Dictionary["learning"]["courses"]["foundation"];
  userId?: string;
  skipWorldZeroAction?: () => Promise<{ status: "saved" | "error" }>;
  markDiscoverySeenAction?: () => Promise<{ status: "saved" | "error" }>;
}) {
  const lessonCount = FOUNDATION_LESSONS.length;
  const completed = Math.min(completedLessonCount(progress, FOUNDATION_WORLD), lessonCount);
  const introComplete = hasCompletedLesson(progress, INTRO_WORLD, 1);
  const introCurrent = !introComplete && completed === 0 && !progress.worldZeroSkipped;
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
    const isAvailable =
      progress.worldZeroSkipped === true && !done && lesson.number === 1 && Boolean(href);
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
      ...(href && (done || isNext || isAvailable || (introCurrent && lesson.number === 1))
        ? { href }
        : {}),
      id: `lesson-${lesson.number}`,
    };
  });

  const currentWorldOne = worldOneNodes.find(({ state }) => state === "current");
  const nextLessonNumber = currentWorldOne?.lessonNumber ?? nextLesson;
  const nextLessonHref =
    currentWorldOne?.href ??
    (nextLessonNumber ? foundationLessonHref(nextLessonNumber, track) : undefined);

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-3">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {copy.learnTitle}
        </h1>
        <p className="mt-2 text-right text-sm font-semibold tabular-nums text-foreground">
          {progressSteps}/{progressTotal}
        </p>
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
        <div className="mt-4">
          <LearnStartActions
            firstTime={introCurrent}
            completedWorldOneLessons={completed}
            initialWorldZeroSkipped={progress.worldZeroSkipped === true}
            initialDiscoverySeen={progress.worldOneDiscoverySeen === true}
            worldZeroHref="/lessons/why-invest"
            worldOneLabel={copy.worldLabel(1)}
            {...(userId ? { userId } : {})}
            {...(nextLessonHref ? { nextLessonHref } : {})}
            {...(nextLessonNumber ? { nextLessonLabel: copy.resumeLesson(nextLessonNumber) } : {})}
            startLearningLabel={copy.startLearning}
            alreadyKnowBasicsLabel={copy.alreadyKnowBasics}
            discoveryTitle={copy.discoveryTitle}
            discoveryDescription={copy.discoveryDescription}
            discoveryAction={copy.discoveryAction}
            discoveryClose={copy.discoveryClose}
            preferenceFallback={copy.preferenceFallback}
            preferenceSaveError={copy.preferenceSaveError}
            {...(skipWorldZeroAction ? { skipWorldZeroAction } : {})}
            {...(markDiscoverySeenAction ? { markDiscoverySeenAction } : {})}
          />
        </div>
      </header>

      <section aria-labelledby="learn-path-heading">
        <h2 id="learn-path-heading" className="sr-only">
          {foundationCopy.pathLabel}
        </h2>
        <WorldOnePath
          lessons={[introNode, ...worldOneNodes]}
          lockedLabel={courseCopy.locked}
          notionsLabel={foundationCopy.notionsLabel}
          mascotAlt={foundationCopy.mascotAlt}
          closeLabel={foundationCopy.closePreview}
          currentLessonLabel={copy.currentLesson}
          availableLessonLabel={copy.availableLesson}
          worldZeroSkipped={progress.worldZeroSkipped === true}
          {...(userId ? { userId } : {})}
        />
      </section>

      <ComingNextSection
        sectionTitle={copy.upcomingWorldsTitle}
        worldTwoLabel={copy.worldLabel(2)}
        worldTwoTitle={copy.upcomingWorlds[0]!}
        comingSoonLabel={copy.comingSoon}
        moreWorldsLabel={copy.moreWorlds}
        moreWorldsCountLabel={copy.moreWorldsCount(copy.upcomingWorlds.length - 1)}
        worlds={copy.upcomingWorlds.slice(1).map((title, index) => ({
          worldLabel: copy.worldLabel(index + 3),
          title,
        }))}
      />
    </div>
  );
}
