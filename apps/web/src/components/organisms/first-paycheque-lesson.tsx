import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Bus,
  Check,
  CircleDollarSign,
  Home,
  Lightbulb,
  PartyPopper,
  PiggyBank,
  ReceiptText,
  RefreshCcw,
  ShoppingBasket,
  Sparkles,
  WalletCards,
  LoaderCircle,
  type LucideIcon,
} from "lucide-react";
import { ChoiceButton, ChoiceMarker } from "@/components/atoms/choice-button";
import { EducationalNote } from "@/components/atoms/educational-note";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Button } from "@/components/ui/button";
import {
  BUDGET_ITEMS,
  CONCEPT_OPTIONS,
  REMAINING,
  SALARY,
  TOTAL_SPENT,
  TRANSFER_OPTIONS,
  isExpenseAnswerCorrect,
  type ExpenseType,
  type LessonStep,
} from "@/lib/first-paycheque-lesson";
import { cn } from "@/lib/utils";
import type { ProgressStatus } from "@/lib/course-progress";

type FirstPaychequeLessonProps = {
  step: LessonStep;
  expenseIndex: number;
  expenseAnswer: ExpenseType | null;
  conceptAnswer: string | null;
  transferAnswer: string | null;
  progressStatus: ProgressStatus;
  onExpenseAnswer: (answer: ExpenseType) => void;
  onConceptAnswer: (answer: string) => void;
  onTransferAnswer: (answer: string) => void;
  onContinueExpense: () => void;
  onGoTo: (step: LessonStep) => void;
  onRestart: () => void;
  onRetryProgress: () => void;
};

const expenseIcons: LucideIcon[] = [Home, ShoppingBasket, Bus, WalletCards, Sparkles];

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

function AlexPaychequeArt() {
  return (
    <div className="relative mx-auto mb-8 h-56 w-full max-w-sm" aria-hidden="true">
      <div className="absolute left-1/2 top-3 h-48 w-72 -translate-x-1/2 rotate-[-3deg] rounded-4xl bg-primary-soft" />
      <div className="absolute left-1/2 top-0 flex h-48 w-72 -translate-x-1/2 rotate-[2deg] flex-col justify-between rounded-4xl border border-primary/20 bg-surface p-6 shadow-lift">
        <div className="flex items-center justify-between">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary font-display text-xl font-extrabold text-primary-foreground">
            A
          </span>
          <PartyPopper className="size-7 text-primary" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase text-muted-foreground">First paycheque</p>
          <p className="mt-1 font-display text-4xl font-extrabold">€1,850</p>
        </div>
      </div>
      <span className="absolute bottom-1 left-7 grid size-12 animate-float place-items-center rounded-full bg-brand-lime font-display font-extrabold text-foreground shadow-soft">
        €
      </span>
      <span className="absolute right-6 top-5 grid size-9 place-items-center rounded-full bg-mint-soft text-market-up shadow-soft">
        <Sparkles className="size-4" />
      </span>
    </div>
  );
}

