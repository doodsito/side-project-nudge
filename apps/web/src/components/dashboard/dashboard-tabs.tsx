"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CircleUser, Wallet } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

// Each tab is its own URL, so a tab can be bookmarked and the back button works.
const TABS = [
  { href: "/dashboard/courses", tab: "courses", icon: BookOpen },
  { href: "/dashboard/portfolio", tab: "portfolio", icon: Wallet },
  { href: "/dashboard/account", tab: "account", icon: CircleUser },
] as const;

export function DashboardTabs({ t }: { t: Dictionary["dashboard"] }) {
  const pathname = usePathname();
  return (
    <nav aria-label={t.tabsLabel} className="border-b border-border">
      <ul className="-mb-px flex gap-1 overflow-x-auto">
        {TABS.map(({ href, tab, icon: Icon }) => {
          const current = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 border-b-2 px-4 text-sm font-bold transition-colors",
                  "focus-visible:rounded-t-lg focus-visible:outline-2 focus-visible:outline-ring",
                  current
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {t.tabs[tab]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
