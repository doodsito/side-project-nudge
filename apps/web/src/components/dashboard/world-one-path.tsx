"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, LockKeyhole } from "lucide-react";
import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
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

function subscribeToLocalSkip(key: string | null, callback: () => void) {
  if (!key) return () => {};
  const handleStorage = (event: StorageEvent) => {
    if (event.key === key) callback();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener("nudge:learn-preferences", callback);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("nudge:learn-preferences", callback);
  };
}

function readLocalSkip(key: string | null) {
  if (!key) return false;
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(key) ?? "null");
    return Boolean(
      value && typeof value === "object" && Reflect.get(value, "worldZeroSkipped") === true,
    );
  } catch {
    return false;
  }
}

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

function completedProgressPoints(points: Array<Point & { lesson: WorldLesson }>) {
  const worldZeroPoint = points.find(({ lesson }) => lesson.worldNumber === 0);
  const consecutiveWorldOnePoints: Array<Point & { lesson: WorldLesson }> = [];

  for (const point of points.filter(({ lesson }) => lesson.worldNumber === 1)) {
    if (point.lesson.state !== "completed") break;
    consecutiveWorldOnePoints.push(point);
  }

  return worldZeroPoint?.lesson.state === "completed"
    ? [worldZeroPoint, ...consecutiveWorldOnePoints]
    : consecutiveWorldOnePoints;
}

