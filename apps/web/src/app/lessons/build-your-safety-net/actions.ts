"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { requireMember } from "@/lib/auth";
import { isLessonFourAvailable } from "@/lib/build-your-safety-net-lesson";
import { completeLesson, FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";

export async function completeFourthLesson(): Promise<{ status: "saved" | "error" }> {
  const member = await requireMember();
  if (
    !isLessonFourAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 3)
  ) {
    return { status: "error" };
  }

  const progress = completeLesson(member.courseProgress, FOUNDATION_WORLD, 4);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ data: { course_progress: progress } });
  if (error) return { status: "error" };
  await supabase.auth.refreshSession();

  revalidatePath("/dashboard/courses");
  revalidatePath("/dashboard/courses/financial-foundation");
  return { status: "saved" };
}
