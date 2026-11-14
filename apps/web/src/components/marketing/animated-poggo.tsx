"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import styles from "./animated-poggo.module.css";

type TimedExpression = "blink" | "wink" | null;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerMotionSnapshot() {
  return false;
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function AnimatedPoggo({ className }: { className?: string }) {
  const [timedExpression, setTimedExpression] = useState<TimedExpression>(null);
  const [hovered, setHovered] = useState(false);
  const subscribeToMotionPreference = useCallback((onChange: () => void) => {
    const preference = window.matchMedia(reducedMotionQuery);
    const updatePreference = () => {
      if (preference.matches) setTimedExpression(null);
      onChange();
    };

    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotionSnapshot,
    getServerMotionSnapshot,
  );

  useEffect(() => {
    if (reducedMotion || hovered) return;
    let timer: number;
    let nextBlinkAt = Date.now() + randomBetween(3000, 6000);
    let nextWinkAt = Date.now() + randomBetween(8000, 15000);

    const scheduleNextExpression = () => {
      const winkNext = nextWinkAt < nextBlinkAt;
      const nextAt = winkNext ? nextWinkAt : nextBlinkAt;

      timer = window.setTimeout(
        () => {
          setTimedExpression(winkNext ? "wink" : "blink");

          if (winkNext) {
            nextWinkAt = Date.now() + randomBetween(8000, 15000);
          } else {
            nextBlinkAt = Date.now() + randomBetween(3000, 6000);
          }

          timer = window.setTimeout(
            () => {
              setTimedExpression(null);
              scheduleNextExpression();
            },
            winkNext ? 280 : randomBetween(120, 180),
          );
        },
        Math.max(700, nextAt - Date.now()),
      );
    };

    scheduleNextExpression();
    return () => window.clearTimeout(timer);
  }, [hovered, reducedMotion]);

  const expression = reducedMotion ? null : hovered ? "wink" : timedExpression;
  const leftClosed = expression === "blink" || expression === "wink";
  const rightClosed = expression === "blink";

  return (
    <div
      className={cn(styles["container"], className)}
      data-hovered={hovered}
      aria-hidden="true"
      onMouseEnter={() => {
        setTimedExpression(null);
        setHovered(true);
      }}
      onMouseLeave={() => {
        setTimedExpression(null);
        setHovered(false);
      }}
    >
      <span className={styles["shadow"]} />
      <div className={styles["float"]}>
        <div className={styles["reaction"]}>
          <Image
            src="/assets/poggo/prepared/poggo-body.png"
            alt=""
            fill
            sizes="(max-width: 639px) 110px, 130px"
            className={cn(styles["layer"], styles["visible"])}
            draggable={false}
            loading="eager"
          />
          <Image
            src="/assets/poggo/prepared/poggo-eye-left-open.png"
            alt=""
            fill
            sizes="(max-width: 639px) 110px, 130px"
            className={cn(styles["layer"], !leftClosed && styles["visible"])}
            draggable={false}
            loading="eager"
          />
          <Image
            src="/assets/poggo/prepared/poggo-eye-left-closed.png"
            alt=""
            fill
            sizes="(max-width: 639px) 110px, 130px"
            className={cn(styles["layer"], leftClosed && styles["visible"])}
            draggable={false}
            loading="eager"
          />
          <Image
            src="/assets/poggo/prepared/poggo-eye-right-open.png"
            alt=""
            fill
            sizes="(max-width: 639px) 110px, 130px"
            className={cn(styles["layer"], !rightClosed && styles["visible"])}
            draggable={false}
            loading="eager"
          />
          <Image
            src="/assets/poggo/prepared/poggo-eye-right-closed.png"
            alt=""
            fill
            sizes="(max-width: 639px) 110px, 130px"
            className={cn(styles["layer"], rightClosed && styles["visible"])}
            draggable={false}
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
