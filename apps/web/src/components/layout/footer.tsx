"use client";

import { ConsentDialogLink } from "@c15t/nextjs/components/consent-dialog-link";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NudgeNextLogo } from "@/components/brand/nudge-next-mark";
import { TrackFlag } from "@/components/shared/track-option";
import { saveTrack, useTrackCookie } from "@/hooks/use-track-cookie";
import { BRAND } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";
import { trackFromPath, TRACKS } from "@/lib/tracks";
import { cn } from "@/lib/utils";

const linkClass = "text-muted-foreground hover:text-foreground";

/**
 * Shown on every page from the root layout, so the legal pages, the cookie
 * settings and the choice of version are always one click away. In the
 * language of the page's track, or of the visitor's choice elsewhere.
 */
export function Footer() {
  const pageTrack = trackFromPath(usePathname());
  const savedTrack = useTrackCookie();
  const current = pageTrack ?? savedTrack ?? null;
  const dictionary = getDictionary(current ?? "us");
  const t = dictionary.footer;
  return (
    <footer className="site-footer border-t border-border bg-background px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <NudgeNextLogo />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t.disclaimer}
          </p>
          <p className="mt-5 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BRAND}. {t.rights}
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <nav className="flex flex-wrap content-start gap-x-6 gap-y-3 text-sm" aria-label={t.nav}>
            {(
              [
                [t.privacy, "/privacy-policy"],
                [t.terms, "/terms-of-service"],
                [t.legal, "/legal-notice"],
              ] as const
            ).map(([label, href]) => (
              <Link key={href} href={href} className={linkClass}>
                {label}
              </Link>
            ))}
            <ConsentDialogLink className={`cursor-pointer ${linkClass}`}>
              {t.cookies}
            </ConsentDialogLink>
            <a href="/llms.txt" className={linkClass}>
              LLMs
            </a>
          </nav>
          <nav className="flex flex-wrap items-center gap-2 text-sm" aria-label={t.version}>
            {TRACKS.map((track) => (
              <Link
                key={track}
                href={`/${track}`}
                onClick={() => saveTrack(track)}
                aria-current={track === current ? "true" : undefined}
                className={cn(
                  "inline-flex min-h-9 items-center gap-2 rounded-full border px-3 font-semibold transition-colors",
                  track === current
                    ? "border-primary bg-primary-soft text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                <TrackFlag track={track} small />
                {dictionary.tracks.options[track].country}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
