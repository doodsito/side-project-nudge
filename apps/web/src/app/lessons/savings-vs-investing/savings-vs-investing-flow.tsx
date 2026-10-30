"use client";

import { useEffect, useRef, useState } from "react";
import { SavingsVsInvestingLesson } from "@/components/lessons/savings-vs-investing-lesson";
import { PracticeTemplate } from "@/components/practice/practice-template";
import { track } from "@/lib/analytics";
import type { ProgressStatus } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import {
  SAVINGS_VS_INVESTING_STEPS,
  type SavingsVsInvestingStep,
} from "@/lib/savings-vs-investing-lesson";
import type { Track } from "@/lib/tracks";
import { completeEighthLesson } from "./actions";

export function SavingsVsInvestingFlow({
  track: memberTrack,
  alreadyCompleted,
}: {
  track: Track;
  alreadyCompleted: boolean;
}) {
  const dictionary = getDictionary(memberTrack);
  const [step, setStep] = useState<SavingsVsInvestingStep>("welcome");
  const [answer, setAnswer] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const celebrated = useRef(alreadyCompleted);
  const content = useRef<HTMLDivElement>(null);
  const stepIndex = SAVINGS_VS_INVESTING_STEPS.indexOf(step);

  useEffect(() => {
    window.history.replaceState(window.history.state, "", "#welcome");
  }, []);

  useEffect(() => {
    const scrollRegion = content.current?.querySelector("section");
    if (scrollRegion) scrollRegion.scrollTop = 0;
    const heading = content.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step, progressStatus]);

  function goTo(target: SavingsVsInvestingStep) {
    window.history.replaceState(window.history.state, "", `#${target}`);
    setAnswer(null);
    setChecked(false);
    setStep(target);
    track("demo_lesson_opened", { lesson: "savings-vs-investing", step: target });
    if (target === "complete") void saveProgress();
  }

  async function saveProgress() {
    setProgressStatus("saving");
    try {
      const result = await completeEighthLesson();
      if (result.status === "saved") {
        setProgressStatus("saved");
        if (!celebrated.current) {
          celebrated.current = true;
          setShowConfetti(true);
        }
      } else {
        setProgressStatus("error");
      }
    } catch {
      setProgressStatus("error");
    }
  }

  function restart() {
    setProgressStatus("idle");
    setShowConfetti(false);
    goTo("welcome");
  }

  function selectAnswer(value: string) {
    setAnswer(value);
    setChecked(false);
  }

  return (
    <PracticeTemplate
      current={stepIndex + 1}
      total={SAVINGS_VS_INVESTING_STEPS.length}
      copy={dictionary.learning.shared}
      skipLink={dictionary.skipLink}
    >
      <div ref={content} className="flex min-h-0 flex-1 flex-col [&_h1]:focus:outline-none">
        <SavingsVsInvestingLesson
          step={step}
          copy={dictionary.lesson8}
          track={memberTrack}
          answer={answer}
          checked={checked}
          progressStatus={progressStatus}
          showConfetti={showConfetti}
          onAnswer={selectAnswer}
          onCheck={() => setChecked(true)}
          onGoTo={goTo}
          onRestart={restart}
          onRetryProgress={() => void saveProgress()}
        />
      </div>
    </PracticeTemplate>
  );
}
