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
import { ChoiceButton, ChoiceMarker } from "@/components/atoms/choice-button";
import { EducationalNote } from "@/components/atoms/educational-note";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Button } from "@/components/ui/button";
import type { ProgressStatus } from "@/lib/course-progress";
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
import { cn } from "@/lib/utils";

type Props = {
  step: PayYourselfFirstStep;
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

function Feedback({ correct, children }: { correct: boolean; children: React.ReactNode }) {
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
        <p className="font-display font-extrabold">{correct ? "Exactly" : "Good thinking"}</p>
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

function SavingArt() {
  return (
    <div className="relative mx-auto mb-8 h-52 w-full max-w-sm" aria-hidden="true">
      <div className="absolute left-1/2 top-4 h-40 w-64 -translate-x-1/2 -rotate-3 rounded-4xl bg-primary-soft" />
      <div className="absolute left-1/2 top-0 flex h-44 w-64 -translate-x-1/2 rotate-2 items-center justify-between rounded-4xl border border-primary/20 bg-surface p-6 shadow-lift">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-primary font-display text-xl font-extrabold text-primary-foreground">
            A
          </span>
          <p className="mt-5 text-xs font-bold uppercase text-muted-foreground">Alex’s next step</p>
          <p className="mt-1 font-display text-2xl font-extrabold">Save first?</p>
        </div>
        <PiggyBank className="size-12 text-primary" />
      </div>
      <span className="absolute bottom-0 left-6 grid size-12 animate-float place-items-center rounded-full bg-brand-lime font-display text-xl font-extrabold shadow-soft">
        €
      </span>
      <span className="absolute right-4 top-3 grid size-9 place-items-center rounded-full bg-mint-soft text-market-up shadow-soft">
        <Sparkles className="size-4" />
      </span>
    </div>
  );
}

export function PayYourselfFirstLesson(props: Props) {
  if (props.step === "welcome") {
    return (
      <LessonScreen
        action={<PrimaryAction onClick={() => props.onGoTo("recap")}>Start lesson</PrimaryAction>}
      >
        <SavingArt />
        <div className="text-center">
          <Eyebrow>World 1 · Lesson 2</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            Alex knows what’s left. When should they save?
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
            Help Alex give a saving goal a place in the month.
          </p>
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "recap") {
    return (
      <LessonScreen
        action={<PrimaryAction onClick={() => props.onGoTo("decision")}>Make a plan</PrimaryAction>}
      >
        <div className="mx-auto mb-6 grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <Bus className="size-8" aria-hidden="true" />
        </div>
        <div className="text-center">
          <Eyebrow>Pick up where Alex left off</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            The transport pass comes first.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Alex had €{PREVIOUS_REMAINDER} left, but the €{TRANSPORT_PASS} pass is due soon.
          </p>
        </div>
        <div className="mt-7 flex items-center justify-between rounded-3xl border border-border bg-surface p-5 shadow-soft">
          <span className="font-semibold">Potentially available</span>
          <strong className="font-display text-3xl text-primary">€{POTENTIAL_CAPACITY}</strong>
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Other upcoming needs could still change this amount.
        </p>
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
              See what changes
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              Choose the setup that makes the goal visible sooner.
            </p>
          )
        }
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <WalletCards className="size-8" aria-hidden="true" />
        </span>
        <div className="text-center">
          <Eyebrow>One goal, two approaches</Eyebrow>
          <h1
            id="order-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            Alex would like to set aside €{EXAMPLE_TRANSFER}. What could they do?
          </h1>
        </div>
        <ChoiceList
          labelledBy="order-question"
          options={ORDER_OPTIONS}
          value={props.orderAnswer}
          onSelect={props.onOrderAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct}>
            {selected.correct
              ? "The goal gets its own place before flexible spending begins."
              : "Waiting can work, but the goal stays mixed with the money Alex might spend."}
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
          <PrimaryAction onClick={() => props.onGoTo("concept")}>Unlock the concept</PrimaryAction>
        }
      >
        <div className="text-center">
          <Eyebrow>What changes?</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            The money is the same. The order is different.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Imagine Alex considers a €20 optional purchase.
          </p>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-6">
            <ReceiptText className="size-7 text-primary" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-extrabold">Wait until later</h2>
            <p className="mt-3 text-sm text-muted-foreground">€35 − €20 optional purchase</p>
            <p className="mt-3 font-display text-3xl font-extrabold">€15 to save</p>
          </div>
          <div className="rounded-3xl border border-mint bg-mint-soft p-5 shadow-soft sm:p-6">
            <PiggyBank className="size-7 text-primary" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-extrabold">Set €20 aside first</h2>
            <p className="mt-3 text-sm text-muted-foreground">€35 − €20 towards the goal</p>
            <p className="mt-3 font-display text-3xl font-extrabold">
              €{FLEXIBLE_BALANCE} flexible
            </p>
          </div>
        </div>
        <p className="mt-5 text-center font-semibold text-primary">
          Alex can now see that the €20 purchase would change the saving plan.
        </p>
      </LessonScreen>
    );
  }

  if (props.step === "concept") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("habit")}>Make it a habit</PrimaryAction>
        }
      >
        <div className="rounded-4xl border border-primary/20 bg-primary-soft p-7 text-center shadow-soft sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary text-brand-lime">
            <Lightbulb className="size-8" aria-hidden="true" />
          </span>
          <Eyebrow>Concept unlocked</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-balance-tight sm:text-5xl">
            Pay yourself first
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed">
            After checking known needs, give a manageable amount a place in your savings{" "}
            <strong>before flexible spending.</strong>
          </p>
          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-surface p-4 text-left shadow-soft">
            <p className="font-bold">A flexible plan</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Bills still need covering. The amount can change when life does.
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
            <PrimaryAction onClick={() => props.onGoTo("change")}>Test the habit</PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              Both approaches can help. Choose one to explore.
            </p>
          )
        }
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <CalendarClock className="size-8" aria-hidden="true" />
        </span>
        <div className="text-center">
          <Eyebrow>Next payday</Eyebrow>
          <h1
            id="habit-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            How could Alex remember the plan?
          </h1>
        </div>
        <ChoiceList
          labelledBy="habit-question"
          options={HABIT_OPTIONS}
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
                  ? "A reminder lets Alex check the budget and make the transfer manually."
                  : "A scheduled transfer can make the habit easier to repeat, as long as Alex checks the budget and timing."}
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
            <PrimaryAction onClick={() => props.onGoTo("complete")}>Finish lesson</PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              Apply the idea to a new expense.
            </p>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft">
          <ReceiptText className="size-7 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">New expense due</p>
            <p className="font-display text-lg font-extrabold">
              Electricity adjustment · €{EXTRA_ELECTRICITY}
            </p>
          </div>
        </div>
        <div className="text-center">
          <Eyebrow>Life changes the plan</Eyebrow>
          <h1
            id="change-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            Should Alex keep the €{EXAMPLE_TRANSFER} transfer unchanged?
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Up to €{REVISED_CAPACITY} remains after this new expense.
          </p>
        </div>
        <ChoiceList
          labelledBy="change-question"
          options={CHANGE_OPTIONS}
          value={props.changeAnswer}
          onSelect={props.onChangeAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct}>
            {selected.correct
              ? "A saving habit can bend. Alex can reduce or pause the transfer and revisit it later."
              : "Known needs come first. Alex can change the transfer instead of borrowing or stretching the budget."}
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
            <RefreshCcw aria-hidden="true" /> Replay lesson
          </Button>
          {props.progressStatus === "saving" ? (
            <Button size="xl" disabled>
              <LoaderCircle className="animate-spin" aria-hidden="true" /> Saving progress…
            </Button>
          ) : props.progressStatus === "error" ? (
            <Button size="xl" onClick={props.onRetryProgress}>
              Save progress again <ArrowRight aria-hidden="true" />
            </Button>
          ) : props.progressStatus === "saved" ? (
            <Button asChild size="xl">
              <Link href="/dashboard/courses/financial-foundation/how-much-should-you-save">
                Continue to lesson 3 <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="xl">
              <Link href="/dashboard/courses/financial-foundation#lesson-2">
                Back to World 1 <ArrowRight aria-hidden="true" />
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
        <Eyebrow>Lesson complete</Eyebrow>
        <h1 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
          You gave saving a place before flexible spending.
        </h1>
        <div className="mx-auto mt-7 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
          {[
            ["1", "Check upcoming needs first."],
            ["2", "Set a manageable amount aside before flexible spending."],
            ["3", "Adjust the plan when life changes."],
          ].map(([number, copy]) => (
            <div
              key={number}
              className="rounded-2xl border border-border bg-surface p-4 shadow-soft"
            >
              <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                {number}
              </span>
              <p className="mt-3 text-sm font-semibold leading-relaxed">{copy}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-7 max-w-xl font-display text-xl font-extrabold text-primary sm:text-2xl">
          Pay yourself first is a flexible habit, not a fixed amount.
        </p>
        <EducationalNote />
      </div>
    </LessonScreen>
  );
}
