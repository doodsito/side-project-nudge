import type { Metadata } from "next";
import Link from "next/link";
import { PasswordForm } from "@/components/auth/password-form";
import { AuthTemplate } from "@/components/auth/auth-template";
import { textLinkClass } from "@/components/shared/text-link";
import { getMember, getVisitorTrack } from "@/lib/auth";
import { BRAND } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";
import { signInWithPassword } from "../actions";
import { AlreadySignedIn, AuthLinks, ErrorBox, GoogleSignIn } from "../shared";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getVisitorTrack()).auth.pages.login;
  return {
    title: `${t.metaTitle} | ${BRAND}`,
    description: t.metaDescription,
    robots: { index: false, follow: false },
  };
}

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const [member, params, track] = await Promise.all([getMember(), searchParams, getVisitorTrack()]);
  if (member) return <AlreadySignedIn member={member} />;
  const t = getDictionary(track).auth;
  return (
    <AuthTemplate
      track={track}
      eyebrow={t.pages.login.eyebrow}
      title={t.pages.login.title}
      intro={t.pages.login.intro}
    >
      <ErrorBox code={params["error"]} t={t.urlErrors} />
      <GoogleSignIn t={t.form} />
      <PasswordForm mode="sign-in" action={signInWithPassword} t={t.form} />
      <AuthLinks>
        <p>
          <Link href="/forgot-password" className={textLinkClass}>
            {t.links.forgot}
          </Link>
        </p>
        <p>
          {t.links.newHere}{" "}
          <Link href="/signup" className={textLinkClass}>
            {t.links.signUp}
          </Link>
        </p>
      </AuthLinks>
    </AuthTemplate>
  );
}
