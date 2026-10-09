"use client";

import { useEffect, useRef, useState } from "react";
import { FirstPaychequeLesson } from "@/components/organisms/first-paycheque-lesson";
import { PracticeTemplate } from "@/components/templates/practice-template";
import { type ProgressStatus } from "@/lib/course-progress";
import { BUDGET_ITEMS, LESSON_STEPS, type LessonStep } from "@/lib/first-paycheque-lesson";
import { track } from "@/lib/analytics";
import { completeFirstLesson } from "./actions";

export function PracticeFlow() {
  const [step, setStep] = useState<LessonStep>("welcome");
  const [expenseIndex, setExpenseIndex] = useState(0);
  const [expenseAnswer, setExpenseAnswer] = useState<"essential" | "flexible" | null>(null);
  const [conceptAnswer, setConceptAnswer] = useState<string | null>(null);
  const [transferAnswer, setTransferAnswer] = useState<string | null>(null);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>("idle");
  const content = useRef<HTMLDivElement>(null);
  const stepIndex = LESSON_STEPS.indexOf(step);

  useEffect(() => {
    window.history.replaceState(window.history.state, "", "#welcome");
  }, []);

  useEffect(() => {
    const heading = content.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step, expenseIndex]);

  function goTo(target: LessonStep) {
    window.history.replaceState(window.history.state, "", `#${target}`);
    setStep(target);
    track("demo_lesson_opened", { lesson: "first-paycheque", step: target });
    if (target === "complete") void saveProgress();
  }

  async function saveProgress() {
    setProgressStatus("saving");
    try {
      const result = await completeFirstLesson();
      setProgressStatus(
        result.status === "signed-out" ? "idle" : result.status === "saved" ? "saved" : "error",
      );
    } catch {
      setProgressStatus("error");
    }
  }

  function continueExpense() {
    if (expenseIndex < BUDGET_ITEMS.length - 1) {
      setExpenseIndex((current) => current + 1);
      setExpenseAnswer(null);
      return;
    }
    goTo("result");
  }

  function restart() {
    setExpenseIndex(0);
    setExpenseAnswer(null);
    setConceptAnswer(null);
    setTransferAnswer(null);
    setProgressStatus("idle");
    goTo("welcome");
  }

  return (
    <PracticeTemplate current={stepIndex + 1} total={LESSON_STEPS.length}>
      <div ref={content} className="flex flex-1 flex-col [&_h1]:focus:outline-none">
        <FirstPaychequeLesson
          step={step}
          expenseIndex={expenseIndex}
          expenseAnswer={expenseAnswer}
          conceptAnswer={conceptAnswer}
          transferAnswer={transferAnswer}
          progressStatus={progressStatus}
          onExpenseAnswer={setExpenseAnswer}
          onConceptAnswer={setConceptAnswer}
          onTransferAnswer={setTransferAnswer}
          onContinueExpense={continueExpense}
          onGoTo={goTo}
          onRestart={restart}
          onRetryProgress={() => void saveProgress()}
        />
      </div>
    </PracticeTemplate>
  );
}
