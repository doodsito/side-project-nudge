import { type ReactNode } from "react";
import { PracticeHeader } from "@/components/organisms/practice-header";
import type { Step } from "@/lib/practice-scenario";

export function PracticeTemplate({ step, children }: { step: Step; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <PracticeHeader step={step} />
      <main className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-10">{children}</main>
      <footer className="border-t border-border px-5 py-7">
        <p className="mx-auto max-w-5xl text-xs leading-relaxed text-muted-foreground">
          This is an educational simulation using virtual money. It is not a suitability assessment,
          financial advice or a recommendation. Investing involves risk, including the possible loss
          of capital.
        </p>
      </footer>
    </div>
  );
}
