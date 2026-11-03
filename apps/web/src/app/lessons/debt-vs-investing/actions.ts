"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { requireMember } from "@/lib/auth";
import { completeLesson, FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { isLessonSixAvailable } from "@/lib/debt-vs-investing-lesson";

export async function completeSixthLesson(): Promise<{ status: "saved" | "error" }> {
  const member = await requireMember();
  if (
    !isLessonSixAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 5)
  ) {
    return { status: "error" };
  }

  const progress = completeLesson(member.courseProgress, FOUNDATION_WORLD, 6);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ data: { course_progress: progress } });
  if (error) return { status: "error" };
  await supabase.auth.refreshSession();

  revalidatePath("/dashboard/courses");
  revalidatePath("/dashboard/courses/financial-foundation");
  return { status: "saved" };
}
