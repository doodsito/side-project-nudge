"use client";

import { useState } from "react";
import { ChevronDown, LockKeyhole } from "lucide-react";

function WorldTwoPreviewIllustration() {
  return (
    <div className="relative h-32 overflow-hidden sm:h-36" aria-hidden="true">
      <svg
        viewBox="0 0 360 150"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <defs>
          <radialGradient id="world-two-glow">
            <stop offset="0" stopColor="var(--nudge-learn-gold)" stopOpacity="0.34" />
            <stop offset="1" stopColor="var(--nudge-learn-gold)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="270" cy="50" r="54" fill="url(#world-two-glow)" />
        <circle cx="270" cy="50" r="12" fill="var(--nudge-learn-gold)" opacity="0.75" />
        <path
          d="M0 93c34-18 58-18 85-2 30 18 55 13 83-8 30-23 60-24 89-3 32 23 63 22 103-3v73H0Z"
          fill="var(--nudge-learn-violet)"
          opacity="0.13"
        />
        <path
          d="M0 111c42-19 74-17 107 5 28 18 56 17 85-2 30-20 62-21 93-1 26 17 50 18 75 3v34H0Z"
          fill="var(--nudge-learn-teal)"
          opacity="0.2"
        />
        <path
          d="M0 130c38-11 66-10 98 4 35 15 64 12 96-4 33-16 61-16 93 0 24 12 48 13 73 3v17H0Z"
          fill="var(--nudge-learn-violet)"
          opacity="0.11"
        />
        <path
          d="M151 150c6-19 16-28 34-37 18-9 35-15 48-29"
          fill="none"
          stroke="var(--nudge-learn-white)"
          strokeLinecap="round"
          strokeWidth="16"
        />
        <path
          d="M151 150c6-19 16-28 34-37 18-9 35-15 48-29"
          fill="none"
          stroke="var(--nudge-learn-violet)"
          strokeDasharray="2 7"
          strokeLinecap="round"
          strokeOpacity="0.23"
          strokeWidth="2"
        />
        <path
          d="M248 76V61a12 12 0 0 1 24 0v15M244 76h32"
          fill="none"
          stroke="var(--nudge-learn-violet)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          opacity="0.72"
        />
        <path
          d="M254 76V62a6 6 0 0 1 12 0v14"
          fill="none"
          stroke="var(--nudge-learn-gold)"
          strokeLinecap="round"
          strokeWidth="2"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}

export function ComingNextSection({
  sectionTitle,
  worldTwoLabel,
  worldTwoTitle,
  comingSoonLabel,
  moreWorldsLabel,
  moreWorldsCountLabel,
  worlds,
}: {
  sectionTitle: string;
  worldTwoLabel: string;
  worldTwoTitle: string;
  comingSoonLabel: string;
  moreWorldsLabel: string;
  moreWorldsCountLabel: string;
  worlds: { worldLabel: string; title: string }[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section aria-labelledby="upcoming-worlds-heading" className="mt-6 sm:mt-8">
      <h2
        id="upcoming-worlds-heading"
        className="mb-3 px-1 font-display text-base font-bold text-muted-foreground"
      >
        {sectionTitle}
      </h2>

      <article className="overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary-soft via-surface to-primary-soft shadow-soft">
        <div className="flex items-start justify-between gap-3 px-4 pt-4 sm:px-6 sm:pt-5">
          <div className="min-w-0">
            <p className="text-xs font-extrabold tracking-[0.14em] text-primary">
              {worldTwoLabel.toLocaleUpperCase()}
            </p>
            <h3 className="mt-1 max-w-[18rem] font-display text-lg font-bold leading-snug text-foreground sm:text-xl">
              {worldTwoTitle}
            </h3>
          </div>
          <span className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-full border border-secondary/35 bg-secondary/15 px-2.5 text-xs font-semibold text-foreground sm:px-3">
            <LockKeyhole className="size-3.5" aria-hidden="true" />
            {comingSoonLabel}
          </span>
        </div>
        <WorldTwoPreviewIllustration />
      </article>

      <div className="mt-2 overflow-hidden rounded-2xl border border-border/75 bg-surface/75">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="future-worlds-list"
          onClick={() => setExpanded((value) => !value)}
          className="flex min-h-16 w-full items-center justify-between gap-3 px-4 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ring"
        >
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-foreground">{moreWorldsLabel}</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {moreWorldsCountLabel}
            </span>
          </span>
          <ChevronDown
            className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
        <div
          id="future-worlds-list"
          aria-hidden={!expanded}
          className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <ol className="min-h-0 overflow-hidden divide-y divide-border/70 border-t border-border/70">
            {worlds.map(({ worldLabel, title }) => {
              return (
                <li key={worldLabel} className="flex min-h-12 items-center gap-3 px-4 py-2.5">
                  <span className="min-w-16 text-xs font-bold text-muted-foreground">
                    {worldLabel}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-muted-foreground">
                    {title}
                  </span>
                  <LockKeyhole
                    className="size-3.5 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
