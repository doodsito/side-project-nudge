import type { Metadata } from "next";
import Link from "next/link";
import { ResetRequestForm } from "@/components/auth/reset-request-form";
import { AuthTemplate } from "@/components/auth/auth-template";
import { textLinkClass } from "@/components/shared/text-link";
import { getMember, getVisitorTrack } from "@/lib/auth";
import { BRAND } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";
import { requestPasswordReset } from "../actions";
import { AlreadySignedIn, AuthLinks, ErrorBox } from "../shared";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getVisitorTrack()).auth.pages.forgot;
  return { title: `${t.metaTitle} | ${BRAND}`, robots: { index: false, follow: false } };
}

export default async function ForgotPasswordPage({ searchParams }: PageProps<"/forgot-password">) {
  const [member, params, track] = await Promise.all([getMember(), searchParams, getVisitorTrack()]);
  if (member) return <AlreadySignedIn member={member} />;
  const t = getDictionary(track).auth;
  return (
    <AuthTemplate
      track={track}
      eyebrow={t.pages.forgot.eyebrow}
      title={t.pages.forgot.title}
      intro={t.pages.forgot.intro}
    >
      <ErrorBox code={params["error"]} t={t.urlErrors} />
      <ResetRequestForm action={requestPasswordReset} t={t.form} />
      <AuthLinks>
        <p>
          {t.links.remembered}{" "}
          <Link href="/login" className={textLinkClass}>
            {t.links.logIn}
          </Link>
        </p>
      </AuthLinks>
    </AuthTemplate>
  );
}
