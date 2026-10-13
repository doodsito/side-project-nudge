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
  Smartphone,
  Sparkles,
  WalletCards,
  LoaderCircle,
  type LucideIcon,
} from "lucide-react";
import { ChoiceButton, ChoiceMarker } from "@/components/shared/choice-button";
import { EducationalNote } from "@/components/shared/educational-note";
import { Eyebrow } from "@/components/shared/eyebrow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  BUDGET_ITEMS,
  CONCEPT_OPTIONS,
  REMAINING,
  SALARY,
  SAM,
  SKIP_QUIZ,
  TOTAL_SPENT,
  TRANSFER_OPTIONS,
  currencySymbol,
  formatMoney,
  isExpenseAnswerCorrect,
  type ExpenseType,
  type LessonView,
  type Money,
  type SkipQuizAnswers,
} from "@/lib/first-paycheque-lesson";
import { cn } from "@/lib/utils";
import type { ProgressStatus } from "@/lib/course-progress";
import type { Track } from "@/lib/tracks";

type FirstPaychequeLessonProps = {
  step: LessonView;
  track: Track;
  expenseIndex: number;
  expenseAnswer: ExpenseType | null;
  conceptAnswer: string | null;
  transferAnswer: string | null;
  skipAnswers: SkipQuizAnswers;
  skipChecked: boolean;
  skipped: boolean;
  progressStatus: ProgressStatus;
  onExpenseAnswer: (answer: ExpenseType) => void;
  onConceptAnswer: (answer: string) => void;
  onTransferAnswer: (answer: string) => void;
  onSkipAnswer: (question: keyof SkipQuizAnswers, answer: string) => void;
  onCheckSkipQuiz: () => void;
  onContinueExpense: () => void;
  onGoTo: (step: LessonView) => void;
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
      <section className="flex min-h-0 flex-1 overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
        <div className={cn("m-auto w-full animate-rise", wide ? "max-w-3xl" : "max-w-xl")}>
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

function ActionHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
      {children}
    </p>
  );
}

