import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { isLessonThreeAvailable } from "@/lib/how-much-should-you-save-lesson";
import { HowMuchShouldYouSaveFlow } from "./how-much-should-you-save-flow";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).lesson3.metaTitle };
}

export default async function HowMuchShouldYouSavePage() {
  const member = await requireMember();
  if (
    !isLessonThreeAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 2)
  ) {
    redirect("/dashboard/courses/financial-foundation#lesson-3");
  }

  return (
    <div lang={member.track === "fr" ? "fr-FR" : "en-US"}>
      <HowMuchShouldYouSaveFlow track={member.track} />
    </div>
  );
}
