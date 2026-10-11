import { type ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { SkipLink } from "@/components/layout/skip-link";

export function MarketingTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}
