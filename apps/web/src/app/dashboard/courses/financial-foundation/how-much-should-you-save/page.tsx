import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { isLessonThreeAvailable } from "@/lib/how-much-should-you-save-lesson";

export const metadata: Metadata = { title: "Combien épargner ?" };

export default async function HowMuchShouldYouSavePage() {
  const member = await requireMember();

  if (
    !isLessonThreeAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 2)
  ) {
    redirect("/dashboard/courses/financial-foundation#lesson-3");
  }

  redirect("/lessons/how-much-should-you-save");
}
