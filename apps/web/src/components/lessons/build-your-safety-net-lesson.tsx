import Link from "next/link";
import {
  ArrowRight,
  Check,
  Gauge,
  LifeBuoy,
  Lightbulb,
  ListChecks,
  LoaderCircle,
  RefreshCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Wrench,
} from "lucide-react";
import { ChoiceButton, ChoiceMarker } from "@/components/shared/choice-button";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";
import {
  BUFFER_AFTER_USE,
  CURRENT_BUFFER,
  DECISION_OPTIONS,
  DISRUPTION_COST,
  ESSENTIAL_MONTHLY_COSTS,
  FACTOR_OPTIONS,
  MONTHLY_SAVING,
  REBUILD_CONTRIBUTION,
  REBUILD_MARGIN,
  REBUILD_OPTIONS,
  TAKE_HOME_PAY,
  TIGHTER_MONTH_CAPACITY,
  type BuildYourSafetyNetStep,
} from "@/lib/build-your-safety-net-lesson";
import type { ProgressStatus } from "@/lib/course-progress";
import type { Dictionary } from "@/lib/dictionaries";
import { formatMoney } from "@/lib/first-paycheque-lesson";
import type { Track } from "@/lib/tracks";
import { cn } from "@/lib/utils";

type LessonCopy = Dictionary["lesson4"];

type Props = {
  step: BuildYourSafetyNetStep;
  copy: LessonCopy;
  track: Track;
  factorAnswer: string | null;
  decisionAnswer: string | null;
  rebuildAnswer: string | null;
  progressStatus: ProgressStatus;
  onFactorAnswer: (answer: string) => void;
  onDecisionAnswer: (answer: string) => void;
  onRebuildAnswer: (answer: string) => void;
  onGoTo: (step: BuildYourSafetyNetStep) => void;
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

function SafetyNetArt({ copy }: { copy: LessonCopy["welcome"] }) {
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
        <ShieldCheck className="size-12 text-primary" />
      </div>
      <span className="absolute bottom-0 left-6 grid size-12 animate-float place-items-center rounded-full bg-brand-lime shadow-soft">
        <LifeBuoy className="size-6" />
      </span>
      <span className="absolute right-4 top-3 grid size-9 place-items-center rounded-full bg-mint-soft text-market-up shadow-soft">
        <Sparkles className="size-4" />
      </span>
    </div>
  );
}

