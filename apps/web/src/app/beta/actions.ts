"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { ACCESS_CODE_COOKIE, finishSignIn } from "@/lib/auth";
import {
  ACCESS_CODE_PATTERN,
  readCredentials,
  readEmail,
  type AuthFormState,
} from "@/lib/auth-rules";
import { SITE_URL } from "@/lib/brand";

// Where Supabase sends people back after Google or an email link. The
// address must be allowed in Supabase (Authentication > URL Configuration).
async function callbackUrl() {
  const origin = (await headers()).get("origin") ?? SITE_URL;
  return `${origin}/auth/callback`;
}

const TOO_MANY = "Too many attempts. Wait a few minutes, then try again.";
const TRY_AGAIN = "Something went wrong on our side. Please try again.";
const NO_ACCESS = "This account doesn’t have beta access yet. Enter your access code first.";

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
  redirect("/beta");
}

export async function changeAccessCode() {
  (await cookies()).delete(ACCESS_CODE_COOKIE);
  redirect("/beta");
}

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: await callbackUrl() },
  });
  if (error || !data.url) redirect("/beta?error=auth");
  redirect(data.url);
}

export async function signUpWithPassword(
  _: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const credentials = readCredentials(formData, { newPassword: true });
  if ("error" in credentials) return credentials;
  const { email, password } = credentials;
  const code = (await cookies()).get(ACCESS_CODE_COOKIE)?.value;
  if (!code) return { error: "Your access code has expired. Enter it again to continue." };

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // The code is kept with the account so the confirmation link works later
    // or in another browser. It is only an input: redeem_access_code() checks it.
    options: { emailRedirectTo: await callbackUrl(), data: { access_code: code } },
  });
  if (error) {
    if (error.status === 429) return { error: TOO_MANY };
    if (error.code === "weak_password") return { error: error.message };
    if (error.code === "user_already_exists") {
      return { error: "An account already uses this email. Sign in instead." };
    }
    return { error: TRY_AGAIN };
  }
  // With email confirmation on (the Supabase default), there is no session yet:
  // the account starts once the link in the email is opened.
  if (!data.session) return { sentTo: email };
  if (!(await finishSignIn(supabase))) return { error: NO_ACCESS };
  redirect("/dashboard");
}

export async function signInWithPassword(
  _: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const credentials = readCredentials(formData, { newPassword: false });
  if ("error" in credentials) return credentials;
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    if (error.status === 429) return { error: TOO_MANY };
    if (error.code === "email_not_confirmed") {
      return { error: "Confirm your email first: open the link we sent you, then sign in." };
    }
    if (error.code === "invalid_credentials") return { error: "Wrong email or password." };
    return { error: TRY_AGAIN };
  }
  if (!(await finishSignIn(supabase))) return { error: NO_ACCESS };
  redirect("/dashboard");
}

export async function requestPasswordReset(
  _: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = readEmail(formData);
  if (!email) return { error: "Enter a valid email address, like you@example.com." };
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${await callbackUrl()}?next=/reset-password`,
  });
  if (error) return { error: error.status === 429 ? TOO_MANY : TRY_AGAIN };
  // Same answer whether or not the account exists, so the form can't reveal who has one.
  return { sentTo: email };
}
