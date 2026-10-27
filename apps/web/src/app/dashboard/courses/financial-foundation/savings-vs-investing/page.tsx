import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SavingsVsInvestingIntro } from "@/components/lessons/savings-vs-investing-intro";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { isLessonSevenAvailable } from "@/lib/cash-isnt-risk-free-lesson";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).lesson7.lesson8.metaTitle };
}

export default async function SavingsVsInvestingPage() {
  const member = await requireMember();
  if (
    !isLessonSevenAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 7)
  ) {
    redirect("/dashboard/courses/financial-foundation#lesson-8");
  }

  return (
    <div lang={member.track === "fr" ? "fr-FR" : "en-US"}>
      <SavingsVsInvestingIntro copy={getDictionary(member.track).lesson7.lesson8} />
    </div>
  );
}
