import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { isLessonFourAvailable } from "@/lib/build-your-safety-net-lesson";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { BuildYourSafetyNetFlow } from "./build-your-safety-net-flow";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).lesson4.metaTitle };
}

export default async function BuildYourSafetyNetPage() {
  const member = await requireMember();
  if (
    !isLessonFourAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 3)
  ) {
    redirect("/dashboard/courses/financial-foundation#lesson-4");
  }

  return (
    <div lang={member.track === "fr" ? "fr-FR" : "en-US"}>
      <BuildYourSafetyNetFlow track={member.track} />
    </div>
  );
}
