import type { Metadata } from "next";
import Link from "next/link";
import { PasswordForm } from "@/components/auth/password-form";
import { AuthTemplate } from "@/components/auth/auth-template";
import { textLinkClass } from "@/components/shared/text-link";
import { getMember } from "@/lib/auth";
import { BRAND } from "@/lib/brand";
import { signInWithPassword } from "../actions";
import { AlreadySignedIn, AuthLinks, ErrorBox, GoogleSignIn } from "../shared";

export const metadata: Metadata = {
  title: `Log in | ${BRAND}`,
  description: `Log in to your ${BRAND} account.`,
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const [member, params] = await Promise.all([getMember(), searchParams]);
  if (member) return <AlreadySignedIn member={member} />;
  return (
    <AuthTemplate eyebrow="Welcome back" title="Log in" intro="Use the account you created.">
      <ErrorBox code={params["error"]} />
      <GoogleSignIn />
      <PasswordForm mode="sign-in" action={signInWithPassword} />
      <AuthLinks>
        <p>
          <Link href="/forgot-password" className={textLinkClass}>
            Forgot your password?
          </Link>
        </p>
        <p>
          New here?{" "}
          <Link href="/signup" className={textLinkClass}>
            Sign up
          </Link>
        </p>
      </AuthLinks>
    </AuthTemplate>
  );
}
