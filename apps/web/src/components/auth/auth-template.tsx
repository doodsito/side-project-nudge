import Link from "next/link";
import { type ReactNode } from "react";
import { Eyebrow } from "@/components/shared/eyebrow";
import { NudgeNextLogo } from "@/components/brand/nudge-next-mark";
import { SkipLink } from "@/components/layout/skip-link";
import { BRAND } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";
import { TRACK_INFO, type Track } from "@/lib/tracks";

/** Sign-in pages: the logo, then one narrow card with a title, in the track's language. */
export function AuthTemplate({
  track,
  eyebrow,
  title,
  intro,
  children,
}: {
  track: Track;
  eyebrow: string;
  title: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <div lang={TRACK_INFO[track].lang}>
      <SkipLink label={getDictionary(track).skipLink} />
      <header className="px-5 pt-6 sm:px-8">
        <div className="mx-auto max-w-md">
          <Link href="/" aria-label={`${BRAND} home`} className="inline-flex">
            <NudgeNextLogo />
          </Link>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="px-5 pt-12 pb-20 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance">{title}</h1>
          <div className="mt-3 leading-relaxed text-pretty text-muted-foreground">{intro}</div>
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
