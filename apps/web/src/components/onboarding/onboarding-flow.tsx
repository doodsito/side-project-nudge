"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChoiceButton } from "@/components/shared/choice-button";
import { OnboardingCelebration } from "@/components/onboarding/onboarding-celebration";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";
import type { Track } from "@/lib/tracks";

const STEPS = [
  "welcome",
  "motivation",
  "experience",
  "topics",
  "paths",
  "pace",
  "reminder",
  "preparing",
  "ready",
] as const;
const MINUTES = [5, 10, 20];
const MOTIVATION_ICONS = ["motivation-basics", "motivation-decisions", "motivation-curiosity"];
const WORLD_ZERO = "/lessons/why-invest";
const MASCOTS: Partial<Record<(typeof STEPS)[number], string>> = {
  welcome: "/brand/mascot/nudge-welcome.webp",
  motivation: "/brand/mascot/nudge-curious.webp",
  experience: "/brand/mascot/nudge-guide.webp",
  topics: "/brand/mascot/nudge-curious-card-figma.png",
  paths: "/brand/mascot/nudge-walk.webp",
  pace: "/brand/mascot/nudge-encourage.webp",
  reminder: "/brand/mascot/nudge-guide.webp",
  preparing: "/brand/mascot/nudge-walk.webp",
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
  const t = getDictionary(track).onboarding;
  const [index, setIndex] = useState(0);
  const [motivation, setMotivation] = useState<number | null>(null);
  const [experience, setExperience] = useState(0);
  const [topics, setTopics] = useState<number[]>([]);
  const [path, setPath] = useState<number | null>(null);
  const [pace, setPace] = useState(1);
  const [time, setTime] = useState("19:00");
  const [reminder, setReminder] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const heading = useRef<HTMLHeadingElement>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const step = STEPS[index] ?? "welcome";
  const minutes = MINUTES[pace] ?? 10;
  const experienceSummary = t.experience.summaries[experience] ?? t.experience.summaries[0];
  const progress = Math.round((index / 7) * 100);
  const isQuestion = index > 0 && index < 7;
  const isSummary = step === "preparing" || step === "ready";
  const mascot = MASCOTS[step];
  const summary = (
    <div className="onboarding-card grid gap-2 rounded-xl p-4 text-left">
      <p className="text-xs font-bold uppercase text-onboarding-primary">{t.ritual}</p>
      <p className="font-semibold">{t.daily.replace("{minutes}", String(minutes))}</p>
      {reminder && (
        <p className="text-sm text-onboarding-muted">
          {t.preferredTime.replace("{time}", reminder)}
        </p>
      )}
    </div>
  );

  useEffect(() => {
    if (index > 0) heading.current?.focus();
    if (step !== "preparing") return;
    const timeout = window.setTimeout(() => setIndex(8), 800);
    return () => window.clearTimeout(timeout);
  }, [index, step]);

  function prepare(reminderTime: string | null) {
    setReminder(reminderTime);
    setIndex(7);
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ motivation, experience, topics, path, minutes, reminderTime }),
      );
    } catch {
      // The lesson still opens if storage is disabled.
    }
  }

  function playSelection() {
    if (!soundEnabled) return;

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
        <div role="radiogroup" aria-labelledby="onboarding-title" className="grid gap-3">
          {t.motivation.choices.map((choice, i) => {
            const icon = MOTIVATION_ICONS[i];
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
                className="onboarding-card min-h-16 gap-4 px-4 py-3 font-semibold"
              >
                {icon && (
                  <Image
                    src={`/brand/onboarding/${icon}.svg`}
                    alt=""
                    width={48}
                    height={48}
                    unoptimized
                  />
                )}
                {choice}
              </ChoiceButton>
            );
          })}
        </div>
      );
      break;
    case "experience":
      ({ title, detail } = t.experience);
      content = (
        <div className="grid gap-4">
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={experience}
            onChange={(e) => {
              setExperience(e.currentTarget.valueAsNumber);
              playSelection();
            }}
            aria-labelledby="onboarding-title"
            aria-valuetext={t.experience.choices[experience]}
            className="h-6 w-full cursor-pointer accent-[var(--onboarding-primary)]"
          />
          <div
            aria-hidden="true"
            className="grid grid-cols-3 text-center text-xs text-onboarding-muted"
          >
            {t.experience.choices.map((choice) => (
              <span key={choice}>{choice}</span>
            ))}
          </div>
          <div
            aria-live="polite"
            className="onboarding-card grid gap-1 rounded-xl border-onboarding-primary p-4 text-left"
          >
            <p className="font-bold">{experienceSummary?.title}</p>
            <p className="text-sm text-onboarding-muted">{experienceSummary?.detail}</p>
          </div>
        </div>
      );
      break;
    case "topics":
      ({ title, detail } = t.topics);
      content = (
        <div role="group" aria-labelledby="onboarding-title" className="grid gap-2">
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
                  playSelection();
                }}
                className="onboarding-card h-auto min-h-14 justify-start gap-3 rounded-xl px-4 py-2 text-left whitespace-normal"
              >
                <span
                  aria-hidden
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded border border-onboarding-primary",
                    selected && "bg-onboarding-primary text-onboarding-primary-foreground",
                  )}
                >
                  {selected && <Check />}
                </span>
                <span>
                  <span className="block font-bold">{choice.title}</span>
                  <span className="block text-xs font-normal text-onboarding-muted">
                    {choice.detail}
                  </span>
                </span>
              </Button>
            );
          })}
        </div>
      );
      break;
    case "paths":
      ({ title, detail } = t.paths);
      content = (
        <div
          aria-label={title}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 text-left"
        >
          {t.paths.choices.map((choice, i) => (
            <article
              key={choice.title}
              className={cn(
                "onboarding-card flex w-[86%] shrink-0 snap-start flex-col gap-3 rounded-xl border-t-4 p-4",
                i === 1 ? "border-t-onboarding-gold" : "border-t-onboarding-mint",
                path === i && "ring-2 ring-inset ring-[var(--onboarding-primary)]",
              )}
            >
              <p className="text-xs font-bold uppercase text-onboarding-muted">{choice.label}</p>
              <h2 className="onboarding-card-title text-xl">{choice.title}</h2>
              <p className="text-sm text-onboarding-muted">{choice.detail}</p>
              <p className="rounded-lg bg-onboarding-track p-3 text-sm">
                <strong className="mb-1 block">{t.paths.topics}</strong>
                {choice.topics}
              </p>
              <Button
                type="button"
                variant="outline"
                aria-pressed={path === i}
                onClick={() => {
                  setPath(i);
                  playSelection();
                }}
                className="mt-auto h-auto whitespace-normal"
              >
                {path === i ? t.paths.selected : t.paths.choose}
              </Button>
            </article>
          ))}
        </div>
      );
      break;
    case "pace":
      ({ title, detail } = t.pace);
      content = (
        <div role="radiogroup" aria-labelledby="onboarding-title" className="grid gap-3">
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
              className="onboarding-card min-h-16 justify-between gap-3 px-4 py-3 font-semibold"
            >
              <span>{choice}</span>
              <span className="shrink-0 text-onboarding-muted">{MINUTES[i]} min</span>
            </ChoiceButton>
          ))}
        </div>
      );
      break;
    case "reminder":
      ({ title, detail } = t.reminder);
      content = (
        <div className="grid gap-3 text-left">
          <label className="onboarding-card flex min-h-16 flex-wrap items-center justify-between gap-x-3 rounded-xl p-4 font-semibold">
            {t.reminder.time}
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.currentTarget.value)}
              className="rounded-md bg-onboarding-track px-2 py-1 text-onboarding-primary"
            />
          </label>
          <p className="text-sm text-onboarding-muted">{t.reminderNote}</p>
        </div>
      );
      break;
    case "preparing":
      ({ title, detail } = t.preparing);
      content = (
        <>
          <div aria-hidden className="mb-6 flex justify-center gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className="size-1.5 rounded-full bg-onboarding-primary motion-safe:animate-pulse"
              />
            ))}
          </div>
          {summary}
        </>
      );
      break;
    case "ready":
      ({ title, detail } = t.ready);
      content = summary;
      break;
  }

  const disabled =
    (step === "motivation" && motivation === null) ||
    (step === "topics" && topics.length === 0) ||
    (step === "paths" && path === null) ||
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
      <div className="mx-auto flex min-h-svh w-full max-w-[434px] flex-col px-6 pt-4 pb-8 sm:max-w-[600px] lg:max-w-[760px]">
        {isQuestion && (
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-11 self-end text-onboarding-muted"
              aria-label={t.close}
              onClick={() => (onPreviewFinish ? onPreviewFinish() : router.push(WORLD_ZERO))}
            >
              <X aria-hidden />
            </Button>
            <progress
              value={progress}
              max={100}
              aria-label={t.progress}
              className="onboarding-progress h-1.5 w-full overflow-hidden rounded-full"
            />
          </div>
        )}
        {step === "preparing" && (
          <progress
            value={100}
            max={100}
            aria-label={t.progress}
            className="onboarding-progress mt-10 h-1.5 w-full overflow-hidden rounded-full"
          />
        )}
        <div className="flex min-h-11 items-center justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-pressed={soundEnabled}
            onClick={() => setSoundEnabled((current) => !current)}
          >
            {soundEnabled ? <Volume2 aria-hidden /> : <VolumeX aria-hidden />}
            {soundEnabled ? t.soundMute : t.soundEnable}
          </Button>
        </div>
        <section
          key={step}
          aria-labelledby="onboarding-title"
          className={cn(
            "flex flex-1 flex-col gap-5 pb-8 motion-safe:animate-rise",
            step === "welcome" ? "justify-center text-center" : "pt-8",
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
                    : step === "paths" || step === "preparing"
                      ? 82
                      : step === "pace"
                        ? 72
                        : step === "reminder"
                          ? 86
                          : step === "ready"
                            ? 120
                            : 100
              }
              height={
                step === "welcome"
                  ? 140
                  : step === "experience"
                    ? 109
                    : step === "paths" || step === "preparing"
                      ? 76
                      : step === "pace"
                        ? 66
                        : step === "reminder"
                          ? 80
                          : step === "ready"
                            ? 110
                            : 92
              }
              priority={step === "welcome"}
              className={cn(
                "h-auto max-w-full object-contain",
                step === "pace" || step === "reminder"
                  ? "self-start"
                  : step === "paths" || step === "preparing"
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
            <p className="text-sm text-onboarding-muted">{detail}</p>
          </header>
          {step === "ready" && <OnboardingCelebration />}
          {isSummary ? <div className="my-auto">{content}</div> : content}
        </section>
        <div className="grid gap-1">
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
      </div>
    </main>
  );
}
