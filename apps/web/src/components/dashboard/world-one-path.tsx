"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import styles from "./world-one-path.module.css";

type LessonState = "completed" | "current" | "locked";
type WorldLesson = {
  lessonNumber: number;
  title: string;
  description: string;
  duration: string;
  state: LessonState;
  status: string;
  nodeLabel: string;
  startLabel: string;
  reviewLabel: string;
  lockedExplanation: string;
  href?: string;
  id: string;
};
type Point = { x: number; y: number };

const pathPositions = [50, 37.5, 30.5, 37.5, 50, 62.5, 69.5, 62.5] as const;

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

function LessonCard({
  lesson,
  lessonLabel,
  practicalLabel,
  virtualMoneyLabel,
  lockedLabel,
}: {
  lesson: WorldLesson;
  lessonLabel: string;
  practicalLabel: string;
  virtualMoneyLabel: string;
  lockedLabel: string;
}) {
  const locked = lesson.state === "locked" || !lesson.href;
  return (
    <article className={styles["lessonCard"]} aria-label={lesson.nodeLabel}>
      <Image
        src="/brand/learn-map/pointer.svg"
        alt=""
        width={22.5167}
        height={10.5}
        className={styles["pointer"]}
      />
      <p className={styles["lessonLabel"]}>
        {lessonLabel} {lesson.lessonNumber}
      </p>
      <h2 className={styles["lessonTitle"]}>{lesson.title}</h2>
      <p className={styles["lessonDescription"]}>{lesson.description}</p>
      <ul className={styles["lessonTags"]}>
        <li>{practicalLabel}</li>
        <li>{virtualMoneyLabel}</li>
      </ul>
      {locked ? (
        <>
          <p className={styles["lockedExplanation"]}>{lesson.lockedExplanation}</p>
          <button className={styles["lessonCta"]} type="button" disabled>
            <LockKeyhole aria-hidden="true" /> {lockedLabel}
          </button>
        </>
      ) : (
        <Link className={styles["lessonCta"]} href={lesson.href!}>
          {lesson.state === "completed" ? lesson.reviewLabel : lesson.startLabel}
        </Link>
      )}
    </article>
  );
}

