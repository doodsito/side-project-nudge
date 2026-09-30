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
}: {
  onReset: () => void;
  onEdit: () => void;
  onStartOver: () => void;
}) {
  const [answer, setAnswer] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const selected = PRACTICE_CASE.checkpoint.options.find((option) => option.value === answer);
  return (
    <div className="mx-auto max-w-3xl animate-rise">
      <section className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-9">
        <Eyebrow>One idea to take with you</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
          Look beyond the price.
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">{PRACTICE_CASE.takeaway}</p>
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
          Try another choice with the same profile, or change your answers to explore a different
          situation.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Button size="xl" onClick={onReset} className="h-auto min-h-13 whitespace-normal py-3">
            <RotateCcw aria-hidden="true" /> Try another choice
          </Button>
          <Button
            size="xl"
            variant="outline"
            onClick={onEdit}
            className="h-auto min-h-13 whitespace-normal py-3"
          >
            <Pencil aria-hidden="true" /> Edit learning profile
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" onClick={onStartOver} className="min-h-11">
            Start over with new answers
          </Button>
          <Button asChild variant="link" className="min-h-11">
            <Link href="/#early-access">
              Hear about future cases <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <EducationalNote />
      </section>
    </div>
  );
}
