import { ConsentDialogLink } from "@c15t/nextjs/components/consent-dialog-link";
import Link from "next/link";
import { NudgeLogo } from "@/components/atoms/nudge-logo";
import { BRAND } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <NudgeLogo small />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Nudge is designed for educational purposes and does not provide personalised investment
            advice. Investing involves risk, including the possible loss of capital.
          </p>
          <p className="mt-5 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BRAND}. All rights reserved.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm" aria-label="Footer navigation">
          {(
            [
              ["Try a challenge", "/#challenge"],
              ["How it works", "/#how-it-works"],
              ["FAQ", "/#faq"],
              ["Cookie policy", "/cookies"],
            ] as const
          ).map(([label, href]) => (
            <Link key={href} href={href} className="text-muted-foreground hover:text-foreground">
              {label}
            </Link>
          ))}
          <ConsentDialogLink className="cursor-pointer self-start text-left text-muted-foreground hover:text-foreground">
            Cookie settings
          </ConsentDialogLink>
        </nav>
      </div>
    </footer>
  );
}
