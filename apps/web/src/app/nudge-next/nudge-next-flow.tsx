"use client";

import { useState } from "react";
import { NudgeNextTemplate } from "@/components/nudge-next/nudge-next-template";
import { NudgeNextHero } from "@/components/nudge-next/nudge-next-hero";
import { NudgeNextDemo } from "@/components/nudge-next/nudge-next-demo";
import { NudgeNextExplorer } from "@/components/nudge-next/nudge-next-explorer";
import { NudgeNextProgress } from "@/components/nudge-next/nudge-next-progress";
import { saveSelectedTrack } from "@/app/track-actions";
import { saveTrack } from "@/hooks/use-track-cookie";
import type { NudgeLocale } from "@/lib/nudge-next-copy";
import type { Track } from "@/lib/tracks";

export function NudgeNextFlow({ initialTrack }: { initialTrack: Track }) {
  const [locale, setLocale] = useState<NudgeLocale>(initialTrack === "fr" ? "fr" : "en");
  const [milestones, setMilestones] = useState([false, false, false]);
  async function changeLocale(value: NudgeLocale) {
    const track = value === "fr" ? "fr" : "us";
    if (await saveSelectedTrack(track)) {
      saveTrack(track);
      setLocale(value);
    }
  }
  function complete(index: number) {
    setMilestones((previous) => previous.map((value, i) => value || i === index));
  }
  return (
    <NudgeNextTemplate locale={locale} onLocaleChange={(value) => void changeLocale(value)}>
      <NudgeNextHero locale={locale} />
      <NudgeNextDemo
        locale={locale}
        onDecision={() => complete(0)}
        onCheckpoint={() => complete(1)}
      />
      <NudgeNextExplorer locale={locale} onExplored={() => complete(2)} />
      <NudgeNextProgress locale={locale} milestones={milestones} />
    </NudgeNextTemplate>
  );
}
