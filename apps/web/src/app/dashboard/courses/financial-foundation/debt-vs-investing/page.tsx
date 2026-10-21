import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DebtVsInvestingIntro } from "@/components/lessons/debt-vs-investing-intro";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { isLessonFiveAvailable } from "@/lib/money-youll-need-soon-lesson";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).lesson5.lesson6.metaTitle };
}

export default async function DebtVsInvestingPage() {
  const member = await requireMember();
  if (
    !isLessonFiveAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 5)
  ) {
    redirect("/dashboard/courses/financial-foundation#lesson-6");
  }

  return (
    <div lang={member.track === "fr" ? "fr-FR" : "en-US"}>
      <DebtVsInvestingIntro copy={getDictionary(member.track).lesson5.lesson6} />
    </div>
  );
}
