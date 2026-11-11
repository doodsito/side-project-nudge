import type { Metadata } from "next";
import { BetaSurveyCta } from "@/components/dashboard/beta-survey-cta";
import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { hasAnsweredBetaSurvey } from "@/lib/beta-survey-status";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).dashboard.tabs.home };
}

export default async function DashboardPage() {
  const member = await requireMember();
  const dictionary = getDictionary(member.track);
  const showBetaSurvey = !(await hasAnsweredBetaSurvey(member.id));
  return (
    <div data-dashboard-hide-mobile-header>
      {showBetaSurvey && (
        <div className="mx-auto max-w-7xl px-4 pt-4 lg:px-8">
          <BetaSurveyCta t={dictionary.betaSurvey.cta} />
        </div>
      )}
      <DashboardHome
        progress={member.courseProgress}
        track={member.track}
        courseCopy={dictionary.learning.courses}
        foundationCopy={dictionary.learning.courses.foundation}
      />
    </div>
  );
}