export function BuildYourSafetyNetLesson(props: Props) {
  const { copy } = props;
  const money = (amount: number) => formatMoney(amount, props.track);
  const values = {
    income: money(TAKE_HOME_PAY),
    essentials: money(ESSENTIAL_MONTHLY_COSTS),
    saving: money(MONTHLY_SAVING),
    buffer: money(CURRENT_BUFFER),
    disruption: money(DISRUPTION_COST),
    remaining: money(BUFFER_AFTER_USE),
    capacity: money(TIGHTER_MONTH_CAPACITY),
    rebuild: money(REBUILD_CONTRIBUTION),
    margin: money(REBUILD_MARGIN),
  };

  if (props.step === "welcome") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("purpose")}>
            {copy.welcome.action}
          </PrimaryAction>
        }
      >
        <SafetyNetArt copy={copy.welcome} />
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

  if (props.step === "purpose") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("snapshot")}>
            {copy.purpose.action}
          </PrimaryAction>
        }
      >
        <div className="rounded-4xl border border-primary/20 bg-primary-soft p-7 text-center shadow-soft sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary text-brand-lime">
            <LifeBuoy className="size-8" aria-hidden="true" />
          </span>
          <Eyebrow>{copy.purpose.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.purpose.title}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed">{copy.purpose.body}</p>
          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-surface p-4 text-left shadow-soft">
            <p className="font-bold">{copy.purpose.cardTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {copy.purpose.cardBody}
            </p>
          </div>
        </div>
      </LessonScreen>
    );
  }

  if (props.step === "snapshot") {
    const rows = [
      [copy.snapshot.income, money(TAKE_HOME_PAY)],
      [copy.snapshot.essentials, money(ESSENTIAL_MONTHLY_COSTS)],
      [copy.snapshot.buffer, money(CURRENT_BUFFER)],
      [copy.snapshot.monthlySaving, money(MONTHLY_SAVING)],
    ];
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("factors")}>
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
          {rows.map(([label, amount], index) => (
            <div
              key={label}
              className={cn(
                "flex items-center justify-between gap-4 py-3",
                index < rows.length - 1 && "border-b border-border",
              )}
            >
              <span className="font-semibold text-muted-foreground">{label}</span>
              <strong className={cn("font-display text-xl", index === 2 && "text-primary")}>
                {amount}
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

  if (props.step === "factors") {
    const selected = FACTOR_OPTIONS.find((option) => option.value === props.factorAnswer);
    const options = FACTOR_OPTIONS.map((option, index) => ({
      ...option,
      label: copy.factors.options[index] ?? "",
    }));
    return (
      <LessonScreen
        action={
          props.factorAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("comparison")}>
              {copy.factors.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.factors.prompt}
            </p>
          )
        }
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <ListChecks className="size-8" aria-hidden="true" />
        </span>
        <div className="text-center">
          <Eyebrow>{copy.factors.eyebrow}</Eyebrow>
          <h1
            id="factors-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {copy.factors.title}
          </h1>
        </div>
        <ChoiceList
          labelledBy="factors-question"
          options={options}
          value={props.factorAnswer}
          onSelect={props.onFactorAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {selected.correct ? copy.factors.correct : copy.factors.incorrect}
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
          <PrimaryAction onClick={() => props.onGoTo("decision")}>
            {copy.comparison.action}
          </PrimaryAction>
        }
      >
        <div className="text-center">
          <Eyebrow>{copy.comparison.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.comparison.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {fill(copy.comparison.intro, values)}
          </p>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {[
            {
              label: copy.comparison.steadyLabel,
              title: copy.comparison.steadyTitle,
              points: copy.comparison.steadyPoints,
              icon: <Gauge className="size-6" aria-hidden="true" />,
            },
            {
              label: copy.comparison.changedLabel,
              title: copy.comparison.changedTitle,
              points: copy.comparison.changedPoints,
              icon: <Scale className="size-6" aria-hidden="true" />,
            },
          ].map((card, index) => (
            <div
              key={card.label}
              className={cn(
                "rounded-3xl border p-5 shadow-soft",
                index === 0 ? "border-border bg-surface" : "border-primary/25 bg-primary-soft",
              )}
            >
              <div className="flex items-center gap-3 text-primary">
                {card.icon}
                <p className="text-xs font-extrabold uppercase">{card.label}</p>
              </div>
              <h2 className="mt-4 font-display text-xl font-extrabold">{card.title}</h2>
              <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
                {card.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center font-semibold text-primary">
          {copy.comparison.takeaway}
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
            <PrimaryAction onClick={() => props.onGoTo("rebuild")}>
              {copy.decision.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.decision.prompt}
            </p>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft">
          <ShieldCheck className="size-7 text-primary" aria-hidden="true" />
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

  if (props.step === "rebuild") {
    const selected = REBUILD_OPTIONS.find((option) => option.value === props.rebuildAnswer);
    const options = REBUILD_OPTIONS.map((option, index) => ({
      ...option,
      label: fill(copy.rebuild.options[index] ?? "", values),
    }));
    return (
      <LessonScreen
        action={
          props.rebuildAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("complete")}>
              {copy.rebuild.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.rebuild.prompt}
            </p>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft">
          <Wrench className="size-7 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">
              {copy.rebuild.cardLabel}
            </p>
            <p className="font-display text-lg font-extrabold">
              {fill(copy.rebuild.cardText, values)}
            </p>
          </div>
        </div>
        <div className="text-center">
          <Eyebrow>{copy.rebuild.eyebrow}</Eyebrow>
          <h1
            id="rebuild-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {copy.rebuild.title}
          </h1>
        </div>
        <ChoiceList
          labelledBy="rebuild-question"
          options={options}
          value={props.rebuildAnswer}
          onSelect={props.onRebuildAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {fill(selected.correct ? copy.rebuild.correct : copy.rebuild.incorrect, values)}
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
              <Link href="/dashboard/courses/financial-foundation/money-youll-need-soon">
                {copy.complete.next} <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="xl">
              <Link href="/dashboard/courses/financial-foundation#lesson-4">
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
