"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Check,
  Clock3,
  Lightbulb,
  LoaderCircle,
  PartyPopper,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { FeedbackHeaderButton } from "@/components/shared/feedback-widget";
import { ChoiceButton, ChoiceMarker } from "@/components/shared/choice-button";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";
import type { ProgressStatus } from "@/lib/course-progress";
import type { Dictionary } from "@/lib/dictionaries";
import { formatMoney } from "@/lib/first-paycheque-lesson";
import {
  EXAMPLE_AMOUNT,
  SAVINGS_VS_INVESTING_OPTIONS,
  type SavingsVsInvestingQuestion,
  type SavingsVsInvestingStep,
} from "@/lib/savings-vs-investing-lesson";
import type { Track } from "@/lib/tracks";
import { cn } from "@/lib/utils";

type LessonCopy = Dictionary["lesson8"];

type QuestionCopy = {
  eyebrow: string;
  title: string;
  prompt: string;
  check?: string;
  hint?: string;
  options: readonly string[];
  feedback: readonly string[];
  action: string;
};

type Props = {
  step: SavingsVsInvestingStep;
  copy: LessonCopy;
  track: Track;
  answer: string | null;
  checked: boolean;
  progressStatus: ProgressStatus;
  showConfetti: boolean;
  onAnswer: (answer: string) => void;
  onCheck: () => void;
  onGoTo: (step: SavingsVsInvestingStep) => void;
  onRestart: () => void;
  onRetryProgress: () => void;
};

function LessonScreen({
  children,
  action,
  wide = false,
}: {
  children: ReactNode;
  action: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <section className="flex min-h-0 flex-1 items-start overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
        <div className={cn("mx-auto my-auto w-full animate-rise", wide ? "max-w-3xl" : "max-w-xl")}>
          {children}
        </div>
      </section>
      <div className="shrink-0 border-t border-border bg-surface/95 px-5 py-4 backdrop-blur sm:px-8 sm:py-5">
        <div className={cn("mx-auto w-full", wide ? "max-w-3xl" : "max-w-xl")}>{action}</div>
      </div>
    </div>
  );
}

function PrimaryAction({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <Button size="xl" onClick={onClick} className="w-full sm:ml-auto sm:flex sm:w-fit sm:min-w-48">
      {children} <ArrowRight aria-hidden="true" />
    </Button>
  );
}

function QuestionScreen({
  question,
  copy,
  shared,
  answer,
  checked,
  onAnswer,
  onCheck,
  onNext,
  children,
}: {
  question: SavingsVsInvestingQuestion;
  copy: QuestionCopy;
  shared: LessonCopy["feedback"];
  answer: string | null;
  checked: boolean;
  onAnswer: (answer: string) => void;
  onCheck: () => void;
  onNext: () => void;
  children?: ReactNode;
}) {
  const options = SAVINGS_VS_INVESTING_OPTIONS[question];
  const selectedIndex = options.findIndex((option) => option.value === answer);
  const correctIndex = options.findIndex((option) => option.correct === true);
  const correct = selectedIndex === correctIndex;

  return (
    <LessonScreen
      action={
        checked ? (
          <PrimaryAction onClick={onNext}>{copy.action}</PrimaryAction>
        ) : answer ? (
          <PrimaryAction onClick={onCheck}>{copy.check ?? shared.check}</PrimaryAction>
        ) : (
          <p className="py-3 text-center text-sm font-semibold text-muted-foreground">
            {copy.hint ?? copy.prompt}
          </p>
        )
      }
    >
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <h1
        id={`${question}-question`}
        className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
      >
        {copy.title}
      </h1>
      {children}
      <p className="mt-4 text-muted-foreground">{copy.prompt}</p>
      <div className="mt-6 grid gap-3" role="radiogroup" aria-labelledby={`${question}-question`}>
        {options.map((option, index) => (
          <ChoiceButton
            key={option.value}
            selected={answer === option.value}
            tabIndex={answer === option.value || (!answer && index === 0) ? 0 : -1}
            onClick={() => onAnswer(option.value)}
            className="min-h-16 p-4 text-base font-bold"
          >
            <ChoiceMarker selected={answer === option.value} className="size-7 text-xs">
              {answer === option.value ? (
                <Check className="size-4" />
              ) : (
                String.fromCharCode(65 + index)
              )}
            </ChoiceMarker>
            {copy.options[index]}
          </ChoiceButton>
        ))}
      </div>
      {checked && selectedIndex >= 0 && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "mt-5 rounded-2xl border p-4",
            correctIndex < 0
              ? "border-primary/30 bg-primary-soft"
              : correct
                ? "border-market-up bg-surface"
                : "border-primary/30 bg-primary-soft",
          )}
        >
          <p className="flex items-center gap-2 font-display font-extrabold">
            {correctIndex < 0 ? (
              <Lightbulb className="size-5 text-primary" aria-hidden="true" />
            ) : correct ? (
              <Check className="size-5 text-market-up" aria-hidden="true" />
            ) : (
              <Lightbulb className="size-5 text-primary" aria-hidden="true" />
            )}
            {correctIndex < 0 ? shared.reflect : correct ? shared.correct : shared.rethink}
          </p>
          <p className="mt-2 text-sm leading-relaxed">{copy.feedback[selectedIndex]}</p>
          {correctIndex >= 0 && !correct && (
            <p className="mt-3 border-t border-border pt-3 text-sm font-semibold">
              {shared.answer} : {copy.options[correctIndex]}
            </p>
          )}
        </div>
      )}
    </LessonScreen>
  );
}

