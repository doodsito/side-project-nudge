"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Clock3 } from "lucide-react";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { ChoiceButton, ChoiceMarker } from "@/components/shared/choice-button";
import { OnboardingCelebration } from "@/components/onboarding/onboarding-celebration";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getDictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";
import type { Track } from "@/lib/tracks";

const STEPS = [
  "welcome",
  "motivation",
  "experience",
  "topics",
  "lessons",
  "pace",
  "reminder",
  "preparing",
  "ready",
] as const;
const MINUTES = [5, 10, 20];
const REMINDER_TIMES = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "12:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];
const WORLD_ZERO = "/lessons/why-invest";
const LESSON_UNIVERSES = [
  { topicIndexes: [0, 1], lessonNumbers: [1, 2, 3, 4], image: "world-01.png" },
  { topicIndexes: [3], lessonNumbers: [5, 6], image: "world-02.png" },
  { topicIndexes: [2], lessonNumbers: [7, 8], image: "world-03.png" },
] as const;
const TOPIC_TO_UNIVERSE = [0, 0, 2, 1] as const;

function formatReminderTime(value: string | null, track: Track, fallback: string) {
  if (!value) return fallback;
  if (track !== "fr") return value;
  const [hour, minute = "00"] = value.split(":");
  return `${Number(hour)} h${minute === "00" ? "" : ` ${minute}`}`;
}

const MASCOTS: Partial<Record<(typeof STEPS)[number], string>> = {
  welcome: "/brand/mascot/nudge-welcome.webp",
  experience: "/brand/mascot/nudge-guide.webp",
  lessons: "/brand/mascot/nudge-walk.webp",
};

