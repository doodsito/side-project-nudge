import Link from "next/link";
import { type ReactNode } from "react";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { NudgeNextLogo } from "@/components/atoms/nudge-next-mark";
import { SkipLink } from "@/components/atoms/skip-link";
import { BRAND } from "@/lib/brand";

// Styles the policy text, so a legal page only holds headings, paragraphs, lists and links.
const prose = [
  "[&>h2]:mt-12 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-extrabold",
  "[&>p]:mt-4 [&>p]:leading-relaxed [&>p]:text-muted-foreground",
  "[&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul]:leading-relaxed [&>ul]:text-muted-foreground",
  "[&_a]:font-semibold [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
].join(" ");

export function LegalTemplate({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <SkipLink />
      <header className="px-5 pt-6 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/" aria-label={`${BRAND} home`} className="inline-flex">
            <NudgeNextLogo />
          </Link>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="px-5 pt-14 pb-20 sm:px-8 sm:pt-20 sm:pb-28">
        <article className="mx-auto max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {updated}</p>
          <div className={prose}>{children}</div>
        </article>
      </main>
    </>
  );
}
