import type { Metadata } from "next";
import { BetaSurveyCta } from "@/components/dashboard/beta-survey-cta";
import { WorldsHome } from "@/components/dashboard/worlds-home";
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
    <div>
      {showBetaSurvey && (
        <div className="mx-auto max-w-7xl px-4 pt-4 lg:px-8">
          <BetaSurveyCta t={dictionary.betaSurvey.cta} />
        </div>
      )}
      <WorldsHome copy={dictionary.learning.courses} />
    </div>
  );
}
