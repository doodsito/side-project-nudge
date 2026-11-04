import Link from "next/link";
import Image from "next/image";
import "@/components/layout/beta-colors.css";
import { type ReactNode } from "react";
import { SkipLink } from "@/components/layout/skip-link";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import { FeedbackProvider } from "@/components/shared/feedback-widget";
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
      <div className="min-h-screen bg-[var(--nudge-learn-canvas)] lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="sticky top-0 hidden h-screen border-r-2 border-border bg-surface px-5 py-6 lg:flex lg:flex-col">
          <Link
            href={homeHref}
            aria-label={`${BRAND} ${t.home}`}
            className="mb-5 inline-flex items-center gap-2 self-start pl-2"
          >
            <Image src="/brand/learn-map/logo-mark.svg" alt="" width={32} height={32} />
            <span className="font-display text-2xl font-extrabold tracking-[-0.04em] text-foreground">
              {BRAND.toLowerCase()}
            </span>
          </Link>
          <DashboardTabs tabs={t.tabs} tabsLabel={t.tabsLabel} homeHref={homeHref} />
          {!preview && signOut && (
            <div className="mt-auto pt-6">
              <SignOutButton
                action={signOut}
                label={t.logOut}
                pendingLabel={t.logOutPending}
                iconSrc="/brand/learn-map/logout.svg"
                className="h-10 w-full justify-start border-0 bg-transparent px-3 text-sm shadow-none hover:bg-muted"
              />
            </div>
          )}
        </aside>
        <div className="min-w-0">
          <header className="flex h-16 items-center justify-between px-4 pt-[env(safe-area-inset-top)] lg:hidden">
            <Link
              href={homeHref}
              aria-label={`${BRAND} ${t.home}`}
              className="inline-flex items-center gap-2"
            >
              <Image src="/brand/learn-map/logo-mark.svg" alt="" width={32} height={32} />
              <span className="font-display text-xl font-extrabold tracking-[-0.04em] text-foreground">
                {BRAND.toLowerCase()}
              </span>
            </Link>
            <span
              aria-label={t.streakLabel}
              title={t.streakLabel}
              className="inline-flex h-10 w-[62px] items-center justify-center gap-1 rounded-xl border border-border bg-surface px-3 text-sm font-extrabold"
            >
              <Image src="/brand/learn-map/flame-mobile.svg" alt="" width={20} height={20} />
            </span>
          </header>
          <main
            id="main-content"
            data-nudge-beta
            tabIndex={-1}
            className="min-h-[calc(100vh-4rem)] px-4 pt-0 pb-[calc(5rem+env(safe-area-inset-bottom))] lg:min-h-screen lg:p-0"
          >
            {children}
          </main>
          <div className="fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] shadow-lift lg:hidden">
            <DashboardTabs tabs={t.tabs} tabsLabel={t.tabsLabel} homeHref={homeHref} mobile />
          </div>
        </div>
      </div>
    </>
  );
  return preview ? (
    content
  ) : (
    <FeedbackProvider t={t.feedback} showFloatingTrigger={false}>
      {content}
    </FeedbackProvider>
  );
}
