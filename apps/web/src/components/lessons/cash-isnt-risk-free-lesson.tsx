import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Check,
  Clock3,
  Coins,
  Gauge,
  Lightbulb,
  ListChecks,
  LoaderCircle,
  RefreshCcw,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { ChoiceButton, ChoiceMarker } from "@/components/shared/choice-button";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";
import {
  BALANCE_OPTIONS,
  CASH_AFTER_YEAR,
  CASH_PURCHASING_GAP,
  CASH_RATE,
  type CashIsntRiskFreeStep,
  INFLATION_OPTIONS,
  INFLATION_RATE,
  INTEREST_OPTIONS,
  LONG_TERM_OPTIONS,
  LONG_TERM_YEARS,
  NEAR_TERM_MONTHS,
  NEAR_TERM_OPTIONS,
  PRICE_AFTER_INFLATION,
  SAVINGS_AFTER_YEAR,
  SAVINGS_PURCHASING_GAP,
  SAVINGS_RATE,
  STARTING_CASH,
} from "@/lib/cash-isnt-risk-free-lesson";
import type { ProgressStatus } from "@/lib/course-progress";
import type { Dictionary } from "@/lib/dictionaries";
import { formatMoney } from "@/lib/first-paycheque-lesson";
import type { Track } from "@/lib/tracks";
import { cn } from "@/lib/utils";

type LessonCopy = Dictionary["lesson7"];

