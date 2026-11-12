"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Check, Lightbulb, RefreshCcw, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PracticeTemplate } from "@/components/practice/practice-template";
import { useAutoContinue } from "@/hooks/use-auto-continue";
import type { ProgressStatus } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import {
  calculateCompoundComparison,
  COMPOUND_EXAMPLE,
  WHY_INVEST_CORRECT_ANSWER,
} from "@/lib/why-invest-lesson";
import { formatMoney } from "@/lib/first-paycheque-lesson";
import type { Track } from "@/lib/tracks";
import { completeWhyInvestLesson } from "./actions";
import styles from "./why-invest-flow.module.css";

const STAGE_COUNT = 5;
const CHOICE_IDS = ["save", "invest", "split"] as const;
type Choice = (typeof CHOICE_IDS)[number];

function copyWithAmount(template: string, amount: string) {
  return template.replaceAll("{amount}", amount);
}

function comparisonLines(year: number) {
  const maximum = calculateCompoundComparison(COMPOUND_EXAMPLE.years).reinvestedValue;
  const points = Array.from({ length: COMPOUND_EXAMPLE.years + 1 }, (_, index) => {
    const comparison = calculateCompoundComparison(index);
    const x = 10 + (300 * index) / COMPOUND_EXAMPLE.years;
    const reinvestedY = 128 - (comparison.reinvestedValue / maximum) * 112;
    const setAsideY = 128 - (comparison.valueWithoutReinvestment / maximum) * 112;
    return { x, reinvestedY, setAsideY };
  });
  const marker = points[year] ?? points[15]!;

  return {
    reinvested: points.map(({ x, reinvestedY }) => `${x},${reinvestedY}`).join(" "),
    setAside: points.map(({ x, setAsideY }) => `${x},${setAsideY}`).join(" "),
    marker,
  };
}

function moveRadioFocus(event: KeyboardEvent<HTMLButtonElement>) {
  const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
  if (!keys.includes(event.key)) return;
  const buttons = Array.from(
    event.currentTarget
      .closest('[role="radiogroup"]')
      ?.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)') ?? [],
  );
  if (!buttons.length) return;
  event.preventDefault();
  const index = buttons.indexOf(event.currentTarget);
  const offset = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? buttons.length - 1
        : (index + offset + buttons.length) % buttons.length;
  buttons[next]?.focus();
  buttons[next]?.click();
}

