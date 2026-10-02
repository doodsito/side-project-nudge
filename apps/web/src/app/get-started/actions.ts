"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { ACCESS_CODE_COOKIE, ACCESS_CODE_PATTERN, type AuthFormState } from "@/lib/auth";
import { SITE_URL } from "@/lib/brand";

// Where Supabase sends people back after Google or the email link. The
// address must be allowed in Supabase (Authentication > URL Configuration).
async function callbackUrl() {
  const origin = (await headers()).get("origin") ?? SITE_URL;
  return `${origin}/auth/callback`;
}

export async function submitAccessCode(
  _: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const code = String(formData.get("code") ?? "")
    .trim()
    .toUpperCase();
  if (!ACCESS_CODE_PATTERN.test(code)) {
    return { error: "Enter the access code you were given: letters, numbers and dashes." };
  }
  const supabase = await createSupabaseServerClient();

  // Already signed in without access (for example after a refused code): redeem straight away.
  const { data } = await supabase.auth.getClaims();
  if (data?.claims) {
    const { data: isMember, error } = await supabase.rpc("redeem_access_code", { code });
    if (error) return { error: "We couldn’t check your code just now. Please try again." };
    if (!isMember) return { error: "This code isn’t valid or has expired." };
    redirect("/dashboard");
  }

  const { data: isValid, error } = await supabase.rpc("check_access_code", { code });
  if (error) return { error: "We couldn’t check your code just now. Please try again." };
  if (!isValid) return { error: "This code isn’t valid or has expired." };
  (await cookies()).set(ACCESS_CODE_COOKIE, code, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 30,
  });
  redirect("/get-started");
}

export async function changeAccessCode() {
  (await cookies()).delete(ACCESS_CODE_COOKIE);
  redirect("/get-started");
}

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: await callbackUrl() },
  });
  if (error || !data.url) redirect("/get-started?error=auth");
  redirect(data.url);
}

export async function signInWithEmail(
  _: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (email.length > 254 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: "Enter a valid email address, like you@example.com." };
  }
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: await callbackUrl() },
  });
  if (error) {
    return {
      error:
        error.status === 429
          ? "Too many emails sent. Wait a few minutes, then try again."
          : "We couldn’t send the email just now. Please try again.",
    };
  }
  return { sentTo: email };
}
