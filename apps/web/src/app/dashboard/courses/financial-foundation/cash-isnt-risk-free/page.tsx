import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { isLessonSevenAvailable } from "@/lib/cash-isnt-risk-free-lesson";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).lesson7.metaTitle };
}

export default async function CashIsntRiskFreePage() {
  const member = await requireMember();
  if (
    !isLessonSevenAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 6)
  ) {
    redirect("/dashboard/courses/financial-foundation#lesson-7");
  }

  redirect("/lessons/cash-isnt-risk-free");
}
