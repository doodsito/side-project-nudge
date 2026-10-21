import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { isLessonFiveAvailable } from "@/lib/money-youll-need-soon-lesson";
import { MoneyYoullNeedSoonFlow } from "./money-youll-need-soon-flow";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).lesson5.metaTitle };
}

export default async function MoneyYoullNeedSoonPage() {
  const member = await requireMember();
  if (
    !isLessonFiveAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 4)
  ) {
    redirect("/dashboard/courses/financial-foundation#lesson-5");
  }

  return (
    <div lang={member.track === "fr" ? "fr-FR" : "en-US"}>
      <MoneyYoullNeedSoonFlow track={member.track} />
    </div>
  );
}
