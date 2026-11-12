"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

// Each tab is its own URL, so a tab can be bookmarked and the back button works.
const TABS = [
  { href: "/dashboard", tab: "home", icon: "house" },
  { href: "/dashboard/courses", tab: "courses", icon: "book" },
  { href: "/dashboard/portfolio", tab: "portfolio", icon: "wallet" },
  { href: "/dashboard/account", tab: "account", icon: "account" },
] as const;

export function DashboardTabs({
  tabs,
  tabsLabel,
  mobile = false,
  homeHref = "/dashboard",
  coursesHref = "/dashboard/courses",
  portfolioHref = "/dashboard/portfolio",
  activeTab,
}: {
  tabs: Dictionary["dashboard"]["tabs"];
  tabsLabel: string;
  mobile?: boolean;
  homeHref?: string;
  coursesHref?: string;
  portfolioHref?: string;
  activeTab?: (typeof TABS)[number]["tab"] | undefined;
}) {
  const pathname = usePathname();
  return (
    <nav
      aria-label={tabsLabel}
      className={mobile ? "border-t border-border bg-surface px-1.5 py-2" : "w-full"}
    >
      <ul className={mobile ? "grid grid-cols-4" : "grid gap-2"}>
        {TABS.map(({ href, tab, icon }) => {
          const targetHref =
            tab === "home"
              ? homeHref
              : tab === "courses"
                ? coursesHref
                : tab === "portfolio"
                  ? portfolioHref
                  : href;
          const current = activeTab
            ? tab === activeTab
            : pathname === targetHref.split("?")[0] ||
              (tab !== "home" && pathname.startsWith(`${href}/`));
          return (
            <li key={href}>
              <Link
                href={targetHref}
                aria-current={current ? "page" : undefined}
                className={cn(
                  mobile
                    ? "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1 text-[0.65rem] font-semibold transition-colors"
                    : "flex min-h-12 items-center gap-3 rounded-[14px] border-2 px-3 text-sm font-bold transition-colors",
                  "focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-ring",
                  current
                    ? mobile
                      ? "bg-[var(--nudge-learn-violet-100)] text-[var(--nudge-learn-violet-700)]"
                      : "border-[var(--nudge-learn-violet-300)] bg-[var(--nudge-learn-violet-100)] text-[var(--nudge-learn-violet-700)]"
                    : mobile
                      ? "text-muted-foreground hover:text-foreground"
                      : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Image
                  src={`/brand/learn-map/${mobile ? `${icon}-mobile` : tab === "home" ? "house-active" : icon}.svg`}
                  alt=""
                  width={24}
                  height={24}
                  className={mobile ? "size-5" : "size-6"}
                />
                {tabs[tab]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
