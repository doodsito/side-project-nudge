import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Bus,
  CalendarClock,
  Check,
  Lightbulb,
  LoaderCircle,
  PiggyBank,
  ReceiptText,
  RefreshCcw,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { ChoiceButton, ChoiceMarker } from "@/components/shared/choice-button";
import { EducationalNote } from "@/components/shared/educational-note";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";
import type { ProgressStatus } from "@/lib/course-progress";
import type { Dictionary } from "@/lib/dictionaries";
import { currencySymbol, formatMoney, type Money } from "@/lib/first-paycheque-lesson";
import {
  CHANGE_OPTIONS,
  EXAMPLE_TRANSFER,
  EXTRA_ELECTRICITY,
  FLEXIBLE_BALANCE,
  HABIT_OPTIONS,
  ORDER_OPTIONS,
  POTENTIAL_CAPACITY,
  PREVIOUS_REMAINDER,
  REVISED_CAPACITY,
  TRANSPORT_PASS,
  type PayYourselfFirstStep,
} from "@/lib/pay-yourself-first-lesson";
import type { Track } from "@/lib/tracks";
import { cn } from "@/lib/utils";

type Props = {
  step: PayYourselfFirstStep;
  track: Track;
  copy: Dictionary["learning"]["payYourselfFirst"];
  educationalNote: string;
  orderAnswer: string | null;
  habitAnswer: string | null;
  changeAnswer: string | null;
  progressStatus: ProgressStatus;
  onOrderAnswer: (answer: string) => void;
  onHabitAnswer: (answer: string) => void;
  onChangeAnswer: (answer: string) => void;
  onGoTo: (step: PayYourselfFirstStep) => void;
  onRestart: () => void;
  onRetryProgress: () => void;
};

function LessonScreen({
  children,
  action,
  wide = false,
}: {
  children: React.ReactNode;
  action: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <section className="flex min-h-0 flex-1 items-center overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
        <div className={cn("mx-auto w-full animate-rise", wide ? "max-w-3xl" : "max-w-xl")}>
          {children}
        </div>
      </section>
      <div className="shrink-0 border-t border-border bg-surface/95 px-5 py-4 backdrop-blur sm:px-8 sm:py-5">
        <div className={cn("mx-auto w-full", wide ? "max-w-3xl" : "max-w-xl")}>{action}</div>
      </div>
    </div>
  );
}

function PrimaryAction({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <Button size="xl" onClick={onClick} className="w-full sm:ml-auto sm:flex sm:w-fit sm:min-w-48">
      {children} <ArrowRight aria-hidden="true" />
    </Button>
  );
}

