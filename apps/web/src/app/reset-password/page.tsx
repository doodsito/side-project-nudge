import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PasswordForm } from "@/components/molecules/password-form";
import { AuthTemplate } from "@/components/templates/auth-template";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { BRAND } from "@/lib/brand";
import { updatePassword } from "./actions";

export const metadata: Metadata = {
  title: `Choose a new password | ${BRAND}`,
  robots: { index: false, follow: false },
};

// Reached from the password reset email, through /auth/callback, which signs the person in.
export default async function ResetPasswordPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/get-started?step=sign-in&error=link");
  return (
    <AuthTemplate
      eyebrow="Password reset"
      title="Choose a new password"
      intro="You’ll use it with your email address to sign in."
    >
      <PasswordForm mode="new-password" action={updatePassword} />
    </AuthTemplate>
  );
}
