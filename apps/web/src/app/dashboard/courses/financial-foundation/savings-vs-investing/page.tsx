import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { isLessonEightAvailable } from "@/lib/savings-vs-investing-lesson";

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
    redirect("/dashboard/courses/financial-foundation#lesson-8");
  }

  redirect("/lessons/savings-vs-investing");
}
