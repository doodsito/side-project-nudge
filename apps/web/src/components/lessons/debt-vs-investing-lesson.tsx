import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Calculator,
  Check,
  CircleDollarSign,
  Clock3,
  Lightbulb,
  ListChecks,
  LoaderCircle,
  Percent,
  RefreshCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { ChoiceButton, ChoiceMarker } from "@/components/shared/choice-button";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";
import type { ProgressStatus } from "@/lib/course-progress";
import {
  ANNUAL_RATE,
  CHANGE_OPTIONS,
  DEBT_BALANCE,
  DECISION_OPTIONS,
  EXTRA_MONTHLY,
  FULL_YEAR_COST_EXAMPLE,
  INVESTMENT_YEARS,
  LOWER_RATE,
  LOWER_RATE_MONTHS,
  RATE_OPTIONS,
  type DebtVsInvestingStep,
} from "@/lib/debt-vs-investing-lesson";
import type { Dictionary } from "@/lib/dictionaries";
import { formatMoney } from "@/lib/first-paycheque-lesson";
import type { Track } from "@/lib/tracks";
import { cn } from "@/lib/utils";

type LessonCopy = Dictionary["lesson6"];

type Props = {
  step: DebtVsInvestingStep;
  copy: LessonCopy;
  track: Track;
  rateAnswer: string | null;
  decisionAnswer: string | null;
  changeAnswer: string | null;
  progressStatus: ProgressStatus;
  onRateAnswer: (answer: string) => void;
  onDecisionAnswer: (answer: string) => void;
  onChangeAnswer: (answer: string) => void;
  onGoTo: (step: DebtVsInvestingStep) => void;
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

function BalanceArt({ copy }: { copy: LessonCopy["welcome"] }) {
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
        <Scale className="size-12 text-primary" />
      </div>
      <span className="absolute bottom-0 left-5 grid size-12 animate-float place-items-center rounded-full bg-brand-lime shadow-soft">
        <BadgePercent className="size-6" />
      </span>
      <span className="absolute right-4 top-3 grid size-9 place-items-center rounded-full bg-mint-soft text-market-up shadow-soft">
        <Sparkles className="size-4" />
      </span>
    </div>
  );
}

