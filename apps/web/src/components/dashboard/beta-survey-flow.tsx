"use client";

import "@/components/layout/beta-colors.css";
import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CircleAlert,
  Laptop,
  Smartphone,
  Tablet,
  X,
  type LucideIcon,
} from "lucide-react";
import { submitBetaSurvey } from "@/app/beta-survey/actions";
import { prepareFeedbackAudio } from "@/app/dashboard/actions";
import { FeedbackAudioRecorder } from "@/components/shared/feedback-audio-recorder";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getSupabase } from "@/integrations/supabase/client";
import {
  BETA_SURVEY_DEVICES,
  BETA_SURVEY_DISAPPOINTMENTS,
  BETA_SURVEY_NPS_VALUES,
  BETA_SURVEY_SCORES,
  BETA_SURVEY_TEXT_MAX_LENGTH,
  type BetaSurveyAnswers,
} from "@/lib/beta-survey";
import { getDictionary } from "@/lib/dictionaries";
import { FEEDBACK_AUDIO_BUCKET } from "@/lib/feedback-audio";
import type { Track } from "@/lib/tracks";
import { cn } from "@/lib/utils";

const STEPS = [
  "intro",
  "device",
  "disappointment",
  "nps",
  "appearance",
  "courses",
  "usefulness",
  "friction",
  "overall",
  "done",
] as const;
type Step = (typeof STEPS)[number];
type ScoreStep = "appearance" | "courses" | "usefulness";

const QUESTION_COUNT = STEPS.length - 2;
const DEVICE_ICONS = { mobile: Smartphone, tablet: Tablet, computer: Laptop };

const PRIMARY_BUTTON =
  "rounded-2xl font-display font-extrabold shadow-[0_4px_0_var(--nudge-learn-violet-800)] active:translate-y-1 active:shadow-none";
const SECONDARY_BUTTON =
  "rounded-2xl border-2 border-[var(--nudge-learn-violet-200)] bg-surface font-display font-extrabold text-primary shadow-[0_4px_0_var(--nudge-learn-violet-200)] active:translate-y-1 active:shadow-none";
const TEXTAREA = "rounded-2xl border-2 bg-surface";

function Mascot({ pose, className }: { pose: "curious" | "encourage"; className: string }) {
  return (
    <Image
      src={`/brand/mascot/nudge-${pose}.webp`}
      alt=""
      width={1305}
      height={1205}
      sizes="(max-width: 640px) 240px, 300px"
      className={className}
    />
  );
}

function Option({
  name,
  checked,
  onSelect,
  className,
  children,
}: {
  name: string;
  checked: boolean;
  onSelect: () => void;
  className: string;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "flex min-h-13 cursor-pointer items-center gap-3 rounded-2xl border-2 font-display font-extrabold transition-transform has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-ring active:translate-y-0.5",
        className,
      )}
    >
      <input type="radio" name={name} checked={checked} onChange={onSelect} className="sr-only" />
      {children}
    </label>
  );
}

function ChoiceList<T extends string>({
  name,
  values,
  labels,
  icons,
  selected,
  onSelect,
}: {
  name: string;
  values: readonly T[];
  labels: Record<T, string>;
  icons?: Record<T, LucideIcon>;
  selected: T | undefined;
  onSelect: (value: T) => void;
}) {
  return (
    <div role="radiogroup" aria-labelledby="beta-survey-question" className="flex flex-col gap-3">
      {values.map((value) => {
        const checked = selected === value;
        const Icon: LucideIcon | undefined = icons?.[value];
        return (
          <Option
            key={value}
            name={name}
            checked={checked}
            onSelect={() => onSelect(value)}
            className={cn(
              "px-5 py-4",
              checked
                ? "border-primary bg-[var(--nudge-learn-violet-100)] text-primary shadow-[0_4px_0_var(--nudge-learn-violet)]"
                : "border-border bg-surface shadow-[0_4px_0_var(--nudge-learn-neutral-200)]",
            )}
          >
            {Icon && <Icon className="size-6 shrink-0" aria-hidden />}
            {labels[value]}
          </Option>
        );
      })}
    </div>
  );
}

