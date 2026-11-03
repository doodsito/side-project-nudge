export const INTRO_WORLD = "why-invest";
export const FOUNDATION_WORLD = "financial-foundation";
export const FOUNDATION_LESSON_COUNT = 8;

export type CourseProgress = {
  version: 1;
  completedLessons: Record<string, number[]>;
  worldZeroSkipped?: boolean;
  worldOneDiscoverySeen?: boolean;
};

export type ProgressStatus = "idle" | "saving" | "saved" | "error";

export const EMPTY_COURSE_PROGRESS: CourseProgress = {
  version: 1,
  completedLessons: {},
  worldZeroSkipped: false,
  worldOneDiscoverySeen: false,
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

  return {
    version: 1,
    completedLessons: result,
    worldZeroSkipped: Reflect.get(value, "worldZeroSkipped") === true,
    worldOneDiscoverySeen: Reflect.get(value, "worldOneDiscoverySeen") === true,
  };
}

export function completeLesson(
  progress: CourseProgress,
  world: string,
  lessonNumber: number,
): CourseProgress {
  const completed = progress.completedLessons[world] ?? [];
  if (completed.includes(lessonNumber)) return progress;
  return {
    ...progress,
    completedLessons: {
      ...progress.completedLessons,
      [world]: [...completed, lessonNumber].sort((a, b) => a - b),
    },
  };
}

export function skipWorldZero(progress: CourseProgress): CourseProgress {
  return { ...progress, worldZeroSkipped: true };
}

export function markWorldOneDiscoverySeen(progress: CourseProgress): CourseProgress {
  return { ...progress, worldOneDiscoverySeen: true };
}

export function hasCompletedLesson(progress: CourseProgress, world: string, lessonNumber: number) {
  return progress.completedLessons[world]?.includes(lessonNumber) ?? false;
}

export function completedLessonCount(progress: CourseProgress, world: string) {
  return progress.completedLessons[world]?.length ?? 0;
}
