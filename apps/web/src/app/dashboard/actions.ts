"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { requireMember, saveAccountTrack } from "@/lib/auth";
import { getDictionary } from "@/lib/dictionaries";
import { isTrack } from "@/lib/tracks";

const FEEDBACK_CATEGORIES = ["bug", "idea", "other"] as const;
const FEEDBACK_MESSAGE_MAX_LENGTH = 2000;

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
  const saved = await saveAccountTrack(await createSupabaseServerClient(), track);
  revalidatePath("/dashboard", "layout");
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
