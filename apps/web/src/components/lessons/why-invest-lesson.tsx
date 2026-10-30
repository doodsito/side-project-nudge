"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  Lightbulb,
  LoaderCircle,
  RefreshCcw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { ChoiceButton, ChoiceMarker } from "@/components/shared/choice-button";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";
import type { ProgressStatus } from "@/lib/course-progress";
import type { Dictionary } from "@/lib/dictionaries";
import { formatMoney } from "@/lib/first-paycheque-lesson";
import type { Track } from "@/lib/tracks";
import {
  COMPOUND_EXAMPLE,
  RISK_EXAMPLE,
  WHY_INVEST_CORRECT_ANSWER,
  type WhyInvestStep,
} from "@/lib/why-invest-lesson";

type LessonCopy = Dictionary["lesson0"];

type Props = {
  step: WhyInvestStep;
  copy: LessonCopy;
  track: Track;
  answer: number | null;
  checked: boolean;
  progressStatus: ProgressStatus;
  onAnswer: (answer: number) => void;
  onCheck: () => void;
  onGoTo: (step: WhyInvestStep) => void;
  onRestart: () => void;
  onRetryProgress: () => void;
};

function LessonScreen({ children, action }: { children: ReactNode; action: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <section className="flex min-h-0 flex-1 items-start overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto my-auto w-full max-w-xl animate-rise">{children}</div>
      </section>
      <div className="shrink-0 border-t border-border bg-surface/95 px-5 py-4 backdrop-blur sm:px-8 sm:py-5">
        <div className="mx-auto w-full max-w-xl">{action}</div>
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

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
        {title}
      </h1>
    </>
  );
}

