import Link from "next/link";
import { type ReactNode } from "react";
import { NudgeNextLogo } from "@/components/atoms/nudge-next-mark";
import { SkipLink } from "@/components/atoms/skip-link";
import { DashboardTabs } from "@/components/molecules/dashboard-tabs";
import { SignOutButton } from "@/components/molecules/sign-out-button";
import { BRAND } from "@/lib/brand";

/** The signed-in app: logo and sign-out, the tabs, then the tab's content. */
export function DashboardTemplate({
  signOut,
  children,
}: {
  signOut: () => Promise<void>;
  children: ReactNode;
}) {
  return (
    <>
      <SkipLink />
      <header className="px-5 pt-6 sm:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Link href="/dashboard" aria-label={`${BRAND} dashboard`} className="inline-flex">
            <NudgeNextLogo />
          </Link>
          <SignOutButton action={signOut} className="h-10 px-4 text-sm" />
        </div>
        <div className="mx-auto mt-6 max-w-5xl">
          <DashboardTabs />
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="px-5 pt-10 pb-20 sm:px-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </>
  );
}
