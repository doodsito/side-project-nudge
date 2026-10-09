import { type ReactNode } from "react";
import { PracticeHeader } from "@/components/organisms/practice-header";
import { SkipLink } from "@/components/atoms/skip-link";

export function PracticeTemplate({
  current,
  total,
  children,
}: {
  current: number;
  total: number;
  children: ReactNode;
}) {
  return (
    <div className="lesson-shell flex h-svh flex-col overflow-hidden bg-background">
      <SkipLink />
      <PracticeHeader current={current} total={total} />
      <main id="main-content" tabIndex={-1} className="flex min-h-0 flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}
