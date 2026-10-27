import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Check,
  Clock3,
  Lightbulb,
  ListChecks,
  LoaderCircle,
  PiggyBank,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Truck,
} from "lucide-react";
import { ChoiceButton, ChoiceMarker } from "@/components/shared/choice-button";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Button } from "@/components/ui/button";
import type { ProgressStatus } from "@/lib/course-progress";
import type { Dictionary } from "@/lib/dictionaries";
import { formatMoney } from "@/lib/first-paycheque-lesson";
import {
  ALREADY_SAVED,
  CHANGE_OPTIONS,
  EARLIER_MONTHLY_AMOUNT,
  EARLIER_MONTHLY_SHORTFALL,
  EARLIER_MONTHS_UNTIL_NEEDED,
  MONTHLY_OTHER_PRIORITIES,
  MONTHLY_PLANNED_AMOUNT,
  MONTHLY_SAVING,
  MONTHS_UNTIL_NEEDED,
  PLANNED_COST,
  PLANNED_GAP,
  ROLE_OPTIONS,
  STABILITY_OPTIONS,
  type MoneyYoullNeedSoonStep,
} from "@/lib/money-youll-need-soon-lesson";
import type { Track } from "@/lib/tracks";
import { cn } from "@/lib/utils";

type LessonCopy = Dictionary["lesson5"];

type Props = {
  step: MoneyYoullNeedSoonStep;
  copy: LessonCopy;
  track: Track;
  roleAnswer: string | null;
  stabilityAnswer: string | null;
  changeAnswer: string | null;
  progressStatus: ProgressStatus;
  onRoleAnswer: (answer: string) => void;
  onStabilityAnswer: (answer: string) => void;
  onChangeAnswer: (answer: string) => void;
  onGoTo: (step: MoneyYoullNeedSoonStep) => void;
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

function CalendarArt({ copy }: { copy: LessonCopy["welcome"] }) {
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
        <CalendarClock className="size-12 text-primary" />
      </div>
      <span className="absolute bottom-0 left-6 grid size-12 animate-float place-items-center rounded-full bg-brand-lime shadow-soft">
        <Clock3 className="size-6" />
      </span>
      <span className="absolute right-4 top-3 grid size-9 place-items-center rounded-full bg-mint-soft text-market-up shadow-soft">
        <Sparkles className="size-4" />
      </span>
    </div>
  );
}

