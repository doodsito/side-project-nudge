import Link from "next/link";
import { type ReactNode } from "react";
import { NudgeNextLogo } from "@/components/brand/nudge-next-mark";
import { SkipLink } from "@/components/layout/skip-link";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import { FeedbackHeaderButton, FeedbackProvider } from "@/components/dashboard/feedback-widget";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { BRAND } from "@/lib/brand";
import type { Dictionary } from "@/lib/dictionaries";

/** The signed-in app: logo and sign-out, the tabs, then the tab's content. */
export function DashboardTemplate({
  signOut,
  t,
  skipLink,
  children,
}: {
  signOut: () => Promise<void>;
  t: Dictionary["dashboard"];
  skipLink: string;
  children: ReactNode;
}) {
  return (
    <FeedbackProvider t={t.feedback}>
      <SkipLink label={skipLink} />
      <header className="px-5 pt-6 sm:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Link href="/dashboard" aria-label={`${BRAND} ${t.home}`} className="inline-flex">
            <NudgeNextLogo />
          </Link>
          <div className="flex items-center gap-2">
            <FeedbackHeaderButton label={t.feedback.trigger} />
            <SignOutButton
              action={signOut}
              label={t.logOut}
              pendingLabel={t.logOutPending}
              className="h-10 px-4 text-sm"
            />
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-5xl">
          <DashboardTabs t={t} />
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="px-5 pt-10 pb-20 sm:px-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </FeedbackProvider>
  );
}