function ScaleInput({
  name,
  values,
  selected,
  onSelect,
  low,
  high,
  gridClassName,
}: {
  name: string;
  values: readonly number[];
  selected: number | undefined;
  onSelect: (value: number) => void;
  low: string;
  high: string;
  gridClassName: string;
}) {
  return (
    <div>
      <div
        role="radiogroup"
        aria-labelledby="beta-survey-question"
        className={cn("grid gap-2", gridClassName)}
      >
        {values.map((value) => {
          const checked = selected === value;
          return (
            <Option
              key={value}
              name={name}
              checked={checked}
              onSelect={() => onSelect(value)}
              className={cn(
                "justify-center text-xl tabular-nums",
                checked
                  ? "border-[var(--nudge-learn-violet-800)] bg-primary text-primary-foreground shadow-[0_4px_0_var(--nudge-learn-violet-800)]"
                  : "border-border bg-surface shadow-[0_4px_0_var(--nudge-learn-neutral-200)]",
              )}
            >
              <span className="sr-only">
                {value === values[0] ? `${low}: ` : value === values.at(-1) ? `${high}: ` : ""}
              </span>
              {value}
            </Option>
          );
        })}
      </div>
      <div
        aria-hidden
        className="mt-3 flex justify-between text-xs font-bold text-muted-foreground"
      >
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  );
}