export function WhyInvestFlow({
  track,
  alreadyCompleted,
  preview = false,
}: {
  track: Track;
  alreadyCompleted: boolean;
  preview?: boolean;
}) {
  const dictionary = getDictionary(track);
  const router = useRouter();
  const copy = dictionary.lesson0;
  const onboarding = copy.onboarding;
  const [stage, setStage] = useState(0);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [years, setYears] = useState(15);
  const [scrubbing, setScrubbing] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>(
    alreadyCompleted ? "saved" : "idle",
  );
  const content = useRef<HTMLDivElement>(null);
  const answerFeedback = useRef<HTMLDivElement>(null);
  const saving = useRef(false);
  const money = (amount: number) => formatMoney(amount, track);
  const amount = money(100);
  const compoundComparison = calculateCompoundComparison(years);
  const growth = comparisonLines(years);

  useEffect(() => {
    window.history.replaceState(window.history.state, "", `#world-0-${stage + 1}`);
    const region = content.current?.querySelector("[data-scroll-region]");
    if (region) region.scrollTop = 0;
    const heading = content.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
  }, [stage]);

  useEffect(() => {
    if (stage !== 3 || answer === null) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    answerFeedback.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }, [answer, stage]);

  async function saveProgress() {
    if (saving.current) return false;
    saving.current = true;
    setProgressStatus("saving");
    try {
      const result = await completeWhyInvestLesson();
      setProgressStatus(result.status);
      return result.status === "saved";
    } catch {
      setProgressStatus("error");
      return false;
    } finally {
      saving.current = false;
    }
  }

  function finishQuiz() {
    setStage(4);
  }

  useAutoContinue(stage === 3 && answer === WHY_INVEST_CORRECT_ANSWER, finishQuiz);

  async function continueToWorldOne() {
    if (alreadyCompleted || (await saveProgress())) {
      router.push("/dashboard/courses");
    }
  }

  function replay() {
    setChoice(null);
    setYears(10);
    setScrubbing(false);
    setAnswer(null);
    setProgressStatus(alreadyCompleted ? "saved" : "idle");
    setStage(0);
  }

  const action =
    stage === 0 ? (
      <>
        <Button
          size="xl"
          className={styles["action"]}
          disabled={choice === null}
          onClick={() => setStage(1)}
        >
          {onboarding.decisionAction} <ArrowRight aria-hidden="true" />
        </Button>
        <p className={styles["hint"]}>{onboarding.decisionHint}</p>
      </>
    ) : stage === 1 ? (
      <Button size="xl" className={styles["action"]} onClick={() => setStage(2)}>
        {onboarding.feedbackAction} <ArrowRight aria-hidden="true" />
      </Button>
    ) : stage === 2 ? (
      <Button size="xl" className={styles["action"]} onClick={() => setStage(3)}>
        {onboarding.growthAction} <ArrowRight aria-hidden="true" />
      </Button>
    ) : stage === 3 ? (
      <Button
        size="xl"
        className={styles["action"]}
        disabled={answer === null}
        onClick={finishQuiz}
      >
        {onboarding.riskAction} <ArrowRight aria-hidden="true" />
      </Button>
    ) : preview ? (
      <Button asChild size="xl" className={styles["action"]}>
        <Link href={`/dev/dashboard-preview?track=${track}&state=world-zero-complete`}>
          {copy.complete.action} <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
    ) : progressStatus === "saved" ? (
      <Button asChild size="xl" className={styles["action"]}>
        <Link href="/dashboard/courses">
          {copy.complete.action} <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
    ) : progressStatus === "error" ? (
      <Button size="xl" className={styles["action"]} onClick={() => void continueToWorldOne()}>
        {copy.complete.retry} <RefreshCcw aria-hidden="true" />
      </Button>
    ) : (
      <Button
        size="xl"
        className={styles["action"]}
        disabled={progressStatus === "saving"}
        onClick={() => void continueToWorldOne()}
      >
        {copy.complete.action} <ArrowRight aria-hidden="true" />
      </Button>
    );

  return (
    <PracticeTemplate
      current={stage + 1}
      total={STAGE_COUNT}
      copy={dictionary.learning.shared}
      skipLink={dictionary.skipLink}
      exitHref="/dashboard/courses"
    >
      <div ref={content} className={styles["flow"]}>
        <div className={styles["main"]} id="world-0-main" data-scroll-region tabIndex={-1}>
          {stage === 0 && (
            <section className={styles["screen"]} key="decision">
              <p className={styles["eyebrow"]}>{onboarding.decisionEyebrow}</p>
              <h1 className={styles["title"]}>
                {copyWithAmount(onboarding.decisionTitle, amount)}
              </h1>
              <p className={styles["subtitle"]}>
                {copyWithAmount(onboarding.decisionBody, amount)}
              </p>
              <div className={`${styles["mascotStage"]} ${choice ? styles["mascotReact"] : ""}`}>
                <Image
                  key={choice ?? "unselected"}
                  src="/brand/mascot/nudge-curious.webp"
                  alt={onboarding.decisionAlt}
                  width={200}
                  height={200}
                  priority
                  className={styles["mascot"]}
                />
                <span className={styles["speech"]}>{onboarding.decisionSpeech}</span>
              </div>
              <div
                className={styles["options"]}
                role="radiogroup"
                aria-label={onboarding.decisionEyebrow}
              >
                {onboarding.decisionChoices.map((label, index) => {
                  const id = CHOICE_IDS[index]!;
                  const selected = choice === id;
                  return (
                    <button
                      className={`${styles["option"]} ${selected ? styles["selected"] : ""}`}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      key={id}
                      onClick={() => setChoice(id)}
                      onKeyDown={moveRadioFocus}
                    >
                      <span className={styles["emblem"]} aria-hidden="true">
                        {index === 0 ? "▤" : index === 1 ? "↗" : "◐"}
                      </span>
                      <span className={styles["optionText"]}>{copyWithAmount(label, amount)}</span>
                      <span className={styles["radio"]} aria-hidden="true">
                        {selected && <span />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {stage === 1 && choice !== null && (
            <section className={styles["screen"]} key="feedback" aria-live="polite">
              <p className={styles["eyebrow"]}>{onboarding.feedbackEyebrow}</p>
              <h1 className={styles["title"]}>{onboarding.feedbackTitle}</h1>
              <div className={`${styles["mascotStage"]} ${styles["smallMascot"]}`}>
                <Image
                  src="/brand/mascot/nudge-guide.webp"
                  alt={onboarding.guideAlt}
                  width={160}
                  height={160}
                  className={styles["mascot"]}
                />
                <span className={styles["speech"]}>{onboarding.feedbackSpeech}</span>
              </div>
              <article className={styles["card"]}>
                <span className={styles["tag"]}>{onboarding.selected}</span>
                <h2>{onboarding.feedbackLabels[CHOICE_IDS.indexOf(choice)]}</h2>
                <p>{onboarding.feedbackChoices[CHOICE_IDS.indexOf(choice)]}</p>
              </article>
            </section>
          )}

          {stage === 2 && (
            <section className={styles["screen"]} key="growth">
              <p className={styles["eyebrow"]}>{copy.compound.eyebrow}</p>
              <h1 className={styles["title"]}>{copy.compound.title}</h1>
              <p className={styles["subtitle"]}>
                {copyWithAmount(copy.compound.intro, money(COMPOUND_EXAMPLE.monthlyContribution))}
              </p>
              <div className={styles["growthCard"]}>
                <div className={styles["growthValues"]}>
                  <span className={styles["sliderLabel"]}>{onboarding.sliderLabel}</span>
                  <span className={styles["tag"]}>
                    {years} {years === 1 ? onboarding.year : onboarding.years}
                  </span>
                </div>
                <svg
                  className={styles["chart"]}
                  viewBox="0 0 320 138"
                  role="img"
                  aria-label={onboarding.chartLabel}
                >
                  <line x1="10" y1="128" x2="310" y2="128" className={styles["chartBaseline"]} />
                  <polyline points={growth.setAside} className={styles["chartLineSetAside"]} />
                  <polyline points={growth.reinvested} className={styles["chartLine"]} />
                  <circle
                    cx={growth.marker.x}
                    cy={growth.marker.setAsideY}
                    r="5"
                    className={styles["chartMarkerSetAside"]}
                  />
                  <circle
                    cx={growth.marker.x}
                    cy={growth.marker.reinvestedY}
                    r="5"
                    className={styles["chartMarker"]}
                  />
                </svg>
                <div className={styles["chartLegend"]} aria-hidden="true">
                  <div>
                    <span className={styles["legendReinvested"]} />
                    <span>{copy.compound.withReinvestment}</span>
                    <strong className={scrubbing ? styles["scrubbing"] : ""}>
                      {money(Math.round(compoundComparison.reinvestedValue))}
                    </strong>
                  </div>
                  <div>
                    <span className={styles["legendSetAside"]} />
                    <span>{copy.compound.withoutReinvestment}</span>
                    <strong>
                      {money(Math.round(compoundComparison.valueWithoutReinvestment))}
                    </strong>
                  </div>
                </div>
                <label className={styles["visuallyHidden"]} htmlFor="growth-years">
                  {onboarding.sliderLabel}
                </label>
                <input
                  id="growth-years"
                  className={styles["slider"]}
                  type="range"
                  min="0"
                  max={COMPOUND_EXAMPLE.years}
                  step="1"
                  value={years}
                  aria-valuetext={`${years} ${years === 1 ? onboarding.year : onboarding.years}`}
                  onPointerDown={() => setScrubbing(true)}
                  onPointerUp={() => setScrubbing(false)}
                  onPointerCancel={() => setScrubbing(false)}
                  onChange={(event) => setYears(Number(event.currentTarget.value))}
                />
                <div className={styles["yearLabels"]}>
                  <span>{copy.compound.start}</span>
                  <span>10 {onboarding.years}</span>
                  <span>25 {onboarding.years}</span>
                </div>
                <div className={styles["growthSummary"]}>
                  <div>
                    <span>{copy.compound.contributions}</span>
                    <strong>{money(Math.round(compoundComparison.contributions))}</strong>
                  </div>
                  <div className={styles["difference"]}>
                    <span>{copy.compound.difference}</span>
                    <strong>
                      +{money(Math.max(0, Math.round(compoundComparison.reinvestmentDifference)))}
                    </strong>
                  </div>
                </div>
              </div>
              <div className={styles["snowball"]}>
                <Snowflake aria-hidden="true" />
                <div>
                  <strong>{copy.compound.snowballTitle}</strong>
                  <p>{copy.compound.snowball}</p>
                </div>
              </div>
              <p className={styles["comparison"]}>{copy.compound.comparisonNote}</p>
              <p className={styles["assumption"]}>
                <strong>
                  {onboarding.assumption}: {Math.round(COMPOUND_EXAMPLE.annualRate * 100)}%
                </strong>
                . {copy.compound.caveat}
              </p>
              <p className={styles["disclaimer"]}>{copy.complete.note}</p>
            </section>
          )}

          {stage === 3 && (
            <section className={styles["screen"]} key="risk">
              <p className={styles["eyebrow"]}>{copy.risk.eyebrow}</p>
              <h1 className={styles["title"]}>{copy.risk.title}</h1>
              <p className={styles["subtitle"]}>{copy.risk.intro}</p>
              <div className={styles["riskValues"]}>
                {[
                  { label: copy.risk.start, value: money(1000) },
                  { label: copy.risk.dip, value: money(800), change: copy.risk.dipChange },
                  {
                    label: copy.risk.recovery,
                    value: money(1300),
                    change: copy.risk.recoveryChange,
                  },
                ].map((item) => (
                  <div className={styles["riskValue"]} key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    {item.change && <small>{item.change}</small>}
                  </div>
                ))}
              </div>
              <h2 className={styles["quizTitle"]}>{copy.question.title}</h2>
              <p className={styles["subtitle"]}>{copy.question.prompt}</p>
              <div
                className={`${styles["mascotStage"]} ${styles["smallMascot"]} ${styles["quizMascot"]}`}
              >
                <Image
                  src="/brand/mascot/nudge-encourage.webp"
                  alt={onboarding.encourageAlt}
                  width={160}
                  height={160}
                  className={styles["mascot"]}
                />
              </div>
              <div className={styles["options"]} role="radiogroup" aria-label={copy.question.title}>
                {copy.question.options.map((option, index) => {
                  const selected = answer === index;
                  return (
                    <button
                      className={`${styles["option"]} ${selected ? styles["selected"] : ""}`}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      key={option}
                      onClick={() => setAnswer(index)}
                      onKeyDown={moveRadioFocus}
                    >
                      <span className={styles["optionText"]}>{option}</span>
                      <span className={styles["radio"]} aria-hidden="true">
                        {selected && <span />}
                      </span>
                    </button>
                  );
                })}
              </div>
              {answer !== null && (
                <div
                  ref={answerFeedback}
                  key={answer}
                  className={styles["result"]}
                  role="status"
                  aria-live="polite"
                >
                  <p className={styles["resultTitle"]}>
                    {answer === WHY_INVEST_CORRECT_ANSWER ? (
                      <Check aria-hidden="true" />
                    ) : (
                      <Lightbulb aria-hidden="true" />
                    )}
                    {answer === WHY_INVEST_CORRECT_ANSWER
                      ? copy.question.correct
                      : copy.question.rethink}
                  </p>
                  <p>{copy.question.feedback[answer]}</p>
                  {answer !== WHY_INVEST_CORRECT_ANSWER && (
                    <p className={styles["answer"]}>
                      {copy.question.answer}: {copy.question.options[WHY_INVEST_CORRECT_ANSWER]}
                    </p>
                  )}
                </div>
              )}
              <p className={styles["riskExplanation"]}>{copy.risk.example}</p>
              <div className={styles["referenceCard"]}>
                <p>{copy.risk.historical}</p>
                <a
                  className={styles["source"]}
                  href={copy.risk.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.risk.source}
                </a>
              </div>
              <p className={styles["disclaimer"]}>{copy.risk.warning}</p>
            </section>
          )}

          {stage === 4 && (
            <section className={`${styles["screen"]} ${styles["complete"]}`} key="complete">
              <p className={styles["eyebrow"]}>{copy.complete.eyebrow}</p>
              <div className={styles["celebration"]}>
                <Image
                  src="/brand/mascot/nudge-celebrate.webp"
                  alt={onboarding.completionAlt}
                  width={240}
                  height={240}
                  className={styles["celebrationMascot"]}
                  priority
                />
              </div>
              <h1 className={styles["title"]}>{copy.complete.title}</h1>
              <p className={styles["subtitle"]}>{copy.complete.summary}</p>
              <article className={styles["nextWorld"]}>
                <span className={styles["worldNode"]}>1</span>
                <span>
                  <strong>{copy.complete.action}</strong>
                  <small>{copy.complete.next}</small>
                </span>
                <ArrowRight aria-hidden="true" />
              </article>
              {preview ? (
                <p role="status" className={styles["saveStatus"]}>
                  {copy.complete.preview}
                </p>
              ) : progressStatus === "saving" || progressStatus === "error" || alreadyCompleted ? (
                <p role="status" className={styles["saveStatus"]}>
                  {progressStatus === "saved"
                    ? copy.complete.saved
                    : progressStatus === "error"
                      ? copy.complete.error
                      : copy.complete.saving}
                </p>
              ) : null}
              <a
                className={styles["source"]}
                href={copy.complete.sourceHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.complete.source}
              </a>
              <p className={styles["disclaimer"]}>{copy.complete.note}</p>
              <Button variant="ghost" className={styles["replay"]} onClick={replay}>
                <RefreshCcw aria-hidden="true" /> {copy.complete.replay}
              </Button>
            </section>
          )}
        </div>

        <footer className={styles["bottom"]}>{action}</footer>
      </div>
    </PracticeTemplate>
  );
}
