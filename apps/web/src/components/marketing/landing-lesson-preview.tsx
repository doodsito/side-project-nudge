"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { NudgeLogo } from "@/components/brand/nudge-logo";
import { BookOpen, Check, ArrowRight, CircleUser } from "lucide-react";
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
  const sceneRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const entered = stage > 0;
  const clicked = stage >= 2;
  const choiceMade = stage >= 3;
  const revealed = stage >= 5;
  const actionReady = stage >= 6;
  const captionReady = stage >= 4;
  const [tap, setTap] = useState({ left: 0, top: 0 });
  const [arrows, setArrows] = useState<string[]>([]);
  const [noteTops, setNoteTops] = useState<number[]>([]);
  useEffect(() => {
    const root = sceneRef.current;
    if (!root || compact) return;
    const measure = () => {
      const origin = root.getBoundingClientRect();
      const device = root.querySelector(".course-device")?.getBoundingClientRect();
      const choices = root
        .querySelector('[role="radiogroup"] > :last-child')
        ?.getBoundingClientRect();
      const choiceGroup = root.querySelector('[role="radiogroup"]')?.getBoundingClientRect();
      const feedback = root.querySelector('[role="status"]')?.getBoundingClientRect();
      if (!device || !choices) return;
      const tops: number[] = [];
      const paths = Array.from(root.querySelectorAll(".story-note span")).map((label, index) => {
        const box = label.getBoundingClientRect();
        const x = box.left + box.width / 2 - origin.left;

        const left = index === 0;

        const targetX = left
          ? device.left - origin.left - 14
          : (feedback?.right ?? choices.right) - origin.left + 5;
        const targetY = left
          ? (choiceGroup
              ? choiceGroup.top + choiceGroup.height / 2
              : choices.top + choices.height / 2) - origin.top
          : (feedback ? feedback.top + feedback.height / 2 : choices.bottom + 35) - origin.top;
        const y = targetY - (left ? 18 : 32);
        tops.push(y - box.height - 5);
        const tip = left ? -7 : 7;
        return `M${x} ${y} Q${x} ${targetY} ${targetX} ${targetY} M${targetX + tip} ${targetY - 5} L${targetX} ${targetY} L${targetX + tip} ${targetY + 5}`;
      });
      setTap({
        left: choices.right - origin.left - 14,
        top: choices.top + choices.height / 2 - origin.top,
      });
      setArrows(paths);
      setNoteTops(tops);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    const frame = requestAnimationFrame(measure);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [compact, revealed, choiceMade]);
  useEffect(() => {
    if (compact || !sceneRef.current) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    let playing = false;
    const root = sceneRef.current;
    let frame = 0;
    const update = () => {
      const rect = root.getBoundingClientRect();
      const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 64);
      if (visible <= 0) {
        timers.forEach(clearTimeout);
        timers = [];
        playing = false;
        setStage(0);
        return;
      }
      if (playing || visible < Math.min(rect.height, window.innerHeight - 64) * 0.35) return;
      playing = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setStage(6);
        return;
      }
      setStage(1);
      timers = [
        setTimeout(() => setStage(2), 1350),
        setTimeout(() => setStage(3), 1800),
        setTimeout(() => setStage(4), 2250),
        setTimeout(() => setStage(5), 2700),
        setTimeout(() => setStage(6), 3150),
      ];
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      timers.forEach(clearTimeout);
    };
  }, [compact]);
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
    <div
      ref={sceneRef}
      className="solution-illustration solution-story"
      data-revealed={revealed}
      data-entered={entered}
      data-choice={choiceMade}
      data-clicked={clicked}
      data-action={actionReady}
      data-caption={captionReady}
    >
      <div className="course-device" role="img" aria-label={t.illustration}>
        <div className="lesson-excerpt course-window" inert aria-hidden="true">
          <div className="lesson-excerpt-header preview-real-header">
            <div className="preview-brand">
              <NudgeLogo small />
              <strong>{BRAND}</strong>
            </div>
            <div className="preview-header-actions">
              <CircleUser size={18} />
            </div>
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
                conceptAnswer={choiceMade ? "might-save" : null}
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
      <div className="solution-story-notes">
        <span className="scene-tap" style={tap} aria-hidden="true" />
        <svg className="story-connectors" aria-hidden="true" fill="none">
          {arrows.map((path, index) => (
            <path
              key={index}
              className={`connector-${index}`}
              d={path}
              pathLength={1}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
        {t.sceneLabels.map((label, index) => (
          <div
            key={label}
            className={`story-note story-note-${index}`}
            style={{
              top: noteTops[index],
              visibility: (index === 0 ? entered : captionReady) ? "visible" : "hidden",
            }}
          >
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
