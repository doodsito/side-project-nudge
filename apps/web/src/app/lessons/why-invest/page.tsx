import type { Metadata } from "next";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { hasCompletedLesson, INTRO_WORLD } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { WhyInvestFlow } from "./why-invest-flow";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).lesson0.metaTitle };
}

export default async function WhyInvestPage() {
  const member = await requireMember();
  return (
    <div lang={member.track === "fr" ? "fr-FR" : "en-US"}>
      <WhyInvestFlow
        track={member.track}
        alreadyCompleted={hasCompletedLesson(member.courseProgress, INTRO_WORLD, 1)}
      />
    </div>
  );
}
