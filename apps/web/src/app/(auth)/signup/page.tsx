import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { AccessCodeForm } from "@/components/auth/access-code-form";
import { PasswordForm } from "@/components/auth/password-form";
import { AuthTemplate } from "@/components/auth/auth-template";
import { textLinkClass } from "@/components/shared/text-link";
import { ACCESS_CODE_COOKIE, getMember, getVisitorTrack } from "@/lib/auth";
import { BRAND } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";
import { changeAccessCode, signUpWithPassword, submitAccessCode } from "../actions";
import { AlreadySignedIn, AuthLinks, ErrorBox, GoogleSignIn } from "../shared";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getVisitorTrack()).auth.pages.signupCode;
  return {
    title: `${t.metaTitle} | ${BRAND}`,
    description: t.metaDescription,
    robots: { index: false, follow: false },
  };
}

// Two steps: the invitation code, then the account (once the code is accepted,
// it waits in an httpOnly cookie).
export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const [member, params, cookieStore, track] = await Promise.all([
    getMember(),
    searchParams,
    cookies(),
    getVisitorTrack(),
  ]);
  if (member) return <AlreadySignedIn member={member} />;
  const t = getDictionary(track).auth;

  if (!cookieStore.has(ACCESS_CODE_COOKIE)) {
    return (
      <AuthTemplate
        track={track}
        eyebrow={t.pages.signupCode.eyebrow}
        title={t.pages.signupCode.title}
        intro={t.pages.signupCode.intro}
      >
        <ErrorBox code={params["error"]} t={t.urlErrors} />
        <AccessCodeForm action={submitAccessCode} t={t.form} />
        <AuthLinks>
          <p>
            {t.links.noCode}{" "}
            <Link href={`/${track}#early-access`} className={textLinkClass}>
              {t.links.joinWaitlist}
            </Link>
          </p>
          <p>
            {t.links.haveAccount}{" "}
            <Link href="/login" className={textLinkClass}>
              {t.links.logIn}
            </Link>
          </p>
        </AuthLinks>
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate
      track={track}
      eyebrow={t.pages.signupAccount.eyebrow}
      title={t.pages.signupAccount.title}
      intro={t.pages.signupAccount.intro}
    >
      <ErrorBox code={params["error"]} t={t.urlErrors} />
      <GoogleSignIn t={t.form} />
      <PasswordForm mode="sign-up" action={signUpWithPassword} t={t.form} />
      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        {t.links.consentBefore}{" "}
        <Link href="/terms-of-service" className={textLinkClass}>
          {t.links.terms}
        </Link>{" "}
        {t.links.consentMiddle}{" "}
        <Link href="/privacy-policy" className={textLinkClass}>
          {t.links.privacy}
        </Link>
        {t.links.consentAfter}
      </p>
      <AuthLinks>
        <p>
          {t.links.haveAccount}{" "}
          <Link href="/login" className={textLinkClass}>
            {t.links.logIn}
          </Link>
        </p>
        <form action={changeAccessCode}>
          <button type="submit" className={`cursor-pointer ${textLinkClass}`}>
            {t.links.differentCode}
          </button>
        </form>
      </AuthLinks>
    </AuthTemplate>
  );
}
