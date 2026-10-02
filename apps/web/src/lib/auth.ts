// Who is signed in, and do they have beta access? Every signed-in page and
// Server Action asks here, so the check is never forgotten. Server only.
import { cache } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/integrations/supabase/server";

// Holds the access code between the code step and the sign-in (httpOnly).
export const ACCESS_CODE_COOKIE = "nudge_access_code";
export const ACCESS_CODE_PATTERN = /^[A-Z0-9-]{4,32}$/;

// What the sign-in forms show after a Server Action: an error, or the address an email went to.
export type AuthFormState = { error?: string; sentTo?: string };
export type AuthFormAction = (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;

export type Member = {
  id: string;
  email: string;
  provider: string;
  accessCode: string;
  memberSince: string;
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
  };
});

export async function requireMember(): Promise<Member> {
  const member = await getMember();
  if (!member) redirect("/get-started");
  return member;
}
