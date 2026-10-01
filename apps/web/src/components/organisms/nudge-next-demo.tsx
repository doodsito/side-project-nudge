"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, RotateCcw } from "lucide-react";
import { NudgeNextChart } from "@/components/molecules/nudge-next-chart";
import { NudgeNextMark } from "@/components/atoms/nudge-next-mark";
import { Button } from "@/components/ui/button";
import { nudgeCopy, formatters, type NudgeLocale } from "@/lib/nudge-next-copy";
import { DECISIONS, type Decision } from "@/lib/practice-case";

export function NudgeNextDemo({
  locale,
  onDecision,
  onCheckpoint,
}: {
  locale: NudgeLocale;
  onDecision: () => void;
  onCheckpoint: () => void;
}) {
  const c = nudgeCopy[locale];
  const { interpolate } = formatters(locale);
  const [selection, setSelection] = useState<Decision | null>(null);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const feedbackRef = useRef<HTMLHeadingElement>(null);
  const choiceRef = useRef<HTMLFieldSetElement>(null);
  function reveal() {
    if (!selection) return;
    setDecision(selection);
    onDecision();
    requestAnimationFrame(() => feedbackRef.current?.focus({ preventScroll: true }));
  }
  function reset() {
    setDecision(null);
    setAnswer(null);
    requestAnimationFrame(() =>
      choiceRef.current?.querySelector("input")?.focus({ preventScroll: true }),
    );
  }
  return (
    <section id="experience" className="nx-experience" aria-labelledby="nx-experience-title">
      <div className="nx-section-heading">
        <h2 id="nx-experience-title">{c.demoTitle}</h2>
        <p>{c.demoIntro}</p>
      </div>
      <div className="nx-workbench">
        <div className="nx-case">
          <div className="nx-case-meta">
            <NudgeNextMark />
            <span>{c.caseLabel}</span>
            <span className="nx-virtual-dot" />
            {c.virtual}
          </div>
          <div className="nx-case-heading">
            <h3>{c.caseTitle}</h3>
            <span className="nx-drop-stamp">
              <ArrowDown size={32} strokeWidth={1.4} aria-hidden="true" />
            </span>
          </div>
          <p className="nx-case-copy">{interpolate(c.caseBody)}</p>
          <div className="nx-horizon">
            <span aria-hidden="true" />
            <span>{c.horizon}</span>
          </div>
          <NudgeNextChart locale={locale} decision={decision} />
        </div>
        <div className="nx-decision">
          {!decision ? (
            <>
              <fieldset ref={choiceRef}>
                <legend>{c.question}</legend>
                <p className="nx-choice-intro">{c.choose}</p>
                {DECISIONS.map(({ value }, i) => (
                  <label className="nx-choice" key={value} data-selected={selection === value}>
                    <input
                      type="radio"
                      name="nudge-decision"
                      value={value}
                      checked={selection === value}
                      onChange={() => setSelection(value)}
                    />
                    <span className="nx-choice-letter" aria-hidden="true">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>
                      <strong>{c.options[value].title}</strong>
                      <small>{interpolate(c.options[value].detail)}</small>
                    </span>
                    <span className="nx-choice-check" aria-hidden="true">
                      {selection === value && <Check size={16} />}
                    </span>
                  </label>
                ))}
              </fieldset>
              <Button
                size="xl"
                className="nx-button nx-button-purple"
                disabled={!selection}
                onClick={reveal}
              >
                {c.see}
                <ArrowUpRight aria-hidden="true" />
              </Button>
              <p className="nx-decision-note">{c.takeaway}</p>
            </>
          ) : (
            <div className="nx-feedback">
              <div className="nx-feedback-tab">
                <NudgeNextMark />
                <span>{c.ribbon[1]}</span>
              </div>
              <h3 ref={feedbackRef} tabIndex={-1}>
                {c.result}
              </h3>
              <p className="nx-result-choice">{c.options[decision].title}</p>
              <p>{c.options[decision].explanation}</p>
              <fieldset className="nx-checkpoint">
                <legend>{c.checkpoint}</legend>
                {c.answers.map((text, i) => (
                  <label key={text} data-selected={answer === i}>
                    <input
                      type="radio"
                      name="nudge-checkpoint"
                      checked={answer === i}
                      onChange={() => {
                        setAnswer(i);
                        if (i === 1) onCheckpoint();
                      }}
                    />
                    <span>{text}</span>
                  </label>
                ))}
              </fieldset>
              <p className="nx-answer" aria-live="polite">
                {answer === null ? "" : answer === 1 ? c.right : c.wrong}
              </p>
              <Button variant="ghost" className="nx-reset" onClick={reset}>
                <RotateCcw size={16} aria-hidden="true" />
                {c.reset}
              </Button>
              {answer === 1 && (
                <a className="nx-text-link" href="#explore">
                  {c.next}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
