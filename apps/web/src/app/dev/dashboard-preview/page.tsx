import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { PortfolioPreview } from "@/components/dashboard/portfolio-preview";
import { DashboardTemplate } from "@/components/dashboard/dashboard-template";
import { LessonRating } from "@/components/lessons/lesson-rating";
import { FOUNDATION_WORLD, INTRO_WORLD, type CourseProgress } from "@/lib/course-progress";
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
  const host = (await headers()).get("host") ?? "";
  const localPreview =
    process.env.NODE_ENV === "development" &&
    /^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host);
  const vercelPreview = process.env["VERCEL_ENV"] === "preview";
  if (!localPreview && !vercelPreview) notFound();

  const { track: requestedTrack, state, view } = await searchParams;
  const track = isTrack(requestedTrack) ? requestedTrack : DEFAULT_TRACK;
  const t = getDictionary(track);
  const homeHref = `/dev/dashboard-preview?track=${track}`;
  const portfolioHref = `${homeHref}&view=portfolio`;
  const showPortfolio = view === "portfolio";

  return (
    <div lang={TRACK_INFO[track].lang}>
      {!showPortfolio && (
        <aside
          aria-label={t.dashboard.preview.label}
          className="mx-auto mt-5 max-w-5xl rounded-2xl border border-primary/25 bg-primary-soft px-5 py-4 text-sm sm:mt-6"
        >
          <p className="font-bold text-primary">{t.dashboard.preview.label}</p>
          <p className="mt-1 text-muted-foreground">{t.dashboard.preview.description}</p>
        </aside>
      )}
      <DashboardTemplate
        preview
        activeTab={showPortfolio ? "portfolio" : "home"}
        homeHref={homeHref}
        portfolioHref={portfolioHref}
        t={t.dashboard}
        skipLink={t.skipLink}
      >
        {showPortfolio ? (
          <section className="-mx-4 px-4 pt-4 pb-[calc(5rem+env(safe-area-inset-bottom))] lg:mx-0 lg:px-10 lg:pt-8">
            <PortfolioPreview copy={t.dashboard.portfolio} learnHref={homeHref} />
          </section>
        ) : state === "lesson-feedback" ? (
          <LessonRating
            track={track}
            nextHref={`/dev/dashboard-preview?track=${track}&state=returning`}
          />
        ) : (
          <DashboardHome
            progress={
              state === "first-time"
                ? { version: 1, completedLessons: {} }
                : state === "skipped"
                  ? {
                      version: 1,
                      completedLessons: {},
                      worldZeroSkipped: true,
                    }
                  : state === "world-zero-complete"
                    ? { version: 1, completedLessons: { [INTRO_WORLD]: [1] } }
                    : state === "returning"
                      ? { ...sampleProgress, worldZeroSkipped: true }
                      : sampleProgress
            }
            track={track}
            courseCopy={t.learning.courses}
            foundationCopy={t.learning.courses.foundation}
          />
        )}
      </DashboardTemplate>
    </div>
  );
}
