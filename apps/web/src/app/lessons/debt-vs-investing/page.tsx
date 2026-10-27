import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { isLessonSixAvailable } from "@/lib/debt-vs-investing-lesson";
import { getDictionary } from "@/lib/dictionaries";
import { DebtVsInvestingFlow } from "./debt-vs-investing-flow";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).lesson6.metaTitle };
}

export default async function DebtVsInvestingPage() {
  const member = await requireMember();
  if (
    !isLessonSixAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 5)
  ) {
    redirect("/dashboard/courses/financial-foundation#lesson-6");
  }

  return (
    <div lang={member.track === "fr" ? "fr-FR" : "en-US"}>
      <DebtVsInvestingFlow track={member.track} />
    </div>
  );
}
