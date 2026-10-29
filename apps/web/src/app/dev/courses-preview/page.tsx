import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { CourseWorlds } from "@/components/dashboard/course-worlds";
import { DashboardTemplate } from "@/components/dashboard/dashboard-template";
import {
  FOUNDATION_LESSON_COUNT,
  FOUNDATION_WORLD,
  type CourseProgress,
} from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { DEFAULT_TRACK, isTrack, TRACK_INFO } from "@/lib/tracks";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function CoursesPreviewPage({
  searchParams,
}: PageProps<"/dev/courses-preview">) {
  if (process.env.NODE_ENV !== "development") notFound();
  const host = (await headers()).get("host") ?? "";
  if (!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)) notFound();

  const { track: requestedTrack, state } = await searchParams;
  const track = isTrack(requestedTrack) ? requestedTrack : DEFAULT_TRACK;
  const t = getDictionary(track);
  const completedLessons =
    state === "complete"
      ? Array.from({ length: FOUNDATION_LESSON_COUNT }, (_, index) => index + 1)
      : state === "returning"
        ? [1, 2]
        : [];
  const sampleProgress: CourseProgress = {
    version: 1,
    completedLessons: { [FOUNDATION_WORLD]: completedLessons },
  };

  return (
    <div lang={TRACK_INFO[track].lang}>
      <aside
        aria-label={t.dashboard.preview.label}
        className="mx-auto mt-5 max-w-5xl rounded-2xl border border-primary/25 bg-primary-soft px-5 py-4 text-sm sm:mt-6"
      >
        <p className="font-bold text-primary">{t.dashboard.preview.label}</p>
        <p className="mt-1 text-muted-foreground">
          {t.learning.courses.worldProgress(completedLessons.length, FOUNDATION_LESSON_COUNT)}
        </p>
      </aside>
      <DashboardTemplate
        preview
        homeHref={`/dev/dashboard-preview?track=${track}`}
        t={t.dashboard}
        skipLink={t.skipLink}
      >
        <CourseWorlds progress={sampleProgress} copy={t.learning.courses} track={track} />
      </DashboardTemplate>
    </div>
  );
}