function LessonNode({
  lesson,
  position,
  animateCompletion,
  highlightCurrent,
  motionPreview,
  lockedLabel,
  notionsLabel,
  mascotAlt,
  closeLabel,
}: {
  lesson: WorldLesson;
  position: CSSProperties;
  animateCompletion: boolean;
  highlightCurrent: boolean;
  motionPreview: boolean;
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
            <span
              className={`absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full border border-white bg-mint text-ink shadow-sm ${animateCompletion ? `learn-check-draw${motionPreview ? " learn-motion-preview" : ""}` : ""}`}
            >
              <Check className="size-3" aria-hidden />
            </span>
          )}
          {highlightCurrent && (
            <svg
              className={`learn-map-sparkle pointer-events-none absolute -right-3 -top-3 size-7 text-secondary${motionPreview ? " learn-motion-preview" : ""}`}
              viewBox="0 0 28 28"
              aria-hidden="true"
            >
              <path
                d="M14 1.5 16.5 11.5 26.5 14 16.5 16.5 14 26.5 11.5 16.5 1.5 14 11.5 11.5 14 1.5Z"
                fill="currentColor"
              />
              <circle cx="23" cy="4" r="1.5" fill="currentColor" />
            </svg>
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
        className="!left-0 !top-auto !bottom-0 !translate-x-0 !translate-y-0 grid min-h-[min(64dvh,34rem)] max-h-[min(90dvh,42rem)] w-full max-w-none gap-0 overflow-y-auto rounded-t-[2rem] rounded-b-none border border-border bg-background p-0 shadow-lift duration-200 data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-6 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-6 sm:!left-[50%] sm:!top-[50%] sm:!bottom-auto sm:!translate-x-[-50%] sm:!translate-y-[-50%] sm:min-h-0 sm:max-w-xl sm:rounded-3xl"
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
  lockedLabel,
  notionsLabel,
  mascotAlt,
  closeLabel,
  currentLessonLabel,
  availableLessonLabel,
  worldZeroSkipped,
  userId,
}: {
  lessons: WorldLesson[];
  lockedLabel: string;
  notionsLabel: string;
  mascotAlt: string;
  closeLabel: string;
  currentLessonLabel: string;
  availableLessonLabel: string;
  worldZeroSkipped: boolean;
  userId?: string;
}) {
  const storageKey = userId ? `nudge:learn-preferences:${userId}` : null;
  const [sessionSkip, setSessionSkip] = useState(worldZeroSkipped);
  const [animatedCompletions, setAnimatedCompletions] = useState<number[]>([]);
  const [highlightCurrent, setHighlightCurrent] = useState(false);
  const [celebrateWorldOne, setCelebrateWorldOne] = useState(false);
  const [motionPreview, setMotionPreview] = useState(false);
  useEffect(() => {
    const handleSkip = () => setSessionSkip(true);
    window.addEventListener("nudge:world-zero-skipped", handleSkip);
    return () => window.removeEventListener("nudge:world-zero-skipped", handleSkip);
  }, []);
  const localSkip = useSyncExternalStore(
    (callback) => subscribeToLocalSkip(storageKey, callback),
    () => readLocalSkip(storageKey),
    () => false,
  );
  const hasWorldOneProgress = lessons.some(
    (lesson) => lesson.worldNumber === 1 && lesson.state === "completed",
  );
  const allWorldOneLessonsComplete = lessons
    .filter((lesson) => lesson.worldNumber === 1)
    .every((lesson) => lesson.state === "completed");
  const showWorldOne = sessionSkip || worldZeroSkipped || localSkip;
  const hasHighlightedLesson =
    lessons.some((lesson) => lesson.state === "current") ||
    (showWorldOne &&
      lessons.some(
        (lesson) =>
          lesson.worldNumber === 1 && lesson.lessonNumber === 1 && lesson.state === "available",
      ));
  useEffect(() => {
    const scope = userId ?? "anonymous";
    let frame: number | undefined;
    let showSparkle = false;
    let completed: number[] = [];
    let showCelebration = false;
    const previewMotion =
      process.env.NODE_ENV === "development" &&
      new URLSearchParams(window.location.search).get("motion-preview") === "1";
    try {
      const sparkleKey = `nudge:learn-map-sparkle-seen:${scope}`;
      if (hasHighlightedLesson && !window.localStorage.getItem(sparkleKey)) {
        window.localStorage.setItem(sparkleKey, "1");
        showSparkle = true;
      }
      const completedNow = lessons
        .filter((lesson) => lesson.worldNumber === 1 && lesson.state === "completed")
        .map((lesson) => lesson.lessonNumber);
      const baselineKey = `nudge:learn-map-completed:${scope}`;
      const baselineRaw = window.localStorage.getItem(baselineKey);
      if (baselineRaw) {
        const baseline: unknown = JSON.parse(baselineRaw);
        if (Array.isArray(baseline)) {
          completed = completedNow.filter((number) => !baseline.includes(number));
        }
      }
      window.localStorage.setItem(baselineKey, JSON.stringify(completedNow));
      const completionKey = `nudge:learn-map-motion:${scope}`;
      const pending: unknown = JSON.parse(window.sessionStorage.getItem(completionKey) ?? "null");
      if (
        pending &&
        typeof pending === "object" &&
        Array.isArray(Reflect.get(pending, "completed"))
      ) {
        completed = Reflect.get(pending, "completed") as number[];
        window.sessionStorage.removeItem(completionKey);
      }
      const celebrationKey = `nudge:learn-map-world-complete:${scope}`;
      if (
        allWorldOneLessonsComplete &&
        window.sessionStorage.getItem(celebrationKey) === "pending"
      ) {
        window.sessionStorage.removeItem(celebrationKey);
        showCelebration = true;
      }
      if (previewMotion) {
        showSparkle = true;
        completed = completedNow;
        showCelebration = true;
      }
    } catch {
      // Motion is decorative; unavailable storage should not affect map behavior.
    }
    if (showSparkle || completed.length > 0 || showCelebration || previewMotion) {
      frame = window.requestAnimationFrame(() => {
        setHighlightCurrent(showSparkle);
        setAnimatedCompletions(completed);
        setCelebrateWorldOne(showCelebration);
        setMotionPreview(previewMotion);
      });
    }
    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, [allWorldOneLessonsComplete, hasHighlightedLesson, lessons, userId]);
  const pathLessons = showWorldOne
    ? lessons.map((lesson) => {
        if (lesson.worldNumber === 0 && lesson.state !== "completed") {
          return { ...lesson, state: "available" as const, status: availableLessonLabel };
        }
        if (
          lesson.worldNumber === 1 &&
          lesson.lessonNumber === 1 &&
          !hasWorldOneProgress &&
          lesson.state !== "completed"
        ) {
          return { ...lesson, state: "current" as const, status: currentLessonLabel };
        }
        return lesson;
      })
    : lessons;
  const rowHeight = 92;
  const height = Math.max(560, pathLessons.length * rowHeight + 32);
  const points = pathLessons.map((lesson, index) => ({
    x: index % 2 === 0 ? 108 : 252,
    y: 42 + index * rowHeight,
    lesson,
  }));
  const route = curveThrough(points);
  const finish = points.at(-1);
  const progressPoints = completedProgressPoints(points);
  const progressRoute = progressPoints.length > 1 ? curveThrough(progressPoints) : "";

  return (
    <figure className="overflow-hidden rounded-3xl border border-border bg-primary-soft/35 p-2 shadow-soft sm:p-4">
      <div
        className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl bg-surface"
        style={{ height }}
      >
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden="true"
          viewBox={`0 0 360 ${height}`}
          preserveAspectRatio="none"
        >
          <path d={`M0 0h360v${height}H0z`} className="fill-primary-soft/35" />
          <path
            d={`M0 0h142c-34 54-15 113 19 160s28 92-5 137-48 85-15 133 43 91 4 140-36 93 2 143 42 99 6 148-35 99 1 143 28 75 11 100H0z`}
            className="fill-mint/10"
          />
          <path
            d={`M360 82c-44 14-54 55-21 95s28 77-10 116-41 84-5 124 37 83-2 124-39 83 2 125 37 85-3 126-43 81-10 126 35 78 49 112H360z`}
            className="fill-primary-soft/70"
          />
          <g aria-hidden="true" className="fill-mint/35 stroke-mint/55">
            <path d="M28 230c12-15 26-17 39-4-4 17-20 22-39 4Zm5 13c-9-11-9-24 3-32 14 9 14 21-3 32Zm-4 10c15-11 29-10 38 3-8 15-22 15-38-3Z" />
            <path d="M292 425c13-15 26-17 39-4-4 17-20 22-39 4Zm5 13c-9-11-9-24 3-32 14 9 14 21-3 32Zm-4 10c15-11 29-10 38 3-8 15-22 15-38-3Z" />
            <path d="M28 652c12-15 26-17 39-4-4 17-20 22-39 4Zm5 13c-9-11-9-24 3-32 14 9 14 21-3 32Zm-4 10c15-11 29-10 38 3-8 15-22 15-38-3Z" />
            <path d="M292 850c13-15 26-17 39-4-4 17-20 22-39 4Zm5 13c-9-11-9-24 3-32 14 9 14 21-3 32Zm-4 10c15-11 29-10 38 3-8 15-22 15-38-3Z" />
          </g>
          <g className="fill-secondary/50">
            <circle cx="47" cy="176" r="4" />
            <circle cx="311" cy="358" r="3" />
            <circle cx="46" cy="585" r="3.5" />
            <circle cx="312" cy="784" r="4" />
          </g>
          <path
            d={route}
            className="stroke-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="46"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={route}
            className="stroke-primary/10"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="38"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={route}
            className="stroke-secondary/55"
            fill="none"
            strokeDasharray="1 13"
            strokeLinecap="round"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
          {progressRoute && (
            <path
              d={progressRoute}
              pathLength="1"
              className={`learn-map-progress-route stroke-mint${animatedCompletions.length > 0 ? " is-animating" : ""}${motionPreview ? " learn-motion-preview" : ""}`}
              fill="none"
              strokeLinecap="round"
              strokeWidth="5"
              vectorEffect="non-scaling-stroke"
            />
          )}
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
            animateCompletion={
              lesson.worldNumber === 1 && animatedCompletions.includes(lesson.lessonNumber)
            }
            motionPreview={motionPreview}
            highlightCurrent={
              highlightCurrent &&
              (lesson.state === "current" ||
                (motionPreview && lesson.worldNumber === 1 && lesson.lessonNumber === 8))
            }
            lockedLabel={lockedLabel}
            notionsLabel={notionsLabel}
            mascotAlt={mascotAlt}
            closeLabel={closeLabel}
          />
        ))}
        {celebrateWorldOne && finish && (
          <svg
            aria-hidden="true"
            className={`learn-map-celebration pointer-events-none absolute z-20${motionPreview ? " learn-motion-preview" : ""}`}
            style={{ left: `${(finish.x / 360) * 100}%`, top: Math.max(12, finish.y - 94) }}
            viewBox="0 0 120 100"
          >
            <path
              d="M18 8v16m-8-8h16M92 10v12m-6-6h12M55 2v14m-7-7h14"
              className="stroke-secondary"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M32 34c0 8-7 8-7 16m59-19c0 8 7 8 7 16M43 57c0 8-7 8-7 16m44-17c0 8 7 8 7 16"
              className="stroke-mint"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="19" cy="59" r="4" className="fill-primary" />
            <circle cx="100" cy="62" r="4" className="fill-secondary" />
            <circle cx="57" cy="79" r="4" className="fill-mint" />
          </svg>
        )}
      </div>
    </figure>
  );
}
