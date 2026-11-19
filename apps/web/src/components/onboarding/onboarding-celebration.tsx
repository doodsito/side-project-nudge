"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const BILLS = [
  { x: -126, y: -42, rotate: -17, color: "var(--nudge-learn-gold)" },
  { x: -76, y: -72, rotate: 11, color: "var(--nudge-learn-teal)" },
  { x: 84, y: -68, rotate: -10, color: "var(--nudge-learn-violet)" },
  { x: 128, y: -20, rotate: 16, color: "var(--nudge-learn-gold)" },
  { x: -118, y: 44, rotate: 12, color: "var(--nudge-learn-violet)" },
  { x: 112, y: 52, rotate: -14, color: "var(--nudge-learn-teal)" },
] as const;

function Bill({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 42" fill="none" className="h-auto w-full">
      <rect x="1" y="1" width="62" height="40" rx="7" fill="white" stroke={color} strokeWidth="2" />
      <rect x="6" y="6" width="52" height="30" rx="4" stroke={color} strokeWidth="1.5" />
      <circle cx="32" cy="21" r="8" fill={color} fillOpacity="0.22" />
      <path d="M11 14h7M46 28h7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function OnboardingCelebration() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="relative mx-auto h-48 w-full max-w-[360px]">
      {BILLS.map((bill, index) => (
        <motion.span
          key={`${bill.x}-${bill.y}`}
          className="absolute z-0 block w-12"
          style={{
            left: `calc(50% + ${bill.x}px)`,
            top: `calc(50% + ${bill.y}px)`,
          }}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, x: 0, y: 18, rotate: bill.rotate * -0.45, scale: 0.72 }
          }
          animate={{ opacity: 1, x: 0, y: 0, rotate: bill.rotate, scale: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.48,
            delay: reduceMotion ? 0 : 0.04 + index * 0.065,
            ease: "easeOut",
          }}
        >
          <Bill color={bill.color} />
        </motion.span>
      ))}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 mx-auto h-48 w-48"
        initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
      >
        <Image
          src="/assets/poggo/poggo-onboarding-celebrate.png"
          alt=""
          fill
          sizes="192px"
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
