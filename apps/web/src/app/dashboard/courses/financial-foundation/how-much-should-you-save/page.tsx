import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { HowMuchShouldYouSaveIntro } from "@/components/lessons/how-much-should-you-save-intro";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).learning.courses.lessonThree.metaTitle };
}

export default async function HowMuchShouldYouSavePage() {
  const member = await requireMember();

  if (!hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 2)) {
    redirect("/dashboard/courses/financial-foundation#lesson-2");
  }

  return (
    <HowMuchShouldYouSaveIntro copy={getDictionary(member.track).learning.courses.lessonThree} />
  );
}