function Confetti() {
  const colors = ["bg-primary", "bg-brand-lime", "bg-mint"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <span
          key={index}
          className={cn(
            "lesson-confetti-piece absolute top-0 size-2 rounded-sm",
            colors[index % 3],
          )}
          style={{
            left: `${(index * 37) % 98}%`,
            animationDelay: `${(index % 8) * 70}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function SavingsVsInvestingLesson(props: Props) {
  const { copy } = props;

  if (props.step === "welcome") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("difference")}>
            {copy.welcome.action}
          </PrimaryAction>
        }
      >
        <span className="mb-7 grid size-20 place-items-center rounded-3xl bg-primary-soft text-primary">
          <Wallet className="size-9" aria-hidden="true" />
        </span>
        <Eyebrow>{copy.welcome.eyebrow}</Eyebrow>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-balance sm:text-5xl">
          {copy.welcome.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{copy.welcome.intro}</p>
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">{copy.welcome.note}</p>
      </LessonScreen>
    );
  }

  if (props.step === "difference") {
    return (
      <LessonScreen
        wide
        action={
          <PrimaryAction onClick={() => props.onGoTo("same-amount")}>
            {copy.difference.action}
          </PrimaryAction>
        }
      >
        <Eyebrow>{copy.difference.eyebrow}</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-balance sm:text-5xl">
          {copy.difference.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{copy.difference.intro}</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
            <ShieldCheck className="size-7 text-primary" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-extrabold">
              {copy.difference.savingTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {copy.difference.savingText}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
            <TrendingUp className="size-7 text-primary" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-extrabold">
              {copy.difference.investingTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {copy.difference.investingText}
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">{copy.difference.nuance}</p>
      </LessonScreen>
    );
  }

  if (props.step === "same-amount") {
    return (
      <QuestionScreen
        question="same-amount"
        copy={copy.sameAmount}
        shared={copy.feedback}
        answer={props.answer}
        checked={props.checked}
        onAnswer={props.onAnswer}
        onCheck={props.onCheck}
        onNext={() => props.onGoTo("alex")}
      >
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {[copy.sameAmount.soon, copy.sameAmount.later].map((label) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-surface p-4 shadow-soft"
            >
              <Clock3 className="size-5 text-primary" aria-hidden="true" />
              <p className="mt-2 font-display text-xl font-extrabold">
                {formatMoney(EXAMPLE_AMOUNT, props.track)}
              </p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          {copy.sameAmount.intro.replaceAll("{amount}", formatMoney(EXAMPLE_AMOUNT, props.track))}
        </p>
      </QuestionScreen>
    );
  }

  if (props.step === "alex") {
    return (
      <LessonScreen
        wide
        action={
          <PrimaryAction onClick={() => props.onGoTo("near-term")}>
            {copy.alex.action}
          </PrimaryAction>
        }
      >
        <Eyebrow>{copy.alex.eyebrow}</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-balance sm:text-5xl">
          {copy.alex.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{copy.alex.intro}</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {copy.alex.cards.map((card, index) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border bg-surface p-5 shadow-soft"
            >
              <span className="grid size-8 place-items-center rounded-full bg-primary-soft font-bold text-primary">
                {index + 1}
              </span>
              <h2 className="mt-4 font-display text-lg font-extrabold">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted-foreground">{copy.alex.note}</p>
      </LessonScreen>
    );
  }

  if (props.step === "near-term" || props.step === "long-term") {
    const question = props.step;
    return (
      <QuestionScreen
        question={question}
        copy={question === "near-term" ? copy.nearTerm : copy.longTerm}
        shared={copy.feedback}
        answer={props.answer}
        checked={props.checked}
        onAnswer={props.onAnswer}
        onCheck={props.onCheck}
        onNext={() => props.onGoTo(question === "near-term" ? "long-term" : "reflection")}
      />
    );
  }

  if (props.step === "reflection") {
    return (
      <QuestionScreen
        question="reflection"
        copy={copy.reflection}
        shared={copy.feedback}
        answer={props.answer}
        checked={props.checked}
        onAnswer={props.onAnswer}
        onCheck={props.onCheck}
        onNext={() => props.onGoTo("complete")}
      >
        <p className="mt-4 text-muted-foreground">{copy.reflection.context}</p>
      </QuestionScreen>
    );
  }

  if (props.progressStatus !== "saved") {
    return (
      <LessonScreen
        action={
          props.progressStatus === "error" ? (
            <PrimaryAction onClick={props.onRetryProgress}>{copy.complete.retry}</PrimaryAction>
          ) : (
            <p
              className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-muted-foreground"
              role="status"
            >
              <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
              {copy.complete.saving}
            </p>
          )
        }
      >
        <Eyebrow>{copy.complete.eyebrow}</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl">
          {copy.complete.pendingTitle}
        </h1>
        {props.progressStatus === "error" && (
          <p className="mt-5 text-muted-foreground" role="alert">
            {copy.complete.error}
          </p>
        )}
      </LessonScreen>
    );
  }

  return (
    <LessonScreen
      wide
      action={
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button asChild variant="outline" size="xl">
            <Link href="/dashboard">{copy.complete.dashboard}</Link>
          </Button>
          <FeedbackHeaderButton
            label={copy.complete.feedbackButton}
            variant="default"
            size="xl"
            className="w-full sm:w-auto"
          />
        </div>
      }
    >
      <div className="relative overflow-hidden rounded-3xl bg-primary-soft p-6 text-center sm:p-9">
        {props.showConfetti && <Confetti />}
        <div className="relative">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift">
            <PartyPopper className="size-9" aria-hidden="true" />
          </span>
          <Eyebrow>{copy.complete.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance sm:text-5xl">
            {copy.complete.title}
          </h1>
          <p className="mt-3 font-display text-lg font-extrabold text-primary">
            {copy.complete.count}
          </p>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed">{copy.complete.thanks}</p>
          <p
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-market-up"
            role="status"
          >
            <Check className="size-4" aria-hidden="true" /> {copy.complete.saved}
          </p>
        </div>
      </div>
      <div className="mt-5 rounded-2xl border border-border bg-surface p-5 shadow-soft">
        <p className="flex items-center gap-2 font-display text-lg font-extrabold">
          <Sparkles className="size-5 text-primary" aria-hidden="true" />{" "}
          {copy.complete.teaserTitle}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.complete.teaser}</p>
      </div>
      <p className="mt-5 text-center font-semibold text-primary">{copy.complete.feedbackIntro}</p>
      <p className="mt-5 text-center text-xs text-muted-foreground">{copy.complete.note}</p>
      <div className="mt-3 flex justify-center">
        <Button variant="ghost" onClick={props.onRestart}>
          <RefreshCcw aria-hidden="true" /> {copy.complete.replay}
        </Button>
      </div>
    </LessonScreen>
  );
}
