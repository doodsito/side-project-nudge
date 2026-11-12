import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./worlds-home.module.css";

const worldImageSources = [
  "world-01.png",
  "world-02.png",
  "world-03.png",
  "world-04.png",
  "world-05-wallet-hd.png",
  "world-06.png",
  "world-07-purchase-hd.png",
  "world-08.png",
] as const;

export function WorldArtwork({ worldNumber }: { worldNumber: number }) {
  const source = worldImageSources[worldNumber - 1];
  if (!source) return null;

  if (worldNumber === 5) {
    return (
      <div className={styles["artStage"]} aria-hidden="true">
        <Image
          src={`/brand/learn-map/worlds/${source}`}
          alt=""
          fill
          sizes="13rem"
          className={styles["artImage"]}
        />
      </div>
    );
  }

  return (
    <div className={styles["artStage"]} aria-hidden="true">
      <Image
        src={`/brand/learn-map/worlds/${source}`}
        alt=""
        fill
        sizes="(max-width: 767px) 88vw, 30vw"
        className={styles["artImage"]}
      />
    </div>
  );
}

/** The eight illustrated Nudge worlds on the Home tab. */
export function WorldsHome({
  copy,
  learnHref = "/dashboard/courses",
}: {
  copy: Dictionary["learning"]["courses"];
  learnHref?: string;
}) {
  return (
    <section className={styles["page"]} aria-labelledby="worlds-home-heading">
      <h1 id="worlds-home-heading" className={styles["pageTitle"]}>
        {copy.worldsHomeTitle}
      </h1>
      <div className={styles["worldScroller"]} aria-label={copy.mapLabel}>
        {copy.worlds.slice(0, 8).map((world, index) => {
          const worldNumber = index + 1;
          const available = worldNumber === 1;
          return (
            <div
              key={worldNumber}
              className={styles["worldItem"]}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <p className={styles["worldLabel"]}>
                {copy.world} {worldNumber}
              </p>
              <article
                className={styles["worldCard"]}
                aria-label={`${copy.world} ${worldNumber}: ${world.title}`}
              >
                <h2 className={styles["courseTitle"]}>{world.title}</h2>
                <WorldArtwork worldNumber={worldNumber} />
                {available ? (
                  <Link
                    href={learnHref}
                    className={`${styles["enterButton"]} nudge-shimmer-button`}
                  >
                    {copy.enterWorld} <ArrowRight aria-hidden="true" />
                  </Link>
                ) : (
                  <span className={styles["comingSoon"]}>
                    <LockKeyhole aria-hidden="true" /> {copy.comingSoon}
                  </span>
                )}
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Small, softly blurred previews of worlds that follow the current path. */
export function UpcomingWorlds({ copy }: { copy: Dictionary["learning"]["courses"] }) {
  return (
    <section className={styles["upcomingSection"]} aria-labelledby="upcoming-worlds-heading">
      <h2 id="upcoming-worlds-heading" className={styles["upcomingHeading"]}>
        {copy.roadmap}
      </h2>
      <div className={styles["upcomingGrid"]}>
        {copy.worlds.slice(1).map((world, index) => {
          const worldNumber = index + 2;
          return (
            <article key={worldNumber} className={styles["upcomingCard"]}>
              <div className={styles["upcomingArt"]} aria-hidden="true">
                <WorldArtwork worldNumber={worldNumber} />
              </div>
              <div className={styles["upcomingCopy"]}>
                <p>
                  {copy.world} {worldNumber}
                </p>
                <h3>{world.title}</h3>
                <span>{copy.comingSoon}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
