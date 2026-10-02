import Link from "next/link";
import { type ReactNode } from "react";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { NudgeNextLogo } from "@/components/atoms/nudge-next-mark";
import { SkipLink } from "@/components/atoms/skip-link";
import { BRAND } from "@/lib/brand";

/** Sign-in pages: the logo, then one narrow card with a title. */
export function AuthTemplate({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <SkipLink />
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
    </>
  );
}