/** The end-of-beta survey: one question per screen, like a lesson. Everything is sent at the end. */
export function BetaSurveyFlow({ track }: { track: Track }) {
  const dictionary = getDictionary(track);
  const t = dictionary.betaSurvey;
  const [stepIndex, setStepIndex] = useState(0);
  const [device, setDevice] = useState<BetaSurveyAnswers["device"]>();
  const [disappointment, setDisappointment] = useState<BetaSurveyAnswers["disappointment"]>();
  const [nps, setNps] = useState<number>();
  const [scores, setScores] = useState<Partial<Record<ScoreStep, number>>>({});
  const [reasons, setReasons] = useState<Record<ScoreStep, string>>({
    appearance: "",
    courses: "",
    usefulness: "",
  });
  const [friction, setFriction] = useState("");
  const [overall, setOverall] = useState("");
  const [audio, setAudio] = useState<Blob | null>(null);
  const [recording, setRecording] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sending, startSending] = useTransition();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const step: Step = STEPS[stepIndex]!;

  useEffect(() => {
    if (stepIndex > 0) headingRef.current?.focus();
  }, [stepIndex]);

  function next() {
    setStepIndex((index) => index + 1);
    window.scrollTo({ top: 0 });
  }

  function send(overallMessage: string, overallAudio: Blob | null) {
    setFailed(false);
    startSending(async () => {
      let overallAudioPath: string | null = null;
      if (overallAudio) {
        const prepared = await prepareFeedbackAudio(overallAudio.type);
        if (!prepared) return setFailed(true);
        const { error } = await getSupabase()
          .storage.from(FEEDBACK_AUDIO_BUCKET)
          .uploadToSignedUrl(prepared.path, prepared.token, overallAudio, {
            contentType: overallAudio.type,
          });
        if (error) return setFailed(true);
        overallAudioPath = prepared.path;
      }
      const result = await submitBetaSurvey({
        device,
        disappointment,
        nps,
        appearanceScore: scores.appearance,
        appearanceWhy: reasons.appearance,
        coursesScore: scores.courses,
        coursesWhy: reasons.courses,
        usefulnessScore: scores.usefulness,
        usefulnessWhy: reasons.usefulness,
        friction,
        overallMessage,
        overallAudioPath,
      });
      if (result.status === "error") return setFailed(true);
      next();
    });
  }

  const reaction =
    step === "device" || step === "disappointment" || step === "nps"
      ? { device, disappointment, nps }[step] !== undefined && t.reactions[step]
      : (step === "appearance" || step === "courses" || step === "usefulness") &&
        scores[step] !== undefined &&
        t.reactions[step];
  const isQuestion = step !== "intro" && step !== "done";

  return (
    <main data-nudge-beta className="flex min-h-dvh flex-col bg-background text-foreground">
      {isQuestion && (
        <header className="mx-auto flex w-full max-w-[40rem] items-center gap-3 px-4 pt-4 sm:pt-7">
          <Link
            href="/dashboard"
            aria-label={t.close}
            className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X className="size-6" aria-hidden />
          </Link>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={QUESTION_COUNT}
            aria-valuenow={stepIndex}
            aria-label={t.progress(stepIndex, QUESTION_COUNT)}
            className="h-3.5 flex-1 overflow-hidden rounded-full bg-[var(--nudge-learn-neutral-200)]"
          >
            <span
              className="block h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${(stepIndex / QUESTION_COUNT) * 100}%` }}
            />
          </div>
          <span aria-hidden className="text-sm font-bold text-muted-foreground tabular-nums">
            {stepIndex}/{QUESTION_COUNT}
          </span>
        </header>
      )}

      <div
        className={cn(
          "mx-auto flex w-full max-w-[40rem] flex-1 flex-col gap-5 px-4 py-5 sm:gap-7",
          isQuestion ? "sm:justify-center sm:py-10" : "items-center justify-center text-center",
        )}
      >
        {!isQuestion ? (
          <>
            <Mascot pose="encourage" className="w-44 sm:w-56" />
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-2xl font-extrabold text-balance outline-none sm:text-3xl"
            >
              {step === "intro" ? t.intro.title : t.done.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {step === "intro" ? t.intro.text(QUESTION_COUNT) : t.done.text}
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 sm:gap-5">
              <Mascot pose="curious" className="w-20 shrink-0 sm:w-28" />
              <div className="relative flex-1 rounded-2xl border-2 border-border bg-surface px-4 py-3.5 shadow-[0_4px_0_var(--nudge-learn-neutral-200)]">
                <span
                  aria-hidden
                  className="absolute top-1/2 -left-[7px] size-3 -translate-y-1/2 rotate-45 border-b-2 border-l-2 border-border bg-surface"
                />
                <h1
                  id="beta-survey-question"
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-display text-lg leading-snug font-extrabold text-balance outline-none sm:text-2xl"
                >
                  {t.questions[step]}
                </h1>
              </div>
            </div>

            {step === "device" && (
              <ChoiceList
                name="device"
                values={BETA_SURVEY_DEVICES}
                labels={t.devices}
                icons={DEVICE_ICONS}
                selected={device}
                onSelect={setDevice}
              />
            )}
            {step === "disappointment" && (
              <ChoiceList
                name="disappointment"
                values={BETA_SURVEY_DISAPPOINTMENTS}
                labels={t.disappointments}
                selected={disappointment}
                onSelect={setDisappointment}
              />
            )}
            {step === "nps" && (
              <ScaleInput
                name="nps"
                values={BETA_SURVEY_NPS_VALUES}
                selected={nps}
                onSelect={setNps}
                low={t.npsLow}
                high={t.npsHigh}
                gridClassName="grid-cols-6 sm:grid-cols-11"
              />
            )}
            {(step === "appearance" || step === "courses" || step === "usefulness") && (
              <>
                <ScaleInput
                  name={step}
                  values={BETA_SURVEY_SCORES}
                  selected={scores[step]}
                  onSelect={(value) => setScores((current) => ({ ...current, [step]: value }))}
                  low={t.scoreLow}
                  high={t.scoreHigh}
                  gridClassName="grid-cols-4"
                />
                <div>
                  <label htmlFor={`${step}-why`} className="mb-2 block text-sm font-bold">
                    {t.whyLabel}
                  </label>
                  <Textarea
                    id={`${step}-why`}
                    value={reasons[step]}
                    onChange={(event) =>
                      setReasons((current) => ({ ...current, [step]: event.target.value }))
                    }
                    maxLength={BETA_SURVEY_TEXT_MAX_LENGTH}
                    rows={3}
                    placeholder={t.whyPlaceholder}
                    className={TEXTAREA}
                  />
                </div>
              </>
            )}
            {step === "friction" && (
              <Textarea
                aria-labelledby="beta-survey-question"
                value={friction}
                onChange={(event) => setFriction(event.target.value)}
                maxLength={BETA_SURVEY_TEXT_MAX_LENGTH}
                rows={6}
                placeholder={t.frictionPlaceholder}
                className={TEXTAREA}
              />
            )}
            {step === "overall" && (
              <>
                {!audio && (
                  <>
                    <Textarea
                      aria-labelledby="beta-survey-question"
                      value={overall}
                      onChange={(event) => setOverall(event.target.value)}
                      maxLength={BETA_SURVEY_TEXT_MAX_LENGTH}
                      rows={5}
                      placeholder={t.overallPlaceholder}
                      className={TEXTAREA}
                    />
                    <p className="text-center text-sm font-bold text-muted-foreground">{t.or}</p>
                  </>
                )}
                <FeedbackAudioRecorder
                  t={dictionary.dashboard.feedback}
                  disabled={sending}
                  onRecordingChange={setRecording}
                  onAudioChange={setAudio}
                />
                {failed && (
                  <Alert variant="destructive" aria-live="polite">
                    <CircleAlert aria-hidden />
                    <AlertDescription>{t.error}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </>
        )}
      </div>

      {step === "intro" && (
        <footer className="border-t-2 border-border bg-surface px-4 pt-3.5 pb-[calc(1.125rem+env(safe-area-inset-bottom))]">
          <div className="mx-auto max-w-[40rem]">
            <Button size="xl" className={cn(PRIMARY_BUTTON, "w-full")} onClick={next}>
              {t.intro.start} <ArrowRight aria-hidden />
            </Button>
          </div>
        </footer>
      )}
      {step === "done" && (
        <footer className="px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <div className="mx-auto max-w-[40rem]">
            <Button asChild size="xl" className={cn(PRIMARY_BUTTON, "w-full")}>
              <Link href="/dashboard">{t.done.back}</Link>
            </Button>
          </div>
        </footer>
      )}
      {reaction && (
        <footer className="bg-[var(--nudge-learn-teal-100)] px-4 pt-3.5 pb-[calc(1.125rem+env(safe-area-inset-bottom))]">
          <div className="mx-auto flex max-w-[40rem] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p
              role="status"
              className="flex items-center gap-3 font-display text-lg font-extrabold text-[var(--nudge-learn-teal-dark)] sm:text-xl"
            >
              <Mascot pose="encourage" className="w-14 shrink-0" />
              {reaction}
            </p>
            <Button size="xl" className={cn(PRIMARY_BUTTON, "w-full sm:w-auto")} onClick={next}>
              {t.continue}
            </Button>
          </div>
        </footer>
      )}
      {(step === "friction" || step === "overall") && !recording && (
        <footer className="border-t-2 border-border bg-surface px-4 pt-3.5 pb-[calc(1.125rem+env(safe-area-inset-bottom))]">
          <div className="mx-auto grid max-w-[40rem] grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="xl"
              disabled={sending}
              className={SECONDARY_BUTTON}
              onClick={() => {
                if (step === "overall") {
                  send("", null);
                } else {
                  setFriction("");
                  next();
                }
              }}
            >
              {t.skip}
            </Button>
            <Button
              size="xl"
              disabled={sending}
              className={PRIMARY_BUTTON}
              onClick={() => (step === "overall" ? send(audio ? "" : overall, audio) : next())}
            >
              {sending ? t.sending : step === "overall" ? t.send : t.continue}
            </Button>
          </div>
        </footer>
      )}
    </main>
  );
}
