"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CircleUser, House, Wallet } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

// Each tab is its own URL, so a tab can be bookmarked and the back button works.
const TABS = [
  { href: "/dashboard", tab: "home", icon: House },
  { href: "/dashboard/courses", tab: "courses", icon: BookOpen },
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
      className={mobile ? "border-t border-border bg-surface" : "border-b border-border"}
    >
      <ul className={mobile ? "grid grid-cols-4" : "-mb-px flex gap-1 overflow-x-auto"}>
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
                    ? "flex min-h-14 flex-col items-center justify-center gap-1 border-t-2 px-1 py-1 text-xs font-semibold transition-colors"
                    : "inline-flex min-h-11 items-center gap-2 border-b-2 px-4 text-sm font-bold transition-colors",
                  "focus-visible:rounded-t-lg focus-visible:outline-2 focus-visible:outline-ring",
                  current
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {tabs[tab]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
