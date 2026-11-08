import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./portfolio-preview.module.css";

export function PortfolioPreview({
  copy,
  learnHref = "/dashboard",
}: {
  copy: Dictionary["dashboard"]["portfolio"];
  learnHref?: string;
}) {
  return (
    <div className={styles["screen"]}>
      <header className={styles["heading"]}>
        <h1>{copy.title}</h1>
      </header>

      <section className={styles["message"]} aria-labelledby="portfolio-coming-title">
        <PortfolioIllustration />
        <h2 id="portfolio-coming-title">{copy.headline}</h2>
        <p>{copy.description}</p>
      </section>

      <footer className={styles["footer"]}>
        <p>{copy.signoff}</p>
        <Button asChild className={styles["action"]}>
          <Link href={learnHref}>{copy.action}</Link>
        </Button>
      </footer>
    </div>
  );
}

function PortfolioIllustration() {
  return (
    <div className={styles["illustration"]} aria-hidden="true">
      <Image
        className={styles["halo"]}
        src="/brand/portfolio/portfolio-halo.svg"
        alt=""
        width={156}
        height={156}
      />
      <Image
        className={styles["shadow"]}
        src="/brand/portfolio/portfolio-shadow.svg"
        alt=""
        width={148}
        height={14}
      />
      <div className={styles["walletBack"]} />
      <div className={styles["walletInside"]} />
      <div className={styles["card"]}>
        <i />
      </div>
      <div className={styles["walletBody"]} />
      <Image
        className={styles["sparkle"]}
        src="/brand/portfolio/portfolio-sparkle.svg"
        alt=""
        width={15}
        height={15}
      />
      <Image
        className={styles["sparkleSmall"]}
        src="/brand/portfolio/portfolio-sparkle-small.svg"
        alt=""
        width={7}
        height={7}
      />
      <div className={styles["glint"]} />
      <Image
        className={styles["hardhat"]}
        src="/brand/portfolio/portfolio-hardhat.svg"
        alt=""
        width={78}
        height={49}
      />
      <div className={styles["hardhatBrim"]} />
      <div className={styles["hardhatSeam"]} />
      <Image
        className={styles["smile"]}
        src="/brand/portfolio/portfolio-smile.svg"
        alt=""
        width={16}
        height={8}
      />
      <Image
        className={styles["eyeLeft"]}
        src="/brand/portfolio/portfolio-eye.svg"
        alt=""
        width={7}
        height={10}
      />
      <Image
        className={styles["eyeRight"]}
        src="/brand/portfolio/portfolio-eye.svg"
        alt=""
        width={7}
        height={10}
      />
      <div className={styles["clasp"]} />
      <Image
        className={styles["snap"]}
        src="/brand/portfolio/portfolio-snap.svg"
        alt=""
        width={10}
        height={10}
      />
      <Image
        className={styles["stitching"]}
        src="/brand/portfolio/portfolio-stitching.png"
        alt=""
        width={114}
        height={65}
      />
    </div>
  );
}
