"use client";

import { useEffect, useRef, useState } from "react";
import { CashIsntRiskFreeLesson } from "@/components/lessons/cash-isnt-risk-free-lesson";
import { PracticeTemplate } from "@/components/practice/practice-template";
import { track } from "@/lib/analytics";
import {
  CASH_ISNT_RISK_FREE_STEPS,
  type CashIsntRiskFreeStep,
} from "@/lib/cash-isnt-risk-free-lesson";
import type { ProgressStatus } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import type { Track } from "@/lib/tracks";
import { completeSeventhLesson } from "./actions";

export function CashIsntRiskFreeFlow({ track: memberTrack }: { track: Track }) {
  const dictionary = getDictionary(memberTrack);
  const copy = dictionary.lesson7;
  const [step, setStep] = useState<CashIsntRiskFreeStep>("welcome");
  const [inflationAnswer, setInflationAnswer] = useState<string | null>(null);
  const [balanceAnswer, setBalanceAnswer] = useState<string | null>(null);
  const [interestAnswer, setInterestAnswer] = useState<string | null>(null);
  const [nearTermAnswer, setNearTermAnswer] = useState<string | null>(null);
  const [longTermAnswer, setLongTermAnswer] = useState<string | null>(null);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>("idle");
  const content = useRef<HTMLDivElement>(null);
  const stepIndex = CASH_ISNT_RISK_FREE_STEPS.indexOf(step);

  useEffect(() => {
    window.history.replaceState(window.history.state, "", "#welcome");
  }, []);

  useEffect(() => {
    const heading = content.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step]);

  function goTo(target: CashIsntRiskFreeStep) {
    window.history.replaceState(window.history.state, "", `#${target}`);
    setStep(target);
    track("demo_lesson_opened", { lesson: "cash-isnt-risk-free", step: target });
    if (target === "complete") void saveProgress();
  }

  async function saveProgress() {
    setProgressStatus("saving");
    try {
      const result = await completeSeventhLesson();
      setProgressStatus(result.status === "saved" ? "saved" : "error");
    } catch {
      setProgressStatus("error");
    }
  }

  function restart() {
    setInflationAnswer(null);
    setBalanceAnswer(null);
    setInterestAnswer(null);
    setNearTermAnswer(null);
    setLongTermAnswer(null);
    setProgressStatus("idle");
    goTo("welcome");
  }

  return (
    <PracticeTemplate
      current={stepIndex + 1}
      total={CASH_ISNT_RISK_FREE_STEPS.length}
      copy={dictionary.learning.shared}
      skipLink={dictionary.skipLink}
    >
      <div ref={content} className="flex min-h-0 flex-1 flex-col [&_h1]:focus:outline-none">
        <CashIsntRiskFreeLesson
          step={step}
          copy={copy}
          track={memberTrack}
          inflationAnswer={inflationAnswer}
          balanceAnswer={balanceAnswer}
          interestAnswer={interestAnswer}
          nearTermAnswer={nearTermAnswer}
          longTermAnswer={longTermAnswer}
          progressStatus={progressStatus}
          onInflationAnswer={setInflationAnswer}
          onBalanceAnswer={setBalanceAnswer}
          onInterestAnswer={setInterestAnswer}
          onNearTermAnswer={setNearTermAnswer}
          onLongTermAnswer={setLongTermAnswer}
          onGoTo={goTo}
          onRestart={restart}
          onRetryProgress={() => void saveProgress()}
        />
      </div>
    </PracticeTemplate>
  );
}
