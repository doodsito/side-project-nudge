import { type ReactNode } from "react";
import { PracticeHeader } from "@/components/organisms/practice-header";
import { SkipLink } from "@/components/atoms/skip-link";
import type { Step } from "@/lib/practice-scenario";

export function PracticeTemplate({ step, children }: { step: Step; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <PracticeHeader step={step} />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-10"
      >
        {children}
      </main>
    </div>
  );
}
