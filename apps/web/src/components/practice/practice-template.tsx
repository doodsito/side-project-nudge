import { type ReactNode } from "react";
import { PracticeHeader } from "@/components/practice/practice-header";
import { SkipLink } from "@/components/layout/skip-link";

export function PracticeTemplate({
  current,
  total,
  children,
  labels,
}: {
  current: number;
  total: number;
  children: ReactNode;
  labels?: { skip: string; progress: string; leave: string };
}) {
  return (
    <div className="lesson-shell flex h-svh flex-col overflow-hidden bg-background">
      {labels ? <SkipLink label={labels.skip} /> : <SkipLink />}
      {labels ? (
        <PracticeHeader current={current} total={total} labels={labels} />
      ) : (
        <PracticeHeader current={current} total={total} />
      )}
      <main id="main-content" tabIndex={-1} className="flex min-h-0 flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}