export function OnboardingFlow({
  track,
  storageKey,
  onPreviewFinish,
}: {
  track: Track;
  storageKey: string;
  onPreviewFinish?: () => void;
}) {
  const router = useRouter();
  const dictionary = getDictionary(track);
  const t = dictionary.onboarding;
  const lessonCopy = dictionary.learning.courses.foundation.lessons;
  const [index, setIndex] = useState(0);
  const [motivation, setMotivation] = useState<number | null>(null);
  const [experience, setExperience] = useState<number | null>(null);
  const [topics, setTopics] = useState<number[]>([]);
  const [selectedLessons, setSelectedLessons] = useState<number[]>([]);
  const [pace, setPace] = useState(1);
  const [time, setTime] = useState("19:00");
  const [reminder, setReminder] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const step = STEPS[index] ?? "welcome";
  const minutes = MINUTES[pace] ?? 10;
  const experienceSummary = experience === null ? undefined : t.experience.summaries[experience];
  const progress = Math.round((Math.min(index, 7) / 7) * 100);
  const isSummary = step === "preparing" || step === "ready";
  const mascot = MASCOTS[step];
  const reminderDisplay = formatReminderTime(reminder, track, t.ready.anytime);
  const readySummary = (
    <div className="onboarding-ready-bento">
      <div className="onboarding-ready-card" data-card="time">
        <span className="onboarding-ready-icon" aria-hidden="true">
          <Clock3 />
        </span>
        <span className="onboarding-ready-label">{t.ready.timeLabel}</span>
        <p className="onboarding-ready-value">
          <span>{reminderDisplay}</span>
        </p>
      </div>
      <div className="onboarding-ready-card" data-card="duration">
        <span className="onboarding-ready-label">{t.ready.durationLabel}</span>
        <p className="onboarding-ready-value">
          <span>{t.daily.replace("{minutes}", String(minutes))}</span>
          <span className="onboarding-ready-unit">{t.ready.durationUnit}</span>
        </p>
      </div>
    </div>
  );

  useEffect(() => {
    if (index > 0) heading.current?.focus();
    if (step !== "preparing") return;
    const timeout = window.setTimeout(() => setIndex(8), 1800);
    return () => window.clearTimeout(timeout);
  }, [index, step]);

  function prepare(reminderTime: string | null) {
    setReminder(reminderTime);
    setIndex(7);
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          motivation,
          experience,
          topics,
          lessons: selectedLessons,
          minutes,
          reminderTime,
        }),
      );
    } catch {
      // The lesson still opens if storage is disabled.
    }
  }

  function goBack() {
    setIndex((current) =>
      current === STEPS.length - 1 ? Math.max(0, current - 2) : Math.max(0, current - 1),
    );
  }

  function playSelection() {
    try {
      const context = audioContext.current ?? new window.AudioContext();
      audioContext.current = context;
      if (context.state === "suspended") void context.resume();

      const oscillator = context.createOscillator();
      const volume = context.createGain();
      const now = context.currentTime;
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(560, now);
      oscillator.frequency.exponentialRampToValueAtTime(820, now + 0.08);
      volume.gain.setValueAtTime(0.035, now);
      volume.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      oscillator.connect(volume);
      volume.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.12);
    } catch {
      // Audio is optional; selection still works when it is unavailable.
    }
  }

  let title: string;
  let detail: string;
  let content: ReactNode;
  switch (step) {
    case "welcome":
      title = t.welcome;
      detail = t.welcomeDetail;
      break;
    case "motivation":
      ({ title, detail } = t.motivation);
      content = (
        <div
          role="radiogroup"
          aria-labelledby="onboarding-title"
          className="onboarding-motivation-choices grid gap-3"
        >
          {t.motivation.choices.map((choice, i) => {
            return (
              <ChoiceButton
                key={choice}
                type="button"
                selected={motivation === i}
                tabIndex={(motivation ?? 0) === i ? 0 : -1}
                onClick={() => {
                  setMotivation(i);
                  playSelection();
                }}
                className="onboarding-card min-h-16 justify-between gap-3 px-4 py-3 text-left text-base font-semibold"
              >
                {choice}
                <ChoiceMarker selected={motivation === i} className="size-5 border-neutral-300">
                  {motivation === i && <Check className="size-3" />}
                </ChoiceMarker>
              </ChoiceButton>
            );
          })}
        </div>
      );
      break;
    case "experience":
      title = t.experience.title;
      detail = "";
      content = (
        <div className="grid gap-4">
          <div
            role="radiogroup"
            aria-labelledby="onboarding-title"
            className="onboarding-level-picker"
            data-selected={experience ?? "none"}
          >
            {t.experience.choices.map((choice, index) => {
              const id = `onboarding-experience-${index}`;
              return (
                <Fragment key={choice}>
                  <input
                    id={id}
                    type="radio"
                    name="onboarding-experience"
                    value={index}
                    checked={experience === index}
                    onChange={() => {
                      setExperience(index);
                      playSelection();
                    }}
                    className="onboarding-level-input"
                  />
                  <label htmlFor={id} className="onboarding-level-option">
                    {choice}
                  </label>
                </Fragment>
              );
            })}
            <span aria-hidden="true" className="onboarding-level-glider" />
          </div>
          {experienceSummary && (
            <div
              aria-live="polite"
              data-experience={experience}
              className="onboarding-card onboarding-experience-result rounded-xl border p-4 text-left"
            >
              <p className="text-sm">{experienceSummary.detail}</p>
            </div>
          )}
        </div>
      );
      break;
    case "topics":
      ({ title, detail } = t.topics);
      content = (
        <div role="group" aria-labelledby="onboarding-title" className="onboarding-topic-grid">
          {t.topics.choices.map((choice, i) => {
            const selected = topics.includes(i);
            return (
              <Button
                key={choice.title}
                type="button"
                variant="outline"
                aria-pressed={selected}
                onClick={() => {
                  setTopics((current) =>
                    selected ? current.filter((item) => item !== i) : [...current, i],
                  );
                  setSelectedLessons([]);
                  playSelection();
                }}
                className="onboarding-card onboarding-topic-choice"
              >
                <span
                  aria-hidden
                  className={cn(
                    "onboarding-topic-check",
                    selected && "bg-onboarding-primary text-onboarding-primary-foreground",
                  )}
                >
                  {selected && <Check />}
                </span>
                <span>
                  <span className="block font-bold">{choice.title}</span>
                  <span className="block text-sm font-normal text-onboarding-muted">
                    {choice.detail}
                  </span>
                </span>
              </Button>
            );
          })}
        </div>
      );
      break;
    case "lessons": {
      ({ title, detail } = t.lessonChoice);
      const recommendationScores = LESSON_UNIVERSES.map(
        (universe) => universe.topicIndexes.filter((topic) => topics.includes(topic)).length,
      );
      const highestRecommendationScore = Math.max(...recommendationScores);
      const firstObjectiveUniverse = TOPIC_TO_UNIVERSE[topics[0] ?? 0] ?? 0;
      const recommendedUniverse =
        recommendationScores[firstObjectiveUniverse] === highestRecommendationScore
          ? firstObjectiveUniverse
          : recommendationScores.indexOf(highestRecommendationScore);
      const selectedUniverse =
        selectedLessons.length === 0
          ? -1
          : LESSON_UNIVERSES.findIndex((universe) =>
              universe.lessonNumbers.every((number) => selectedLessons.includes(number)),
            );
      const universeOrder = [
        recommendedUniverse,
        ...LESSON_UNIVERSES.map((_, index) => index).filter(
          (index) => index !== recommendedUniverse,
        ),
      ];
      content = (
        <div
          role="radiogroup"
          aria-labelledby="onboarding-title"
          className="onboarding-universe-grid"
        >
          {universeOrder.map((universeIndex, position) => {
            const universe = LESSON_UNIVERSES[universeIndex]!;
            const copy = t.lessonChoice.universes[universeIndex]!;
            const selected = selectedUniverse === universeIndex;
            const lessonTitles = universe.lessonNumbers
              .map((number) => lessonCopy[number - 1]?.title)
              .filter((lessonTitle): lessonTitle is string => lessonTitle !== undefined);
            return (
              <Button
                key={copy.title}
                type="button"
                variant="ghost"
                role="radio"
                aria-checked={selected}
                tabIndex={selected || (selectedUniverse === -1 && position === 0) ? 0 : -1}
                data-universe={universeIndex}
                data-recommended={universeIndex === recommendedUniverse}
                onClick={() => {
                  setSelectedLessons([...universe.lessonNumbers]);
                  playSelection();
                }}
                onKeyDown={(event) => {
                  const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
                  const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
                  if (!forward && !backward) return;
                  event.preventDefault();
                  const nextPosition =
                    (position + (forward ? 1 : LESSON_UNIVERSES.length - 1)) %
                    LESSON_UNIVERSES.length;
                  const nextUniverseIndex = universeOrder[nextPosition]!;
                  const nextUniverse = LESSON_UNIVERSES[nextUniverseIndex]!;
                  event.currentTarget.parentElement
                    ?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
                    [nextPosition]?.focus();
                  setSelectedLessons([...nextUniverse.lessonNumbers]);
                  playSelection();
                }}
                className="onboarding-card onboarding-universe-card"
              >
                <span className="onboarding-universe-heading">
                  <Image
                    src={`/brand/learn-map/worlds/${universe.image}`}
                    alt=""
                    width={88}
                    height={88}
                    className="onboarding-universe-art"
                  />
                  <span className="onboarding-universe-heading-copy">
                    <span className="onboarding-universe-title">{copy.title}</span>
                    <span className="onboarding-universe-description">{copy.description}</span>
                    {recommendedUniverse === universeIndex && (
                      <span className="onboarding-universe-recommended">
                        {t.lessonChoice.recommended}
                      </span>
                    )}
                  </span>
                </span>
                <span className="onboarding-universe-lessons" role="list">
                  {lessonTitles.map((lessonTitle) => (
                    <span key={lessonTitle} role="listitem">
                      {lessonTitle}
                    </span>
                  ))}
                </span>
                <span className="onboarding-universe-goal">{copy.goal}</span>
                <span aria-hidden="true" className="onboarding-universe-check">
                  {selected && <Check />}
                </span>
              </Button>
            );
          })}
        </div>
      );
      break;
    }
    case "pace":
      ({ title, detail } = t.pace);
      content = (
        <div
          role="radiogroup"
          aria-labelledby="onboarding-title"
          className="onboarding-pace-choices grid gap-3"
        >
          {t.pace.choices.map((choice, i) => (
            <ChoiceButton
              key={choice}
              type="button"
              selected={pace === i}
              tabIndex={pace === i ? 0 : -1}
              onClick={() => {
                setPace(i);
                playSelection();
              }}
              className="onboarding-card min-h-16 justify-between gap-3 px-4 py-3 text-left text-base font-semibold"
            >
              <span>{choice}</span>
              <span className="shrink-0 text-onboarding-muted">{MINUTES[i]} min</span>
              <ChoiceMarker selected={pace === i} className="size-5 border-neutral-300">
                {pace === i && <Check className="size-3" />}
              </ChoiceMarker>
            </ChoiceButton>
          ))}
        </div>
      );
      break;
    case "reminder":
      ({ title, detail } = t.reminder);
      content = (
        <div className="grid gap-3 text-left">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="onboarding-card onboarding-reminder-trigger"
                aria-label={`${t.reminder.time}: ${time}`}
              >
                <span>{t.reminder.time}</span>
                <span className="onboarding-reminder-value">
                  <Clock3 aria-hidden />
                  {time}
                  <ChevronDown aria-hidden />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              side="bottom"
              sideOffset={6}
              className="onboarding-reminder-menu"
            >
              <DropdownMenuRadioGroup
                value={time}
                aria-label={t.reminder.time}
                onValueChange={(value) => {
                  setTime(value);
                  playSelection();
                }}
              >
                {REMINDER_TIMES.map((reminderTime) => (
                  <DropdownMenuRadioItem
                    key={reminderTime}
                    value={reminderTime}
                    className="onboarding-reminder-option"
                  >
                    {reminderTime}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
      break;
    case "preparing":
      ({ title, detail } = t.preparing);
      content = (
        <div role="status" aria-label={detail} className="flex justify-center gap-2">
          <span className="sr-only">{detail}</span>
          {Array.from({ length: 3 }, (_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="onboarding-loading-dot size-2 rounded-full bg-onboarding-primary"
              style={{ animationDelay: `${i * 180}ms` }}
            />
          ))}
        </div>
      );
      break;
    case "ready":
      title = t.ready.title;
      detail = "";
      content = readySummary;
      break;
  }

  const disabled =
    (step === "motivation" && motivation === null) ||
    (step === "experience" && experience === null) ||
    (step === "topics" && topics.length === 0) ||
    (step === "lessons" && selectedLessons.length === 0) ||
    (step === "reminder" && !time) ||
    step === "preparing";
  const label =
    step === "welcome"
      ? t.start
      : step === "reminder"
        ? t.reminder.finish
        : step === "preparing"
          ? t.preparing.action
          : step === "ready"
            ? t.ready.action
            : t.next;
  return (
    <main
      lang={track === "fr" ? "fr" : "en"}
      className="onboarding-flow min-h-svh bg-onboarding-surface text-onboarding-ink"
    >
      <div className="onboarding-topbar">
        {index > 0 ? (
          <Button
            type="button"
            size="sm"
            className="onboarding-action onboarding-back"
            onClick={goBack}
          >
            <ArrowLeft aria-hidden />
            {t.back}
          </Button>
        ) : (
          <span aria-hidden="true" />
        )}
        <progress
          value={progress}
          max={100}
          aria-label={t.progress}
          className="onboarding-progress h-1.5 w-full overflow-hidden rounded-full"
        />
        <span aria-hidden="true" />
      </div>
      <div className="onboarding-layout">
        <section
          key={step}
          aria-labelledby="onboarding-title"
          className={cn(
            "onboarding-step motion-safe:animate-rise",
            step === "motivation" ? "onboarding-motivation-section" : "",
            step === "welcome" ? "text-center" : "",
            isSummary ? "text-left" : "text-center",
          )}
        >
          {mascot && (
            <Image
              src={mascot}
              alt=""
              width={
                step === "welcome"
                  ? 150
                  : step === "experience"
                    ? 124
                    : step === "motivation"
                      ? 132
                      : step === "lessons" || step === "preparing"
                        ? 82
                        : step === "pace"
                          ? 72
                          : step === "reminder"
                            ? 86
                            : 100
              }
              height={
                step === "welcome"
                  ? 140
                  : step === "experience"
                    ? 109
                    : step === "motivation"
                      ? 88
                      : step === "lessons" || step === "preparing"
                        ? 76
                        : step === "pace"
                          ? 66
                          : step === "reminder"
                            ? 80
                            : 92
              }
              priority={step === "welcome"}
              className={cn(
                "h-auto max-w-full object-contain",
                step === "pace" || step === "reminder"
                  ? "self-start"
                  : step === "lessons" || step === "preparing"
                    ? "self-end"
                    : "mx-auto",
              )}
            />
          )}
          <header className="grid gap-2">
            <h1
              id="onboarding-title"
              tabIndex={-1}
              ref={heading}
              className="onboarding-title text-2xl leading-tight outline-none"
            >
              {title}
            </h1>
            {detail && step === "welcome" && (
              <p className="text-base leading-snug text-onboarding-muted">{detail}</p>
            )}
          </header>
          {step === "ready" && <OnboardingCelebration />}
          {content}
          <div className="onboarding-cta grid gap-3">
            {step === "ready" && !onPreviewFinish ? (
              <Button asChild size="lg" className="onboarding-action">
                <Link href={WORLD_ZERO}>
                  {label}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            ) : (
              <Button
                type="button"
                size="lg"
                className="onboarding-action"
                disabled={disabled}
                onClick={() => {
                  if (step === "reminder") prepare(time);
                  else if (step === "ready") onPreviewFinish?.();
                  else setIndex(index + 1);
                }}
              >
                {label}
                {step !== "preparing" && <ArrowRight aria-hidden />}
              </Button>
            )}
            {step === "reminder" && (
              <Button type="button" variant="ghost" size="lg" onClick={() => prepare(null)}>
                {t.reminder.skip}
              </Button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
