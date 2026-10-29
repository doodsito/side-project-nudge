import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { DashboardTemplate } from "@/components/dashboard/dashboard-template";
import { FOUNDATION_WORLD, type CourseProgress } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { DEFAULT_TRACK, isTrack, TRACK_INFO } from "@/lib/tracks";

export const dynamic = "force-dynamic";

const sampleProgress: CourseProgress = {
  version: 1,
  completedLessons: { [FOUNDATION_WORLD]: [1, 2] },
};

export async function generateMetadata({
  searchParams,
}: PageProps<"/dev/dashboard-preview">): Promise<Metadata> {
  const { track: requestedTrack } = await searchParams;
  const track = isTrack(requestedTrack) ? requestedTrack : DEFAULT_TRACK;
  return {
    title: getDictionary(track).dashboard.preview.title,
    robots: { index: false, follow: false },
  };
}

export default async function DashboardPreviewPage({
  searchParams,
}: PageProps<"/dev/dashboard-preview">) {
  if (process.env.NODE_ENV !== "development") notFound();
  const host = (await headers()).get("host") ?? "";
  if (!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)) notFound();

  const { track: requestedTrack } = await searchParams;
  const track = isTrack(requestedTrack) ? requestedTrack : DEFAULT_TRACK;
  const t = getDictionary(track);
  const homeHref = `/dev/dashboard-preview?track=${track}`;

  return (
    <div lang={TRACK_INFO[track].lang}>
      <aside
        aria-label={t.dashboard.preview.label}
        className="mx-auto mt-5 max-w-5xl rounded-2xl border border-primary/25 bg-primary-soft px-5 py-4 text-sm sm:mt-6"
      >
        <p className="font-bold text-primary">{t.dashboard.preview.label}</p>
        <p className="mt-1 text-muted-foreground">{t.dashboard.preview.description}</p>
      </aside>
      <DashboardTemplate preview homeHref={homeHref} t={t.dashboard} skipLink={t.skipLink}>
        <DashboardHome
          progress={sampleProgress}
          track={track}
          copy={t.dashboard.homeScreen}
          courseCopy={t.learning.courses}
          foundationCopy={t.learning.courses.foundation}
        />
      </DashboardTemplate>
    </div>
  );
}
