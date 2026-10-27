"use client";

import { useEffect, useRef, useState } from "react";
import { MoneyYoullNeedSoonLesson } from "@/components/lessons/money-youll-need-soon-lesson";
import { PracticeTemplate } from "@/components/practice/practice-template";
import { track } from "@/lib/analytics";
import type { ProgressStatus } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import {
  MONEY_YOULL_NEED_SOON_STEPS,
  type MoneyYoullNeedSoonStep,
} from "@/lib/money-youll-need-soon-lesson";
import type { Track } from "@/lib/tracks";
import { completeFifthLesson } from "./actions";

export function MoneyYoullNeedSoonFlow({ track: memberTrack }: { track: Track }) {
  const dictionary = getDictionary(memberTrack);
  const copy = dictionary.lesson5;
  const [step, setStep] = useState<MoneyYoullNeedSoonStep>("welcome");
  const [roleAnswer, setRoleAnswer] = useState<string | null>(null);
  const [stabilityAnswer, setStabilityAnswer] = useState<string | null>(null);
  const [changeAnswer, setChangeAnswer] = useState<string | null>(null);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>("idle");
  const content = useRef<HTMLDivElement>(null);
  const stepIndex = MONEY_YOULL_NEED_SOON_STEPS.indexOf(step);

  useEffect(() => {
    window.history.replaceState(window.history.state, "", "#welcome");
  }, []);

  useEffect(() => {
    const heading = content.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step]);

  function goTo(target: MoneyYoullNeedSoonStep) {
    window.history.replaceState(window.history.state, "", `#${target}`);
    setStep(target);
    track("demo_lesson_opened", { lesson: "money-youll-need-soon", step: target });
    if (target === "complete") void saveProgress();
  }

  async function saveProgress() {
    setProgressStatus("saving");
    try {
      const result = await completeFifthLesson();
      setProgressStatus(result.status === "saved" ? "saved" : "error");
    } catch {
      setProgressStatus("error");
    }
  }

  function restart() {
    setRoleAnswer(null);
    setStabilityAnswer(null);
    setChangeAnswer(null);
    setProgressStatus("idle");
    goTo("welcome");
  }

  return (
    <PracticeTemplate
      current={stepIndex + 1}
      total={MONEY_YOULL_NEED_SOON_STEPS.length}
      copy={dictionary.learning.shared}
      skipLink={dictionary.skipLink}
    >
      <div ref={content} className="flex min-h-0 flex-1 flex-col [&_h1]:focus:outline-none">
        <MoneyYoullNeedSoonLesson
          step={step}
          copy={copy}
          track={memberTrack}
          roleAnswer={roleAnswer}
          stabilityAnswer={stabilityAnswer}
          changeAnswer={changeAnswer}
          progressStatus={progressStatus}
          onRoleAnswer={setRoleAnswer}
          onStabilityAnswer={setStabilityAnswer}
          onChangeAnswer={setChangeAnswer}
          onGoTo={goTo}
          onRestart={restart}
          onRetryProgress={() => void saveProgress()}
        />
      </div>
    </PracticeTemplate>
  );
}