function MoneyJourneyArt() {
  return (
    <div
      className="mx-auto mb-8 flex max-w-md items-center justify-center gap-3"
      aria-hidden="true"
    >
      <span className="grid size-20 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-soft">
        <BriefcaseBusiness className="size-8" />
      </span>
      <span className="h-1 w-10 rounded-full bg-primary-soft" />
      <span className="grid size-20 place-items-center rounded-3xl border border-border bg-surface shadow-soft">
        <ReceiptText className="size-8 text-primary" />
      </span>
      <span className="h-1 w-10 rounded-full bg-primary-soft" />
      <span className="grid size-20 place-items-center rounded-3xl bg-brand-lime text-foreground shadow-soft">
        <PiggyBank className="size-8" />
      </span>
    </div>
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
        <p className="font-display font-extrabold">{correct ? "Exactly" : "Good try"}</p>
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

export function FirstPaychequeLesson(props: FirstPaychequeLessonProps) {
  if (props.step === "welcome") {
    return (
      <LessonScreen
        action={<PrimaryAction onClick={() => props.onGoTo("story")}>Start lesson</PrimaryAction>}
      >
        <AlexPaychequeArt />
        <div className="text-center">
          <Eyebrow>World 1 · Lesson 1</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            Your first paycheque just landed.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
            Meet Alex. Help them work out what their money can really do.
          </p>
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "story") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("budget")}>See the spending</PrimaryAction>
        }
      >
        <MoneyJourneyArt />
        <div className="text-center">
          <Eyebrow>Alex’s month</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            Alex got paid €1,850.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
            After rent, food, transport, bills and a few plans, the balance is getting smaller.
          </p>
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "budget") {
    const item = BUDGET_ITEMS[props.expenseIndex] ?? BUDGET_ITEMS[0];
    const Icon = expenseIcons[props.expenseIndex] ?? ReceiptText;
    const correct = isExpenseAnswerCorrect(props.expenseIndex, props.expenseAnswer);
    return (
      <LessonScreen
        action={
          props.expenseAnswer ? (
            <PrimaryAction onClick={props.onContinueExpense}>
              {props.expenseIndex === BUDGET_ITEMS.length - 1 ? "See what is left" : "Next expense"}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              Choose the role this expense played for Alex.
            </p>
          )
        }
      >
        <div className="flex items-center justify-between text-sm font-bold text-muted-foreground">
          <span>Build Alex’s month</span>
          <span>
            {props.expenseIndex + 1} of {BUDGET_ITEMS.length}
          </span>
        </div>
        <div
          key={item.label}
          className="mt-6 animate-rise rounded-4xl border border-border bg-surface p-6 text-center shadow-soft sm:p-9"
        >
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Icon className="size-7" aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-display text-3xl font-extrabold">{item.label}</h1>
          <p className="mt-2 font-display text-2xl font-extrabold text-primary">€{item.amount}</p>
          <p id="expense-question" className="mt-6 font-bold">
            What kind of expense was this for Alex?
          </p>
          <ChoiceList
            labelledBy="expense-question"
            value={props.expenseAnswer}
            onSelect={(value) => props.onExpenseAnswer(value as ExpenseType)}
            options={[
              { value: "essential", label: "Essential this month" },
              { value: "flexible", label: "Easier to adjust" },
            ]}
          />
          {props.expenseAnswer && <Feedback correct={correct}>{item.note}</Feedback>}
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "result") {
    return (
      <LessonScreen
        wide
        action={
          <PrimaryAction onClick={() => props.onGoTo("concept-check")}>
            What does it mean?
          </PrimaryAction>
        }
      >
        <div className="grid items-center gap-8 md:grid-cols-[1fr_.9fr]">
          <div>
            <Eyebrow>The result</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-extrabold text-balance-tight sm:text-6xl">
              €{REMAINING} is left.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              That number is the starting point, not an instruction to spend, save or invest.
            </p>
          </div>
          <div className="rounded-4xl border border-border bg-surface p-5 shadow-lift sm:p-7">
            <div className="flex items-center justify-between border-b border-border py-3">
              <span className="font-semibold text-muted-foreground">Paycheque</span>
              <strong className="font-display text-xl">€{SALARY.toLocaleString("en-GB")}</strong>
            </div>
            <div className="flex items-center justify-between border-b border-border py-3">
              <span className="font-semibold text-muted-foreground">Spent this month</span>
              <strong className="font-display text-xl">
                − €{TOTAL_SPENT.toLocaleString("en-GB")}
              </strong>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-brand-lime p-4">
              <span className="font-extrabold">Remaining</span>
              <strong className="font-display text-3xl">€{REMAINING}</strong>
            </div>
          </div>
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "concept-check") {
    const selected = CONCEPT_OPTIONS.find((option) => option.value === props.conceptAnswer);
    return (
      <LessonScreen
        action={
          props.conceptAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("concept")}>
              Unlock the concept
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              Choose the best description.
            </p>
          )
        }
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <CircleDollarSign className="size-8" aria-hidden="true" />
        </span>
        <div className="text-center">
          <Eyebrow>Make the connection</Eyebrow>
          <h1
            id="concept-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            What do the €100 represent?
          </h1>
        </div>
        <ChoiceList
          labelledBy="concept-question"
          options={CONCEPT_OPTIONS}
          value={props.conceptAnswer}
          onSelect={props.onConceptAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct}>
            {selected.correct
              ? "It may be money Alex can set aside, once upcoming needs have been checked."
              : "A positive balance is useful, but it does not decide the money's job yet."}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "concept") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("transfer")}>Test the idea</PrimaryAction>
        }
      >
        <div className="rounded-4xl border border-primary/20 bg-primary-soft p-7 text-center shadow-soft sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary text-brand-lime">
            <Lightbulb className="size-8" aria-hidden="true" />
          </span>
          <Eyebrow>Concept unlocked</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-balance-tight sm:text-5xl">
            Saving capacity
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed">
            The money you can <strong>potentially set aside</strong> after the expenses in your
            budget.
          </p>
          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-surface p-4 text-left shadow-soft">
            <p className="font-bold">Why “potentially” matters</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Money left in an account is not automatically available for a long-term goal. A bill
              may still be on its way.
            </p>
          </div>
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "transfer") {
    const selected = TRANSFER_OPTIONS.find((option) => option.value === props.transferAnswer);
    return (
      <LessonScreen
        action={
          props.transferAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("complete")}>Finish lesson</PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              Apply the concept to this new detail.
            </p>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft">
          <Bus className="size-7 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">Due in 8 days</p>
            <p className="font-display text-lg font-extrabold">Transport pass · €65</p>
          </div>
        </div>
        <div className="text-center">
          <Eyebrow>One detail changes the picture</Eyebrow>
          <h1
            id="transfer-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            Can Alex treat all €100 as available for a long-term goal?
          </h1>
        </div>
        <ChoiceList
          labelledBy="transfer-question"
          options={TRANSFER_OPTIONS}
          value={props.transferAnswer}
          onSelect={props.onTransferAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct}>
            {selected.correct
              ? "The €65 has a near-term job. Alex should account for it before deciding what the remaining money can do."
              : "The €65 transport pass is due before the next paycheque, so part of the balance already has a job."}
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
          ) : (
            <Button asChild size="xl">
              <Link
                href={
                  props.progressStatus === "saved"
                    ? "/dashboard/courses/financial-foundation/pay-yourself-first"
                    : "/dashboard/courses/financial-foundation#lesson-2"
                }
              >
                {props.progressStatus === "saved" ? "Continue to lesson 2" : "Back to World 1"}
                <ArrowRight aria-hidden="true" />
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
          You found the money before giving it a job.
        </h1>
        <div className="mx-auto mt-7 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
          {[
            ["1", "Income − spending reveals what remains."],
            ["2", "What remains is potential saving capacity."],
            ["3", "Upcoming needs come before a long-term job."],
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
          Before you place a euro, give it a job.
        </p>
        <EducationalNote />
      </div>
    </LessonScreen>
  );
}
