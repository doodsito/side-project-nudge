"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3, Flag, LockKeyhole, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { FOUNDATION_LESSONS, foundationLessonHref } from "@/lib/course-worlds";
import {
  completedLessonCount,
  FOUNDATION_LESSON_COUNT,
  FOUNDATION_WORLD,
  hasCompletedLesson,
  type CourseProgress,
} from "@/lib/course-progress";
import type { Dictionary } from "@/lib/dictionaries";
import type { Track } from "@/lib/tracks";
import styles from "./foundation-world.module.css";

const pathPoints = [23, 72, 75, 30, 24, 70, 75, 31] as const;

/** The World 1 path and lesson preview, driven by the member's saved progress. */
export function FoundationWorldClient({
  progress,
  copy,
  progressLabel,
  track,
}: {
  progress: CourseProgress;
  copy: Omit<Dictionary["learning"]["courses"]["foundation"], "progressLabel">;
  progressLabel: string;
  track: Track;
}) {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const completedCount = Math.min(
    completedLessonCount(progress, FOUNDATION_WORLD),
    FOUNDATION_LESSON_COUNT,
  );
  const progressPercent = (completedCount / FOUNDATION_LESSON_COUNT) * 100;
  const lessons = FOUNDATION_LESSONS.map((lesson) => ({
    ...lesson,
    href: foundationLessonHref(lesson.number, track),
  }));
  const selected = selectedLesson === null ? undefined : lessons[selectedLesson - 1];
  const selectedCopy = selectedLesson === null ? undefined : copy.lessons[selectedLesson - 1];
  const selectedCompleted = selected
    ? hasCompletedLesson(progress, FOUNDATION_WORLD, selected.number)
    : false;
  const previousComplete = selected
    ? selected.number === 1 || hasCompletedLesson(progress, FOUNDATION_WORLD, selected.number - 1)
    : false;
  const selectedAvailable = Boolean(
    selected && (selectedCompleted || previousComplete) && selected.href,
  );

  return (
    <div className={styles["page"]}>
      <div className={styles["topline"]}>
        <Button asChild variant="ghost" className="-ml-3 min-h-11">
          <Link href="/dashboard/courses">
            <ArrowLeft aria-hidden /> {copy.back}
          </Link>
        </Button>
        <span className={styles["worldTag"]}>{copy.label}</span>
      </div>

      <header className={styles["header"]}>
        <div className={styles["headingBlock"]}>
          <p className={styles["eyebrow"]}>{copy.pathLabel}</p>
          <h1>{copy.title}</h1>
          <p className={styles["intro"]}>{copy.intro}</p>
        </div>
        <div className={styles["progressBlock"]}>
          <div className={styles["progressMeta"]}>
            <span>{copy.progress}</span>
            <strong>
              {completedCount}/{FOUNDATION_LESSON_COUNT}
            </strong>
          </div>
          <div
            className={styles["progressTrack"]}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={FOUNDATION_LESSON_COUNT}
            aria-valuenow={completedCount}
            aria-label={progressLabel}
          >
            <span style={{ width: `${progressPercent}%` }} />
          </div>
          <span className={styles["totalTime"]}>
            {copy.totalTime} · {copy.duration}
          </span>
        </div>
      </header>

      <section className={styles["pathSection"]} aria-labelledby="lesson-path-heading">
        <div className={styles["pathIntro"]}>
          <div>
            <p className={styles["eyebrow"]}>{copy.pathTitle}</p>
            <h2 id="lesson-path-heading">{copy.pathIntro}</h2>
          </div>
          <p className={styles["pathHint"]}>{copy.start}</p>
        </div>

        <ol className={styles["path"]}>
          <svg
            className={styles["route"]}
            viewBox="0 0 100 780"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className={styles["routeBase"]}
              d="M23 40 C23 83 72 86 72 140 S75 195 75 240 S30 288 30 340 S24 390 24 440 S70 488 70 540 S75 590 75 640 S31 688 31 740"
            />
            <path
              className={styles["routeCenter"]}
              d="M23 40 C23 83 72 86 72 140 S75 195 75 240 S30 288 30 340 S24 390 24 440 S70 488 70 540 S75 590 75 640 S31 688 31 740"
            />
          </svg>
          {lessons.map((lesson, index) => {
            const lessonCopy = copy.lessons[index]!;
            const completed = hasCompletedLesson(progress, FOUNDATION_WORLD, lesson.number);
            const unlocked =
              lesson.number === 1 ||
              completed ||
              hasCompletedLesson(progress, FOUNDATION_WORLD, lesson.number - 1);
            const available = unlocked && Boolean(lesson.href);
            const state = completed ? "completed" : available ? "current" : "locked";
            const label = `${copy.lesson} ${lesson.number}: ${lessonCopy.title}. ${completed ? copy.completed : available ? copy.current : copy.locked}. ${lesson.duration}`;

            return (
              <li
                id={`lesson-${lesson.number}`}
                key={lesson.number}
                className={styles["node"]}
                style={{ left: `${pathPoints[index]}%`, top: `${5 + index * 13}%` }}
              >
                <button
                  type="button"
                  className={`${styles["nodeButton"]} ${styles[state]}`}
                  aria-label={label}
                  aria-haspopup="dialog"
                  onClick={() => setSelectedLesson(lesson.number)}
                >
                  <span>{lesson.number}</span>
                  {completed && <Check className={styles["nodeMark"]} aria-hidden />}
                  {!available && !completed && (
                    <LockKeyhole className={styles["nodeMark"]} aria-hidden />
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      <section className={styles["reward"]} aria-labelledby="world-reward-title">
        <span className={styles["rewardIcon"]} aria-hidden="true">
          <Flag />
        </span>
        <p className={styles["eyebrow"]}>{copy.rewardLabel}</p>
        <h2 id="world-reward-title">
          {completedCount === FOUNDATION_LESSON_COUNT ? copy.rewardCompleteTitle : copy.rewardTitle}
        </h2>
        <p>
          {completedCount === FOUNDATION_LESSON_COUNT ? copy.rewardCompleteIntro : copy.rewardIntro}
        </p>
      </section>

      <DialogPrimitive.Root
        open={selectedLesson !== null}
        onOpenChange={(open) => !open && setSelectedLesson(null)}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className={styles["overlay"]} />
          <DialogPrimitive.Content
            className={styles["sheet"]}
            aria-describedby="lesson-preview-summary"
          >
            {selected && selectedCopy && (
              <>
                <div className={styles["sheetHandle"]} aria-hidden="true" />
                <div className={styles["sheetTop"]}>
                  <p className={styles["eyebrow"]}>
                    {copy.label} <span aria-hidden="true">·</span> {copy.lesson} {selected.number}
                  </p>
                  <DialogPrimitive.Close
                    className={styles["closeButton"]}
                    aria-label={copy.closePreview}
                  >
                    <X aria-hidden="true" />
                  </DialogPrimitive.Close>
                </div>

                <div className={styles["sheetHero"]}>
                  <div className={styles["sheetTitle"]}>
                    <DialogPrimitive.Title>{selectedCopy.title}</DialogPrimitive.Title>
                    <DialogPrimitive.Description id="lesson-preview-summary">
                      {selectedCopy.description}
                    </DialogPrimitive.Description>
                  </div>
                  <Image
                    src="/brand/mascot/nudge-curious.webp"
                    alt=""
                    width={120}
                    height={120}
                    className={styles["mascot"]}
                    priority
                  />
                </div>

                <div className={styles["sheetMeta"]}>
                  <span
                    className={`${styles["statusPill"]} ${selectedCompleted ? styles["statusCompleted"] : selectedAvailable ? styles["statusCurrent"] : styles["statusLocked"]}`}
                  >
                    {selectedCompleted
                      ? copy.completed
                      : selectedAvailable
                        ? copy.current
                        : copy.locked}
                  </span>
                  <span className={styles["duration"]}>
                    <Clock3 aria-hidden="true" /> {selected.duration}
                  </span>
                </div>

                <div className={styles["notions"]}>
                  <h3>{copy.notionsLabel}</h3>
                  <ul>
                    {selectedCopy.keyNotions.map((notion) => (
                      <li key={notion}>{notion}</li>
                    ))}
                  </ul>
                </div>

                {selectedAvailable && selected.href ? (
                  <Button asChild size="lg" className={styles["cta"]}>
                    <Link href={selected.href}>
                      {selectedCompleted ? copy.review : copy.start}
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                ) : (
                  <div className={styles["lockedAction"]}>
                    <p>{copy.lockedExplanation}</p>
                    <Button size="lg" disabled className={styles["cta"]}>
                      {copy.locked}
                    </Button>
                  </div>
                )}
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}
