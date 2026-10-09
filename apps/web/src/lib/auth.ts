// Who is signed in, and do they have beta access? Every signed-in page and
// Server Action asks here, so the check is never forgotten. Server only.
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { readCourseProgress, type CourseProgress } from "@/lib/course-progress";

// Holds the access code between the code step and the sign-in (httpOnly).
export const ACCESS_CODE_COOKIE = "nudge_access_code";

/**
 * Runs after every sign-in. Gives beta access with the code typed on
 * /beta (from the cookie, or saved with the account at sign-up); an
 * account that still has no access is signed out again. True for a member.
 */
export async function finishSignIn(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
): Promise<boolean> {
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
  return true;
}

export type Member = {
  id: string;
  email: string;
  provider: string;
  accessCode: string;
  memberSince: string;
  courseProgress: CourseProgress;
};

// getClaims() verifies the session token's signature; never trust getSession() on the server.
// Memoised, so a page and its layout share one check per request.
export const getMember = cache(async (): Promise<Member | null> => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) return null;
  // Course progress can change before the access token is refreshed. Read the
  // current account record instead of the older metadata embedded in its JWT.
  const { data: account, error: accountError } = await supabase.auth.getUser();
  if (accountError || !account.user || account.user.id !== claims.sub) return null;
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
    courseProgress: readCourseProgress(account.user.user_metadata?.["course_progress"]),
  };
});

export async function requireMember(): Promise<Member> {
  const member = await getMember();
  if (!member) redirect("/beta");
  return member;
}
