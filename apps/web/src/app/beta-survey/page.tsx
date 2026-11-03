import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BetaSurveyFlow } from "@/components/dashboard/beta-survey-flow";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { hasAnsweredBetaSurvey } from "@/lib/beta-survey-status";
import { getDictionary } from "@/lib/dictionaries";
import { TRACK_INFO } from "@/lib/tracks";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return {
    title: getDictionary(track).betaSurvey.metaTitle,
    robots: { index: false, follow: false },
  };
}

export default async function BetaSurveyPage() {
  const member = await requireMember();
  if (await hasAnsweredBetaSurvey(member.id)) redirect("/dashboard");

  return (
    <div lang={TRACK_INFO[member.track].lang}>
      <BetaSurveyFlow track={member.track} />
    </div>
  );
}
