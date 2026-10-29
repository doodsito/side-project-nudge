import Link from "next/link";
import "@/components/layout/beta-colors.css";
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
  preview = false,
  homeHref = "/dashboard",
}: {
  t: Dictionary["dashboard"];
  skipLink: string;
  children: ReactNode;
} & (
  | { preview: true; signOut?: never; homeHref: string }
  | { preview?: false; signOut: () => Promise<void>; homeHref?: never }
)) {
  const content = (
    <>
      <SkipLink label={skipLink} />
      <header className="px-5 pt-[calc(1.25rem+env(safe-area-inset-top))] sm:px-8 sm:pt-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Link href={homeHref} aria-label={`${BRAND} ${t.home}`} className="inline-flex">
            <NudgeNextLogo />
          </Link>
          {!preview && signOut && (
            <div className="hidden items-center gap-2 sm:flex">
              <FeedbackHeaderButton label={t.feedback.trigger} />
              <SignOutButton
                action={signOut}
                label={t.logOut}
                pendingLabel={t.logOutPending}
                className="h-10 px-4 text-sm"
              />
            </div>
          )}
        </div>
        <div className="mx-auto mt-6 hidden max-w-5xl sm:block">
          <DashboardTabs tabs={t.tabs} tabsLabel={t.tabsLabel} homeHref={homeHref} />
        </div>
      </header>
      <main
        id="main-content"
        data-nudge-beta
        tabIndex={-1}
        className="px-5 pt-6 pb-[calc(5rem+env(safe-area-inset-bottom))] sm:px-8 sm:pt-10 sm:pb-20"
      >
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
      <div className="fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] shadow-lift sm:hidden">
        <DashboardTabs tabs={t.tabs} tabsLabel={t.tabsLabel} homeHref={homeHref} mobile />
      </div>
    </>
  );
  return preview ? content : <FeedbackProvider t={t.feedback}>{content}</FeedbackProvider>;
}