export function DebtVsInvestingLesson(props: Props) {
  const { copy } = props;
  const money = (amount: number) => formatMoney(amount, props.track);
  const values = {
    extra: money(EXTRA_MONTHLY),
    debt: money(DEBT_BALANCE),
    rate: String(ANNUAL_RATE),
    years: String(INVESTMENT_YEARS),
    annualCost: money(FULL_YEAR_COST_EXAMPLE),
    lowerRate: String(LOWER_RATE),
    lowerMonths: String(LOWER_RATE_MONTHS),
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
        <BalanceArt copy={copy.welcome} />
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
      [copy.snapshot.extra, values.extra],
      [copy.snapshot.debt, values.debt],
      [copy.snapshot.rate, fill(copy.snapshot.rateValue, values)],
      [copy.snapshot.horizon, fill(copy.snapshot.horizonValue, values)],
    ];
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("rate")}>{copy.snapshot.action}</PrimaryAction>
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
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">{copy.snapshot.intro}</p>
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
                className={cn("text-right font-display text-xl", index === 2 && "text-primary")}
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

  if (props.step === "rate") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("interpret")}>
            {copy.rate.action}
          </PrimaryAction>
        }
      >
        <div className="mx-auto w-full max-w-sm rounded-3xl border border-border bg-surface p-5 shadow-lift">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <p className="text-xs font-extrabold uppercase text-muted-foreground">
                {copy.rate.contractLabel}
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold">
                {fill(copy.rate.contractValue, values)}
              </p>
            </div>
            <Percent className="size-9 text-primary" aria-hidden="true" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {copy.rate.contractHint}
          </p>
        </div>
        <div className="mt-7 text-center">
          <Eyebrow>{copy.rate.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.rate.title}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
            {copy.rate.intro}
          </p>
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "interpret") {
    const selected = RATE_OPTIONS.find((option) => option.value === props.rateAnswer);
    const options = RATE_OPTIONS.map((option, index) => ({
      ...option,
      label: copy.interpret.options[index] ?? "",
    }));
    return (
      <LessonScreen
        action={
          props.rateAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("example")}>
              {copy.interpret.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.interpret.prompt}
            </p>
          )
        }
      >
        <div className="text-center">
          <Eyebrow>{copy.interpret.eyebrow}</Eyebrow>
          <h1
            id="rate-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {fill(copy.interpret.title, values)}
          </h1>
        </div>
        <ChoiceList
          labelledBy="rate-question"
          options={options}
          value={props.rateAnswer}
          onSelect={props.onRateAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {selected.correct ? copy.interpret.correct : copy.interpret.incorrect}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "example") {
    const balances = [600, 500, 400, 300, 200, 100];
    return (
      <LessonScreen
        wide
        action={
          <PrimaryAction onClick={() => props.onGoTo("compare")}>
            {copy.example.action}
          </PrimaryAction>
        }
      >
        <div className="text-center">
          <Eyebrow>{copy.example.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.example.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {fill(copy.example.intro, values)}
          </p>
        </div>
        <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-3xl border border-primary/25 bg-primary-soft p-5 shadow-soft sm:p-6">
            <p className="text-xs font-extrabold uppercase text-primary">
              {copy.example.formulaLabel}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 font-display text-2xl font-extrabold sm:text-3xl">
              <span>{values.debt}</span>
              <span aria-hidden="true">×</span>
              <span>{values.rate}%</span>
              <span aria-hidden="true">=</span>
              <span className="text-primary">{values.annualCost}</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {fill(copy.example.formulaText, values)}
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-6">
            <p className="text-xs font-extrabold uppercase text-primary">
              {copy.example.balanceLabel}
            </p>
            <div className="mt-4 grid gap-2" aria-hidden="true">
              {balances.map((balance) => (
                <div key={balance} className="flex items-center gap-3">
                  <span className="w-14 text-right text-xs font-bold text-muted-foreground">
                    {money(balance)}
                  </span>
                  <span className="h-3 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <span
                      className="block h-full rounded-full bg-primary"
                      style={{ width: `${(balance / DEBT_BALANCE) * 100}%` }}
                    />
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {copy.example.balanceText}
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-surface-2 p-4 text-sm leading-relaxed text-muted-foreground">
          <Calculator className="mr-2 inline size-4 text-primary" aria-hidden="true" />
          {copy.example.note}
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "compare") {
    const cards = [
      {
        icon: <CircleDollarSign className="size-7" aria-hidden="true" />,
        label: copy.compare.debtLabel,
        title: copy.compare.debtTitle,
        points: copy.compare.debtPoints,
      },
      {
        icon: <TrendingUp className="size-7" aria-hidden="true" />,
        label: copy.compare.investLabel,
        title: copy.compare.investTitle,
        points: copy.compare.investPoints,
      },
    ];
    return (
      <LessonScreen
        wide
        action={
          <PrimaryAction onClick={() => props.onGoTo("decision")}>
            {copy.compare.action}
          </PrimaryAction>
        }
      >
        <div className="text-center">
          <Eyebrow>{copy.compare.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.compare.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {copy.compare.intro}
          </p>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {cards.map((card, index) => (
            <article
              key={card.label}
              className={cn(
                "rounded-3xl border p-5 shadow-soft sm:p-6",
                index === 0 ? "border-primary/25 bg-primary-soft" : "border-border bg-surface",
              )}
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-surface text-primary shadow-soft">
                {card.icon}
              </span>
              <p className="mt-5 text-xs font-extrabold uppercase text-primary">{card.label}</p>
              <h2 className="mt-2 font-display text-xl font-extrabold">{card.title}</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-muted-foreground">
                {card.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center font-semibold text-primary">
          {copy.compare.takeaway}
        </p>
      </LessonScreen>
    );
  }

  if (props.step === "decision") {
    const selected = DECISION_OPTIONS.find((option) => option.value === props.decisionAnswer);
    const options = DECISION_OPTIONS.map((option, index) => ({
      ...option,
      label: fill(copy.decision.options[index] ?? "", values),
    }));
    return (
      <LessonScreen
        action={
          props.decisionAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("change")}>
              {copy.decision.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.decision.prompt}
            </p>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-4 rounded-2xl border border-primary/25 bg-primary-soft px-5 py-4 shadow-soft">
          <Scale className="size-7 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">
              {copy.decision.cardLabel}
            </p>
            <p className="font-display text-lg font-extrabold">
              {fill(copy.decision.cardText, values)}
            </p>
          </div>
        </div>
        <div className="text-center">
          <Eyebrow>{copy.decision.eyebrow}</Eyebrow>
          <h1
            id="decision-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {copy.decision.title}
          </h1>
        </div>
        <ChoiceList
          labelledBy="decision-question"
          options={options}
          value={props.decisionAnswer}
          onSelect={props.onDecisionAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {fill(selected.correct ? copy.decision.correct : copy.decision.incorrect, values)}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "change") {
    const selected = CHANGE_OPTIONS.find((option) => option.value === props.changeAnswer);
    const options = CHANGE_OPTIONS.map((option, index) => ({
      ...option,
      label: copy.change.options[index] ?? "",
    }));
    return (
      <LessonScreen
        action={
          props.changeAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("checklist")}>
              {copy.change.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.change.prompt}
            </p>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft">
          <Clock3 className="size-7 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">
              {copy.change.cardLabel}
            </p>
            <p className="font-display text-lg font-extrabold">
              {fill(copy.change.cardText, values)}
            </p>
          </div>
        </div>
        <div className="text-center">
          <Eyebrow>{copy.change.eyebrow}</Eyebrow>
          <h1
            id="change-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {copy.change.title}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{copy.change.intro}</p>
        </div>
        <ChoiceList
          labelledBy="change-question"
          options={options}
          value={props.changeAnswer}
          onSelect={props.onChangeAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {selected.correct ? copy.change.correct : copy.change.incorrect}
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
              <Link href="/dashboard/courses/financial-foundation/cash-isnt-risk-free">
                {copy.complete.next} <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="xl">
              <Link href="/dashboard/courses/financial-foundation#lesson-6">
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
        <div className="mx-auto mt-5 flex max-w-xl items-start gap-3 rounded-2xl bg-surface-2 p-4 text-left text-xs leading-relaxed text-muted-foreground">
          <ShieldCheck className="size-5 shrink-0 text-primary" aria-hidden="true" />
          {copy.complete.note}
        </div>
      </div>
    </LessonScreen>
  );
}
