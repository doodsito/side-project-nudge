"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check, RefreshCcw } from "lucide-react";
import { LessonRating } from "@/components/lessons/lesson-rating";
import { PracticeTemplate } from "@/components/practice/practice-template";
import { ChoiceButton, ChoiceMarker } from "@/components/shared/choice-button";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";
import type { ProgressStatus } from "@/lib/course-progress";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import {
  CORRECT_OPTIONS,
  INVESTMENT_BASICS_STEPS,
  MATCHING_ANSWERS,
  MATCHING_ITEMS,
  newQuestionOrder,
  type MechanismId,
} from "@/lib/investment-basics-lesson";
import type { Track } from "@/lib/tracks";
import { completeInvestmentBasicsLesson } from "./actions";

type QuestionCopy = {
  prompt: string;
  options: Record<string, string>;
  feedback: Record<string, string>;
};

const QUIZ_IDS = ["quizShare", "quizMechanisms", "quizRisk"] as const;
const MECHANISMS = ["own", "lend", "fund"] as const;

function Screen({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  action: ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <section className="min-h-0 flex-1 overflow-y-auto px-5 py-7 sm:px-8 sm:py-10">
        <div className="mx-auto my-auto w-full max-w-xl animate-rise">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight outline-none sm:text-4xl">
            {title}
          </h1>
          {children}
        </div>
      </section>
      <div className="shrink-0 border-t border-border bg-surface/95 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto w-full max-w-xl">{action}</div>
      </div>
    </div>
  );
}

function NextButton({
  children,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      size="xl"
      onClick={onClick}
      disabled={disabled}
      className="w-full sm:ml-auto sm:flex sm:w-fit sm:min-w-48"
    >
      {children} <ArrowRight aria-hidden="true" />
    </Button>
  );
}

function Question({
  copy,
  order,
  answer,
  checked,
  correctId,
  onAnswer,
  correctLabel,
  rethinkLabel,
}: {
  copy: QuestionCopy;
  order: string[];
  answer: string | null;
  checked: boolean;
  correctId: string;
  onAnswer: (id: string) => void;
  correctLabel: string;
  rethinkLabel: string;
}) {
  return (
    <>
      <p className="mt-6 text-lg font-semibold leading-relaxed">{copy.prompt}</p>
      <div className="mt-5 grid gap-3" role="radiogroup" aria-label={copy.prompt}>
        {order.map((id, index) => (
          <ChoiceButton
            key={id}
            selected={answer === id}
            tabIndex={answer === id || (answer === null && index === 0) ? 0 : -1}
            onClick={() => onAnswer(id)}
            disabled={checked}
            className="min-h-16 gap-3 p-4 text-base font-semibold"
          >
            <ChoiceMarker selected={answer === id} className="size-7 text-xs">
              {answer === id ? <Check className="size-4" /> : String.fromCharCode(65 + index)}
            </ChoiceMarker>
            {copy.options[id]}
          </ChoiceButton>
        ))}
      </div>
      {checked && answer && (
        <div
          role="status"
          aria-live="polite"
          className="mt-5 rounded-2xl border border-primary/25 bg-primary-soft p-4"
        >
          <p className="font-display font-extrabold">
            {answer === correctId ? correctLabel : rethinkLabel}
          </p>
          <p className="mt-1 text-sm leading-relaxed">{copy.feedback[answer]}</p>
        </div>
      )}
    </>
  );
}