function Feedback({
  correct,
  copy,
  children,
}: {
  correct: boolean;
  copy: Dictionary["learning"]["payYourselfFirst"];
  children: React.ReactNode;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "mt-5 flex items-start gap-3 rounded-2xl border p-4 text-left",
        correct ? "border-mint bg-mint-soft" : "border-primary/25 bg-primary-soft",
      )}
    >
      <span
        className={cn(
          "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full",
          correct ? "bg-market-up text-primary-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        {correct ? <Check className="size-4" /> : <Lightbulb className="size-4" />}
      </span>
      <div>
        <p className="font-display font-extrabold">
          {correct ? copy.feedbackCorrect : copy.feedbackThinking}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}

function ChoiceList({
  labelledBy,
  options,
  value,
  onSelect,
}: {
  labelledBy: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="mt-7 grid gap-3" role="radiogroup" aria-labelledby={labelledBy}>
      {options.map((option, index) => (
        <ChoiceButton
          key={option.value}
          selected={value === option.value}
          tabIndex={value === option.value || (!value && index === 0) ? 0 : -1}
          onClick={() => onSelect(option.value)}
          className="min-h-16 p-4 text-base font-bold"
        >
          <ChoiceMarker selected={value === option.value} className="size-7 text-xs">
            {value === option.value ? (
              <Check className="size-4" />
            ) : (
              String.fromCharCode(65 + index)
            )}
          </ChoiceMarker>
          {option.label}
        </ChoiceButton>
      ))}
    </div>
  );
}

function SavingArt({
  track,
  copy,
}: {
  track: Track;
  copy: Dictionary["learning"]["payYourselfFirst"]["art"];
}) {
  return (
    <div className="relative mx-auto mb-8 h-52 w-full max-w-sm" aria-hidden="true">
      <div className="absolute left-1/2 top-4 h-40 w-64 -translate-x-1/2 -rotate-3 rounded-4xl bg-primary-soft" />
      <div className="absolute left-1/2 top-0 flex h-44 w-64 -translate-x-1/2 rotate-2 items-center justify-between rounded-4xl border border-primary/20 bg-surface p-6 shadow-lift">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-primary font-display text-xl font-extrabold text-primary-foreground">
            A
          </span>
          <p className="mt-5 text-xs font-bold uppercase text-muted-foreground">{copy.nextStep}</p>
          <p className="mt-1 font-display text-2xl font-extrabold">{copy.saveFirst}</p>
        </div>
        <PiggyBank className="size-12 text-primary" />
      </div>
      <span className="absolute bottom-0 left-6 grid size-12 animate-float place-items-center rounded-full bg-brand-lime font-display text-xl font-extrabold shadow-soft">
        {currencySymbol(track)}
      </span>
      <span className="absolute right-4 top-3 grid size-9 place-items-center rounded-full bg-mint-soft text-market-up shadow-soft">
        <Sparkles className="size-4" />
      </span>
    </div>
  );
}

export function PayYourselfFirstLesson(props: Props) {
  const money: Money = (amount) => formatMoney(amount, props.track);

  if (props.step === "welcome") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("recap")}>
            {props.copy.welcome.action}
          </PrimaryAction>
        }
      >
        <SavingArt track={props.track} copy={props.copy.art} />
        <div className="text-center">
          <Eyebrow>{props.copy.welcome.label}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {props.copy.welcome.title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
            {props.copy.welcome.intro}
          </p>
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "recap") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("decision")}>
            {props.copy.recap.action}
          </PrimaryAction>
        }
      >
        <div className="mx-auto mb-6 grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <Bus className="size-8" aria-hidden="true" />
        </div>
        <div className="text-center">
          <Eyebrow>{props.copy.recap.label}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {props.copy.recap.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {props.copy.recap.description(money(PREVIOUS_REMAINDER), money(TRANSPORT_PASS))}
          </p>
        </div>
        <div className="mt-7 flex items-center justify-between rounded-3xl border border-border bg-surface p-5 shadow-soft">
          <span className="font-semibold">{props.copy.recap.available}</span>
          <strong className="font-display text-3xl text-primary">
            {money(POTENTIAL_CAPACITY)}
          </strong>
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">{props.copy.recap.note}</p>
      </LessonScreen>
    );
  }

  if (props.step === "decision") {
    const selected = ORDER_OPTIONS.find((option) => option.value === props.orderAnswer);
    return (
      <LessonScreen
        action={
          props.orderAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("consequence")}>
              {props.copy.decision.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {props.copy.decision.hint}
            </p>
          )
        }
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <WalletCards className="size-8" aria-hidden="true" />
        </span>
        <div className="text-center">
          <Eyebrow>{props.copy.decision.label}</Eyebrow>
          <h1
            id="order-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {props.copy.decision.question(money(EXAMPLE_TRANSFER))}
          </h1>
        </div>
        <ChoiceList
          labelledBy="order-question"
          options={ORDER_OPTIONS.map((option, index) => ({
            value: option.value,
            label: props.copy.decision.options[index]!(money(EXAMPLE_TRANSFER)),
          }))}
          value={props.orderAnswer}
          onSelect={props.onOrderAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={props.copy}>
            {selected.correct ? props.copy.decision.correct : props.copy.decision.retry}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "consequence") {
    return (
      <LessonScreen
        wide
        action={
          <PrimaryAction onClick={() => props.onGoTo("concept")}>
            {props.copy.consequence.action}
          </PrimaryAction>
        }
      >
        <div className="text-center">
          <Eyebrow>{props.copy.consequence.label}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {props.copy.consequence.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {props.copy.consequence.intro(money(20))}
          </p>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-6">
            <ReceiptText className="size-7 text-primary" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-extrabold">
              {props.copy.consequence.waitTitle}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {props.copy.consequence.waitDetail(money(35), money(20))}
            </p>
            <p className="mt-3 font-display text-3xl font-extrabold">
              {props.copy.consequence.waitResult(money(15))}
            </p>
          </div>
          <div className="rounded-3xl border border-mint bg-mint-soft p-5 shadow-soft sm:p-6">
            <PiggyBank className="size-7 text-primary" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-extrabold">
              {props.copy.consequence.firstTitle(money(20))}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {props.copy.consequence.firstDetail(money(35), money(20))}
            </p>
            <p className="mt-3 font-display text-3xl font-extrabold">
              {props.copy.consequence.firstResult(money(FLEXIBLE_BALANCE))}
            </p>
          </div>
        </div>
        <p className="mt-5 text-center font-semibold text-primary">
          {props.copy.consequence.takeaway(money(20))}
        </p>
      </LessonScreen>
    );
  }

  if (props.step === "concept") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("habit")}>
            {props.copy.concept.action}
          </PrimaryAction>
        }
      >
        <div className="rounded-4xl border border-primary/20 bg-primary-soft p-7 text-center shadow-soft sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary text-brand-lime">
            <Lightbulb className="size-8" aria-hidden="true" />
          </span>
          <Eyebrow>{props.copy.concept.label}</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-balance-tight sm:text-5xl">
            {props.copy.concept.title}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed">
            {props.copy.concept.intro} <strong>{props.copy.concept.emphasis}</strong>
          </p>
          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-surface p-4 text-left shadow-soft">
            <p className="font-bold">{props.copy.concept.flexibleTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {props.copy.concept.flexibleBody}
            </p>
          </div>
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "habit") {
    return (
      <LessonScreen
        action={
          props.habitAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("change")}>
              {props.copy.habit.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {props.copy.habit.hint}
            </p>
          )
        }
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <CalendarClock className="size-8" aria-hidden="true" />
        </span>
        <div className="text-center">
          <Eyebrow>{props.copy.habit.label}</Eyebrow>
          <h1
            id="habit-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {props.copy.habit.question}
          </h1>
        </div>
        <ChoiceList
          labelledBy="habit-question"
          options={HABIT_OPTIONS.map((option, index) => ({
            value: option.value,
            label: props.copy.habit.options[index]!,
          }))}
          value={props.habitAnswer}
          onSelect={props.onHabitAnswer}
        />
        {props.habitAnswer && (
          <div
            role="status"
            aria-live="polite"
            className="mt-5 rounded-2xl border border-mint bg-mint-soft p-4"
          >
            <div className="flex items-start gap-3">
              {props.habitAnswer === "reminder" ? (
                <Bell className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              ) : (
                <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              )}
              <p className="text-sm leading-relaxed">
                {props.habitAnswer === "reminder"
                  ? props.copy.habit.reminder
                  : props.copy.habit.transfer}
              </p>
            </div>
          </div>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "change") {
    const selected = CHANGE_OPTIONS.find((option) => option.value === props.changeAnswer);
    return (
      <LessonScreen
        action={
          props.changeAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("complete")}>
              {props.copy.change.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {props.copy.change.hint}
            </p>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft">
          <ReceiptText className="size-7 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">
              {props.copy.change.expenseLabel}
            </p>
            <p className="font-display text-lg font-extrabold">
              {props.copy.change.expense(money(EXTRA_ELECTRICITY))}
            </p>
          </div>
        </div>
        <div className="text-center">
          <Eyebrow>{props.copy.change.label}</Eyebrow>
          <h1
            id="change-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {props.copy.change.question(money(EXAMPLE_TRANSFER))}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {props.copy.change.remaining(money(REVISED_CAPACITY))}
          </p>
        </div>
        <ChoiceList
          labelledBy="change-question"
          options={CHANGE_OPTIONS.map((option, index) => ({
            value: option.value,
            label: props.copy.change.options[index]!(money(EXAMPLE_TRANSFER)),
          }))}
          value={props.changeAnswer}
          onSelect={props.onChangeAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={props.copy}>
            {selected.correct ? props.copy.change.correct : props.copy.change.retry}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  return (
    <LessonScreen
      wide
      action={
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="ghost" size="xl" onClick={props.onRestart}>
            <RefreshCcw aria-hidden="true" /> {props.copy.complete.replay}
          </Button>
          {props.progressStatus === "saving" ? (
            <Button size="xl" disabled>
              <LoaderCircle className="animate-spin" aria-hidden="true" />
              {props.copy.complete.saving}
            </Button>
          ) : props.progressStatus === "error" ? (
            <Button size="xl" onClick={props.onRetryProgress}>
              {props.copy.complete.saveAgain} <ArrowRight aria-hidden="true" />
            </Button>
          ) : props.progressStatus === "saved" && props.track === "fr" ? (
            <Button asChild size="xl">
              <Link href="/dashboard/courses/financial-foundation/how-much-should-you-save">
                {props.copy.complete.continue} <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="xl">
              <Link href="/dashboard/courses/financial-foundation#lesson-2">
                {props.copy.complete.back} <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          )}
        </div>
      }
    >
      <div className="text-center">
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-brand-lime text-foreground shadow-lift">
          <Check className="size-9" aria-hidden="true" />
        </span>
        <Eyebrow>{props.copy.complete.label}</Eyebrow>
        <h1 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
          {props.copy.complete.title}
        </h1>
        <div className="mx-auto mt-7 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
          {props.copy.complete.steps.map((stepCopy, index) => (
            <div
              key={stepCopy}
              className="rounded-2xl border border-border bg-surface p-4 shadow-soft"
            >
              <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                {index + 1}
              </span>
              <p className="mt-3 text-sm font-semibold leading-relaxed">{stepCopy}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-7 max-w-xl font-display text-xl font-extrabold text-primary sm:text-2xl">
          {props.copy.complete.takeaway}
        </p>
        <EducationalNote copy={props.educationalNote} />
      </div>
    </LessonScreen>
  );
}
