import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { HowMuchShouldYouSaveIntro } from "@/components/organisms/how-much-should-you-save-intro";
import { requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";

export const metadata: Metadata = { title: "How much should you save?" };

export default async function HowMuchShouldYouSavePage() {
  const member = await requireMember();

  if (!hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 2)) {
    redirect("/dashboard/courses/financial-foundation#lesson-2");
  }

  return <HowMuchShouldYouSaveIntro />;
}
