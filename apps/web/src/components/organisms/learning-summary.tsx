"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Pencil, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChoiceButton, ChoiceMarker } from "@/components/atoms/choice-button";
import { EducationalNote } from "@/components/atoms/educational-note";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { PRACTICE_CASE } from "@/lib/practice-case";
import { track } from "@/lib/analytics";

export function LearningSummary({
  onReset,
  onEdit,
  onStartOver,
  hasProfile,
}: {
  onReset: () => void;
  onEdit: () => void;
  onStartOver: () => void;
  hasProfile: boolean;
}) {
  const [answer, setAnswer] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const selected = PRACTICE_CASE.checkpoint.options.find((option) => option.value === answer);
  return (
    <div className="mx-auto max-w-3xl animate-rise">
      <section className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-9">
        <Eyebrow>Your first case, completed</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
          Check the cash need before the market price.
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">{PRACTICE_CASE.takeaway}</p>
        <div className="mt-6 rounded-2xl border border-border bg-surface-2 p-4 sm:p-6">
          <h2 className="font-display text-lg font-bold">A question to use again</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            “When might I need this money, and what would cover an unexpected cost?”
          </p>
        </div>
        <div className="mt-7 rounded-2xl bg-surface-2 p-4 sm:p-6">
          <p className="text-sm font-bold text-primary">Quick understanding check</p>
          <h2 id="checkpoint-question" className="mt-2 font-display text-xl font-bold">
            {PRACTICE_CASE.checkpoint.question}
          </h2>
          <div className="mt-4 grid gap-3" role="radiogroup" aria-labelledby="checkpoint-question">
            {PRACTICE_CASE.checkpoint.options.map((option, index) => (
              <ChoiceButton
                key={option.value}
                selected={answer === option.value}
                tabIndex={answer === option.value || (!answer && index === 0) ? 0 : -1}
                onClick={() => {
                  setAnswer(option.value);
                  setChecked(false);
                }}
                className="min-h-16 p-4"
              >
                <ChoiceMarker selected={answer === option.value} className="size-7 text-xs">
                  {index + 1}
                </ChoiceMarker>
                <span className="text-base">{option.title}</span>
              </ChoiceButton>
            ))}
          </div>
          <Button
            size="xl"
            disabled={!answer || checked}
            className="mt-4 w-full h-auto min-h-13 whitespace-normal py-3"
            onClick={() => {
              setChecked(true);
              track("practice_understanding_checked", {
                caseId: PRACTICE_CASE.id,
                correct: selected?.correct ?? false,
              });
            }}
          >
            Check my answer
          </Button>
          <div role="status" aria-live="polite" aria-atomic="true">
            {checked && selected && (
              <p className="mt-4 rounded-xl border border-primary/25 bg-primary-soft p-4 leading-relaxed">
                {selected.explanation}
              </p>
            )}
          </div>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          You can compare another choice, then explore how different needs change the explanation.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Button
            size="xl"
            variant="outline"
            onClick={onReset}
            className="h-auto min-h-13 whitespace-normal py-3"
          >
            <RotateCcw aria-hidden="true" /> Try another choice
          </Button>
          <Button
            size="xl"
            variant="outline"
            onClick={onEdit}
            className="h-auto min-h-13 whitespace-normal py-3"
          >
            <Pencil aria-hidden="true" />{" "}
            {hasProfile ? "Edit your reflection" : "Explore your own context"}
          </Button>
        </div>
        {checked && (
          <div className="mt-8 rounded-2xl bg-primary-soft p-5 sm:p-6">
            <h2 className="font-display text-xl font-extrabold">Want more cases like this?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Join the early access list for future practice on saving and investing.
            </p>
            <Button asChild size="lg" className="mt-4 h-auto min-h-12 whitespace-normal py-3">
              <Link href="/#early-access">
                Join early access <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        )}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" onClick={onStartOver} className="min-h-11">
            Start the case over
          </Button>
        </div>
        <EducationalNote />
      </section>
    </div>
  );
}
