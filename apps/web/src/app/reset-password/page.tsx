import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PasswordForm } from "@/components/auth/password-form";
import { AuthTemplate } from "@/components/auth/auth-template";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { getVisitorTrack } from "@/lib/auth";
import { BRAND } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";
import { updatePassword } from "./actions";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getVisitorTrack()).auth.pages.reset;
  return { title: `${t.metaTitle} | ${BRAND}`, robots: { index: false, follow: false } };
}

// Reached from the password reset email, through /auth/callback, which signs the person in.
export default async function ResetPasswordPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/forgot-password?error=reset");
  const track = await getVisitorTrack();
  const t = getDictionary(track).auth;
  return (
    <AuthTemplate
      track={track}
      eyebrow={t.pages.reset.eyebrow}
      title={t.pages.reset.title}
      intro={t.pages.reset.intro}
    >
      <PasswordForm mode="new-password" action={updatePassword} t={t.form} />
    </AuthTemplate>
  );
}
