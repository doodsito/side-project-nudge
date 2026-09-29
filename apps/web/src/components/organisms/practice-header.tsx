import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NudgeLogo } from "@/components/atoms/nudge-logo";
import type { Step } from "@/lib/practice-scenario";

export function PracticeHeader({ step }: { step: Step }) {
  const index = ["profile", "scenario", "feedback", "summary"].indexOf(step) + 1;
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 sm:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <NudgeLogo small />
          <span className="hidden rounded-full bg-mint-soft px-2 py-1 text-[9px] font-bold uppercase text-market-up sm:inline">
            Educational simulation
          </span>
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Return{" "}
          <span className="hidden sm:inline">to Nudge home</span>
        </Link>
      </div>
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-[width] duration-700"
          style={{ width: `${index * 25}%` }}
        />
      </div>
    </header>
  );
}
