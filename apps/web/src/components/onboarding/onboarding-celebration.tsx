"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";

function subscribeToClient() {
  return () => {};
}

const CONFETTI = [
  { x: 8, y: 12, drift: -18, color: "var(--nudge-learn-gold)" },
  { x: 25, y: 7, drift: 14, color: "var(--nudge-learn-violet)" },
  { x: 49, y: 13, drift: -12, color: "var(--nudge-learn-teal)" },
  { x: 73, y: 8, drift: 20, color: "var(--nudge-learn-gold)" },
  { x: 92, y: 16, drift: -16, color: "var(--nudge-learn-violet)" },
  { x: 15, y: 28, drift: 12, color: "var(--nudge-learn-teal)" },
  { x: 36, y: 25, drift: -16, color: "var(--nudge-learn-gold)" },
  { x: 64, y: 29, drift: 18, color: "var(--nudge-learn-violet)" },
  { x: 84, y: 27, drift: -12, color: "var(--nudge-learn-teal)" },
  { x: 6, y: 43, drift: 16, color: "var(--nudge-learn-violet)" },
  { x: 27, y: 46, drift: -14, color: "var(--nudge-learn-gold)" },
  { x: 51, y: 42, drift: 12, color: "var(--nudge-learn-teal)" },
  { x: 77, y: 47, drift: -20, color: "var(--nudge-learn-violet)" },
  { x: 95, y: 44, drift: 14, color: "var(--nudge-learn-gold)" },
  { x: 13, y: 62, drift: -14, color: "var(--nudge-learn-teal)" },
  { x: 39, y: 64, drift: 17, color: "var(--nudge-learn-violet)" },
  { x: 68, y: 61, drift: -12, color: "var(--nudge-learn-gold)" },
  { x: 89, y: 66, drift: 16, color: "var(--nudge-learn-teal)" },
  { x: 24, y: 83, drift: -16, color: "var(--nudge-learn-gold)" },
  { x: 54, y: 88, drift: 13, color: "var(--nudge-learn-violet)" },
  { x: 81, y: 82, drift: -18, color: "var(--nudge-learn-teal)" },
] as const;

export function OnboardingCelebration() {
  const reduceMotion = useReducedMotion();
  const portalTarget = useSyncExternalStore(
    subscribeToClient,
    () => document.body,
    () => null,
  );

  return (
    <>
      <div aria-hidden="true" className="relative mx-auto h-56 w-full max-w-[420px]">
        <motion.span
          className="onboarding-celebration-glow absolute left-1/2 top-1/2 z-0 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.2, delay: reduceMotion ? 0 : 0.08 }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 mx-auto h-56 w-56"
          initial={reduceMotion ? false : { opacity: 0, y: 18, rotate: -6, scale: 0.72 }}
          animate={{
            opacity: 1,
            y: [24, -10, 3, 0],
            rotate: [-7, 4, -2, 0],
            scale: [0.68, 1.12, 0.96, 1],
          }}
          transition={{
            duration: reduceMotion ? 0 : 1.5,
            delay: reduceMotion ? 0 : 0.12,
            ease: [0.175, 0.885, 0.32, 1.275],
          }}
        >
          <Image
            src="/assets/poggo/poggo-onboarding-celebrate.png"
            alt=""
            fill
            sizes="224px"
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
      {portalTarget &&
        !reduceMotion &&
        createPortal(
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
          >
            {CONFETTI.map((piece, index) => (
              <motion.span
                key={`${piece.x}-${piece.y}`}
                className="absolute block h-3 w-2 rounded-sm"
                style={{
                  left: `${piece.x}%`,
                  top: `${piece.y}%`,
                  backgroundColor: piece.color,
                }}
                initial={{ opacity: 0, y: -12, rotate: 0, scale: 0.4 }}
                animate={{
                  opacity: [0, 0.95, 0.8, 0],
                  x: [0, piece.drift * 0.5, piece.drift],
                  y: [-12, 14, 64],
                  rotate: [0, 110, 245],
                  scale: [0.4, 1.1, 0.8],
                }}
                transition={{
                  duration: 2.6,
                  delay: 0.1 + index * 0.13,
                  ease: [0.2, 0.65, 0.35, 1],
                }}
              />
            ))}
          </div>,
          portalTarget,
        )}
    </>
  );
}
