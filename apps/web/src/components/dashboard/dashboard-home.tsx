import { WorldOnePath } from "@/components/dashboard/world-one-path";
import { FOUNDATION_LESSONS, foundationLessonHref } from "@/lib/course-worlds";
import { FOUNDATION_WORLD, hasCompletedLesson, type CourseProgress } from "@/lib/course-progress";
import type { Dictionary } from "@/lib/dictionaries";
import type { Track } from "@/lib/tracks";

export function DashboardHome({
  progress,
  track,
  courseCopy,
  foundationCopy,
}: {
  progress: CourseProgress;
  track: Track;
  courseCopy: Dictionary["learning"]["courses"];
  foundationCopy: Dictionary["learning"]["courses"]["foundation"];
}) {
  const completedCount = Math.min(
    FOUNDATION_LESSONS.filter(({ number }) =>
      hasCompletedLesson(progress, FOUNDATION_WORLD, number),
    ).length,
    FOUNDATION_LESSONS.length,
  );
  const nextLesson = FOUNDATION_LESSONS.find(
    ({ number }) => !hasCompletedLesson(progress, FOUNDATION_WORLD, number),
  )?.number;
  const lessons = FOUNDATION_LESSONS.map((lesson, index) => {
    const done = hasCompletedLesson(progress, FOUNDATION_WORLD, lesson.number);
    const href = foundationLessonHref(lesson.number, track);
    const isCurrent = !done && lesson.number === nextLesson && Boolean(href);
    const lessonCopy = foundationCopy.lessons[index]!;
    const state = done
      ? ("completed" as const)
      : isCurrent
        ? ("current" as const)
        : ("locked" as const);
    const status = done
      ? foundationCopy.completed
      : isCurrent
        ? foundationCopy.current
        : foundationCopy.locked;

    return {
      lessonNumber: lesson.number,
      title: lessonCopy.title,
      description: lessonCopy.description,
      duration: lesson.duration,
      state,
      status,
      nodeLabel: `${foundationCopy.lesson} ${lesson.number}: ${lessonCopy.title}`,
      startLabel: foundationCopy.start,
      reviewLabel: foundationCopy.review,
      lockedExplanation: foundationCopy.lockedExplanation,
      ...(href && (done || isCurrent) ? { href } : {}),
      id: `lesson-${lesson.number}`,
    };
  });

  return (
    <WorldOnePath
      lessons={lessons}
      completedCount={completedCount}
      progressLabel={foundationCopy.progressLabel(completedCount, FOUNDATION_LESSONS.length)}
      worldLabel={`${courseCopy.world} 1`}
      worldTitle={courseCopy.worlds[0]!.title}
      lessonLabel={foundationCopy.lesson}
      practicalLabel={foundationCopy.practicalDecision}
      virtualMoneyLabel={foundationCopy.virtualMoney}
      lockedLabel={foundationCopy.locked}
      closePreviewLabel={foundationCopy.closePreview}
      mascotAlt={foundationCopy.mascotAlt}
      rewardLabel={
        completedCount === FOUNDATION_LESSONS.length
          ? courseCopy.homeSideCards.rewardComplete
          : courseCopy.homeSideCards.rewardPending
      }
    />
  );
}
