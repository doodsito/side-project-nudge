"use client";

import { useEffect, useRef, useState } from "react";
import { BuildYourSafetyNetLesson } from "@/components/lessons/build-your-safety-net-lesson";
import { PracticeTemplate } from "@/components/practice/practice-template";
import { track } from "@/lib/analytics";
import {
  BUILD_YOUR_SAFETY_NET_STEPS,
  type BuildYourSafetyNetStep,
} from "@/lib/build-your-safety-net-lesson";
import type { ProgressStatus } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import type { Track } from "@/lib/tracks";
import { completeFourthLesson } from "./actions";

export function BuildYourSafetyNetFlow({ track: memberTrack }: { track: Track }) {
  const dictionary = getDictionary(memberTrack);
  const copy = dictionary.lesson4;
  const [step, setStep] = useState<BuildYourSafetyNetStep>("welcome");
  const [factorAnswer, setFactorAnswer] = useState<string | null>(null);
  const [decisionAnswer, setDecisionAnswer] = useState<string | null>(null);
  const [rebuildAnswer, setRebuildAnswer] = useState<string | null>(null);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>("idle");
  const content = useRef<HTMLDivElement>(null);
  const stepIndex = BUILD_YOUR_SAFETY_NET_STEPS.indexOf(step);

  useEffect(() => {
    window.history.replaceState(window.history.state, "", "#welcome");
  }, []);

  useEffect(() => {
    const heading = content.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step]);

  function goTo(target: BuildYourSafetyNetStep) {
    window.history.replaceState(window.history.state, "", `#${target}`);
    setStep(target);
    track("demo_lesson_opened", { lesson: "build-your-safety-net", step: target });
    if (target === "complete") void saveProgress();
  }

  async function saveProgress() {
    setProgressStatus("saving");
    try {
      const result = await completeFourthLesson();
      setProgressStatus(result.status === "saved" ? "saved" : "error");
    } catch {
      setProgressStatus("error");
    }
  }

  function restart() {
    setFactorAnswer(null);
    setDecisionAnswer(null);
    setRebuildAnswer(null);
    setProgressStatus("idle");
    goTo("welcome");
  }

  return (
    <PracticeTemplate
      current={stepIndex + 1}
      total={BUILD_YOUR_SAFETY_NET_STEPS.length}
      copy={dictionary.learning.shared}
      skipLink={dictionary.skipLink}
    >
      <div ref={content} className="flex min-h-0 flex-1 flex-col [&_h1]:focus:outline-none">
        <BuildYourSafetyNetLesson
          step={step}
          copy={copy}
          track={memberTrack}
          factorAnswer={factorAnswer}
          decisionAnswer={decisionAnswer}
          rebuildAnswer={rebuildAnswer}
          progressStatus={progressStatus}
          onFactorAnswer={setFactorAnswer}
          onDecisionAnswer={setDecisionAnswer}
          onRebuildAnswer={setRebuildAnswer}
          onGoTo={goTo}
          onRestart={restart}
          onRetryProgress={() => void saveProgress()}
        />
      </div>
    </PracticeTemplate>
  );
}
