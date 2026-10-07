import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { AccessCodeForm } from "@/components/molecules/access-code-form";
import { GoogleSignInButton } from "@/components/molecules/google-sign-in-button";
import { PasswordForm } from "@/components/molecules/password-form";
import { ResetRequestForm } from "@/components/molecules/reset-request-form";
import { AuthTemplate } from "@/components/templates/auth-template";
import { ACCESS_CODE_COOKIE, getMember } from "@/lib/auth";
import { GOOGLE_SIGN_IN_ENABLED } from "@/lib/auth-rules";
import { BRAND } from "@/lib/brand";
import {
  changeAccessCode,
  requestPasswordReset,
  signInWithGoogle,
  signInWithPassword,
  signUpWithPassword,
  submitAccessCode,
} from "./actions";

export const metadata: Metadata = {
  title: `Private beta | ${BRAND}`,
  description: `Join the ${BRAND} beta with your access code.`,
  robots: { index: false, follow: false },
};

const ERRORS: Record<string, string> = {
  access: "This account doesn’t have beta access yet. Enter your access code, then sign in again.",
  auth: "The sign-in didn’t finish. Please try again.",
  link: "This link has expired or was opened in another browser. If you just confirmed your email, sign in with your password.",
  reset:
    "This reset link has expired, was already used or was opened in another browser. Ask for a new one below, then open it in this browser.",
};

const linkClass = "font-semibold text-primary underline-offset-4 hover:underline";

// The steps are in the URL: the code, then create an account (once the code is
// accepted), or sign in, or ask for a password reset link.
export default async function BetaPage({ searchParams }: PageProps<"/beta">) {
  const [member, params, cookieStore] = await Promise.all([getMember(), searchParams, cookies()]);
  if (member) redirect("/dashboard");

  const error = typeof params["error"] === "string" ? ERRORS[params["error"]] : undefined;
  const hasCode = cookieStore.has(ACCESS_CODE_COOKIE);
  const step =
    params["step"] === "sign-in" || params["step"] === "reset"
      ? params["step"]
      : hasCode
        ? "sign-up"
        : "code";
  const errorBox = error && (
    <p role="alert" className="mb-6 rounded-xl bg-muted p-3 text-sm text-foreground">
      {error}
    </p>
  );
  const google = GOOGLE_SIGN_IN_ENABLED && (
    <>
      <GoogleSignInButton action={signInWithGoogle} />
      <div className="my-6 flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
    </>
  );
  const footer = (children: ReactNode) => (
    <div className="mt-6 space-y-2 text-sm text-muted-foreground">{children}</div>
  );

  if (step === "code") {
    return (
      <AuthTemplate
        eyebrow="Private beta"
        title="Enter your access code"
        intro={`${BRAND} is open to a small group for now. Enter the code you were given to create your account.`}
      >
        {errorBox}
        <AccessCodeForm action={submitAccessCode} />
        {footer(
          <p>
            Already have an account?{" "}
            <Link href="/beta?step=sign-in" className={linkClass}>
              Sign in
            </Link>
          </p>,
        )}
      </AuthTemplate>
    );
  }

  if (step === "reset") {
    return (
      <AuthTemplate
        eyebrow="Password reset"
        title="Forgot your password?"
        intro="Enter your email address and we’ll send you a link to choose a new one."
      >
        {errorBox}
        <ResetRequestForm action={requestPasswordReset} />
        {footer(
          <p>
            Remembered it?{" "}
            <Link href="/beta?step=sign-in" className={linkClass}>
              Sign in
            </Link>
          </p>,
        )}
      </AuthTemplate>
    );
  }

  if (step === "sign-in") {
    return (
      <AuthTemplate eyebrow="Welcome back" title="Sign in" intro="Use the account you created.">
        {errorBox}
        {google}
        <PasswordForm mode="sign-in" action={signInWithPassword} />
        {footer(
          <>
            <p>
              <Link href="/beta?step=reset" className={linkClass}>
                Forgot your password?
              </Link>
            </p>
            <p>
              New here?{" "}
              <Link href="/beta" className={linkClass}>
                {hasCode ? "Create your account" : "Enter an access code"}
              </Link>
            </p>
          </>,
        )}
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate
      eyebrow="Code accepted"
      title="Create your account"
      intro={
        GOOGLE_SIGN_IN_ENABLED
          ? "Use your Google account, or an email address and a password."
          : "Your email address and a password are all you need."
      }
    >
      {errorBox}
      {google}
      <PasswordForm mode="sign-up" action={signUpWithPassword} />
      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        By creating an account, you agree to the{" "}
        <Link href="/terms-of-service" className={linkClass}>
          Terms of service
        </Link>{" "}
        and confirm you have read the{" "}
        <Link href="/privacy-policy" className={linkClass}>
          Privacy policy
        </Link>
        . You must be 15 or older.
      </p>
      {footer(
        <>
          <p>
            Already have an account?{" "}
            <Link href="/beta?step=sign-in" className={linkClass}>
              Sign in
            </Link>
          </p>
          <form action={changeAccessCode}>
            <button type="submit" className={`cursor-pointer ${linkClass}`}>
              Use a different access code
            </button>
          </form>
        </>,
      )}
    </AuthTemplate>
  );
}
