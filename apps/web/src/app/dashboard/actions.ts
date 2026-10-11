"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { requireMember, saveAccountTrack } from "@/lib/auth";
import { isTrack } from "@/lib/tracks";

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
