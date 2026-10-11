"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { getMember } from "@/lib/auth";
import { completeLesson, FOUNDATION_WORLD } from "@/lib/course-progress";

export type SaveLessonResult = { status: "saved" | "signed-out" | "error" };

export async function completeFirstLesson(): Promise<SaveLessonResult> {
  const member = await getMember();
  if (!member) return { status: "signed-out" };

  const progress = completeLesson(member.courseProgress, FOUNDATION_WORLD, 1);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ data: { course_progress: progress } });
  if (error) return { status: "error" };

  revalidatePath("/dashboard/courses");
  revalidatePath("/dashboard/courses/financial-foundation");
  return { status: "saved" };
}
