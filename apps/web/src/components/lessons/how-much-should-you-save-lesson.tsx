import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Check,
  Gauge,
  Lightbulb,
  LoaderCircle,
  PiggyBank,
  RefreshCcw,
  Scale,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { ChoiceButton, ChoiceMarker } from "@/components/shared/choice-button";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";
import type { ProgressStatus } from "@/lib/course-progress";
import type { Dictionary } from "@/lib/dictionaries";
import { formatMoney } from "@/lib/first-paycheque-lesson";
import {
  AMOUNT_OPTIONS,
  EXAMPLE_MARGIN,
  EXAMPLE_TRANSFER,
  LOWER_MONTH_CAPACITY,
  LOWER_MONTH_MARGIN,
  MONTHLY_CAPACITY,
  PERCENTAGE_REFERENCES,
  PLANNED_SPENDING,
  REFERENCE_OPTIONS,
  STRESS_OPTIONS,
  TAKE_HOME_PAY,
  type HowMuchShouldYouSaveStep,
} from "@/lib/how-much-should-you-save-lesson";
import type { Track } from "@/lib/tracks";
import { cn } from "@/lib/utils";

type LessonCopy = Dictionary["lesson3"];

type Props = {
  step: HowMuchShouldYouSaveStep;
  copy: LessonCopy;
  track: Track;
  referenceAnswer: string | null;
  amountAnswer: string | null;
  stressAnswer: string | null;
  progressStatus: ProgressStatus;
  onReferenceAnswer: (answer: string) => void;
  onAmountAnswer: (answer: string) => void;
  onStressAnswer: (answer: string) => void;
  onGoTo: (step: HowMuchShouldYouSaveStep) => void;
  onRestart: () => void;
  onRetryProgress: () => void;
};

function fill(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce(
    (result, [name, value]) => result.replaceAll(`{${name}}`, value),
    template,
  );
}

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
  copy: LessonCopy["feedback"];
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
        <p className="font-display font-extrabold">{correct ? copy.correct : copy.retry}</p>
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

function PercentageArt({ copy }: { copy: LessonCopy["welcome"] }) {
  return (
    <div className="relative mx-auto mb-8 h-52 w-full max-w-sm" aria-hidden="true">
      <div className="absolute left-1/2 top-4 h-40 w-64 -translate-x-1/2 rotate-3 rounded-4xl bg-primary-soft" />
      <div className="absolute left-1/2 top-0 flex h-44 w-64 -translate-x-1/2 -rotate-2 items-center justify-between rounded-4xl border border-primary/20 bg-surface p-6 shadow-lift">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-primary font-display text-xl font-extrabold text-primary-foreground">
            A
          </span>
          <p className="mt-5 text-xs font-bold uppercase text-muted-foreground">{copy.cardLabel}</p>
          <p className="mt-1 font-display text-2xl font-extrabold">{copy.cardTitle}</p>
        </div>
        <Gauge className="size-12 text-primary" />
      </div>
      <span className="absolute bottom-0 left-6 grid size-12 animate-float place-items-center rounded-full bg-brand-lime font-display text-lg font-extrabold shadow-soft">
        %
      </span>
      <span className="absolute right-4 top-3 grid size-9 place-items-center rounded-full bg-mint-soft text-market-up shadow-soft">
        <Sparkles className="size-4" />
      </span>
    </div>
  );
}