export function MoneyYoullNeedSoonLesson(props: Props) {
  const { copy } = props;
  const money = (amount: number) => formatMoney(amount, props.track);
  const values = {
    cost: money(PLANNED_COST),
    saved: money(ALREADY_SAVED),
    gap: money(PLANNED_GAP),
    capacity: money(MONTHLY_SAVING),
    contribution: money(MONTHLY_PLANNED_AMOUNT),
    other: money(MONTHLY_OTHER_PRIORITIES),
    earlierContribution: money(EARLIER_MONTHLY_AMOUNT),
    shortfall: money(EARLIER_MONTHLY_SHORTFALL),
    months: String(MONTHS_UNTIL_NEEDED),
    earlierMonths: String(EARLIER_MONTHS_UNTIL_NEEDED),
  };

  if (props.step === "welcome") {
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("roles")}>{copy.welcome.action}</PrimaryAction>
        }
      >
        <CalendarArt copy={copy.welcome} />
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

  if (props.step === "roles") {
    const icons = [
      <ShieldCheck key="safety" className="size-6" aria-hidden="true" />,
      <CalendarClock key="planned" className="size-6" aria-hidden="true" />,
      <TrendingUp key="long" className="size-6" aria-hidden="true" />,
    ];
    return (
      <LessonScreen
        wide
        action={
          <PrimaryAction onClick={() => props.onGoTo("snapshot")}>
            {copy.roles.action}
          </PrimaryAction>
        }
      >
        <div className="text-center">
          <Eyebrow>{copy.roles.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.roles.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{copy.roles.intro}</p>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {copy.roles.cards.map((card, index) => (
            <div
              key={card.title}
              className="rounded-3xl border border-border bg-surface p-5 shadow-soft"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                {icons[index]}
              </span>
              <h2 className="mt-4 font-display text-lg font-extrabold">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center font-semibold text-primary">
          {copy.roles.takeaway}
        </p>
      </LessonScreen>
    );
  }

  if (props.step === "snapshot") {
    const rows = [
      [copy.snapshot.cost, values.cost],
      [copy.snapshot.saved, values.saved],
      [copy.snapshot.deadline, fill(copy.snapshot.deadlineValue, values)],
      [copy.snapshot.capacity, values.capacity],
    ];
    return (
      <LessonScreen
        action={
          <PrimaryAction onClick={() => props.onGoTo("classify")}>
            {copy.snapshot.action}
          </PrimaryAction>
        }
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <Truck className="size-8" aria-hidden="true" />
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

  if (props.step === "classify") {
    const selected = ROLE_OPTIONS.find((option) => option.value === props.roleAnswer);
    const options = ROLE_OPTIONS.map((option, index) => ({
      ...option,
      label: copy.classify.options[index] ?? "",
    }));
    return (
      <LessonScreen
        action={
          props.roleAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("timeline")}>
              {copy.classify.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.classify.prompt}
            </p>
          )
        }
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <ListChecks className="size-8" aria-hidden="true" />
        </span>
        <div className="text-center">
          <Eyebrow>{copy.classify.eyebrow}</Eyebrow>
          <h1
            id="classify-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {copy.classify.title}
          </h1>
        </div>
        <ChoiceList
          labelledBy="classify-question"
          options={options}
          value={props.roleAnswer}
          onSelect={props.onRoleAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {selected.correct ? copy.classify.correct : copy.classify.incorrect}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "timeline") {
    return (
      <LessonScreen
        wide
        action={
          <PrimaryAction onClick={() => props.onGoTo("stability")}>
            {copy.timeline.action}
          </PrimaryAction>
        }
      >
        <div className="text-center">
          <Eyebrow>{copy.timeline.eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl">
            {copy.timeline.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {copy.timeline.intro}
          </p>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {[
            [copy.timeline.gapLabel, values.gap, fill(copy.timeline.gapText, values)],
            [
              copy.timeline.monthlyLabel,
              values.contribution,
              fill(copy.timeline.monthlyText, values),
            ],
            [copy.timeline.otherLabel, values.other, copy.timeline.otherText],
          ].map(([label, amount, body], index) => (
            <div
              key={label}
              className={cn(
                "rounded-3xl border p-5 shadow-soft",
                index === 1 ? "border-primary/25 bg-primary-soft" : "border-border bg-surface",
              )}
            >
              <p className="text-xs font-extrabold uppercase text-primary">{label}</p>
              <p className="mt-3 font-display text-3xl font-extrabold">{amount}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center font-semibold text-primary">
          {copy.timeline.takeaway}
        </p>
      </LessonScreen>
    );
  }

  if (props.step === "stability") {
    const selected = STABILITY_OPTIONS.find((option) => option.value === props.stabilityAnswer);
    const options = STABILITY_OPTIONS.map((option, index) => ({
      ...option,
      label: copy.stability.options[index] ?? "",
    }));
    return (
      <LessonScreen
        action={
          props.stabilityAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("change")}>
              {copy.stability.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.stability.prompt}
            </p>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft">
          <PiggyBank className="size-7 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">
              {copy.stability.cardLabel}
            </p>
            <p className="font-display text-lg font-extrabold">
              {fill(copy.stability.cardText, values)}
            </p>
          </div>
        </div>
        <div className="text-center">
          <Eyebrow>{copy.stability.eyebrow}</Eyebrow>
          <h1
            id="stability-question"
            className="mt-3 font-display text-3xl font-extrabold text-balance-tight sm:text-5xl"
          >
            {copy.stability.title}
          </h1>
        </div>
        <ChoiceList
          labelledBy="stability-question"
          options={options}
          value={props.stabilityAnswer}
          onSelect={props.onStabilityAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {selected.correct ? copy.stability.correct : copy.stability.incorrect}
          </Feedback>
        )}
      </LessonScreen>
    );
  }

  if (props.step === "change") {
    const selected = CHANGE_OPTIONS.find((option) => option.value === props.changeAnswer);
    const options = CHANGE_OPTIONS.map((option, index) => ({
      ...option,
      label: fill(copy.change.options[index] ?? "", values),
    }));
    return (
      <LessonScreen
        action={
          props.changeAnswer ? (
            <PrimaryAction onClick={() => props.onGoTo("complete")}>
              {copy.change.action}
            </PrimaryAction>
          ) : (
            <p className="py-3 text-center text-sm font-semibold text-muted-foreground sm:text-left">
              {copy.change.prompt}
            </p>
          )
        }
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-4 rounded-2xl border border-primary/25 bg-primary-soft px-5 py-4 shadow-soft">
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
        </div>
        <ChoiceList
          labelledBy="change-question"
          options={options}
          value={props.changeAnswer}
          onSelect={props.onChangeAnswer}
        />
        {selected && (
          <Feedback correct={selected.correct} copy={copy.feedback}>
            {fill(selected.correct ? copy.change.correct : copy.change.incorrect, values)}
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
              <Link href="/dashboard/courses/financial-foundation/debt-vs-investing">
                {copy.complete.next} <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="xl">
              <Link href="/dashboard/courses/financial-foundation#lesson-5">
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
