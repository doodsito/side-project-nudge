"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { ACCESS_CODE_COOKIE, finishSignIn, getVisitorTrack } from "@/lib/auth";
import {
  ACCESS_CODE_PATTERN,
  readCredentials,
  readEmail,
  type AuthFormState,
} from "@/lib/auth-rules";
import { SITE_URL } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";

// Where Supabase sends people back after Google or an email link. The
// address must be allowed in Supabase (Authentication > URL Configuration).
async function callbackUrl() {
  const origin = (await headers()).get("origin") ?? SITE_URL;
  return `${origin}/auth/callback`;
}

// The error messages, in the visitor's language.
async function errors() {
  return getDictionary(await getVisitorTrack()).auth.errors;
}

export async function submitAccessCode(
  _: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const code = String(formData.get("code") ?? "")
    .trim()
    .toUpperCase();
  const t = await errors();
  if (!ACCESS_CODE_PATTERN.test(code)) return { error: t.codeFormat };
  const supabase = await createSupabaseServerClient();

  // Already signed in without access (for example after a refused code): redeem straight away.
  const { data } = await supabase.auth.getClaims();
  if (data?.claims) {
    const { data: isMember, error } = await supabase.rpc("redeem_access_code", { code });
    if (error) return { error: t.codeCheck };
    if (!isMember) return { error: t.codeInvalid };
    redirect("/dashboard");
  }

  const { data: isValid, error } = await supabase.rpc("check_access_code", { code });
  if (error) return { error: t.codeCheck };
  if (!isValid) return { error: t.codeInvalid };
  (await cookies()).set(ACCESS_CODE_COOKIE, code, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 30,
  });
  redirect("/signup");
}

export async function changeAccessCode() {
  (await cookies()).delete(ACCESS_CODE_COOKIE);
  redirect("/signup");
}

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: await callbackUrl() },
  });
  if (error || !data.url) redirect("/login?error=auth");
  redirect(data.url);
}

export async function signUpWithPassword(
  _: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const t = await errors();
  const credentials = readCredentials(formData, { newPassword: true });
  if ("error" in credentials) return { error: t[credentials.error] };
  const { email, password } = credentials;
  const code = (await cookies()).get(ACCESS_CODE_COOKIE)?.value;
  if (!code) return { error: t.codeExpired };

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // The code is kept with the account so the confirmation link works later
    // or in another browser. It is only an input: redeem_access_code() checks it.
    // The track picks the language of the confirmation email.
    options: {
      emailRedirectTo: await callbackUrl(),
      data: { access_code: code, track: await getVisitorTrack() },
    },
  });
  if (error) {
    if (error.status === 429) return { error: t.tooMany };
    if (error.code === "weak_password") return { error: t.rules };
    if (error.code === "user_already_exists") return { error: t.accountExists };
    return { error: t.tryAgain };
  }
  // With email confirmation on (the Supabase default), there is no session yet:
  // the account starts once the link in the email is opened.
  if (!data.session) return { sentTo: email };
  if (!(await finishSignIn(supabase))) return { error: t.noAccess };
  redirect("/dashboard");
}

export async function signInWithPassword(
  _: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const t = await errors();
  const credentials = readCredentials(formData, { newPassword: false });
  if ("error" in credentials) return { error: t[credentials.error] };
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    if (error.status === 429) return { error: t.tooMany };
    if (error.code === "email_not_confirmed") return { error: t.confirmFirst };
    if (error.code === "invalid_credentials") return { error: t.wrongCredentials };
    return { error: t.tryAgain };
  }
  if (!(await finishSignIn(supabase))) return { error: t.noAccess };
  redirect("/dashboard");
}

export async function requestPasswordReset(
  _: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const t = await errors();
  const email = readEmail(formData);
  if (!email) return { error: t.email };
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${await callbackUrl()}?next=/reset-password`,
  });
  if (error) return { error: error.status === 429 ? t.tooMany : t.tryAgain };
  // Same answer whether or not the account exists, so the form can't reveal who has one.
  return { sentTo: email };
}
