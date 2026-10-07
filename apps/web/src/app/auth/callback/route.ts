// Google and the email links (confirm your email, reset your password) send
// people back here. Finishes the sign-in, then gives beta access with the code
// from /beta. An account without access is signed out again, so it never
// reaches the dashboard.
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { finishSignIn } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, request.url));
  const code = request.nextUrl.searchParams.get("code");
  if (!code) return redirectTo("/beta?step=sign-in&error=link");

  // A password reset link: choose the new password first. Only this exact
  // path is accepted, so the link cannot send anyone to another site.
  const isReset = request.nextUrl.searchParams.get("next") === "/reset-password";
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  // Usually a link opened in another browser, or an old one. A reset link is
  // asked for again; after a confirmation link the email may be confirmed
  // anyway, so the person can sign in with their password.
  if (error)
    return redirectTo(isReset ? "/beta?step=reset&error=reset" : "/beta?step=sign-in&error=link");

  if (isReset) return redirectTo("/reset-password");
  if (!(await finishSignIn(supabase))) return redirectTo("/beta?error=access");
  return redirectTo("/dashboard");
}
