"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { requireMember } from "@/lib/auth";
import { completeLesson, FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { INVESTMENT_WORLD } from "@/lib/investment-basics-lesson";
import { canUseV2Lessons } from "@/lib/v2-lesson-access";

export async function completeInvestmentBasicsLesson(): Promise<{ status: "saved" | "error" }> {
  const member = await requireMember();
  if (!canUseV2Lessons() || !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 8)) {
    return { status: "error" };
  }

  const progress = completeLesson(member.courseProgress, INVESTMENT_WORLD, 1);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ data: { course_progress: progress } });
  if (error) return { status: "error" };
  await supabase.auth.refreshSession();
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/courses");
  return { status: "saved" };
}
