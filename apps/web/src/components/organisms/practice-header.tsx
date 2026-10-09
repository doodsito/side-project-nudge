import Link from "next/link";
import { X } from "lucide-react";
import { NudgeNextMark } from "@/components/atoms/nudge-next-mark";

export function PracticeHeader({ current, total }: { current: number; total: number }) {
  const progress = Math.max(0, Math.min(100, ((current - 1) / (total - 1)) * 100));

  return (
    <header className="relative z-40 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-4xl items-center gap-4 px-5 sm:px-8">
        <NudgeNextMark className="size-8 shrink-0" />
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted" aria-hidden="true">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="sr-only">
          Lesson progress: step {current} of {total}
        </span>
        <Link
          href="/dashboard/courses/financial-foundation"
          aria-label="Leave lesson"
          className="grid size-11 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
