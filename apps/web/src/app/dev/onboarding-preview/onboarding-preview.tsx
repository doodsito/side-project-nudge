"use client";

import { useState } from "react";
import { WhyInvestFlow } from "@/app/lessons/why-invest/why-invest-flow";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import type { Track } from "@/lib/tracks";

export function OnboardingPreview({ track }: { track: Track }) {
  const [finished, setFinished] = useState(false);
  if (finished) return <WhyInvestFlow track={track} alreadyCompleted={false} preview />;
  return (
    <OnboardingFlow
      track={track}
      storageKey="nudge:onboarding:preview"
      onPreviewFinish={() => setFinished(true)}
    />
  );
}
