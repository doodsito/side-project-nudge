"use client";

import { useEffect, useRef, useState } from "react";
import { WhyInvestLesson } from "@/components/lessons/why-invest-lesson";
import { PracticeTemplate } from "@/components/practice/practice-template";
import type { ProgressStatus } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import type { Track } from "@/lib/tracks";
import { WHY_INVEST_STEPS, type WhyInvestStep } from "@/lib/why-invest-lesson";
import { completeWhyInvestLesson } from "./actions";

export function WhyInvestFlow({
  track,
  alreadyCompleted,
}: {
  track: Track;
  alreadyCompleted: boolean;
}) {
  const dictionary = getDictionary(track);
  const [step, setStep] = useState<WhyInvestStep>("welcome");
  const [answer, setAnswer] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>("idle");
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.history.replaceState(window.history.state, "", "#welcome");
  }, []);

  useEffect(() => {
    const scrollRegion = content.current?.querySelector("section");
    if (scrollRegion) scrollRegion.scrollTop = 0;
    const heading = content.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
  }, [step]);

  function goTo(target: WhyInvestStep) {
    window.history.replaceState(window.history.state, "", `#${target}`);
    setStep(target);
    if (target === "complete" && !alreadyCompleted) void saveProgress();
    if (target === "complete" && alreadyCompleted) setProgressStatus("saved");
  }

  async function saveProgress() {
    setProgressStatus("saving");
    try {
      const result = await completeWhyInvestLesson();
      setProgressStatus(result.status);
    } catch {
      setProgressStatus("error");
    }
  }

  function restart() {
    setAnswer(null);
    setChecked(false);
    setProgressStatus("idle");
    goTo("welcome");
  }

  return (
    <PracticeTemplate
      current={WHY_INVEST_STEPS.indexOf(step) + 1}
      total={WHY_INVEST_STEPS.length}
      copy={dictionary.learning.shared}
      skipLink={dictionary.skipLink}
      exitHref="/dashboard/courses"
    >
      <div ref={content} className="flex min-h-0 flex-1 flex-col [&_h1]:focus:outline-none">
        <WhyInvestLesson
          step={step}
          copy={dictionary.lesson0}
          track={track}
          answer={answer}
          checked={checked}
          progressStatus={progressStatus}
          onAnswer={(value) => {
            setAnswer(value);
            setChecked(false);
          }}
          onCheck={() => setChecked(true)}
          onGoTo={goTo}
          onRestart={restart}
          onRetryProgress={() => void saveProgress()}
        />
      </div>
    </PracticeTemplate>
  );
}
