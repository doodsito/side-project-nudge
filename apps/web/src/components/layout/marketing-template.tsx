import { type ReactNode } from "react";
import "./landing-colors.css";
import { Navbar } from "@/components/layout/navbar";
import { SkipLink } from "@/components/layout/skip-link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Track } from "@/lib/tracks";

export function MarketingTemplate({
  track,
  t,
  children,
}: {
  track: Track;
  t: Dictionary;
  children: ReactNode;
}) {
  return (
    <>
      <SkipLink label={t.skipLink} />
      <Navbar track={track} t={t.nav} />
      <main id="main-content" data-nudge-landing tabIndex={-1}>
        {children}
      </main>
    </>
  );
}
