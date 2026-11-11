"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ArrowRight, LockKeyhole, X } from "lucide-react";
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
  closePreviewLabel,
  onClose,
}: {
  lesson: WorldLesson;
  lessonLabel: string;
  practicalLabel: string;
  virtualMoneyLabel: string;
  lockedLabel: string;
  closePreviewLabel: string;
  onClose: () => void;
}) {
  const locked = lesson.state === "locked" || !lesson.href;
  return (
    <article className={styles["lessonCard"]} aria-label={lesson.nodeLabel}>
      <button
        className={styles["closePreview"]}
        type="button"
        aria-label={closePreviewLabel}
        onClick={onClose}
      >
        <X aria-hidden="true" />
      </button>
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
        <Link className={`${styles["lessonCta"]} nudge-shimmer-button`} href={lesson.href!}>
          {lesson.state === "completed" ? lesson.reviewLabel : lesson.startLabel}
        </Link>
      )}
    </article>
  );
}

function MapArtwork() {
  return (
    <div className={styles["mapArtwork"]} aria-hidden="true">
      <div className={`${styles["artSet"]} ${styles["desktopArt"]}`}>
        <Image
          src="/brand/learn-map/forest/forest-upper-left.svg"
          alt=""
          width={214}
          height={174}
          className={`${styles["artItem"]} ${styles["islandUpperLeft"]}`}
        />
        <Image
          src="/brand/learn-map/forest/forest-upper-right.svg"
          alt=""
          width={218}
          height={190}
          className={`${styles["artItem"]} ${styles["islandUpperRight"]}`}
        />
        <Image
          src="/brand/learn-map/forest/pond-center.svg"
          alt=""
          width={98}
          height={48}
          className={`${styles["artItem"]} ${styles["pondCenter"]}`}
        />
        <Image
          src="/brand/learn-map/forest/forest-middle-left.svg"
          alt=""
          width={205}
          height={178}
          className={`${styles["artItem"]} ${styles["islandMiddleLeft"]}`}
        />
        <Image
          src="/brand/learn-map/forest/forest-middle-right.svg"
          alt=""
          width={230}
          height={190}
          className={`${styles["artItem"]} ${styles["islandMiddleRight"]}`}
        />
        <Image
          src="/brand/learn-map/forest/pond-end.svg"
          alt=""
          width={110}
          height={54}
          className={`${styles["artItem"]} ${styles["pondEnd"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_004.png"
          alt=""
          width={32}
          height={90}
          className={`${styles["tree"]} ${styles["treeTall"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_005.png"
          alt=""
          width={37}
          height={75}
          className={`${styles["tree"]} ${styles["treeSmall"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_010.png"
          alt=""
          width={68}
          height={95}
          className={`${styles["tree"]} ${styles["treeLarge"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_006.png"
          alt=""
          width={37}
          height={90}
          className={`${styles["tree"]} ${styles["treeRound"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_004.png"
          alt=""
          width={28}
          height={80}
          className={`${styles["tree"]} ${styles["treeTallSecondary"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_010.png"
          alt=""
          width={66}
          height={92}
          className={`${styles["tree"]} ${styles["treeLargeSecondary"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_005.png"
          alt=""
          width={35}
          height={71}
          className={`${styles["tree"]} ${styles["treeSmallSecondary"]}`}
        />
      </div>
      <div className={`${styles["artSet"]} ${styles["mobileArt"]}`}>
        <Image
          src="/brand/learn-map/forest/forest-upper-left-mobile.svg"
          alt=""
          width={146}
          height={126}
          className={`${styles["artItem"]} ${styles["islandUpperLeft"]}`}
        />
        <Image
          src="/brand/learn-map/forest/clearing-upper-right-mobile.svg"
          alt=""
          width={126}
          height={112}
          className={`${styles["artItem"]} ${styles["islandUpperRight"]}`}
        />
        <Image
          src="/brand/learn-map/forest/pond-trail-mobile.svg"
          alt=""
          width={65}
          height={36}
          className={`${styles["artItem"]} ${styles["pondCenter"]}`}
        />
        <Image
          src="/brand/learn-map/forest/forest-middle-left-mobile.svg"
          alt=""
          width={132}
          height={120}
          className={`${styles["artItem"]} ${styles["islandMiddleLeft"]}`}
        />
        <Image
          src="/brand/learn-map/forest/forest-middle-right-mobile.svg"
          alt=""
          width={112}
          height={125}
          className={`${styles["artItem"]} ${styles["islandMiddleRight"]}`}
        />
        <Image
          src="/brand/learn-map/forest/pond-end-mobile.svg"
          alt=""
          width={83}
          height={42}
          className={`${styles["artItem"]} ${styles["pondEnd"]}`}
        />
        <Image
          src="/brand/learn-map/forest/clearing-upper-right-mobile.svg"
          alt=""
          width={126}
          height={112}
          className={`${styles["artItem"]} ${styles["islandLowerLeft"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_004.png"
          alt=""
          width={28}
          height={79}
          className={`${styles["tree"]} ${styles["treeTall"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_006.png"
          alt=""
          width={23}
          height={55}
          className={`${styles["tree"]} ${styles["treeRound"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_010.png"
          alt=""
          width={41}
          height={57}
          className={`${styles["tree"]} ${styles["treeLarge"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_005.png"
          alt=""
          width={26}
          height={53}
          className={`${styles["tree"]} ${styles["treeSmall"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_010.png"
          alt=""
          width={39}
          height={55}
          className={`${styles["tree"]} ${styles["treeRoundSecondary"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_004.png"
          alt=""
          width={21}
          height={59}
          className={`${styles["tree"]} ${styles["treeTallSecondary"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_006.png"
          alt=""
          width={30}
          height={72}
          className={`${styles["tree"]} ${styles["treeRoundTertiary"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_005.png"
          alt=""
          width={23}
          height={46}
          className={`${styles["tree"]} ${styles["treeSmallSecondary"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_010.png"
          alt=""
          width={40}
          height={56}
          className={`${styles["tree"]} ${styles["treeLargeSecondary"]}`}
        />
        <Image
          src="/brand/learn-map/foliage/foliagePack_005.png"
          alt=""
          width={22}
          height={45}
          className={`${styles["tree"]} ${styles["treeSmallTertiary"]}`}
        />
      </div>
    </div>
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
  closePreviewLabel,
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
  closePreviewLabel: string;
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
    selectedNumber === null
      ? undefined
      : lessons.find(({ lessonNumber }) => lessonNumber === selectedNumber);
  const selectedIndex = selected
    ? lessons.findIndex(({ lessonNumber }) => lessonNumber === selected.lessonNumber)
    : -1;
  const previewExpansion = selected ? 290 : 0;
  const rowHeights = lessons.map(() => 96);
  const rewardY = lessons.length * 102 + previewExpansion + 48;
  const points = [
    ...lessons.map((_, index) => ({
      x: pathPositions[index] ?? 50,
      y: index * 102 + (selected && index > selectedIndex ? previewExpansion : 0) + 48,
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
    closePreviewLabel,
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
            <MapArtwork />
            <svg
              aria-hidden="true"
              className={styles["route"]}
              viewBox={`0 0 100 ${pathHeight}`}
              preserveAspectRatio="none"
            >
              <path d={route} className={styles["routeHalo"]} />
              <path d={route} className={styles["routeLine"]} />
              <path d={route} className={styles["routeFlow"]} />
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
                        onClick={() =>
                          setSelectedNumber((current) =>
                            current === lesson.lessonNumber ? null : lesson.lessonNumber,
                          )
                        }
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
                        <LessonCard
                          lesson={selected}
                          {...cardProps}
                          onClose={() => setSelectedNumber(null)}
                        />
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
