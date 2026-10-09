import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { PayYourselfFirstFlow } from "./pay-yourself-first-flow";

export const metadata: Metadata = { title: "Pay yourself first" };

export default async function PayYourselfFirstPage() {
  const member = await requireMember();
  if (!hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 1)) {
    redirect("/dashboard/courses/financial-foundation#lesson-1");
  }

  return <PayYourselfFirstFlow />;
}
