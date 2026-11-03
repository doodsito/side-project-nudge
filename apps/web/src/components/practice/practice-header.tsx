"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useHasSession } from "@/hooks/use-has-session";
import type { Dictionary } from "@/lib/dictionaries";

export function PracticeHeader({
  current,
  total,
  copy,
  exitHref = "/dashboard",
}: {
  current: number;
  total: number;
  copy: Dictionary["learning"]["shared"];
  exitHref?: string;
}) {
  const progress = Math.max(0, Math.min(100, (current / total) * 100));
  // /practice needs no account: a visitor without one goes home, not to the log-in page.
  const signedIn = useHasSession();

  return (
    <header className="relative z-40 border-b border-border bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto grid h-16 w-full max-w-4xl grid-cols-[auto_minmax(0,1fr)_2.75rem] items-center gap-3 px-5 sm:px-8">
        <span className="text-xs font-bold tabular-nums text-muted-foreground" aria-hidden="true">
          {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div
          className="h-1.5 min-w-0 overflow-hidden rounded-full bg-primary-soft"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={current}
          aria-label={copy.lessonProgress(current, total)}
        >
          <div
            className="h-full rounded-full bg-mint transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <Link
          href={signedIn ? exitHref : "/"}
          aria-label={copy.leaveLesson}
          className="grid size-11 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
