import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { PayYourselfFirstFlow } from "./pay-yourself-first-flow";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).learning.payYourselfFirst.metaTitle };
}

export default async function PayYourselfFirstPage() {
  const member = await requireMember();
  if (!hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 1)) {
    redirect("/dashboard/courses/financial-foundation#lesson-1");
  }

  return <PayYourselfFirstFlow track={member.track} />;
}
