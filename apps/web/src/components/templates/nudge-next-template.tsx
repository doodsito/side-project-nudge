import type { ReactNode } from "react";
import { NudgeNextMark } from "@/components/atoms/nudge-next-mark";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { nudgeCopy, type NudgeLocale } from "@/lib/nudge-next-copy";

export function NudgeNextTemplate({
  locale,
  onLocaleChange,
  children,
}: {
  locale: NudgeLocale;
  onLocaleChange: (locale: NudgeLocale) => void;
  children: ReactNode;
}) {
  const c = nudgeCopy[locale];
  return (
    <div className="nx-page" lang={locale}>
      <a className="nx-skip" href="#experience">
        {c.skip}
      </a>
      <header className="nx-nav">
        <a href="#" className="nx-brand" aria-label={c.home}>
          <NudgeNextMark />
          <span>{c.brand.toLowerCase()}</span>
        </a>
        <nav aria-label={c.brand}>
          {c.nav.map((label, i) => (
            <a key={label} href={`#${["experience", "explore", "progress"][i]}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nx-nav-actions">
          <div className="nx-language" role="group" aria-label={c.language}>
            {(["en", "fr"] as const).map((value) => (
              <button
                key={value}
                lang={value}
                aria-pressed={locale === value}
                onClick={() => onLocaleChange(value)}
              >
                {value.toUpperCase()}
              </button>
            ))}
          </div>
          <Button asChild size="lg" className="nx-button nx-button-ink">
            <a href="#experience">
              {c.start}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
