"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { ProfileQuestion } from "@/components/molecules/profile-question";
import { QUESTIONS, type Profile } from "@/lib/practice-scenario";

export function LearningProfile({
  profile,
  onSelect,
  onContinue,
}: {
  profile: Profile;
  onSelect: (k: keyof Profile, v: string) => void;
  onContinue: () => void;
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = QUESTIONS[questionIndex]!;
  const lastQuestion = questionIndex === QUESTIONS.length - 1;
  const questionPanel = useRef<HTMLDivElement>(null);

  function goToQuestion(index: number) {
    setQuestionIndex(index);
    requestAnimationFrame(() => {
      questionPanel.current?.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }

  return (
    <div className="mx-auto max-w-2xl animate-rise">
      <Eyebrow>Your learning profile</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
        Start where you are.
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Four quick questions. Use your own situation or imagined answers.
      </p>
      <div className="mt-6">
        <p className="text-sm font-bold text-primary" aria-live="polite">
          Question {questionIndex + 1} of {QUESTIONS.length}
        </p>
        <div className="mt-3 flex gap-2" aria-hidden="true">
          {QUESTIONS.map((q, index) => (
            <span
              key={q.key}
              className={`h-1 flex-1 rounded-full ${index <= questionIndex ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>
      <div ref={questionPanel} className="mt-5">
        <ProfileQuestion
          question={question}
          value={profile[question.key]}
          onSelect={(value) => onSelect(question.key, value)}
          attention
        />
      </div>
      <div className="mt-5 flex gap-3">
        {questionIndex > 0 && (
          <Button
            variant="outline"
            size="xl"
            onClick={() => goToQuestion(questionIndex - 1)}
            className="px-5"
          >
            <ArrowLeft aria-hidden="true" /> Back
          </Button>
        )}
        <Button
          size="xl"
          disabled={!profile[question.key]}
          onClick={() => (lastQuestion ? onContinue() : goToQuestion(questionIndex + 1))}
          className="h-auto min-h-13 min-w-0 flex-1 whitespace-normal px-5 py-3"
        >
          {lastQuestion ? "Try the practice case" : "Continue"} <ArrowRight aria-hidden="true" />
        </Button>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        You can change your answers. This profile only shapes the educational explanation; it is not
        a suitability assessment.
      </p>
    </div>
  );
}
