import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BuildYourSafetyNetIntro } from "@/components/lessons/build-your-safety-net-intro";
import { requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { isLessonThreeAvailable } from "@/lib/how-much-should-you-save-lesson";

export const metadata: Metadata = { title: "Construire ton filet de sécurité" };

export default async function BuildYourSafetyNetPage() {
  const member = await requireMember();
  if (
    !isLessonThreeAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 3)
  ) {
    redirect("/dashboard/courses/financial-foundation#lesson-4");
  }

  return (
    <div lang="fr-FR">
      <BuildYourSafetyNetIntro copy={getDictionary("fr").lesson3.lesson4} />
    </div>
  );
}
