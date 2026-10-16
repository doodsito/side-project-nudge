import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BuildYourSafetyNetIntro } from "@/components/lessons/build-your-safety-net-intro";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { isLessonThreeAvailable } from "@/lib/how-much-should-you-save-lesson";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).lesson3.lesson4.title };
}

export default async function BuildYourSafetyNetPage() {
  const member = await requireMember();
  if (
    !isLessonThreeAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 3)
  ) {
    redirect("/dashboard/courses/financial-foundation#lesson-4");
  }

  return (
    <div lang={member.track === "fr" ? "fr-FR" : "en-US"}>
      <BuildYourSafetyNetIntro copy={getDictionary(member.track).lesson3.lesson4} />
    </div>
  );
}