export function WorldOnePath({
  lessons,
  completedCount,
  progressLabel,
  worldLabel,
  worldTitle,
  lessonLabel,
  practicalLabel,
  virtualMoneyLabel,
  lockedLabel,
  mascotAlt,
  nextWorldLabel,
  nextWorldTitle,
  nextWorldDescription,
  exploreLabel,
  rewardLabel,
}: {
  lessons: WorldLesson[];
  completedCount: number;
  progressLabel: string;
  worldLabel: string;
  worldTitle: string;
  lessonLabel: string;
  practicalLabel: string;
  virtualMoneyLabel: string;
  lockedLabel: string;
  mascotAlt: string;
  nextWorldLabel: string;
  nextWorldTitle: string;
  nextWorldDescription: string;
  exploreLabel: string;
  rewardLabel: string;
}) {
  const firstCurrent = lessons.find(({ state }) => state === "current");
  const firstLocked = lessons.find(({ state }) => state === "locked");
  const defaultLesson = firstCurrent ?? firstLocked ?? lessons.at(-1) ?? lessons[0];
  const [selectedNumber, setSelectedNumber] = useState(defaultLesson?.lessonNumber ?? null);
  const selected =
    lessons.find(({ lessonNumber }) => lessonNumber === selectedNumber) ?? defaultLesson;
  const selectedIndex = lessons.findIndex(
    ({ lessonNumber }) => lessonNumber === selected?.lessonNumber,
  );
  const rowHeights = lessons.map(() => 96);
  const rewardY = lessons.length * 102 + (selectedIndex < lessons.length - 1 ? 290 : 0) + 48;
  const points = [
    ...lessons.map((_, index) => ({
      x: pathPositions[index] ?? 50,
      y: index * 102 + (index > selectedIndex ? 290 : 0) + 48,
    })),
    { x: 50, y: rewardY },
  ];
  const pathHeight = rewardY + 48;
  const route = curveThrough(points);
  const cardProps = {
    lessonLabel,
    practicalLabel,
    virtualMoneyLabel,
    lockedLabel,
  };

  return (
    <div className={styles["page"]} data-learn-map>
      <div className={styles["mapLayout"]}>
        <section className={styles["mapColumn"]}>
          <header className={styles["worldHeader"]}>
            <div className={styles["worldHeading"]}>
              <p className={styles["worldLabel"]}>{worldLabel}</p>
              <h1 className={styles["worldTitle"]}>{worldTitle}</h1>
            </div>
            <strong className={styles["worldCount"]}>
              {completedCount}/{lessons.length}
            </strong>
            <div
              className={styles["worldProgress"]}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={lessons.length}
              aria-valuenow={completedCount}
              aria-label={progressLabel}
            >
              <span style={{ width: `${(completedCount / lessons.length) * 100}%` }} />
            </div>
          </header>

          <section className={styles["trail"]} aria-label={progressLabel}>
            <svg
              aria-hidden="true"
              className={styles["route"]}
              viewBox={`0 0 100 ${pathHeight}`}
              preserveAspectRatio="none"
            >
              <path d={route} className={styles["routeHalo"]} />
              <path d={route} className={styles["routeLine"]} />
            </svg>
            <ol className={styles["nodes"]}>
              {lessons.map((lesson, index) => {
                const selectedRow = lesson.lessonNumber === selected?.lessonNumber;
                const nodeClass =
                  lesson.state === "completed"
                    ? styles["completed"]
                    : lesson.state === "current"
                      ? styles["current"]
                      : styles["locked"];
                return (
                  <Fragment key={lesson.lessonNumber}>
                    <li
                      id={lesson.id}
                      className={styles["nodeRow"]}
                      style={{ height: rowHeights[index] }}
                    >
                      <button
                        type="button"
                        aria-label={`${lesson.nodeLabel}. ${lesson.status}`}
                        aria-pressed={selectedRow}
                        aria-current={lesson.state === "current" ? "step" : undefined}
                        className={`${styles["nodeButton"]} ${nodeClass} ${selectedRow ? styles["selected"] : ""}`}
                        style={{ left: `${points[index]?.x ?? 50}%` }}
                        onClick={() => setSelectedNumber(lesson.lessonNumber)}
                      >
                        <span className={styles["nodeFace"]}>
                          <Image
                            src={`/brand/learn-map/${lesson.state === "completed" ? "check" : lesson.state === "current" ? "star" : "lock"}.svg`}
                            alt=""
                            width={30}
                            height={30}
                          />
                        </span>
                      </button>
                      {selectedRow && (
                        <Image
                          src="/brand/mascot/nudge-curious-figma.png"
                          alt={mascotAlt}
                          width={130}
                          height={120}
                          className={styles["mascot"]}
                          priority
                        />
                      )}
                    </li>
                    {selectedRow && selected && (
                      <li className={styles["cardRow"]} aria-live="polite">
                        <LessonCard lesson={selected} {...cardProps} />
                      </li>
                    )}
                    {selectedRow && <li className={styles["pathSpacer"]} aria-hidden="true" />}
                  </Fragment>
                );
              })}
              <li className={styles["rewardRow"]}>
                <span
                  className={styles["rewardNode"]}
                  style={{ left: `${points.at(-1)?.x ?? 50}%` }}
                >
                  <Image src="/brand/learn-map/trophy.svg" alt="" width={30} height={30} />
                </span>
                <p>{rewardLabel}</p>
              </li>
            </ol>
          </section>

          <section className={styles["nextWorld"]}>
            <div className={styles["nextWorldHeading"]}>
              <h2 className={styles["nextWorldText"]}>
                <span className={styles["nextWorldBadge"]}>{nextWorldLabel}</span> ·{" "}
                {nextWorldTitle}
              </h2>
            </div>
            <p className={styles["nextWorldDescription"]}>{nextWorldDescription}</p>
            <Link href="/dashboard/courses" className={styles["explore"]}>
              {exploreLabel} <ArrowRight aria-hidden="true" />
            </Link>
          </section>
        </section>
      </div>
    </div>
  );
}
