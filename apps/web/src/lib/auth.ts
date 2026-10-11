// Who is signed in, and do they have beta access? Every signed-in page and
// Server Action asks here, so the check is never forgotten. Server only.
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { readCourseProgress, type CourseProgress } from "@/lib/course-progress";
import {
  DEFAULT_TRACK,
  isTrack,
  TRACK_COOKIE,
  TRACK_COOKIE_MAX_AGE,
  type Track,
} from "@/lib/tracks";

type SupabaseServerClient = Awaited<ReturnType<typeof createSupabaseServerClient>>;

// Holds the access code between the code step and the sign-in (httpOnly).
export const ACCESS_CODE_COOKIE = "nudge_access_code";

/** The browser's track (the cookie set by the version choice), if any. */
export async function readTrackCookie(): Promise<Track | null> {
  const value = (await cookies()).get(TRACK_COOKIE)?.value;
  return isTrack(value) ? value : null;
}

/**
 * Saves the track on the account (user_metadata.track, which the emails read
 * too) and in this browser. The session is refreshed so the next page reads it.
 */
export async function saveAccountTrack(supabase: SupabaseServerClient, track: Track) {
  const { error } = await supabase.auth.updateUser({ data: { track } });
  if (error) return false;
  await supabase.auth.refreshSession();
  await setTrackCookie(track);
  return true;
}

async function setTrackCookie(track: Track) {
  (await cookies()).set(TRACK_COOKIE, track, {
    path: "/",
    maxAge: TRACK_COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

/**
 * Runs after every sign-in. Gives access with the invitation code typed on
 * /signup (from the cookie, or saved with the account at sign-up); an
 * account that still has no access is signed out again. Then the account's
 * track wins over the browser's; an account without one takes the browser's.
 * True for a member.
 */
export async function finishSignIn(supabase: SupabaseServerClient): Promise<boolean> {
  const cookieStore = await cookies();
  const { data } = await supabase.auth.getClaims();
  const saved = data?.claims.user_metadata?.["access_code"];
  const code =
    cookieStore.get(ACCESS_CODE_COOKIE)?.value ?? (typeof saved === "string" ? saved : "");
  const { data: isMember } = await supabase.rpc("redeem_access_code", { code });
  if (!isMember) {
    await supabase.auth.signOut();
    return false;
  }
  cookieStore.delete(ACCESS_CODE_COOKIE);
  const accountTrack = data?.claims.user_metadata?.["track"];
  if (isTrack(accountTrack)) await setTrackCookie(accountTrack);
  else await saveAccountTrack(supabase, (await readTrackCookie()) ?? DEFAULT_TRACK);
  return true;
}

export type Member = {
  id: string;
  email: string;
  provider: string;
  accessCode: string;
  memberSince: string;
  courseProgress: CourseProgress;
  track: Track;
};

// getClaims() verifies the session token's signature; never trust getSession() on the server.
// Memoised, so a page and its layout share one check per request.
export const getMember = cache(async (): Promise<Member | null> => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("access_code, created_at")
    .eq("id", claims.sub)
    .maybeSingle();
  if (!profile) return null;
  const provider = claims.app_metadata?.["provider"];
  return {
    id: claims.sub,
    email: claims.email ?? "",
    provider: typeof provider === "string" ? provider : "email",
    accessCode: profile.access_code,
    memberSince: profile.created_at,
    courseProgress: readCourseProgress(claims.user_metadata?.["course_progress"]),
    track: isTrack(claims.user_metadata?.["track"]) ? claims.user_metadata["track"] : DEFAULT_TRACK,
  };
});

export async function requireMember(): Promise<Member> {
  const member = await getMember();
  if (!member) redirect("/login");
  return member;
}

/** The signed-in member's track, or the default one: the language of a members' page. */
export async function getMemberTrack(): Promise<Track> {
  return (await getMember())?.track ?? DEFAULT_TRACK;
}
