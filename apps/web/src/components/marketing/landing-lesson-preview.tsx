"use client";

import Image from "next/image";
import { BookOpen, Check, ArrowRight } from "lucide-react";
import { FirstPaychequeLesson } from "@/components/lessons/first-paycheque-lesson";
import { getDictionary } from "@/lib/dictionaries";
import { landingCopy } from "@/lib/dictionaries/landing";
import { BRAND } from "@/lib/brand";

const noop = () => {};

// Only the presentation component is reused. No flow, auth or saving hook is mounted.
export function LandingLessonPreview({
  track,
  compact = false,
}: {
  track: "fr" | "us";
  compact?: boolean;
}) {
  const t = landingCopy[track].lessonPreview;
  const dictionary = getDictionary(track);
  const base = dictionary.learning.firstPaycheck;
  const copy = {
    ...base,
    budget: {
      ...base.budget,
      items: base.budget.items.map((item) => ({ ...item, note: t.expenseNote })),
    },
    conceptCheck: {
      ...base.conceptCheck,
      question: () => t.exercises[1]!.question,
      options: [0, 2, 1].map((index) => ({
        label: t.exercises[1]!.options[index]!,
        feedback: t.exercises[1]!.explanation,
      })),
    },
    transfer: {
      ...base.transfer,
      intro: () => t.transferIntro,
      question: t.transferQuestion,
      feedback: [() => t.transferSuccess, () => t.transferSuccess, () => t.transferSuccess],
      action: base.complete.replay,
    },
  };
  if (compact)
    return (
      <div className="lesson-excerpt is-compact reward-preview">
        <div className="lesson-excerpt-header">
          <strong>{BRAND}</strong>
          <span>{t.reward.preview}</span>
        </div>
        <div className="lesson-excerpt-body">
          <div className="reward-complete">
            <Check size={20} aria-hidden />
            {t.reward.complete}
          </div>
          <h3>{t.reward.title}</h3>
          <div className="reward-balance">
            <span>{t.reward.balance}</span>
            <div>
              <strong>
                {new Intl.NumberFormat(track === "fr" ? "fr-FR" : "en-US").format(1250)}
              </strong>
              <b>+250</b>
            </div>
            <small>{t.reward.unit}</small>
          </div>
          <div className="reward-next">
            <BookOpen size={22} aria-hidden />
            <div>
              <small>{t.reward.next}</small>
              <strong>{t.reward.nextTitle}</strong>
            </div>
            <ArrowRight size={20} aria-hidden />
          </div>
          <p className="reward-note">{t.reward.note}</p>
        </div>
      </div>
    );
  return (
    <div className="solution-illustration">
      <div className="course-device" role="img" aria-label={t.illustration}>
        <div className="lesson-excerpt course-window" inert aria-hidden="true">
          <div className="lesson-excerpt-header">
            <strong>{BRAND}</strong>
            <span>{t.course}</span>
          </div>
          <Image
            src="/brand/mascot/nudge-encourage.webp"
            alt=""
            width={1305}
            height={1205}
            sizes="56px"
            className="course-mini-companion"
          />
          <div className="course-workspace">
            <div className="course-sidebar">
              <BookOpen size={24} aria-hidden />
              <p>{t.navigation}</p>
              {t.exercises.map((exercise, index) => (
                <div key={exercise.title} className="course-nav-item" data-active={index === 1}>
                  <span className="course-step-number" aria-hidden>
                    {index < 2 ? <Check size={14} /> : index + 1}
                  </span>
                  {exercise.title}
                </div>
              ))}
            </div>
            <div id="landing-course-question" className="beta-course-preview">
              <FirstPaychequeLesson
                step="concept-check"
                track={track}
                copy={copy}
                educationalNote={dictionary.learning.shared.educationalNote}
                expenseIndex={3}
                expenseAnswer="want"
                conceptAnswer="might-save"
                transferAnswer={null}
                skipAnswers={{}}
                skipChecked={false}
                skipped={false}
                progressStatus="idle"
                onExpenseAnswer={noop}
                onConceptAnswer={noop}
                onTransferAnswer={noop}
                onContinueExpense={noop}
                onGoTo={noop}
                onRestart={noop}
                onSkipAnswer={noop}
                onCheckSkipQuiz={noop}
                onRetryProgress={noop}
              />
            </div>
          </div>
        </div>
        <div className="course-device-base" aria-hidden />
      </div>
      <div className="solution-captions">
        {landingCopy[track].solutionLabels.map((label, index) => (
          <p key={label}>
            <span aria-hidden>{index + 1}</span>
            {label}
          </p>
        ))}
      </div>
    </div>
  );
}
