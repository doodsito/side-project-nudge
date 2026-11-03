import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { isLessonEightAvailable } from "@/lib/savings-vs-investing-lesson";
import { SavingsVsInvestingFlow } from "./savings-vs-investing-flow";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).lesson8.metaTitle };
}

export default async function SavingsVsInvestingPage() {
  const member = await requireMember();
  if (
    !isLessonEightAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 7)
  ) {
    redirect("/dashboard");
  }

  return (
    <div lang={member.track === "fr" ? "fr-FR" : "en-US"}>
      <SavingsVsInvestingFlow
        track={member.track}
        userId={member.id}
        alreadyCompleted={hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 8)}
      />
    </div>
  );
}
