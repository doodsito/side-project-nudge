import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries";

const allocationColors = [
  "bg-[var(--nudge-learn-violet)]",
  "bg-[var(--nudge-learn-teal)]",
  "bg-[var(--nudge-learn-neutral-600)]",
];

export function PortfolioPreview({
  copy,
  learnHref = "/dashboard/courses",
}: {
  copy: Dictionary["dashboard"]["portfolio"];
  learnHref?: string;
}) {
  return (
    <section className="mx-auto flex w-full max-w-[390px] flex-col gap-3">
      <header className="flex flex-col gap-2">
        <p className="text-[11px] leading-[15px] font-bold tracking-[0.5px] text-[var(--nudge-learn-violet)] uppercase">
          {copy.comingSoon}
        </p>
        <h1 className="font-display text-[26px] leading-8 font-extrabold text-[var(--nudge-learn-ink)]">
          {copy.headline}
        </h1>
      </header>

      <section
        aria-label={copy.previewLabel}
        className="flex flex-col gap-1 rounded-[20px] border-2 border-[var(--nudge-learn-violet-200)] bg-[var(--nudge-learn-white)] p-4 shadow-[0_4px_0_var(--nudge-learn-violet-200)]"
      >
        <div className="flex items-center justify-between text-[11px] leading-4 font-bold">
          <p className="tracking-[0.5px] text-[var(--nudge-learn-neutral-600)] uppercase">
            {copy.previewLabel}
          </p>
          <p className="text-[var(--nudge-learn-gold-dark)]">{copy.fictionalBadge}</p>
        </div>
        <p className="font-display text-[34px] leading-[42px] font-extrabold text-[var(--nudge-learn-ink)]">
          {copy.previewValue}
        </p>
        <p className="text-xs leading-4 text-[var(--nudge-learn-neutral-600)]">
          {copy.previewValueNote}
        </p>

        <div className="flex flex-col gap-1 pt-2">
          <div className="flex items-center justify-between">
            <p className="font-display text-[13px] leading-5 font-bold text-[var(--nudge-learn-ink)]">
              {copy.chartTitle}
            </p>
            <TrendingUp className="size-5 text-[var(--nudge-learn-violet)]" aria-hidden />
          </div>
          <svg
            viewBox="0 0 322 80"
            className="h-20 w-full text-[var(--nudge-learn-violet)]"
            role="img"
            aria-label={copy.chartLabel}
          >
            <path
              d="M8 64 38 61 62 59 88 52 119 50 150 43 180 41 210 32 237 30 262 23 288 17 314 13V80H8Z"
              fill="currentColor"
              fillOpacity=".1"
            />
            <path
              d="M8 64 38 61 62 59 88 52 119 50 150 43 180 41 210 32 237 30 262 23 288 17 314 13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="314" cy="13" r="3" fill="currentColor" />
          </svg>
          <div className="flex justify-between text-[11px] leading-[15px] text-[var(--nudge-learn-neutral-600)]">
            <span>{copy.chartStart}</span>
            <span>{copy.chartEnd}</span>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="portfolio-allocation-title"
        className="flex flex-col gap-3 rounded-[20px] border-2 border-[var(--nudge-learn-violet-200)] bg-[var(--nudge-learn-white)] p-4 shadow-[0_4px_0_var(--nudge-learn-violet-200)]"
      >
        <h2
          id="portfolio-allocation-title"
          className="font-display text-[15px] leading-5 font-extrabold text-[var(--nudge-learn-ink)]"
        >
          {copy.allocationTitle}
        </h2>
        {copy.allocations.map((allocation, index) => (
          <div key={allocation.label} className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-3 text-[13px] leading-[18px] font-bold text-[var(--nudge-learn-ink)]">
              <span>{allocation.label}</span>
              <span>{allocation.value}</span>
            </div>
            <div
              aria-label={`${allocation.label}: ${allocation.value}`}
              role="img"
              className="h-2 overflow-hidden rounded-full bg-[var(--nudge-learn-neutral-200)]"
            >
              <div
                className={`h-full rounded-full ${allocationColors[index]}`}
                style={{ width: `${allocation.percentage}%` }}
              />
            </div>
          </div>
        ))}
        <p className="text-[11px] leading-4 text-[var(--nudge-learn-violet)]">
          {copy.allocationDisclaimer}
        </p>
      </section>

      <Button
        asChild
        className="h-[50px] w-full rounded-2xl bg-[var(--nudge-learn-violet)] text-[15px] font-extrabold text-[var(--nudge-learn-white)] shadow-[0_4px_0_var(--nudge-learn-violet-800)] hover:bg-[var(--nudge-learn-violet-hover)]"
      >
        <Link href={learnHref}>{copy.action}</Link>
      </Button>
    </section>
  );
}