export function WhyInvestLesson(props: Props) {
  const { copy, step, track } = props;
  const money = (amount: number) => formatMoney(amount, track);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === "question" && props.checked) {
      feedbackRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [step, props.checked]);

  if (step === "welcome") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("meaning")}>
            {copy.welcome.action}
          </PrimaryAction>
        }
      >
        <Heading eyebrow={copy.welcome.eyebrow} title={copy.welcome.title} />
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{copy.welcome.body}</p>
        <p className="mt-6 rounded-2xl border border-primary/25 bg-primary-soft p-4 text-sm font-semibold">
          {copy.welcome.reassurance}
        </p>
      </LessonScreen>
    );
  }

  if (step === "meaning") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("compound")}>
            {copy.meaning.action}
          </PrimaryAction>
        }
      >
        <Heading eyebrow={copy.meaning.eyebrow} title={copy.meaning.title} />
        <p className="mt-5 text-lg leading-relaxed">{copy.meaning.definition}</p>
        <div className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-soft">
          <p className="text-base leading-relaxed">{copy.meaning.example}</p>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          {copy.meaning.boundary}
        </p>
      </LessonScreen>
    );
  }

  if (step === "compound") {
    const amounts = [
      { label: copy.compound.start, value: COMPOUND_EXAMPLE.start },
      { label: copy.compound.first, value: COMPOUND_EXAMPLE.afterTenYears },
      { label: copy.compound.second, value: COMPOUND_EXAMPLE.afterTwentyYears },
    ];
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("risk")}>{copy.compound.action}</PrimaryAction>
        }
      >
        <Heading eyebrow={copy.compound.eyebrow} title={copy.compound.title} />
        <p className="mt-4 text-muted-foreground">{copy.compound.intro}</p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {amounts.map((amount) => (
            <div
              key={amount.label}
              className="rounded-2xl border border-border bg-surface p-4 shadow-soft"
            >
              <dt className="text-xs font-bold text-muted-foreground">{amount.label}</dt>
              <dd className="mt-2 font-display text-2xl font-extrabold">{money(amount.value)}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 font-semibold leading-relaxed">{copy.compound.explanation}</p>
        <p className="mt-4 flex items-start gap-3 rounded-2xl border border-market-up/25 bg-surface p-4 font-semibold leading-relaxed shadow-soft">
          <TrendingUp className="mt-1 size-5 shrink-0 text-market-up" aria-hidden="true" />
          {copy.compound.comparison}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy.compound.caveat}</p>
      </LessonScreen>
    );
  }

  if (step === "risk") {
    const amounts = [
      { label: copy.risk.start, value: RISK_EXAMPLE.start, change: null, trend: null },
      {
        label: copy.risk.dip,
        value: RISK_EXAMPLE.duringDrop,
        change: copy.risk.dipChange,
        trend: "down",
      },
      {
        label: copy.risk.recovery,
        value: RISK_EXAMPLE.afterRecovery,
        change: copy.risk.recoveryChange,
        trend: "up",
      },
    ];
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("question")}>{copy.risk.action}</PrimaryAction>
        }
      >
        <Heading eyebrow={copy.risk.eyebrow} title={copy.risk.title} />
        <p className="mt-4 text-muted-foreground">{copy.risk.intro}</p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {amounts.map((amount) => (
            <div
              key={amount.label}
              className="rounded-2xl border border-border bg-surface p-4 shadow-soft"
            >
              <dt className="text-xs font-bold text-muted-foreground">{amount.label}</dt>
              <dd className="mt-2 font-display text-2xl font-extrabold">{money(amount.value)}</dd>
              {amount.change && (
                <p
                  className={`mt-2 flex items-start gap-1 text-xs font-semibold ${amount.trend === "down" ? "text-market-down" : "text-market-up"}`}
                >
                  {amount.trend === "down" ? (
                    <TrendingDown className="size-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <TrendingUp className="size-4 shrink-0" aria-hidden="true" />
                  )}
                  {amount.change}
                </p>
              )}
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-muted-foreground">{copy.risk.example}</p>
        <div className="mt-6 rounded-2xl border border-primary/25 bg-primary-soft p-4">
          <p className="leading-relaxed">{copy.risk.historical}</p>
          <a
            href={copy.risk.sourceHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-2"
          >
            {copy.risk.source}
          </a>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy.risk.warning}</p>
      </LessonScreen>
    );
  }

  if (step === "question") {
    const correct = props.answer === WHY_INVEST_CORRECT_ANSWER;
    return (
      <LessonScreen
        action={
          props.checked ? (
            <PrimaryAction onClick={() => props.onGoTo("complete")}>
              {copy.question.action}
            </PrimaryAction>
          ) : props.answer !== null ? (
            <PrimaryAction onClick={props.onCheck}>{copy.question.check}</PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground">
              {copy.question.hint}
            </p>
          )
        }
      >
        <Heading eyebrow={copy.question.eyebrow} title={copy.question.title} />
        <p className="mt-4 text-muted-foreground">{copy.question.prompt}</p>
        <div className="mt-6 grid gap-3" role="radiogroup" aria-label={copy.question.title}>
          {copy.question.options.map((option, index) => (
            <ChoiceButton
              key={option}
              selected={props.answer === index}
              tabIndex={props.answer === index || (props.answer === null && index === 0) ? 0 : -1}
              onClick={() => props.onAnswer(index)}
              className="min-h-16 p-4 text-base font-bold"
            >
              <ChoiceMarker selected={props.answer === index} className="size-7 text-xs">
                {props.answer === index ? (
                  <Check className="size-4" />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </ChoiceMarker>
              {option}
            </ChoiceButton>
          ))}
        </div>
        {props.checked && props.answer !== null && (
          <div
            ref={feedbackRef}
            role="status"
            aria-live="polite"
            className="mt-5 scroll-mt-5 rounded-2xl border border-primary/30 bg-primary-soft p-4"
          >
            <p className="flex items-center gap-2 font-display font-extrabold">
              {correct ? (
                <Check className="size-5 text-market-up" aria-hidden="true" />
              ) : (
                <Lightbulb className="size-5 text-primary" aria-hidden="true" />
              )}
              {correct ? copy.question.correct : copy.question.rethink}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{copy.question.feedback[props.answer]}</p>
            {!correct && (
              <p className="mt-3 border-t border-border pt-3 text-sm font-semibold">
                {copy.question.answer} : {copy.question.options[WHY_INVEST_CORRECT_ANSWER]}
              </p>
            )}
          </div>
        )}
      </LessonScreen>
    );
  }

  return (
    <LessonScreen
      action={
        props.progressStatus === "saved" ? (
          <Button asChild size="xl" className="w-full sm:ml-auto sm:flex sm:w-fit">
            <Link href="/dashboard/courses/financial-foundation">
              {copy.complete.action} <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        ) : props.progressStatus === "error" ? (
          <PrimaryAction onClick={props.onRetryProgress}>{copy.complete.retry}</PrimaryAction>
        ) : (
          <p className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-muted-foreground">
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />{" "}
            {copy.complete.saving}
          </p>
        )
      }
    >
      <Heading eyebrow={copy.complete.eyebrow} title={copy.complete.title} />
      <p className="mt-5 text-lg leading-relaxed">{copy.complete.summary}</p>
      <p className="mt-5 rounded-2xl border border-primary/25 bg-primary-soft p-4 leading-relaxed">
        {copy.complete.next}
      </p>
      <p role="status" className="mt-5 text-sm font-semibold text-primary">
        {props.progressStatus === "saved"
          ? copy.complete.saved
          : props.progressStatus === "error"
            ? copy.complete.error
            : copy.complete.saving}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
        <a
          href={copy.complete.sourceHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {copy.complete.source}
        </a>
        <Button variant="ghost" onClick={props.onRestart}>
          <RefreshCcw aria-hidden="true" /> {copy.complete.replay}
        </Button>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{copy.complete.note}</p>
    </LessonScreen>
  );
}
