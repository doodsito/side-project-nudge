"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUser, House, Wallet } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

// Each tab is its own URL, so a tab can be bookmarked and the back button works.
const TABS = [
  { href: "/dashboard", tab: "home", icon: House },
  { href: "/dashboard/portfolio", tab: "portfolio", icon: Wallet },
  { href: "/dashboard/account", tab: "account", icon: CircleUser },
] as const;

export function DashboardTabs({
  tabs,
  tabsLabel,
  mobile = false,
  homeHref = "/dashboard",
}: {
  tabs: Dictionary["dashboard"]["tabs"];
  tabsLabel: string;
  mobile?: boolean;
  homeHref?: string;
}) {
  const pathname = usePathname();
  return (
    <nav
      aria-label={tabsLabel}
      className={
        mobile
          ? "border-t-2 border-[var(--nudge-learn-nav-border)] bg-[var(--nudge-learn-portfolio-canvas)]"
          : "border-b border-border"
      }
    >
      <ul
        className={
          mobile
            ? "flex min-h-[75px] items-center justify-between px-[18px] py-[9px]"
            : "-mb-px flex gap-1 overflow-x-auto"
        }
      >
        {TABS.map(({ href, tab, icon: Icon }) => {
          const targetHref = tab === "home" ? homeHref : href;
          const current =
            pathname === targetHref.split("?")[0] ||
            (tab !== "home" && pathname.startsWith(`${href}/`));
          return (
            <li key={href}>
              <Link
                href={targetHref}
                aria-current={current ? "page" : undefined}
                className={cn(
                  mobile
                    ? cn(
                        "flex h-14 flex-col items-center justify-center gap-1 rounded-[14px] text-xs transition-colors",
                        current
                          ? "w-[108px] border-2 border-[var(--nudge-learn-violet-300)] bg-[var(--nudge-learn-violet-100)] font-extrabold text-[var(--nudge-learn-violet-hover)]"
                          : "w-[96px] border-2 border-transparent font-normal text-[var(--nudge-learn-neutral-600)]",
                      )
                    : "inline-flex min-h-11 items-center gap-2 border-b-2 px-4 text-sm font-bold transition-colors",
                  "focus-visible:rounded-t-lg focus-visible:outline-2 focus-visible:outline-ring",
                  !mobile && current
                    ? "border-primary text-primary"
                    : !mobile
                      ? "border-transparent text-muted-foreground hover:text-foreground"
                      : "",
                )}
              >
                <Icon className={mobile ? "size-[22px]" : "size-4"} aria-hidden />
                {tabs[tab]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
