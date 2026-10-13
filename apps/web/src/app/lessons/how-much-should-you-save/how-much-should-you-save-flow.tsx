"use client";

import { useEffect, useRef, useState } from "react";
import { HowMuchShouldYouSaveLesson } from "@/components/lessons/how-much-should-you-save-lesson";
import { PracticeTemplate } from "@/components/practice/practice-template";
import { track } from "@/lib/analytics";
import type { ProgressStatus } from "@/lib/course-progress";
import type { Dictionary } from "@/lib/dictionaries";
import {
  HOW_MUCH_SHOULD_YOU_SAVE_STEPS,
  type HowMuchShouldYouSaveStep,
} from "@/lib/how-much-should-you-save-lesson";
import { completeThirdLesson } from "./actions";

export function HowMuchShouldYouSaveFlow({ copy }: { copy: Dictionary["lesson3"] }) {
  const [step, setStep] = useState<HowMuchShouldYouSaveStep>("welcome");
  const [referenceAnswer, setReferenceAnswer] = useState<string | null>(null);
  const [amountAnswer, setAmountAnswer] = useState<string | null>(null);
  const [stressAnswer, setStressAnswer] = useState<string | null>(null);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>("idle");
  const content = useRef<HTMLDivElement>(null);
  const stepIndex = HOW_MUCH_SHOULD_YOU_SAVE_STEPS.indexOf(step);

  useEffect(() => {
    window.history.replaceState(window.history.state, "", "#welcome");
  }, []);

  useEffect(() => {
    const heading = content.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step]);

  function goTo(target: HowMuchShouldYouSaveStep) {
    window.history.replaceState(window.history.state, "", `#${target}`);
    setStep(target);
    track("demo_lesson_opened", { lesson: "how-much-should-you-save", step: target });
    if (target === "complete") void saveProgress();
  }

  async function saveProgress() {
    setProgressStatus("saving");
    try {
      const result = await completeThirdLesson();
      setProgressStatus(result.status === "saved" ? "saved" : "error");
    } catch {
      setProgressStatus("error");
    }
  }

  function restart() {
    setReferenceAnswer(null);
    setAmountAnswer(null);
    setStressAnswer(null);
    setProgressStatus("idle");
    goTo("welcome");
  }

  const current = stepIndex + 1;
  const total = HOW_MUCH_SHOULD_YOU_SAVE_STEPS.length;
  const labels = {
    skip: copy.chrome.skip,
    progress: copy.chrome.progress
      .replace("{current}", String(current))
      .replace("{total}", String(total)),
    leave: copy.chrome.leave,
  };

  return (
    <PracticeTemplate current={current} total={total} labels={labels}>
      <div ref={content} className="flex min-h-0 flex-1 flex-col [&_h1]:focus:outline-none">
        <HowMuchShouldYouSaveLesson
          step={step}
          copy={copy}
          referenceAnswer={referenceAnswer}
          amountAnswer={amountAnswer}
          stressAnswer={stressAnswer}
          progressStatus={progressStatus}
          onReferenceAnswer={setReferenceAnswer}
          onAmountAnswer={setAmountAnswer}
          onStressAnswer={setStressAnswer}
          onGoTo={goTo}
          onRestart={restart}
          onRetryProgress={() => void saveProgress()}
        />
      </div>
    </PracticeTemplate>
  );
}
