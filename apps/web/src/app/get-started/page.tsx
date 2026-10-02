import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AccessCodeForm } from "@/components/molecules/access-code-form";
import { EmailSignInForm } from "@/components/molecules/email-sign-in-form";
import { GoogleSignInButton } from "@/components/molecules/google-sign-in-button";
import { AuthTemplate } from "@/components/templates/auth-template";
import { ACCESS_CODE_COOKIE, getMember } from "@/lib/auth";
import { BRAND } from "@/lib/brand";
import { changeAccessCode, signInWithEmail, signInWithGoogle, submitAccessCode } from "./actions";

export const metadata: Metadata = {
  title: `Get started | ${BRAND}`,
  description: `Join the ${BRAND} beta with your access code.`,
  robots: { index: false, follow: false },
};

const ERRORS: Record<string, string> = {
  access: "This account doesn’t have beta access yet. Enter your access code, then sign in again.",
  auth: "The sign-in didn’t finish. Please try again, or use the other sign-in option.",
};

const linkClass = "font-semibold text-primary underline-offset-4 hover:underline";

export default async function GetStartedPage({ searchParams }: PageProps<"/get-started">) {
  const [member, params, cookieStore] = await Promise.all([getMember(), searchParams, cookies()]);
  if (member) redirect("/dashboard");

  const error = typeof params["error"] === "string" ? ERRORS[params["error"]] : undefined;
  const hasCode = cookieStore.has(ACCESS_CODE_COOKIE);
  const signInStep = hasCode || params["step"] === "sign-in";
  const errorBox = error && (
    <p role="alert" className="mb-6 rounded-xl bg-muted p-3 text-sm text-foreground">
      {error}
    </p>
  );

  if (!signInStep) {
    return (
      <AuthTemplate
        eyebrow="Private beta"
        title="Enter your access code"
        intro={`${BRAND} is open to a small group for now. Enter the code you were given to create your account.`}
      >
        {errorBox}
        <AccessCodeForm action={submitAccessCode} />
        <p className="mt-6 text-sm text-muted-foreground">
          Already have access?{" "}
          <Link href="/get-started?step=sign-in" className={linkClass}>
            Sign in
          </Link>
        </p>
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate
      eyebrow={hasCode ? "Code accepted" : "Welcome back"}
      title={hasCode ? "Create your account" : "Sign in"}
      intro="Use your Google account or your email address. No password needed."
    >
      {errorBox}
      <GoogleSignInButton action={signInWithGoogle} />
      <div className="my-6 flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
      <EmailSignInForm action={signInWithEmail} />
      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        By continuing, you agree to the{" "}
        <Link href="/terms-of-service" className={linkClass}>
          Terms of service
        </Link>{" "}
        and confirm you have read the{" "}
        <Link href="/privacy-policy" className={linkClass}>
          Privacy policy
        </Link>
        . You must be 15 or older.
      </p>
      <div className="mt-4 text-sm text-muted-foreground">
        {hasCode ? (
          <form action={changeAccessCode}>
            <button type="submit" className={`cursor-pointer ${linkClass}`}>
              Use a different access code
            </button>
          </form>
        ) : (
          <p>
            New here?{" "}
            <Link href="/get-started" className={linkClass}>
              Enter an access code
            </Link>
          </p>
        )}
      </div>
    </AuthTemplate>
  );
}
