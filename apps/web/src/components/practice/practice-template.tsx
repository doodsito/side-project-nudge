import { type ReactNode } from "react";
import { PracticeHeader } from "@/components/practice/practice-header";
import { SkipLink } from "@/components/layout/skip-link";
import type { Dictionary } from "@/lib/dictionaries";

export function PracticeTemplate({
  current,
  total,
  copy,
  skipLink,
  children,
}: {
  current: number;
  total: number;
  copy: Dictionary["learning"]["shared"];
  skipLink: string;
  children: ReactNode;
}) {
  return (
    <div className="lesson-shell flex h-svh flex-col overflow-hidden bg-background">
      <SkipLink label={skipLink} />
      <PracticeHeader current={current} total={total} copy={copy} />
      <main id="main-content" tabIndex={-1} className="flex min-h-0 flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}
