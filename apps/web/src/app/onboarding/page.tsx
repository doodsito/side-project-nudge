import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { requireMember } from "@/lib/auth";
import { totalCompletedLessonCount } from "@/lib/course-progress";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function OnboardingPage() {
  const member = await requireMember();
  if (
    totalCompletedLessonCount(member.courseProgress) > 0 ||
    member.courseProgress.worldZeroSkipped
  ) {
    redirect("/dashboard/courses");
  }

  return <OnboardingFlow track={member.track} storageKey={`nudge:onboarding:v0:${member.id}`} />;
}
