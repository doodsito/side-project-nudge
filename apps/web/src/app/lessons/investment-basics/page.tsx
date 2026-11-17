import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { newQuestionOrder } from "@/lib/investment-basics-lesson";
import { canUseV2Lessons } from "@/lib/v2-lesson-access";
import { InvestmentBasicsFlow } from "./investment-basics-flow";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).investmentBasics.metaTitle, robots: { index: false } };
}

export default async function InvestmentBasicsPage() {
  const member = await requireMember();
  if (!canUseV2Lessons()) notFound();
  if (!hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 8)) {
    redirect("/dashboard/courses");
  }

  return (
    <div lang={member.track === "fr" ? "fr-FR" : "en-US"}>
      <InvestmentBasicsFlow track={member.track} initialOrder={newQuestionOrder()} />
    </div>
  );
}
