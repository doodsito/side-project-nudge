import { FoundationWorldClient } from "./foundation-world-client";
import {
  completedLessonCount,
  FOUNDATION_LESSON_COUNT,
  FOUNDATION_WORLD,
  type CourseProgress,
} from "@/lib/course-progress";
import type { Dictionary } from "@/lib/dictionaries";
import type { Track } from "@/lib/tracks";

/** Keep dictionary functions on the server and send only plain copy to the interactive path. */
export function FoundationWorld({
  progress,
  copy,
  track,
}: {
  progress: CourseProgress;
  copy: Dictionary["learning"]["courses"]["foundation"];
  track: Track;
}) {
  const completed = Math.min(
    completedLessonCount(progress, FOUNDATION_WORLD),
    FOUNDATION_LESSON_COUNT,
  );
  const { progressLabel, ...clientCopy } = copy;
  return (
    <FoundationWorldClient
      progress={progress}
      copy={clientCopy}
      progressLabel={progressLabel(completed, FOUNDATION_LESSON_COUNT)}
      track={track}
    />
  );
}
