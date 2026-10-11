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
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import { signInWithGoogle } from "./actions";

/** The `error` the auth callback and the actions add to the URL, explained. */
export function ErrorBox({ code, t }: { code: unknown; t: Dictionary["auth"]["urlErrors"] }) {
  const error = typeof code === "string" ? t[code] : undefined;
  if (!error) return null;
  return (
    <Alert variant="destructive" className="mb-6">
      <CircleAlert aria-hidden />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}

export function GoogleSignIn({ t }: { t: Dictionary["auth"]["form"] }) {
  if (!GOOGLE_SIGN_IN_ENABLED) return null;
  return (
    <>
      <GoogleSignInButton action={signInWithGoogle} t={t} />
      <div className="my-6 flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase">
        <Separator className="flex-1" />
        {t.or}
        <Separator className="flex-1" />
      </div>
    </>
  );
}

export function AuthLinks({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">{children}</div>;
}

/** Shown instead of a form when the visitor is already logged in, in their track's language. */
export function AlreadySignedIn({ member }: { member: Member }) {
  const dictionary = getDictionary(member.track);
  const t = dictionary.auth.pages.signedIn;
  return (
    <AuthTemplate
      track={member.track}
      eyebrow={t.eyebrow}
      title={t.title}
      intro={
        <>
          {t.intro} <strong className="text-foreground">{member.email}</strong>.
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <Button asChild size="lg" className="group w-full">
          <Link href="/dashboard">
            {t.open} {BRAND}{" "}
            <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Button>
        <SignOutButton
          action={signOut}
          label={dictionary.dashboard.logOut}
          pendingLabel={dictionary.dashboard.logOutPending}
          className="h-12 w-full"
        />
      </div>
    </AuthTemplate>
  );
}
