import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { AccessCodeForm } from "@/components/auth/access-code-form";
import { PasswordForm } from "@/components/auth/password-form";
import { AuthTemplate } from "@/components/auth/auth-template";
import { textLinkClass } from "@/components/shared/text-link";
import { ACCESS_CODE_COOKIE, getMember } from "@/lib/auth";
import { BRAND } from "@/lib/brand";
import { changeAccessCode, signUpWithPassword, submitAccessCode } from "../actions";
import { AlreadySignedIn, AuthLinks, ErrorBox, GoogleSignIn } from "../shared";

export const metadata: Metadata = {
  title: `Sign up | ${BRAND}`,
  description: `Create your ${BRAND} account with your invitation code.`,
  robots: { index: false, follow: false },
};

// Two steps: the invitation code, then the account (once the code is accepted,
// it waits in an httpOnly cookie).
export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const [member, params, cookieStore] = await Promise.all([getMember(), searchParams, cookies()]);
  if (member) return <AlreadySignedIn member={member} />;

  if (!cookieStore.has(ACCESS_CODE_COOKIE)) {
    return (
      <AuthTemplate
        eyebrow="Invitation only"
        title="Enter your invitation code"
        intro={`${BRAND} opens to a few people at a time. Enter the code you were given to create your account.`}
      >
        <ErrorBox code={params["error"]} />
        <AccessCodeForm action={submitAccessCode} />
        <AuthLinks>
          <p>
            No code yet?{" "}
            <Link href="/#early-access" className={textLinkClass}>
              Join the waitlist
            </Link>
          </p>
          <p>
            Already have an account?{" "}
            <Link href="/login" className={textLinkClass}>
              Log in
            </Link>
          </p>
        </AuthLinks>
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate
      eyebrow="Code accepted"
      title="Create your account"
      intro="Your email address and a password are all you need."
    >
      <ErrorBox code={params["error"]} />
      <GoogleSignIn />
      <PasswordForm mode="sign-up" action={signUpWithPassword} />
      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        By creating an account, you agree to the{" "}
        <Link href="/terms-of-service" className={textLinkClass}>
          Terms of service
        </Link>{" "}
        and confirm you have read the{" "}
        <Link href="/privacy-policy" className={textLinkClass}>
          Privacy policy
        </Link>
        . You must be 15 or older.
      </p>
      <AuthLinks>
        <p>
          Already have an account?{" "}
          <Link href="/login" className={textLinkClass}>
            Log in
          </Link>
        </p>
        <form action={changeAccessCode}>
          <button type="submit" className={`cursor-pointer ${textLinkClass}`}>
            Use a different invitation code
          </button>
        </form>
      </AuthLinks>
    </AuthTemplate>
  );
}
