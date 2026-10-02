// Google and the email link send people back here. Finishes the sign-in, then
// gives beta access with the code from /get-started. An account without
// access is signed out again, so it never reaches the dashboard.
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { ACCESS_CODE_COOKIE } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, request.url));
  const code = request.nextUrl.searchParams.get("code");
  if (!code) return redirectTo("/get-started?error=auth");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return redirectTo("/get-started?error=auth");

  // A member already has access; anyone else needs a valid code.
  const cookieStore = await cookies();
  const accessCode = cookieStore.get(ACCESS_CODE_COOKIE)?.value ?? "";
  const { data: isMember } = await supabase.rpc("redeem_access_code", { code: accessCode });
  if (!isMember) {
    await supabase.auth.signOut();
    return redirectTo("/get-started?error=access");
  }
  cookieStore.delete(ACCESS_CODE_COOKIE);
  return redirectTo("/dashboard");
}
