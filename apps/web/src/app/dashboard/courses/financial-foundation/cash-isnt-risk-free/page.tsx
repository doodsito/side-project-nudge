import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CashIsntRiskFreeIntro } from "@/components/lessons/cash-isnt-risk-free-intro";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { isLessonSixAvailable } from "@/lib/debt-vs-investing-lesson";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).lesson6.lesson7.metaTitle };
}

export default async function CashIsntRiskFreePage() {
  const member = await requireMember();
  if (
    !isLessonSixAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 6)
  ) {
    redirect("/dashboard/courses/financial-foundation#lesson-7");
  }

  return (
    <div lang={member.track === "fr" ? "fr-FR" : "en-US"}>
      <CashIsntRiskFreeIntro copy={getDictionary(member.track).lesson6.lesson7} />
    </div>
  );
}