type Props = {
  step: CashIsntRiskFreeStep;
  copy: LessonCopy;
  track: Track;
  inflationAnswer: string | null;
  balanceAnswer: string | null;
  interestAnswer: string | null;
  nearTermAnswer: string | null;
  longTermAnswer: string | null;
  progressStatus: ProgressStatus;
  onInflationAnswer: (answer: string) => void;
  onBalanceAnswer: (answer: string) => void;
  onInterestAnswer: (answer: string) => void;
  onNearTermAnswer: (answer: string) => void;
  onLongTermAnswer: (answer: string) => void;
  onGoTo: (step: CashIsntRiskFreeStep) => void;
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

function CashArt({ copy }: { copy: LessonCopy["welcome"] }) {
  return (
    <div className="relative mx-auto mb-8 h-52 w-full max-w-sm" aria-hidden="true">
      <div className="absolute left-1/2 top-5 h-40 w-64 -translate-x-1/2 rotate-3 rounded-4xl bg-primary-soft" />
      <div className="absolute left-1/2 top-0 flex h-44 w-64 -translate-x-1/2 -rotate-2 items-center justify-between rounded-4xl border border-primary/20 bg-surface p-6 shadow-lift">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-primary font-display text-xl font-extrabold text-primary-foreground">
            A
          </span>
          <p className="mt-5 text-xs font-bold uppercase text-muted-foreground">{copy.cardLabel}</p>
          <p className="mt-1 font-display text-xl font-extrabold">{copy.cardTitle}</p>
        </div>
        <WalletCards className="size-12 text-primary" />
      </div>
      <span className="absolute bottom-0 left-5 grid size-12 animate-float place-items-center rounded-full bg-brand-lime shadow-soft">
        <Coins className="size-6" />
      </span>
      <span className="absolute right-4 top-3 grid size-9 place-items-center rounded-full bg-mint-soft text-market-up shadow-soft">
        <Sparkles className="size-4" />
      </span>
    </div>
  );
}

export function CashIsntRiskFreeLesson(props: Props) {
  const { copy } = props;
  const money = (amount: number) => formatMoney(amount, props.track);
  const values = {
    startingCash: money(STARTING_CASH),
    inflationRate: String(INFLATION_RATE),
    cashRate: String(CASH_RATE),
    savingsRate: String(SAVINGS_RATE),
    futurePrice: money(PRICE_AFTER_INFLATION),
    cashAfterYear: money(CASH_AFTER_YEAR),
    cashGap: money(CASH_PURCHASING_GAP),
    savingsAfterYear: money(SAVINGS_AFTER_YEAR),
    savingsGap: money(SAVINGS_PURCHASING_GAP),
    interestEarned: money(SAVINGS_AFTER_YEAR - STARTING_CASH),
    nearMonths: String(NEAR_TERM_MONTHS),
    longYears: String(LONG_TERM_YEARS),
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
        <CashArt copy={copy.welcome} />
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
    const rows = [
      [copy.snapshot.cash, values.startingCash],
      [copy.snapshot.rate, `${values.cashRate}%`],
      [copy.snapshot.goal, values.startingCash],
      [copy.snapshot.inflation, `${values.inflationRate}%`],
    ];
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("inflation")}>
            {copy.snapshot.action}
          </PrimaryAction>
        }
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <Banknote className="size-8" aria-hidden="true" />
        </span>
        <div className="mt-6 text-center">
          <Eyebrow>{copy.snapshot.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.snapshot.title}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{copy.snapshot.intro}</p>
        </div>
        <div className="mt-7 rounded-3xl border border-border bg-surface p-5 shadow-soft">
          {rows.map(([label, value], index) => (
            <div
              key={label}
              className={cn(
                "flex items-center justify-between gap-4 py-3",
                index < rows.length - 1 && "border-b border-border",
              )}
            >
              <span className="font-semibold text-muted-foreground">{label}</span>
              <strong
                className={cn("text-right font-display text-xl", index === 3 && "text-primary")}
              >
                {value}
              </strong>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
          {copy.snapshot.note}
        </p>
      </LessonScreen>
    );
  }

  if (props.step === "inflation") {
    const selected = INFLATION_OPTIONS.find((option) => option.value === props.inflationAnswer);
    const options = INFLATION_OPTIONS.map((option, index) => ({
      ...option,
      label: fill(copy.inflation.options[index] ?? "", values),
    }));
    return (
      <LessonScreen
        action={
          props.inflationAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("price-example")}>
              {copy.inflation.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.inflation.prompt}
            </p>
          )
        }
      >
        <div className="text-center">
          <Eyebrow>{copy.inflation.eyebrow}</Eyebrow>
          <h1
            id="inflation-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {fill(copy.inflation.title, values)}
          </h1>
        </div>
        <ChoiceList
          labelledBy="inflation-question"
          options={options}
          value={props.inflationAnswer}
          onSelect={props.onInflationAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {selected.correct ? copy.inflation.correct : copy.inflation.incorrect}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "price-example") {
    return (
      <LessonScreen
        wide
        action={
          <PrimaryAction onClick={() => props.onGoTo("balance")}>
            {copy.priceExample.action}
          </PrimaryAction>
        }
      >
        <div className="text-center">
          <Eyebrow>{copy.priceExample.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.priceExample.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {fill(copy.priceExample.intro, values)}
          </p>
        </div>
        <div className="mt-7 grid items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="rounded-3xl border border-border bg-surface p-5 text-center shadow-soft sm:p-6">
            <ShoppingBasket className="mx-auto size-8 text-primary" aria-hidden="true" />
            <p className="mt-4 text-xs font-extrabold uppercase text-muted-foreground">
              {copy.priceExample.today}
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold">{values.startingCash}</p>
            <p className="mt-2 text-sm text-muted-foreground">{copy.priceExample.fullGoal}</p>
          </div>
          <ArrowRight
            className="mx-auto size-6 rotate-90 text-primary sm:rotate-0"
            aria-hidden="true"
          />
          <div className="rounded-3xl border border-primary/25 bg-primary-soft p-5 text-center shadow-soft sm:p-6">
            <ShoppingBasket className="mx-auto size-8 text-primary" aria-hidden="true" />
            <p className="mt-4 text-xs font-extrabold uppercase text-primary">
              {copy.priceExample.later}
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold text-primary">
              {values.futurePrice}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {fill(copy.priceExample.shortfall, values)}
            </p>
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center font-semibold text-primary">
          {copy.priceExample.takeaway}
        </p>
      </LessonScreen>
    );
  }

  if (props.step === "balance") {
    const selected = BALANCE_OPTIONS.find((option) => option.value === props.balanceAnswer);
    const options = BALANCE_OPTIONS.map((option, index) => ({
      ...option,
      label: fill(copy.balance.options[index] ?? "", values),
    }));
    return (
      <LessonScreen
        action={
          props.balanceAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("interest-example")}>
              {copy.balance.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.balance.prompt}
            </p>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-4 rounded-2xl border border-primary/25 bg-primary-soft px-5 py-4 shadow-soft">
          <TrendingDown className="size-7 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">
              {copy.balance.cardLabel}
            </p>
            <p className="font-display text-lg font-extrabold">
              {fill(copy.balance.cardText, values)}
            </p>
          </div>
        </div>
        <div className="text-center">
          <Eyebrow>{copy.balance.eyebrow}</Eyebrow>
          <h1
            id="balance-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {copy.balance.title}
          </h1>
        </div>
        <ChoiceList
          labelledBy="balance-question"
          options={options}
          value={props.balanceAnswer}
          onSelect={props.onBalanceAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {selected.correct ? copy.balance.correct : copy.balance.incorrect}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "interest-example") {
    return (
      <LessonScreen
        wide
        action={
          <PrimaryAction onClick={() => props.onGoTo("interest")}>
            {copy.interestExample.action}
          </PrimaryAction>
        }
      >
        <div className="text-center">
          <Eyebrow>{copy.interestExample.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.interestExample.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {fill(copy.interestExample.intro, values)}
          </p>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <article className="rounded-3xl border border-mint bg-mint-soft p-5 shadow-soft sm:p-6">
            <TrendingUp className="size-8 text-market-up" aria-hidden="true" />
            <p className="mt-4 text-xs font-extrabold uppercase text-muted-foreground">
              {copy.interestExample.accountLabel}
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold">{values.savingsAfterYear}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {fill(copy.interestExample.accountText, values)}
            </p>
          </article>
          <article className="rounded-3xl border border-primary/25 bg-primary-soft p-5 shadow-soft sm:p-6">
            <ShoppingBasket className="size-8 text-primary" aria-hidden="true" />
            <p className="mt-4 text-xs font-extrabold uppercase text-muted-foreground">
              {copy.interestExample.goalLabel}
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold text-primary">
              {values.futurePrice}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {fill(copy.interestExample.goalText, values)}
            </p>
          </article>
        </div>
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-border bg-surface-2 p-4 text-sm leading-relaxed text-muted-foreground">
          <Gauge className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          {copy.interestExample.note}
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "interest") {
    const selected = INTEREST_OPTIONS.find((option) => option.value === props.interestAnswer);
    const options = INTEREST_OPTIONS.map((option, index) => ({
      ...option,
      label: fill(copy.interest.options[index] ?? "", values),
    }));
    return (
      <LessonScreen
        action={
          props.interestAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("near-term")}>
              {copy.interest.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.interest.prompt}
            </p>
          )
        }
      >
        <div className="text-center">
          <Eyebrow>{copy.interest.eyebrow}</Eyebrow>
          <h1
            id="interest-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {copy.interest.title}
          </h1>
        </div>
        <ChoiceList
          labelledBy="interest-question"
          options={options}
          value={props.interestAnswer}
          onSelect={props.onInterestAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {selected.correct ? copy.interest.correct : copy.interest.incorrect}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "near-term") {
    const selected = NEAR_TERM_OPTIONS.find((option) => option.value === props.nearTermAnswer);
    const options = NEAR_TERM_OPTIONS.map((option, index) => ({
      ...option,
      label: copy.nearTerm.options[index] ?? "",
    }));
    return (
      <LessonScreen
        action={
          props.nearTermAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("long-term")}>
              {copy.nearTerm.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.nearTerm.prompt}
            </p>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft">
          <Clock3 className="size-7 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">
              {copy.nearTerm.cardLabel}
            </p>
            <p className="font-display text-lg font-extrabold">
              {fill(copy.nearTerm.cardText, values)}
            </p>
          </div>
        </div>
        <div className="text-center">
          <Eyebrow>{copy.nearTerm.eyebrow}</Eyebrow>
          <h1
            id="near-term-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {copy.nearTerm.title}
          </h1>
        </div>
        <ChoiceList
          labelledBy="near-term-question"
          options={options}
          value={props.nearTermAnswer}
          onSelect={props.onNearTermAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {selected.correct ? copy.nearTerm.correct : copy.nearTerm.incorrect}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "long-term") {
    const selected = LONG_TERM_OPTIONS.find((option) => option.value === props.longTermAnswer);
    const options = LONG_TERM_OPTIONS.map((option, index) => ({
      ...option,
      label: copy.longTerm.options[index] ?? "",
    }));
    return (
      <LessonScreen
        action={
          props.longTermAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("checklist")}>
              {copy.longTerm.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.longTerm.prompt}
            </p>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-4 rounded-2xl border border-primary/25 bg-primary-soft px-5 py-4 shadow-soft">
          <TrendingUp className="size-7 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">
              {copy.longTerm.cardLabel}
            </p>
            <p className="font-display text-lg font-extrabold">
              {fill(copy.longTerm.cardText, values)}
            </p>
          </div>
        </div>
        <div className="text-center">
          <Eyebrow>{copy.longTerm.eyebrow}</Eyebrow>
          <h1
            id="long-term-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {copy.longTerm.title}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{copy.longTerm.intro}</p>
        </div>
        <ChoiceList
          labelledBy="long-term-question"
          options={options}
          value={props.longTermAnswer}
          onSelect={props.onLongTermAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {selected.correct ? copy.longTerm.correct : copy.longTerm.incorrect}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "checklist") {
    return (
      <LessonScreen
        wide
        action={
          <PrimaryAction onClick={() => props.onGoTo("complete")}>
            {copy.checklist.action}
          </PrimaryAction>
        }
      >
        <div className="text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
            <ListChecks className="size-8" aria-hidden="true" />
          </span>
          <Eyebrow>{copy.checklist.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.checklist.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {copy.checklist.intro}
          </p>
        </div>
        <div className="mx-auto mt-7 grid max-w-2xl gap-3 sm:grid-cols-2">
          {copy.checklist.points.map((point, index) => (
            <div
              key={point}
              className="flex gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                {index + 1}
              </span>
              <p className="text-sm font-semibold leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center font-semibold text-primary">
          {copy.checklist.takeaway}
        </p>
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
              <Link href="/dashboard/courses/financial-foundation/savings-vs-investing">
                {copy.complete.next} <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="xl">
              <Link href="/dashboard/courses/financial-foundation#lesson-7">
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
        <div className="mx-auto mt-7 grid max-w-3xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="mx-auto mt-5 flex max-w-xl items-start gap-3 rounded-2xl bg-surface-2 p-4 text-left text-xs leading-relaxed text-muted-foreground">
          <ShieldCheck className="size-5 shrink-0 text-primary" aria-hidden="true" />
          {copy.complete.note}
        </div>
      </div>
    </LessonScreen>
  );
}
