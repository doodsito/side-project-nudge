import Link from "next/link";
import { ChartNoAxesCombined, Clock3, Coins, ShieldCheck, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries";

const allocationColors = ["bg-primary", "bg-mint", "bg-muted-foreground"];

export function PortfolioPreview({
  copy,
  learnHref = "/dashboard",
}: {
  copy: Dictionary["dashboard"]["portfolio"];
  learnHref?: string;
}) {
  return (
    <section className="relative mt-8 overflow-hidden rounded-4xl border border-border bg-surface shadow-soft">
      <div className="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full bg-primary-soft" />
      <div className="relative grid lg:grid-cols-[0.86fr_1.14fr]">
        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">
          <span className="w-fit rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-extrabold tracking-wide text-primary uppercase">
            {copy.comingSoon}
          </span>
          <h2 className="mt-5 max-w-md font-display text-3xl font-extrabold text-balance sm:text-4xl">
            {copy.headline}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
            {copy.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2" aria-label={copy.benefitsLabel}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-bold">
              <Coins className="size-4 text-primary" aria-hidden />
              {copy.virtualMoney}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-bold">
              <ShieldCheck className="size-4 text-primary" aria-hidden />
              {copy.noRealMoney}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-bold">
              <Sparkles className="size-4 text-primary" aria-hidden />
              {copy.guidedLearning}
            </span>
          </div>

          <Alert className="mt-6 items-start bg-background">
            <Clock3 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <AlertDescription>
              <p>{copy.unavailable}</p>
            </AlertDescription>
          </Alert>

          <Button asChild size="lg" className="mt-6 w-fit">
            <Link href={learnHref}>{copy.action}</Link>
          </Button>
        </div>

        <div className="border-t border-border bg-primary-soft/55 p-4 sm:p-6 lg:border-t-0 lg:border-l lg:p-8">
          <div className="rounded-3xl border border-border bg-background p-4 shadow-lift sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold tracking-wide text-muted-foreground uppercase">
                  {copy.previewLabel}
                </p>
                <p className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
                  {copy.previewValue}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{copy.previewValueNote}</p>
              </div>
              <span className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-extrabold text-primary">
                {copy.fictionalBadge}
              </span>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-sm font-extrabold">{copy.chartTitle}</p>
                <ChartNoAxesCombined className="size-5 text-primary" aria-hidden />
              </div>
              <svg
                viewBox="0 0 520 180"
                className="mt-3 h-40 w-full text-primary sm:h-44"
                role="img"
                aria-label={copy.chartLabel}
              >
                <defs>
                  <linearGradient id="portfolio-preview-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 42H500M20 90H500M20 138H500"
                  stroke="currentColor"
                  strokeOpacity="0.12"
                />
                <path
                  d="M20 145 C65 133 88 139 124 116 C160 94 190 111 224 92 C262 71 292 86 326 65 C364 42 394 58 426 38 C454 22 477 29 500 19 L500 162 L20 162 Z"
                  fill="url(#portfolio-preview-fill)"
                />
                <path
                  d="M20 145 C65 133 88 139 124 116 C160 94 190 111 224 92 C262 71 292 86 326 65 C364 42 394 58 426 38 C454 22 477 29 500 19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="500" cy="19" r="7" fill="currentColor" />
              </svg>
              <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                <span>{copy.chartStart}</span>
                <span>{copy.chartEnd}</span>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border bg-surface p-4">
              <p className="font-display text-sm font-extrabold">{copy.allocationTitle}</p>
              <div className="mt-4 grid gap-4">
                {copy.allocations.map((allocation, index) => (
                  <div key={allocation.label}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-semibold">{allocation.label}</span>
                      <span className="font-extrabold">{allocation.value}</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-soft">
                      <div
                        className={`h-full rounded-full ${allocationColors[index]}`}
                        style={{ width: `${allocation.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                {copy.allocationDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
