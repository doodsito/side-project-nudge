"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { requireMember } from "@/lib/auth";
import {
  markWorldOneDiscoverySeen as setWorldOneDiscoverySeen,
  skipWorldZero as setWorldZeroSkipped,
  type CourseProgress,
} from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { isTrack } from "@/lib/tracks";
import { saveSelectedTrack } from "@/app/track-actions";

const FEEDBACK_CATEGORIES = ["bug", "idea", "other"] as const;
const FEEDBACK_MESSAGE_MAX_LENGTH = 2000;

async function saveLearnPreference(
  update: (progress: CourseProgress) => CourseProgress,
): Promise<{ status: "saved" | "error" }> {
  const member = await requireMember();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({
    data: { course_progress: update(member.courseProgress) },
  });
  if (error) return { status: "error" };
  await supabase.auth.refreshSession();
  revalidatePath("/dashboard");
  return { status: "saved" };
}

/** Saves the learner's choice separately from completed World 0 lessons. */
export async function skipWorldZero() {
  return saveLearnPreference(setWorldZeroSkipped);
}

/** Records that the one-time World 1 discovery popup was dismissed or explored. */
export async function markWorldOneDiscoverySeen() {
  return saveLearnPreference(setWorldOneDiscoverySeen);
}

export type FeedbackFormState = { error?: string; success?: boolean };

// Signing out only ends the caller's own session, so it needs no access check.
export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

/** Changes the member's track from the Account page: language, market and currency. */
export async function changeTrack(formData: FormData) {
  await requireMember();
  const track = formData.get("track");
  if (!isTrack(track)) redirect("/dashboard/account");
  const saved = await saveSelectedTrack(track);
  redirect(saved ? "/dashboard/account?track=updated" : "/dashboard/account?track=error");
}

/** Sends a beta tester's feedback from the dashboard's floating form. */
export async function submitFeedback(
  _: FeedbackFormState,
  formData: FormData,
): Promise<FeedbackFormState> {
  const member = await requireMember();
  const t = getDictionary(member.track).dashboard.feedback;
  const category = formData.get("category");
  const message = String(formData.get("message") ?? "").trim();
  if (!FEEDBACK_CATEGORIES.includes(category as (typeof FEEDBACK_CATEGORIES)[number])) {
    return { error: t.error };
  }
  if (!message) return { error: t.messageMissing };
  if (message.length > FEEDBACK_MESSAGE_MAX_LENGTH) return { error: t.messageTooLong };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("feedback_submissions")
    .insert({ member_id: member.id, category: category as string, message });
  if (error) return { error: t.error };
  return { success: true };
}
