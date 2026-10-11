"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CircleUser, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

// Each tab is its own URL, so a tab can be bookmarked and the back button works.
const TABS = [
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: Wallet },
  { href: "/dashboard/account", label: "Account", icon: CircleUser },
] as const;

export function DashboardTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" className="border-b border-border">
      <ul className="-mb-px flex gap-1 overflow-x-auto">
        {TABS.map(({ href, label, icon: Icon }) => {
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
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
