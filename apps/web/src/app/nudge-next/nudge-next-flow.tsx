"use client";

import { useState } from "react";
import { NudgeNextTemplate } from "@/components/nudge-next/nudge-next-template";
import { NudgeNextHero } from "@/components/nudge-next/nudge-next-hero";
import { NudgeNextDemo } from "@/components/nudge-next/nudge-next-demo";
import { NudgeNextExplorer } from "@/components/nudge-next/nudge-next-explorer";
import { NudgeNextProgress } from "@/components/nudge-next/nudge-next-progress";
import type { NudgeLocale } from "@/lib/nudge-next-copy";

export function NudgeNextFlow() {
  const [locale, setLocale] = useState<NudgeLocale>("en");
  const [milestones, setMilestones] = useState([false, false, false]);
  function complete(index: number) {
    setMilestones((previous) => previous.map((value, i) => value || i === index));
  }
  return (
    <NudgeNextTemplate locale={locale} onLocaleChange={setLocale}>
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
