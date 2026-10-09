"use client";

import { useEffect, useRef, useState } from "react";
import { PayYourselfFirstLesson } from "@/components/organisms/pay-yourself-first-lesson";
import { PracticeTemplate } from "@/components/templates/practice-template";
import { track } from "@/lib/analytics";
import type { ProgressStatus } from "@/lib/course-progress";
import {
  PAY_YOURSELF_FIRST_STEPS,
  type PayYourselfFirstStep,
} from "@/lib/pay-yourself-first-lesson";
import { completeSecondLesson } from "./actions";

export function PayYourselfFirstFlow() {
  const [step, setStep] = useState<PayYourselfFirstStep>("welcome");
  const [orderAnswer, setOrderAnswer] = useState<string | null>(null);
  const [habitAnswer, setHabitAnswer] = useState<string | null>(null);
  const [changeAnswer, setChangeAnswer] = useState<string | null>(null);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>("idle");
  const content = useRef<HTMLDivElement>(null);
  const stepIndex = PAY_YOURSELF_FIRST_STEPS.indexOf(step);

  useEffect(() => {
    window.history.replaceState(window.history.state, "", "#welcome");
  }, []);

  useEffect(() => {
    const heading = content.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step]);

  function goTo(target: PayYourselfFirstStep) {
    window.history.replaceState(window.history.state, "", `#${target}`);
    setStep(target);
    track("demo_lesson_opened", { lesson: "pay-yourself-first", step: target });
    if (target === "complete") void saveProgress();
  }

  async function saveProgress() {
    setProgressStatus("saving");
    try {
      const result = await completeSecondLesson();
      setProgressStatus(result.status === "saved" ? "saved" : "error");
    } catch {
      setProgressStatus("error");
    }
  }

  function restart() {
    setOrderAnswer(null);
    setHabitAnswer(null);
    setChangeAnswer(null);
    setProgressStatus("idle");
    goTo("welcome");
  }

  return (
    <PracticeTemplate current={stepIndex + 1} total={PAY_YOURSELF_FIRST_STEPS.length}>
      <div ref={content} className="flex min-h-0 flex-1 flex-col [&_h1]:focus:outline-none">
        <PayYourselfFirstLesson
          step={step}
          orderAnswer={orderAnswer}
          habitAnswer={habitAnswer}
          changeAnswer={changeAnswer}
          progressStatus={progressStatus}
          onOrderAnswer={setOrderAnswer}
          onHabitAnswer={setHabitAnswer}
          onChangeAnswer={setChangeAnswer}
          onGoTo={goTo}
          onRestart={restart}
          onRetryProgress={() => void saveProgress()}
        />
      </div>
    </PracticeTemplate>
  );
}
