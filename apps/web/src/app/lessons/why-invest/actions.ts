"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { requireMember } from "@/lib/auth";
import { completeLesson, INTRO_WORLD } from "@/lib/course-progress";

export async function completeWhyInvestLesson(): Promise<{ status: "saved" | "error" }> {
  const member = await requireMember();
  const progress = completeLesson(member.courseProgress, INTRO_WORLD, 1);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ data: { course_progress: progress } });
  if (error) return { status: "error" };
  await supabase.auth.refreshSession();

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/courses");
  return { status: "saved" };
}
