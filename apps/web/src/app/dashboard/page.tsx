import type { Metadata } from "next";
import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { hasAnsweredBetaSurvey } from "@/lib/beta-survey-status";
import { getDictionary } from "@/lib/dictionaries";
import { markWorldOneDiscoverySeen, skipWorldZero } from "./actions";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).dashboard.tabs.home };
}

export default async function DashboardPage() {
  const member = await requireMember();
  const dictionary = getDictionary(member.track);
  const showBetaSurvey = !(await hasAnsweredBetaSurvey(member.id));
  return (
    <DashboardHome
      progress={member.courseProgress}
      track={member.track}
      courseCopy={dictionary.learning.courses}
      foundationCopy={dictionary.learning.courses.foundation}
      userId={member.id}
      skipWorldZeroAction={skipWorldZero}
      markDiscoverySeenAction={markWorldOneDiscoverySeen}
      {...(showBetaSurvey ? { betaSurveyCopy: dictionary.betaSurvey.cta } : {})}
    />
  );
}
