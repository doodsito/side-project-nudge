"use client";

import { useEffect, useRef, useState } from "react";
import { DebtVsInvestingLesson } from "@/components/lessons/debt-vs-investing-lesson";
import { PracticeTemplate } from "@/components/practice/practice-template";
import { track } from "@/lib/analytics";
import type { ProgressStatus } from "@/lib/course-progress";
import { DEBT_VS_INVESTING_STEPS, type DebtVsInvestingStep } from "@/lib/debt-vs-investing-lesson";
import { getDictionary } from "@/lib/dictionaries";
import type { Track } from "@/lib/tracks";
import { completeSixthLesson } from "./actions";

export function DebtVsInvestingFlow({ track: memberTrack }: { track: Track }) {
  const dictionary = getDictionary(memberTrack);
  const copy = dictionary.lesson6;
  const [step, setStep] = useState<DebtVsInvestingStep>("welcome");
  const [rateAnswer, setRateAnswer] = useState<string | null>(null);
  const [decisionAnswer, setDecisionAnswer] = useState<string | null>(null);
  const [changeAnswer, setChangeAnswer] = useState<string | null>(null);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>("idle");
  const content = useRef<HTMLDivElement>(null);
  const stepIndex = DEBT_VS_INVESTING_STEPS.indexOf(step);

  useEffect(() => {
    window.history.replaceState(window.history.state, "", "#welcome");
  }, []);

  useEffect(() => {
    const heading = content.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step]);

  function goTo(target: DebtVsInvestingStep) {
    window.history.replaceState(window.history.state, "", `#${target}`);
    setStep(target);
    track("demo_lesson_opened", { lesson: "debt-vs-investing", step: target });
    if (target === "complete") void saveProgress();
  }

  async function saveProgress() {
    setProgressStatus("saving");
    try {
      const result = await completeSixthLesson();
      setProgressStatus(result.status === "saved" ? "saved" : "error");
    } catch {
      setProgressStatus("error");
    }
  }

  function restart() {
    setRateAnswer(null);
    setDecisionAnswer(null);
    setChangeAnswer(null);
    setProgressStatus("idle");
    goTo("welcome");
  }

  return (
    <PracticeTemplate
      current={stepIndex + 1}
      total={DEBT_VS_INVESTING_STEPS.length}
      copy={dictionary.learning.shared}
      skipLink={dictionary.skipLink}
    >
      <div ref={content} className="flex min-h-0 flex-1 flex-col [&_h1]:focus:outline-none">
        <DebtVsInvestingLesson
          step={step}
          copy={copy}
          track={memberTrack}
          rateAnswer={rateAnswer}
          decisionAnswer={decisionAnswer}
          changeAnswer={changeAnswer}
          progressStatus={progressStatus}
          onRateAnswer={setRateAnswer}
          onDecisionAnswer={setDecisionAnswer}
          onChangeAnswer={setChangeAnswer}
          onGoTo={goTo}
          onRestart={restart}
          onRetryProgress={() => void saveProgress()}
        />
      </div>
    </PracticeTemplate>
  );
}