export function InvestmentBasicsFlow({
  track,
  initialOrder,
  preview = false,
}: {
  track: Track;
  initialOrder: ReturnType<typeof newQuestionOrder>;
  preview?: boolean;
}) {
  const dictionary = getDictionary(track);
  const copy = dictionary.investmentBasics;
  const [step, setStep] = useState(0);
  const [mechanismIndex, setMechanismIndex] = useState(0);
  const [matchingIndex, setMatchingIndex] = useState(0);
  const [matchingAnswer, setMatchingAnswer] = useState<MechanismId | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [order, setOrder] = useState(initialOrder);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>("idle");
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollRegion = content.current?.querySelector("section");
    if (scrollRegion) scrollRegion.scrollTop = 0;
    const heading = content.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    (heading as HTMLElement | null)?.focus({ preventScroll: true });
  }, [step, mechanismIndex, matchingIndex, quizIndex]);

  function advance() {
    setAnswer(null);
    setChecked(false);
    setStep((current) => current + 1);
  }

  function restart() {
    setOrder(newQuestionOrder());
    setStep(0);
    setMechanismIndex(0);
    setMatchingIndex(0);
    setMatchingAnswer(null);
    setQuizIndex(0);
    setAnswer(null);
    setChecked(false);
    setProgressStatus("idle");
  }

  async function saveProgress() {
    setProgressStatus("saving");
    try {
      const result = await completeInvestmentBasicsLesson();
      setProgressStatus(result.status);
    } catch {
      setProgressStatus("error");
    }
  }

  function finish() {
    setStep(6);
    if (!preview) void saveProgress();
  }

  function questionAction(isQuiz: boolean) {
    if (!checked) {
      return (
        <NextButton onClick={() => setChecked(true)} disabled={answer === null}>
          {copy.check}
        </NextButton>
      );
    }
    if (isQuiz && answer !== CORRECT_OPTIONS[QUIZ_IDS[quizIndex]!]) {
      return (
        <NextButton
          onClick={() => {
            setAnswer(null);
            setChecked(false);
          }}
        >
          {copy.retry}
        </NextButton>
      );
    }
    return (
      <NextButton
        onClick={() => {
          if (isQuiz) {
            if (quizIndex === QUIZ_IDS.length - 1) finish();
            else {
              setQuizIndex((current) => current + 1);
              setAnswer(null);
              setChecked(false);
            }
          } else advance();
        }}
      >
        {copy.next}
      </NextButton>
    );
  }

  let screen: ReactNode;
  if (step === 0) {
    screen = (
      <Screen eyebrow={copy.hook.eyebrow} title={copy.hook.title} action={questionAction(false)}>
        <p className="mt-5 text-muted-foreground">{copy.hook.body}</p>
        <Question
          copy={copy.hook}
          order={order.hook}
          answer={answer}
          checked={checked}
          correctId={CORRECT_OPTIONS.hook}
          onAnswer={setAnswer}
          correctLabel={copy.correct}
          rethinkLabel={copy.rethink}
        />
        {checked && (
          <p className="mt-4 text-sm font-semibold leading-relaxed">{copy.hook.takeaway}</p>
        )}
      </Screen>
    );
  } else if (step === 1) {
    screen = (
      <Screen
        eyebrow={copy.discovery.eyebrow}
        title={copy.discovery.title}
        action={<NextButton onClick={advance}>{copy.next}</NextButton>}
      >
        <p className="mt-6 text-lg leading-relaxed">{copy.discovery.body}</p>
        <p className="mt-5 rounded-2xl border border-primary/25 bg-primary-soft p-4 font-semibold">
          {copy.discovery.note}
        </p>
      </Screen>
    );
  } else if (step === 2) {
    const mechanism = MECHANISMS[mechanismIndex]!;
    screen = (
      <Screen
        eyebrow={copy.mechanisms.eyebrow}
        title={copy.mechanisms.title}
        action={
          <NextButton
            onClick={() => {
              if (mechanismIndex === MECHANISMS.length - 1) advance();
              else setMechanismIndex((current) => current + 1);
            }}
          >
            {copy.next}
          </NextButton>
        }
      >
        <p className="mt-6 text-sm font-bold text-muted-foreground">
          {mechanismIndex + 1} / {MECHANISMS.length}
        </p>
        <div className="mt-3 rounded-2xl border border-border bg-surface p-5 shadow-soft">
          <h2 className="font-display text-xl font-extrabold">
            {copy.mechanisms[mechanism].label}
          </h2>
          <p className="mt-3 text-lg leading-relaxed">{copy.mechanisms[mechanism].body}</p>
        </div>
        {mechanismIndex === MECHANISMS.length - 1 && (
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {copy.mechanisms.note}
          </p>
        )}
      </Screen>
    );
  } else if (step === 3) {
    const item = MATCHING_ITEMS[matchingIndex]!;
    const matched = matchingAnswer === MATCHING_ANSWERS[item];
    screen = (
      <Screen
        eyebrow={copy.matching.eyebrow}
        title={copy.matching.title}
        action={
          <NextButton
            disabled={!matched}
            onClick={() => {
              if (matchingIndex === MATCHING_ITEMS.length - 1) advance();
              else {
                setMatchingIndex((current) => current + 1);
                setMatchingAnswer(null);
              }
            }}
          >
            {copy.next}
          </NextButton>
        }
      >
        <p className="mt-5 text-muted-foreground">{copy.matching.prompt}</p>
        <p className="mt-6 text-sm font-bold text-muted-foreground">
          {matchingIndex + 1} / {MATCHING_ITEMS.length}
        </p>
        <p className="mt-2 rounded-2xl border border-border bg-surface p-5 text-lg font-semibold shadow-soft">
          {copy.matching.items[item]}
        </p>
        <div className="mt-5 grid gap-3" role="radiogroup" aria-label={copy.matching.items[item]}>
          {MECHANISMS.map((mechanism, index) => (
            <ChoiceButton
              key={mechanism}
              selected={matchingAnswer === mechanism}
              tabIndex={matchingAnswer === mechanism || (!matchingAnswer && index === 0) ? 0 : -1}
              onClick={() => setMatchingAnswer(mechanism)}
              disabled={matched}
              className="min-h-14 p-4 text-base font-semibold"
            >
              {copy.matching.choices[mechanism]}
            </ChoiceButton>
          ))}
        </div>
        {matchingAnswer && (
          <p role="status" aria-live="polite" className="mt-4 text-sm font-semibold">
            {matched ? copy.matching.correct : copy.matching.wrong}
          </p>
        )}
      </Screen>
    );
  } else if (step === 4) {
    screen = (
      <Screen eyebrow={copy.value.eyebrow} title={copy.value.title} action={questionAction(false)}>
        <p className="mt-5 leading-relaxed text-muted-foreground">{copy.value.body}</p>
        <Question
          copy={copy.value}
          order={order.value}
          answer={answer}
          checked={checked}
          correctId={CORRECT_OPTIONS.value}
          onAnswer={setAnswer}
          correctLabel={copy.correct}
          rethinkLabel={copy.rethink}
        />
        {checked && (
          <p className="mt-4 text-sm font-semibold leading-relaxed">{copy.value.takeaway}</p>
        )}
      </Screen>
    );
  } else if (step === 5) {
    const questionId = QUIZ_IDS[quizIndex]!;
    const questionCopy = copy.quiz.questions[questionId];
    screen = (
      <Screen eyebrow={copy.quiz.eyebrow} title={copy.quiz.title} action={questionAction(true)}>
        <p className="mt-5 text-sm font-bold text-muted-foreground">
          {copy.quiz.progress(quizIndex + 1, QUIZ_IDS.length)}
        </p>
        <Question
          copy={questionCopy}
          order={order[questionId]}
          answer={answer}
          checked={checked}
          correctId={CORRECT_OPTIONS[questionId]}
          onAnswer={setAnswer}
          correctLabel={copy.correct}
          rethinkLabel={copy.rethink}
        />
      </Screen>
    );
  } else if (progressStatus === "saved") {
    screen = <LessonRating track={track} nextHref="/dashboard/courses" />;
  } else {
    screen = (
      <Screen
        eyebrow={copy.complete.eyebrow}
        title={copy.complete.title}
        action={
          progressStatus === "error" ? (
            <NextButton onClick={() => void saveProgress()}>{copy.retry}</NextButton>
          ) : (
            <Button size="xl" variant="outline" onClick={restart} className="w-full sm:w-fit">
              <RefreshCcw aria-hidden="true" /> {copy.replay}
            </Button>
          )
        }
      >
        <p className="mt-6 text-lg leading-relaxed">{copy.complete.body}</p>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{copy.complete.next}</p>
        <p role="status" aria-live="polite" className="mt-5 font-semibold text-primary">
          {preview ? copy.previewDone : progressStatus === "error" ? copy.saveError : copy.saving}
        </p>
      </Screen>
    );
  }

  return (
    <PracticeTemplate
      current={Math.min(step + 1, INVESTMENT_BASICS_STEPS.length)}
      total={INVESTMENT_BASICS_STEPS.length}
      copy={dictionary.learning.shared}
      skipLink={dictionary.skipLink}
    >
      <div ref={content} className="flex min-h-0 flex-1 flex-col">
        {screen}
      </div>
    </PracticeTemplate>
  );
}
