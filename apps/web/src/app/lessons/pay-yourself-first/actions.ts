"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { requireMember } from "@/lib/auth";
import { completeLesson, FOUNDATION_WORLD, hasCompletedLesson } from "@/lib/course-progress";

export async function completeSecondLesson(): Promise<{ status: "saved" | "error" }> {
  const member = await requireMember();
  if (!hasCompletedLesson(member.courseProgress, FOUNDATION_WORLD, 1)) {
    return { status: "error" };
  }

  const progress = completeLesson(member.courseProgress, FOUNDATION_WORLD, 2);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ data: { course_progress: progress } });
  if (error) return { status: "error" };
  // Pages read progress from the session token: refresh it so lesson 3 unlocks now.
  await supabase.auth.refreshSession();

  revalidatePath("/dashboard/courses");
  revalidatePath("/dashboard/courses/financial-foundation");
  return { status: "saved" };
}
