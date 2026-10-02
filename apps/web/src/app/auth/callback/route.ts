// Google and the email links (confirm your email, reset your password) send
// people back here. Finishes the sign-in, then gives beta access with the code
// from /get-started. An account without access is signed out again, so it never
// reaches the dashboard.
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { finishSignIn } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, request.url));
  const code = request.nextUrl.searchParams.get("code");
  if (!code) return redirectTo("/get-started?step=sign-in&error=link");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  // Usually a link opened in another browser, or an old one. The email may be
  // confirmed anyway, so the person can sign in with their password.
  if (error) return redirectTo("/get-started?step=sign-in&error=link");

  // A password reset link: choose the new password first. Only this exact
  // path is accepted, so the link cannot send anyone to another site.
  if (request.nextUrl.searchParams.get("next") === "/reset-password") {
    return redirectTo("/reset-password");
  }
  if (!(await finishSignIn(supabase))) return redirectTo("/get-started?error=access");
  return redirectTo("/dashboard");
}