function AlexPaychequeArt({ track }: { track: Track }) {
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
          <p className="text-xs font-bold uppercase text-muted-foreground">First paycheck</p>
          <p className="mt-1 font-display text-4xl font-extrabold">{formatMoney(SALARY, track)}</p>
        </div>
      </div>
      <span className="absolute bottom-1 left-7 grid size-12 animate-float place-items-center rounded-full bg-brand-lime font-display font-extrabold text-foreground shadow-soft">
        {currencySymbol(track)}
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

function withLabels(
  options: ReadonlyArray<{ value: string; label: (money: Money) => string }>,
  money: Money,
) {
  return options.map((option) => ({ value: option.value, label: option.label(money) }));
}

export function FirstPaychequeLesson(props: FirstPaychequeLessonProps) {
  const money: Money = (amount) => formatMoney(amount, props.track);

  if (props.step === "welcome") {
    return (
      <LessonScreen
        action={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="ghost" size="xl" onClick={() => props.onGoTo("skip-quiz")}>
              I know this: take the quick check
            </Button>
            <PrimaryAction onClick={() => props.onGoTo("story")}>Start lesson</PrimaryAction>
          </div>
        }
      >
        <AlexPaychequeArt track={props.track} />
        <div className="text-center">
          <Eyebrow>World 1 · Lesson 1</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            Your first paycheck. Where does it go?
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
            Meet Alex. About 4 minutes.
          </p>
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "skip-quiz") {
    const allAnswered = SKIP_QUIZ.every((question) => props.skipAnswers[question.id]);
    return (
      <LessonScreen
        action={
          props.skipChecked ? (
            <PrimaryAction onClick={() => props.onGoTo("story")}>Start the refresher</PrimaryAction>
          ) : allAnswered ? (
            <PrimaryAction onClick={props.onCheckSkipQuiz}>Check my answers</PrimaryAction>
          ) : (
            <ActionHint>Answer all 3 questions. Get 3 out of 3 to skip the lesson.</ActionHint>
          )
        }
      >
        <div className="text-center">
          <Eyebrow>Quick check · 3 questions</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {props.skipChecked ? "A quick refresher, then you’re through." : "Already know this?"}
          </h1>
        </div>
        {SKIP_QUIZ.map((question, index) => {
          const answer = props.skipAnswers[question.id] ?? null;
          return (
            <div key={question.id} className="mt-9">
              <p id={`skip-${question.id}`} className="font-bold">
                {index + 1}. {question.prompt(money)}
              </p>
              <ChoiceList
                labelledBy={`skip-${question.id}`}
                options={withLabels(question.options, money)}
                value={answer}
                onSelect={(value) => props.onSkipAnswer(question.id, value)}
              />
              {props.skipChecked && (
                <Feedback correct={answer === question.answer}>{question.reason(money)}</Feedback>
              )}
            </div>
          );
        })}
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
            Alex got paid {money(SALARY)}.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Alex just started their first job. This is Alex’s <strong>income</strong>: money coming
            in.
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
          correct ? (
            <PrimaryAction onClick={props.onContinueExpense}>
              {props.expenseIndex === BUDGET_ITEMS.length - 1 ? "See what is left" : "Next expense"}
            </PrimaryAction>
          ) : (
            <ActionHint>Is it a need or a want?</ActionHint>
          )
        }
      >
        <div className="flex items-center justify-between text-sm font-bold text-muted-foreground">
          <span>Where Alex’s money went</span>
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
          <p className="mt-2 font-display text-2xl font-extrabold text-primary">
            {money(item.amount)}
          </p>
          <p id="expense-question" className="mt-6 font-bold">
            Is this a need or a want for Alex?
          </p>
          <ChoiceList
            labelledBy="expense-question"
            value={props.expenseAnswer}
            onSelect={(value) => props.onExpenseAnswer(value as ExpenseType)}
            options={[
              { value: "need", label: "A need: Alex must pay it" },
              { value: "want", label: "A want: nice, but could change" },
            ]}
          />
          {props.expenseAnswer && (
            <Feedback correct={correct}>
              {item.note}
              {!correct && " Try again."}
            </Feedback>
          )}
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
            <Eyebrow>What’s left</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-extrabold text-balance-tight sm:text-6xl">
              {money(REMAINING)} is left.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Money in − money out = money left.
            </p>
          </div>
          <div className="rounded-4xl border border-border bg-surface p-5 shadow-lift sm:p-7">
            <div className="flex items-center justify-between border-b border-border py-3">
              <span className="font-semibold text-muted-foreground">Money in</span>
              <strong className="font-display text-xl">{money(SALARY)}</strong>
            </div>
            <div className="flex items-center justify-between border-b border-border py-3">
              <span className="font-semibold text-muted-foreground">Money out</span>
              <strong className="font-display text-xl">− {money(TOTAL_SPENT)}</strong>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-brand-lime p-4">
              <span className="font-extrabold">Money left</span>
              <strong className="font-display text-3xl">{money(REMAINING)}</strong>
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
          selected?.correct ? (
            <PrimaryAction onClick={() => props.onGoTo("concept")}>See the big idea</PrimaryAction>
          ) : (
            <ActionHint>Choose the best answer.</ActionHint>
          )
        }
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <CircleDollarSign className="size-8" aria-hidden="true" />
        </span>
        <div className="text-center">
          <Eyebrow>Quick check</Eyebrow>
          <h1
            id="concept-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            What is Alex’s {money(REMAINING)}?
          </h1>
        </div>
        <ChoiceList
          labelledBy="concept-question"
          options={withLabels(CONCEPT_OPTIONS, money)}
          value={props.conceptAnswer}
          onSelect={props.onConceptAnswer}
        />
        {selected && <Feedback correct={selected.correct}>{selected.feedback(money)}</Feedback>}
      </LessonScreen>
    );
  }

  if (props.step === "concept") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("transfer")}>
            Try a new situation
          </PrimaryAction>
        }
      >
        <div className="rounded-4xl border border-primary/20 bg-primary-soft p-7 text-center shadow-soft sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary text-brand-lime">
            <Lightbulb className="size-8" aria-hidden="true" />
          </span>
          <Eyebrow>The big idea</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-balance-tight sm:text-5xl">
            Money you might save
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed">
            Money left is money you <strong>might</strong> save. First, check if any of it is{" "}
            <strong>already promised</strong>, like a bill due next week.
          </p>
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "transfer") {
    const selected = TRANSFER_OPTIONS.find((option) => option.value === props.transferAnswer);
    return (
      <LessonScreen
        action={
          selected?.correct ? (
            <PrimaryAction onClick={() => props.onGoTo("complete")}>Finish lesson</PrimaryAction>
          ) : (
            <ActionHint>Use the big idea: what is already promised?</ActionHint>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft">
          <Smartphone className="size-7 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">Due next week</p>
            <p className="font-display text-lg font-extrabold">Phone bill · {money(SAM.bill)}</p>
          </div>
        </div>
        <div className="text-center">
          <Eyebrow>A new situation</Eyebrow>
          <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-muted-foreground">
            Sam is a student. A summer job paid {money(SAM.earned)}. Sam spent {money(SAM.spent)}.
          </p>
          <h1
            id="transfer-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            How much could Sam set aside?
          </h1>
        </div>
        <ChoiceList
          labelledBy="transfer-question"
          options={withLabels(TRANSFER_OPTIONS, money)}
          value={props.transferAnswer}
          onSelect={props.onTransferAnswer}
        />
        {selected && <Feedback correct={selected.correct}>{selected.feedback(money)}</Feedback>}
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
                // "idle" here means no account saved the lesson: the dashboard would only show the log-in page.
                href={
                  props.progressStatus === "saved"
                    ? "/dashboard/courses/financial-foundation/pay-yourself-first"
                    : "/"
                }
              >
                {props.progressStatus === "saved" ? "Continue to lesson 2" : "Back to home"}
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
          {props.skipped
            ? "3 out of 3. You already know this one."
            : "You found what’s left, then checked what’s promised."}
        </h1>
        <div className="mx-auto mt-7 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
          {[
            ["1", "Money in − money out = money left."],
            ["2", "Check what is already promised."],
            ["3", "What is truly free is what you might save."],
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
        <Accordion type="single" collapsible className="mx-auto mt-7 max-w-2xl text-left">
          <AccordionItem value="might">
            <AccordionTrigger>Want to go further? Why we say “might”</AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-muted-foreground">
                Some money looks free but isn’t. A yearly bill, like phone insurance, can arrive in
                any month. So can a surprise, like a broken phone screen. That is why we say{" "}
                <em>might</em>. Lesson 4 covers your safety net.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <EducationalNote />
      </div>
    </LessonScreen>
  );
}
