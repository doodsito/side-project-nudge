export const FOUNDATION_WORLD = "financial-foundation";
export const FOUNDATION_LESSON_COUNT = 8;

export type CourseProgress = {
  version: 1;
  completedLessons: Record<string, number[]>;
};

export type ProgressStatus = "idle" | "saving" | "saved" | "error";

export const EMPTY_COURSE_PROGRESS: CourseProgress = {
  version: 1,
  completedLessons: {},
};

export function readCourseProgress(value: unknown): CourseProgress {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return EMPTY_COURSE_PROGRESS;
  }

  const completedLessons = Reflect.get(value, "completedLessons");
  if (
    !completedLessons ||
    typeof completedLessons !== "object" ||
    Array.isArray(completedLessons)
  ) {
    return EMPTY_COURSE_PROGRESS;
  }

  const result: Record<string, number[]> = {};
  for (const [world, lessons] of Object.entries(completedLessons)) {
    if (!Array.isArray(lessons)) continue;
    result[world] = lessons.filter(
      (lesson, index, all): lesson is number =>
        Number.isInteger(lesson) && lesson > 0 && !all.slice(0, index).includes(lesson),
    );
  }

  return { version: 1, completedLessons: result };
}

export function completeLesson(
  progress: CourseProgress,
  world: string,
  lessonNumber: number,
): CourseProgress {
  const completed = progress.completedLessons[world] ?? [];
  if (completed.includes(lessonNumber)) return progress;
  return {
    version: 1,
    completedLessons: {
      ...progress.completedLessons,
      [world]: [...completed, lessonNumber].sort((a, b) => a - b),
    },
  };
}

export function hasCompletedLesson(progress: CourseProgress, world: string, lessonNumber: number) {
  return progress.completedLessons[world]?.includes(lessonNumber) ?? false;
}

export function completedLessonCount(progress: CourseProgress, world: string) {
  return progress.completedLessons[world]?.length ?? 0;
}
