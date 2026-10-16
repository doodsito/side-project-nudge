import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MoneyYoullNeedSoonIntro } from "@/components/lessons/money-youll-need-soon-intro";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { isLessonFourAvailable } from "@/lib/build-your-safety-net-lesson";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).lesson4.lesson5.metaTitle };
}

export default async function MoneyYoullNeedSoonPage() {
  const member = await requireMember();
  if (
    !isLessonFourAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 4)
  ) {
    redirect("/dashboard/courses/financial-foundation#lesson-5");
  }

  return (
    <div lang={member.track === "fr" ? "fr-FR" : "en-US"}>
      <MoneyYoullNeedSoonIntro copy={getDictionary(member.track).lesson4.lesson5} />
    </div>
  );
}
