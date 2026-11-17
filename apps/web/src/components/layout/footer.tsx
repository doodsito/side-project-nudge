"use client";

import { ConsentDialogLink } from "@c15t/nextjs/components/consent-dialog-link";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NudgeNextLogo } from "@/components/brand/nudge-next-mark";
import { BRAND } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";
import { DEFAULT_TRACK, trackFromPath, type Track } from "@/lib/tracks";

const linkClass = "text-muted-foreground hover:text-foreground";

/** Shared legal links; use the page's language or the browser-derived default. */
export function Footer({ initialTrack }: { initialTrack: Track | null }) {
  const pageTrack = trackFromPath(usePathname());
  const current = pageTrack ?? initialTrack ?? DEFAULT_TRACK;
  const dictionary = getDictionary(current);
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
        <div>
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
        </div>
      </div>
    </footer>
  );
}
