import type { Metadata } from "next";
import Link from "next/link";
import { ResetRequestForm } from "@/components/auth/reset-request-form";
import { AuthTemplate } from "@/components/auth/auth-template";
import { getMember } from "@/lib/auth";
import { BRAND } from "@/lib/brand";
import { requestPasswordReset } from "../actions";
import { AlreadySignedIn, AuthLinks, ErrorBox, linkClass } from "../shared";

export const metadata: Metadata = {
  title: `Forgot your password? | ${BRAND}`,
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage({ searchParams }: PageProps<"/forgot-password">) {
  const [member, params] = await Promise.all([getMember(), searchParams]);
  if (member) return <AlreadySignedIn member={member} />;
  return (
    <AuthTemplate
      eyebrow="Password reset"
      title="Forgot your password?"
      intro="Enter your email address and we’ll send you a link to choose a new one."
    >
      <ErrorBox code={params["error"]} />
      <ResetRequestForm action={requestPasswordReset} />
      <AuthLinks>
        <p>
          Remembered it?{" "}
          <Link href="/login" className={linkClass}>
            Log in
          </Link>
        </p>
      </AuthLinks>
    </AuthTemplate>
  );
}
