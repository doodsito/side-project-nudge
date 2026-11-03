"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { requireMember } from "@/lib/auth";
import { completeLesson, FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";
import { isLessonEightAvailable } from "@/lib/savings-vs-investing-lesson";

export async function completeEighthLesson(): Promise<{ status: "saved" | "error" }> {
  const member = await requireMember();
  if (
    !isLessonEightAvailable(member.track) ||
    !hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 7)
  ) {
    return { status: "error" };
  }

  const progress = completeLesson(member.courseProgress, FOUNDATION_WORLD, 8);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ data: { course_progress: progress } });
  if (error) return { status: "error" };
  await supabase.auth.refreshSession();

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/courses");
  revalidatePath("/dashboard/courses/financial-foundation");
  return { status: "saved" };
}
