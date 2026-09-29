"use client";

import { useEffect, useState } from "react";

export function AnimatedNumber({
  from = 10000,
  to = 10640,
  prefix = "€",
}: {
  from?: number;
  to?: number;
  prefix?: string;
}) {
  const [value, setValue] = useState(from);
  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = reduceMotion ? 1 : Math.min((now - started) / 1100, 1);
      setValue(Math.round(from + (to - from) * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [from, to]);
  return (
    <span className="tabular-nums">
      {prefix}
      {value.toLocaleString("en-GB")}
    </span>
  );
}