export function HowMuchShouldYouSaveLesson(props: Props) {
  const { copy } = props;
  const money = (amount: number) => formatMoney(amount, props.track);
  const sharedValues = {
    capacity: money(MONTHLY_CAPACITY),
    saving: money(EXAMPLE_TRANSFER),
    margin: money(EXAMPLE_MARGIN),
    twenty: money(PERCENTAGE_REFERENCES[2]!.amount),
    ten: money(PERCENTAGE_REFERENCES[1]!.amount),
  };

  if (props.step === "welcome") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("snapshot")}>
            {copy.welcome.action}
          </PrimaryAction>
        }
      >
        <PercentageArt copy={copy.welcome} />
        <div className="text-center">
          <Eyebrow>{copy.welcome.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.welcome.title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
            {copy.welcome.intro}
          </p>
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "snapshot") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("reference")}>
            {copy.snapshot.action}
          </PrimaryAction>
        }
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <WalletCards className="size-8" aria-hidden="true" />
        </span>
        <div className="text-center">
          <Eyebrow>{copy.snapshot.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.snapshot.title}
          </h1>
        </div>
        <div className="mt-7 rounded-3xl border border-border bg-surface p-5 shadow-soft">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <span className="font-semibold text-muted-foreground">{copy.snapshot.income}</span>
            <strong className="font-display text-xl">{money(TAKE_HOME_PAY)}</strong>
          </div>
          <div className="flex items-center justify-between border-b border-border py-4">
            <span className="font-semibold text-muted-foreground">{copy.snapshot.spending}</span>
            <strong className="font-display text-xl">− {money(PLANNED_SPENDING)}</strong>
          </div>
          <div className="flex items-center justify-between gap-4 pt-4">
            <span className="font-extrabold">{copy.snapshot.capacity}</span>
            <strong className="font-display text-3xl text-primary">
              {money(MONTHLY_CAPACITY)}
            </strong>
          </div>
        </div>
        <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
          {copy.snapshot.note}
        </p>
      </LessonScreen>
    );
  }

  if (props.step === "reference") {
    const selected = REFERENCE_OPTIONS.find((option) => option.value === props.referenceAnswer);
    const options = REFERENCE_OPTIONS.map((option, index) => ({
      ...option,
      label: copy.reference.options[index] ?? "",
    }));
    return (
      <LessonScreen
        action={
          props.referenceAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("comparison")}>
              {copy.reference.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.reference.prompt}
            </p>
          )
        }
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <Calculator className="size-8" aria-hidden="true" />
        </span>
        <div className="text-center">
          <Eyebrow>{copy.reference.eyebrow}</Eyebrow>
          <h1
            id="reference-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {copy.reference.title}
          </h1>
        </div>
        <ChoiceList
          labelledBy="reference-question"
          options={options}
          value={props.referenceAnswer}
          onSelect={props.onReferenceAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {selected.correct ? copy.reference.correct : copy.reference.incorrect}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "comparison") {
    return (
      <LessonScreen
        wide
        action={
          <PrimaryAction onClick={() => props.onGoTo("concept")}>
            {copy.comparison.action}
          </PrimaryAction>
        }
      >
        <div className="text-center">
          <Eyebrow>{copy.comparison.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.comparison.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {fill(copy.comparison.intro, { income: money(TAKE_HOME_PAY) })}
          </p>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {PERCENTAGE_REFERENCES.map((reference) => {
            const fits = reference.amount <= MONTHLY_CAPACITY;
            return (
              <div
                key={reference.percentage}
                className={cn(
                  "rounded-3xl border p-5 text-center shadow-soft",
                  fits ? "border-mint bg-mint-soft" : "border-border bg-surface",
                )}
              >
                <p className="font-display text-3xl font-extrabold text-primary">
                  {reference.percentage} %
                </p>
                <p className="mt-2 font-display text-xl font-extrabold">
                  {money(reference.amount)}
                </p>
                <p className="mt-3 text-xs font-bold uppercase text-muted-foreground">
                  {fill(fits ? copy.comparison.within : copy.comparison.above, {
                    capacity: money(MONTHLY_CAPACITY),
                  })}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center font-semibold text-primary">
          {copy.comparison.takeaway}
        </p>
      </LessonScreen>
    );
  }

  if (props.step === "concept") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("amount")}>
            {copy.concept.action}
          </PrimaryAction>
        }
      >
        <div className="rounded-4xl border border-primary/20 bg-primary-soft p-7 text-center shadow-soft sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary text-brand-lime">
            <Scale className="size-8" aria-hidden="true" />
          </span>
          <Eyebrow>{copy.concept.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.concept.title}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed">{copy.concept.body}</p>
          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-surface p-4 text-left shadow-soft">
            <p className="font-bold">{copy.concept.cardTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {copy.concept.cardBody}
            </p>
          </div>
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "amount") {
    const selected = AMOUNT_OPTIONS.find((option) => option.value === props.amountAnswer);
    const options = AMOUNT_OPTIONS.map((option, index) => ({
      ...option,
      label: fill(copy.amount.options[index] ?? "", sharedValues),
    }));
    return (
      <LessonScreen
        action={
          props.amountAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("stress")}>
              {copy.amount.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.amount.prompt}
            </p>
          )
        }
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <PiggyBank className="size-8" aria-hidden="true" />
        </span>
        <div className="text-center">
          <Eyebrow>{fill(copy.amount.eyebrow, sharedValues)}</Eyebrow>
          <h1
            id="amount-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {copy.amount.title}
          </h1>
        </div>
        <ChoiceList
          labelledBy="amount-question"
          options={options}
          value={props.amountAnswer}
          onSelect={props.onAmountAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {fill(selected.correct ? copy.amount.correct : copy.amount.incorrect, sharedValues)}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "stress") {
    const stressValues = {
      saving: money(EXAMPLE_TRANSFER),
      capacity: money(LOWER_MONTH_CAPACITY),
      margin: money(LOWER_MONTH_MARGIN),
      ten: money(PERCENTAGE_REFERENCES[1]!.amount),
    };
    const selected = STRESS_OPTIONS.find((option) => option.value === props.stressAnswer);
    const options = STRESS_OPTIONS.map((option, index) => ({
      ...option,
      label: fill(copy.stress.options[index] ?? "", stressValues),
    }));
    return (
      <LessonScreen
        action={
          props.stressAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("complete")}>
              {copy.stress.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.stress.prompt}
            </p>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft">
          <Gauge className="size-7 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">
              {copy.stress.cardLabel}
            </p>
            <p className="font-display text-lg font-extrabold">
              {fill(copy.stress.cardText, stressValues)}
            </p>
          </div>
        </div>
        <div className="text-center">
          <Eyebrow>{copy.stress.eyebrow}</Eyebrow>
          <h1
            id="stress-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {fill(copy.stress.title, stressValues)}
          </h1>
        </div>
        <ChoiceList
          labelledBy="stress-question"
          options={options}
          value={props.stressAnswer}
          onSelect={props.onStressAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {selected.correct ? copy.stress.correct : copy.stress.incorrect}
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
            <RefreshCcw aria-hidden="true" /> {copy.complete.replay}
          </Button>
          {props.progressStatus === "saving" ? (
            <Button size="xl" disabled>
              <LoaderCircle className="animate-spin" aria-hidden="true" /> {copy.complete.saving}
            </Button>
          ) : props.progressStatus === "error" ? (
            <Button size="xl" onClick={props.onRetryProgress}>
              {copy.complete.retry} <ArrowRight aria-hidden="true" />
            </Button>
          ) : props.progressStatus === "saved" ? (
            <Button asChild size="xl">
              <Link href="/dashboard/courses/financial-foundation/build-your-safety-net">
                {copy.complete.next} <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="xl">
              <Link href="/dashboard/courses/financial-foundation#lesson-3">
                {copy.complete.back} <ArrowRight aria-hidden="true" />
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
        <Eyebrow>{copy.complete.eyebrow}</Eyebrow>
        <h1 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
          {copy.complete.title}
        </h1>
        <div className="mx-auto mt-7 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
          {copy.complete.points.map((point, index) => (
            <div
              key={point}
              className="rounded-2xl border border-border bg-surface p-4 shadow-soft"
            >
              <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                {index + 1}
              </span>
              <p className="mt-3 text-sm font-semibold leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-7 max-w-xl font-display text-xl font-extrabold text-primary sm:text-2xl">
          {copy.complete.takeaway}
        </p>
        <p className="mx-auto mt-5 max-w-xl text-xs leading-relaxed text-muted-foreground">
          {copy.complete.note}
        </p>
      </div>
    </LessonScreen>
  );
}
