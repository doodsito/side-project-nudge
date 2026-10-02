import { type ReactNode } from "react";
import { Navbar } from "@/components/organisms/navbar";
import { SkipLink } from "@/components/atoms/skip-link";

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
