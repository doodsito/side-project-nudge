import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NudgeLogo } from "@/components/atoms/nudge-logo";
import type { Step } from "@/lib/practice-scenario";

export function PracticeHeader({ step }: { step: Step }) {
  const steps = [
    { key: "scenario", label: "Decide" },
    { key: "feedback", label: "Learn" },
    { key: "summary", label: "Recap" },
  ];
  const visibleSteps =
    step === "profile" ? [{ key: "profile", label: "Reflect" }, ...steps] : steps;
  const index = visibleSteps.findIndex((item) => item.key === step);
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
          <ArrowLeft className="size-4" aria-hidden="true" /> Return{" "}
          <span className="hidden sm:inline">to Nudge home</span>
        </Link>
      </div>
      <ol
        aria-label="Practice steps"
        className={`mx-auto grid max-w-5xl gap-2 px-5 pb-3 text-xs sm:px-8 ${step === "profile" ? "grid-cols-4" : "grid-cols-3"}`}
      >
        {visibleSteps.map((item, i) => (
          <li
            key={item.key}
            aria-current={step === item.key ? "step" : undefined}
            className={i <= index ? "font-bold text-primary" : "text-muted-foreground"}
          >
            <span className="block">
              {i + 1}. {item.label}
            </span>
            <span
              aria-hidden="true"
              className={`mt-2 block h-1 rounded-full ${i <= index ? "bg-primary" : "bg-muted"}`}
            />
          </li>
        ))}
      </ol>
    </header>
  );
}
