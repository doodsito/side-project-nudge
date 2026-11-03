"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, LockKeyhole } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type LessonState = "completed" | "current" | "available" | "locked";
type WorldLesson = {
  worldNumber: number;
  lessonNumber: number;
  markerNumber: number;
  title: string;
  description: string;
  notions: string[];
  duration: string;
  state: LessonState;
  status: string;
  sectionLabel: string;
  nodeLabel: string;
  startLabel: string;
  reviewLabel: string;
  lockedExplanation: string;
  href?: string;
  id?: string;
};
type Point = { x: number; y: number };

function curveThrough(points: Point[]) {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0]!.x} ${points[0]!.y}`;
  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = points[index - 1]!;
    const bend = (point.y - previous.y) * 0.58;
    return `${path} C ${previous.x} ${previous.y + bend}, ${point.x} ${point.y - bend}, ${point.x} ${point.y}`;
  }, "");
}

function LessonNode({
  lesson,
  position,
  lockedLabel,
  notionsLabel,
  mascotAlt,
  closeLabel,
}: {
  lesson: WorldLesson;
  position: CSSProperties;
  lockedLabel: string;
  notionsLabel: string;
  mascotAlt: string;
  closeLabel: string;
}) {
  const isLocked = lesson.state === "locked";
  const markerStyle =
    lesson.state === "completed"
      ? "border-mint bg-mint text-ink"
      : lesson.state === "current"
        ? "nudge-current-step border-secondary bg-secondary text-secondary-foreground"
        : lesson.state === "available"
          ? "border-primary/30 bg-primary-soft text-primary"
          : "border-border-strong bg-surface-2 text-muted-foreground";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          id={lesson.id}
          aria-label={`${lesson.nodeLabel}. ${lesson.status}`}
          aria-current={lesson.state === "current" ? "step" : undefined}
          className="absolute z-10 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[5px] border-white bg-surface shadow-[0_8px_18px_rgba(34,32,57,0.16)] transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:size-[4.5rem]"
          style={position}
        >
          <span
            className={`grid size-full place-items-center rounded-full border-2 text-lg font-extrabold ${markerStyle}`}
          >
            {lesson.markerNumber}
          </span>
          {lesson.state === "completed" && (
            <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full border border-white bg-mint text-ink shadow-sm">
              <Check className="size-3" aria-hidden />
            </span>
          )}
          {isLocked && (
            <span className="absolute -bottom-0.5 -right-0.5 grid size-5 place-items-center rounded-full border border-white bg-surface text-muted-foreground shadow-sm">
              <LockKeyhole className="size-3" aria-hidden />
            </span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent
        overlayClassName="bg-ink/35 backdrop-blur-[2px]"
        closeLabel={closeLabel}
        className="!left-0 !top-auto !bottom-0 !translate-x-0 !translate-y-0 grid max-h-[min(88dvh,42rem)] w-full max-w-none gap-0 overflow-y-auto rounded-t-[2rem] rounded-b-none border border-border bg-background p-0 shadow-lift duration-200 data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-6 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-6 sm:!left-[50%] sm:!top-[50%] sm:!bottom-auto sm:!translate-x-[-50%] sm:!translate-y-[-50%] sm:max-w-xl sm:rounded-3xl"
      >
        <div className="mx-auto w-full max-w-xl px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3 sm:px-7 sm:pb-6 sm:pt-6">
          <div
            className="mx-auto mb-5 h-1 w-10 rounded-full bg-border-strong sm:hidden"
            aria-hidden
          />
          <div className="flex min-h-24 items-center gap-4 pr-9">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                {lesson.sectionLabel}
              </p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                {lesson.status} <span aria-hidden>·</span> {lesson.duration}
              </p>
              <DialogTitle className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                {lesson.title}
              </DialogTitle>
            </div>
            <Image
              src="/brand/mascot/nudge-curious.webp"
              alt={mascotAlt}
              width={112}
              height={112}
              className="size-[6.25rem] shrink-0 object-contain sm:size-28"
              priority={lesson.state === "current"}
            />
          </div>
          <DialogDescription className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base">
            {lesson.description}
          </DialogDescription>

          <section
            aria-labelledby={`lesson-notions-${lesson.worldNumber}-${lesson.lessonNumber}`}
            className="mt-5"
          >
            <h3
              id={`lesson-notions-${lesson.worldNumber}-${lesson.lessonNumber}`}
              className="text-xs font-bold uppercase tracking-[0.12em] text-primary"
            >
              {notionsLabel}
            </h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {lesson.notions.slice(0, 4).map((notion) => (
                <li
                  key={notion}
                  className="flex min-h-10 items-center gap-2 rounded-xl bg-primary-soft/60 px-3 py-2 text-sm font-medium text-foreground"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                  {notion}
                </li>
              ))}
            </ul>
          </section>

          {isLocked && (
            <p className="mt-4 rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm leading-relaxed text-muted-foreground">
              {lesson.lockedExplanation}
            </p>
          )}

          <div className="mt-5 border-t border-border pt-4">
            {lesson.href && !isLocked ? (
              <Button asChild size="lg" className="w-full">
                <Link href={lesson.href}>
                  {lesson.state === "completed" ? lesson.reviewLabel : lesson.startLabel}
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="w-full" disabled>
                {lockedLabel}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function WorldOnePath({
  lessons,
  progressLabel,
  lockedLabel,
  notionsLabel,
  mascotAlt,
  closeLabel,
  worldZeroLabel,
  worldOneLabel,
}: {
  lessons: WorldLesson[];
  progressLabel: string;
  lockedLabel: string;
  notionsLabel: string;
  mascotAlt: string;
  closeLabel: string;
  worldZeroLabel: string;
  worldOneLabel: string;
}) {
  const rowHeight = 108;
  const height = Math.max(560, lessons.length * rowHeight + 32);
  const points = lessons.map((lesson, index) => ({
    x: index % 2 === 0 ? 108 : 252,
    y: 42 + index * rowHeight,
    lesson,
  }));
  const route = curveThrough(points);
  const finish = points.at(-1);

  return (
    <figure className="overflow-hidden rounded-3xl border border-border bg-primary-soft/45 p-2 shadow-soft sm:p-4">
      <figcaption className="flex flex-wrap items-center gap-x-2 gap-y-1 px-2 pb-2 text-xs font-semibold text-muted-foreground sm:px-3">
        <span>{worldZeroLabel}</span>
        <span aria-hidden>→</span>
        <span>{worldOneLabel}</span>
        <span className="sr-only">{progressLabel}</span>
      </figcaption>
      <div className="relative mx-auto w-full max-w-xl" style={{ height }}>
        <svg
          className="absolute inset-0 size-full"
          aria-hidden="true"
          viewBox={`0 0 360 ${height}`}
          preserveAspectRatio="none"
        >
          <path
            d={route}
            className="stroke-border-strong/70"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="28"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={route}
            className="stroke-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="23"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={route}
            className="stroke-primary/20"
            fill="none"
            strokeDasharray="2 9"
            strokeLinecap="round"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          {finish && (
            <g aria-hidden="true" transform={`translate(${finish.x - 27} ${finish.y + 38})`}>
              <path d="M 0 0 v 20" className="stroke-foreground/65" strokeWidth="2" />
              <path
                d="M 1 1 h 15 l -5 5 l 5 5 h -15 z"
                className="fill-secondary stroke-secondary"
                strokeWidth="1"
              />
            </g>
          )}
        </svg>

        {points.map(({ x, y, lesson }) => (
          <LessonNode
            key={`${lesson.worldNumber}-${lesson.lessonNumber}`}
            lesson={lesson}
            position={{ left: `${(x / 360) * 100}%`, top: y }}
            lockedLabel={lockedLabel}
            notionsLabel={notionsLabel}
            mascotAlt={mascotAlt}
            closeLabel={closeLabel}
          />
        ))}
      </div>
    </figure>
  );
}
