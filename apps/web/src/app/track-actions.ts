"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { getMember, saveAccountTrack, setTrackCookie } from "@/lib/auth";
import { isTrack, type Track } from "@/lib/tracks";

/** Keep the visitor's language choice and a signed-in member's track in sync. */
export async function saveSelectedTrack(track: Track): Promise<boolean> {
  if (!isTrack(track)) return false;
  // A local preview can show the public site without Supabase configuration.
  const member =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
      ? await getMember()
      : null;
  if (member && member.track !== track) {
    if (!(await saveAccountTrack(await createSupabaseServerClient(), track))) return false;
  } else {
    await setTrackCookie(track);
  }
  revalidatePath("/dashboard", "layout");
  return true;
}

/** Used by the site-wide country switch, including on lesson pages. */
export async function chooseTrack(formData: FormData) {
  const track = formData.get("track");
  if (!isTrack(track)) redirect("/");
  const saved = await saveSelectedTrack(track);
  redirect(saved ? `/${track}` : "/dashboard/account?track=error");
}
