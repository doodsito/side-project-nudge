"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import { getDictionary } from "@/lib/dictionaries";
import type { Track } from "@/lib/tracks";

const STAR_COUNT = 4;
const EMPTY_STAR = "/brand/learn-map/feedback-star-empty.svg";
const FILLED_STAR = "/brand/learn-map/feedback-star-filled.svg";

export function LessonRating({ track, nextHref }: { track: Track; nextHref: string }) {
  const [rating, setRating] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const dictionary = getDictionary(track);
  const copy = dictionary.learning.shared.rating;

  function selectWithKeyboard(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") nextIndex = (index + 1) % STAR_COUNT;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown")
      nextIndex = (index + STAR_COUNT - 1) % STAR_COUNT;
    if (nextIndex === undefined) return;
    event.preventDefault();
    setRating(nextIndex + 1);
    buttons.current[nextIndex]?.focus();
  }

  return (
    <div className="fixed inset-0 z-[60] flex h-dvh flex-col bg-[var(--nudge-learn-feedback-canvas)] text-[var(--nudge-learn-ink)]">
      <main className="flex min-h-0 flex-1 flex-col items-center px-6 pt-[calc(env(safe-area-inset-top)+4rem)] text-center sm:justify-center sm:pt-8">
        <p className="font-[var(--font-space-grotesk)] text-xs font-bold tracking-[0.12em] text-[var(--nudge-learn-teal-500)]">
          {copy.lessonComplete}
        </p>
        <div className="relative mt-[43px] grid size-20 shrink-0 place-items-center">
          <span className="absolute z-0 size-[136px] rounded-full bg-[var(--nudge-learn-violet-100)]" />
          <span className="relative z-10 size-20 rounded-full bg-[var(--nudge-learn-teal)]" />
          <span
            className="absolute top-[10px] z-20 font-[var(--font-space-grotesk)] text-[43px] font-bold leading-none text-primary-foreground"
            aria-hidden="true"
          >
            ✓
          </span>
          <span className="absolute -left-7 top-7 size-3 -rotate-25 rounded-sm bg-[var(--nudge-learn-teal)]" />
          <span className="absolute -right-7 top-5 size-3 rotate-30 rounded-sm bg-[var(--nudge-learn-gold)]" />
          <span className="absolute -right-5 bottom-5 size-3 rotate-25 rounded-sm bg-[var(--nudge-learn-teal)]" />
          <span className="absolute -left-4 bottom-2 size-2 rounded-full bg-[var(--nudge-learn-violet-300)]" />
          <span className="absolute right-0 -top-5 size-1.5 rounded-full bg-[var(--nudge-learn-teal)]" />
          <span
            className="absolute -right-10 top-10 text-lg leading-none text-[var(--nudge-learn-gold)]"
            aria-hidden="true"
          >
            ★
          </span>
        </div>
        <section className="mt-12 w-full max-w-md" aria-labelledby="lesson-rating-title">
          <h1
            id="lesson-rating-title"
            className="font-[var(--font-space-grotesk)] text-[28px] font-bold leading-[1.29] text-balance sm:text-4xl"
          >
            {copy.title}
          </h1>
          <p className="mt-3 font-[var(--font-dm-sans)] text-sm text-muted-foreground">
            {copy.hint}
          </p>
          <div
            className="relative left-[-5px] mx-auto mt-6 flex w-fit items-center gap-[14px]"
            role="radiogroup"
            aria-label={copy.title}
          >
            {Array.from({ length: STAR_COUNT }, (_, index) => {
              const value = index + 1;
              const selected = rating === value;
              return (
                <button
                  key={value}
                  ref={(button) => {
                    buttons.current[index] = button;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={copy.starLabel(value, STAR_COUNT)}
                  tabIndex={selected || (rating === 0 && index === 0) ? 0 : -1}
                  onClick={() => setRating(value)}
                  onKeyDown={(event) => selectWithKeyboard(event, index)}
                  className="grid size-[52px] shrink-0 place-items-center rounded-xl transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Image
                    src={value <= rating ? FILLED_STAR : EMPTY_STAR}
                    alt=""
                    width={52}
                    height={52}
                    priority
                  />
                </button>
              );
            })}
          </div>
          <div className="mx-auto mt-2 flex max-w-[342px] justify-between font-[var(--font-dm-sans)] text-xs text-muted-foreground">
            <span>{copy.low}</span>
            <span>{copy.high}</span>
          </div>
        </section>
        <div className="mt-auto flex w-full max-w-md flex-col items-center pb-16 pt-8 sm:mt-8 sm:pb-5">
          <Link
            href={nextHref}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-[17px] bg-[var(--nudge-learn-violet)] px-5 font-[var(--font-space-grotesk)] text-base font-bold text-primary-foreground shadow-[0_5px_0_var(--nudge-learn-violet-800)] transition-colors hover:bg-[var(--nudge-learn-violet-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            {copy.continue} <span aria-hidden="true">→</span>
          </Link>
          <Link
            href={nextHref}
            className="mt-4 rounded-lg px-3 py-1 font-[var(--font-dm-sans)] text-sm font-bold text-[var(--nudge-learn-violet)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {copy.skip}
          </Link>
        </div>
      </main>
      <nav className="border-t border-[var(--nudge-learn-feedback-border)] bg-[var(--nudge-learn-white)] px-5 pb-[env(safe-area-inset-bottom)] sm:hidden">
        <DashboardTabs
          tabs={dictionary.dashboard.tabs}
          tabsLabel={dictionary.dashboard.tabsLabel}
          homeHref="/dashboard"
          mobile
          activeTab="home"
        />
      </nav>
    </div>
  );
}
