import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./worlds-home.module.css";

const worldTones = [
  styles["toneViolet"],
  styles["toneGold"],
  styles["toneMint"],
  styles["toneField"],
  styles["tonePaper"],
  styles["toneNeutral"],
  styles["toneGold"],
  styles["toneMint"],
] as const;

const worldImageSources = [
  "world-01.png",
  "world-02.png",
  "world-03.png",
  "world-04.png",
  "world-05-wallet.png",
  "world-06.png",
  "world-07.png",
  "world-08.png",
] as const;

const walletLogos = [
  { src: "tesla-pure.svg", className: styles["teslaLogo"] },
  { src: "google-g-2015.svg", className: styles["googleLogo"] },
  { src: "meta-3.svg", className: styles["metaLogo"] },
  { src: "microsoft-5.svg", className: styles["microsoftLogo"] },
  { src: "nvidia.svg", className: styles["nvidiaLogo"] },
  { src: "apple.svg", className: styles["appleLogo"] },
] as const;

export function WorldArtwork({ worldNumber }: { worldNumber: number }) {
  const source = worldImageSources[worldNumber - 1];
  if (!source) return null;

  if (worldNumber === 5) {
    return (
      <div className={`${styles["artStage"]} ${styles["walletStage"]}`} aria-hidden="true">
        <div className={styles["walletComposition"]}>
          <Image
            src={`/brand/learn-map/worlds/${source}`}
            alt=""
            fill
            sizes="13rem"
            className={styles["artImage"]}
          />
          {walletLogos.map(({ src, className }) => (
            <Image
              key={src}
              src={`/brand/learn-map/worlds/logos/${src}`}
              alt=""
              width={80}
              height={56}
              className={`${styles["walletLogo"]} ${className}`}
            />
          ))}
          <Image
            src="/brand/learn-map/worlds/pogo-encourage.png"
            alt=""
            width={100}
            height={92}
            className={styles["walletPogo"]}
          />
        </div>
      </div>
    );
  }

  if (worldNumber === 7) {
    return (
      <div className={`${styles["artStage"]} ${styles["purchaseStage"]}`} aria-hidden="true">
        <div className={styles["receipt"]}>
          <span className={styles["receiptTitle"]}>ETF</span>
          <span className={styles["receiptRule"]} />
          <span className={styles["receiptLine"]} />
          <span className={styles["receiptLineShort"]} />
          <span className={styles["receiptRule"]} />
          <span className={styles["receiptTotal"]}>
            <span />
            <span />
          </span>
        </div>
        <Image
          src={`/brand/learn-map/worlds/${source}`}
          alt=""
          width={128}
          height={128}
          className={styles["purchasePogo"]}
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
        sizes="(max-width: 767px) 80vw, 30vw"
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
                className={`${styles["worldCard"]} ${worldTones[index] ?? styles["toneViolet"]}`}
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
