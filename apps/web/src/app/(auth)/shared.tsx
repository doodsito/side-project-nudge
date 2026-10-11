// Pieces shared by /login, /signup and /forgot-password.
import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowRight, CircleAlert } from "lucide-react";
import { AuthTemplate } from "@/components/auth/auth-template";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signOut } from "@/app/dashboard/actions";
import { GOOGLE_SIGN_IN_ENABLED } from "@/lib/auth-rules";
import { type Member } from "@/lib/auth";
import { BRAND } from "@/lib/brand";
import { signInWithGoogle } from "./actions";

// The `error` the auth callback and the actions add to the URL.
const ERRORS: Record<string, string> = {
  access: "This account doesn’t have access yet. Enter your invitation code, then log in again.",
  auth: "The log-in didn’t finish. Please try again.",
  link: "This link has expired or was opened in another browser. If you just confirmed your email, log in with your password.",
  reset:
    "This reset link has expired, was already used or was opened in another browser. Ask for a new one below, then open it in this browser.",
};

export function ErrorBox({ code }: { code: unknown }) {
  const error = typeof code === "string" ? ERRORS[code] : undefined;
  if (!error) return null;
  return (
    <Alert variant="destructive" className="mb-6">
      <CircleAlert aria-hidden />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}

export function GoogleSignIn() {
  if (!GOOGLE_SIGN_IN_ENABLED) return null;
  return (
    <>
      <GoogleSignInButton action={signInWithGoogle} />
      <div className="my-6 flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase">
        <Separator className="flex-1" />
        or
        <Separator className="flex-1" />
      </div>
    </>
  );
}

export function AuthLinks({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">{children}</div>;
}

/** Shown instead of a form when the visitor is already logged in. */
export function AlreadySignedIn({ member }: { member: Member }) {
  return (
    <AuthTemplate
      eyebrow="Logged in"
      title="You’re already logged in"
      intro={
        <>
          You’re logged in as <strong className="text-foreground">{member.email}</strong>.
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <Button asChild size="lg" className="group w-full">
          <Link href="/dashboard">
            Open {BRAND}{" "}
            <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Button>
        <SignOutButton action={signOut} className="h-12 w-full" />
      </div>
    </AuthTemplate>
  );
}
