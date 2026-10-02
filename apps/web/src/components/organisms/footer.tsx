import { ConsentDialogLink } from "@c15t/nextjs/components/consent-dialog-link";
import Link from "next/link";
import { NudgeNextLogo } from "@/components/atoms/nudge-next-mark";
import { BRAND } from "@/lib/brand";

const linkClass = "text-muted-foreground hover:text-foreground";

/** Shown on every page from the root layout, so the legal pages and cookie settings are always one click away. */
export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <NudgeNextLogo />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {BRAND} is an educational simulation using virtual money. It is not financial advice, a
            recommendation or a suitability assessment. Investing involves risk, including the
            possible loss of capital.
          </p>
          <p className="mt-5 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BRAND}. All rights reserved.
          </p>
        </div>
        <nav
          className="flex flex-wrap content-start gap-x-6 gap-y-3 text-sm"
          aria-label="Legal and site information"
        >
          {(
            [
              ["Privacy", "/privacy-policy"],
              ["Terms", "/terms-of-service"],
              ["Legal", "/legal-notice"],
            ] as const
          ).map(([label, href]) => (
            <Link key={href} href={href} className={linkClass}>
              {label}
            </Link>
          ))}
          <ConsentDialogLink className={`cursor-pointer ${linkClass}`}>Cookies</ConsentDialogLink>
          <a href="/llms.txt" className={linkClass}>
            LLMs
          </a>
        </nav>
      </div>
    </footer>
  );
}
