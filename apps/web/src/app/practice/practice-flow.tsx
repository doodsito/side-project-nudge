"use client";

import { useEffect, useRef, useState } from "react";
import { FirstPaychequeLesson } from "@/components/lessons/first-paycheque-lesson";
import { PracticeTemplate } from "@/components/practice/practice-template";
import { useTrackCookie } from "@/hooks/use-track-cookie";
import { type ProgressStatus } from "@/lib/course-progress";
import {
  BUDGET_ITEMS,
  LESSON_STEPS,
  scoreSkipQuiz,
  type ExpenseType,
  type LessonView,
  type SkipQuizAnswers,
} from "@/lib/first-paycheque-lesson";
import { track } from "@/lib/analytics";
import { DEFAULT_TRACK } from "@/lib/tracks";
import { completeFirstLesson } from "./actions";

export function PracticeFlow() {
  const [step, setStep] = useState<LessonView>("welcome");
  const [expenseIndex, setExpenseIndex] = useState(0);
  const [expenseAnswer, setExpenseAnswer] = useState<ExpenseType | null>(null);
  const [conceptAnswer, setConceptAnswer] = useState<string | null>(null);
  const [transferAnswer, setTransferAnswer] = useState<string | null>(null);
  const [skipAnswers, setSkipAnswers] = useState<SkipQuizAnswers>({});
  const [skipChecked, setSkipChecked] = useState(false);
  const [skipped, setSkipped] = useState(false);
  // Dollars on the US track, euros otherwise (France is the default track).
  const lessonTrack = useTrackCookie() ?? DEFAULT_TRACK;
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>("idle");
  const content = useRef<HTMLDivElement>(null);
  // The skip quiz counts as the first screen in the progress bar.
  const stepIndex = step === "skip-quiz" ? 0 : LESSON_STEPS.indexOf(step);

  useEffect(() => {
    window.history.replaceState(window.history.state, "", "#welcome");
  }, []);

  useEffect(() => {
    const heading = content.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step, expenseIndex]);

  function goTo(target: LessonView) {
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

  function checkSkipQuiz() {
    if (scoreSkipQuiz(skipAnswers).passed) {
      setSkipped(true);
      goTo("complete");
      return;
    }
    setSkipChecked(true);
  }

  function restart() {
    setExpenseIndex(0);
    setExpenseAnswer(null);
    setConceptAnswer(null);
    setTransferAnswer(null);
    setSkipAnswers({});
    setSkipChecked(false);
    setSkipped(false);
    setProgressStatus("idle");
    goTo("welcome");
  }

  return (
    <PracticeTemplate current={stepIndex + 1} total={LESSON_STEPS.length}>
      <div ref={content} className="flex flex-1 flex-col [&_h1]:focus:outline-none">
        <FirstPaychequeLesson
          step={step}
          track={lessonTrack}
          expenseIndex={expenseIndex}
          expenseAnswer={expenseAnswer}
          conceptAnswer={conceptAnswer}
          transferAnswer={transferAnswer}
          skipAnswers={skipAnswers}
          skipChecked={skipChecked}
          skipped={skipped}
          progressStatus={progressStatus}
          onExpenseAnswer={setExpenseAnswer}
          onConceptAnswer={setConceptAnswer}
          onTransferAnswer={setTransferAnswer}
          onSkipAnswer={(question, answer) => {
            if (!skipChecked) setSkipAnswers((current) => ({ ...current, [question]: answer }));
          }}
          onCheckSkipQuiz={checkSkipQuiz}
          onContinueExpense={continueExpense}
          onGoTo={goTo}
          onRestart={restart}
          onRetryProgress={() => void saveProgress()}
        />
      </div>
    </PracticeTemplate>
  );
}
