import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FeedbackProvider } from "@/components/shared/feedback-widget";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { isLessonEightAvailable } from "@/lib/savings-vs-investing-lesson";
import { SavingsVsInvestingFlow } from "./savings-vs-investing-flow";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).lesson8.metaTitle };
}

export default async function SavingsVsInvestingPage() {
  const member = await requireMember();
  if (
    !isLessonEightAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 7)
  ) {
    redirect("/dashboard/courses/financial-foundation#lesson-8");
  }

  const dictionary = getDictionary(member.track);
  return (
    <div lang={member.track === "fr" ? "fr-FR" : "en-US"}>
      <FeedbackProvider
        t={dictionary.dashboard.feedback}
        intro={dictionary.lesson8.complete.feedbackPrompt}
        showFloatingTrigger={false}
      >
        <SavingsVsInvestingFlow
          track={member.track}
          alreadyCompleted={hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 8)}
        />
      </FeedbackProvider>
    </div>
  );
}
