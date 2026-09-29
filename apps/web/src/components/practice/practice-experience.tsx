"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Info, Pencil, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedNumber, PortfolioChart } from "@/components/landing/animated-product";
import { NudgeLogo } from "@/components/nudge-logo";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Horizon = "short" | "medium" | "long";
type Savings = "limited" | "some" | "strong";
type Reaction = "low" | "medium" | "high";
type Style = "regular" | "occasional" | "none";
type Decision = "planned" | "wait" | "more";
type Profile = { horizon?: Horizon; savings?: Savings; reaction?: Reaction; style?: Style };
type Step = "profile" | "scenario" | "feedback" | "summary";
type Option = { value: string; title: string; detail: string };
type Question = { key: keyof Profile; number: string; title: string; options: Option[] };
const QUESTIONS: Question[] = [
  {
    key: "horizon",
    number: "01",
    title: "When might you need this money?",
    options: [
      { value: "short", title: "Under 3 years", detail: "I may need this money soon" },
      { value: "medium", title: "3–10 years", detail: "I have time, but not indefinitely" },
      { value: "long", title: "More than 10 years", detail: "This is long-term capital" },
    ],
  },
  {
    key: "savings",
    number: "02",
    title: "How much emergency savings do you have?",
    options: [
      { value: "limited", title: "Less than 1 month", detail: "My safety buffer is limited" },
      { value: "some", title: "1–3 months", detail: "I have some room for surprises" },
      { value: "strong", title: "More than 3 months", detail: "My short-term needs are covered" },
    ],
  },
  {
    key: "reaction",
    number: "03",
    title: "How would a temporary 20% fall feel?",
    options: [
      { value: "low", title: "I’d lose sleep", detail: "A 20% fall would feel intolerable" },
      {
        value: "medium",
        title: "Uncomfortable, but manageable",
        detail: "I could wait if the plan still made sense",
      },
      { value: "high", title: "Part of the journey", detail: "I accept large temporary swings" },
    ],
  },
  {
    key: "style",
    number: "04",
    title: "How do you plan to invest?",
    options: [
      {
        value: "regular",
        title: "A fixed monthly amount",
        detail: "I prefer a regular investing routine",
      },
      {
        value: "occasional",
        title: "Occasional contributions",
        detail: "I invest when money is available",
      },
      {
        value: "none",
        title: "I don’t have a plan yet",
        detail: "I’m still working out my approach",
      },
    ],
  },
];
const DECISIONS = [
  {
    value: "planned",
    title: "Invest the €500 as planned",
    detail: "Continue the contribution you had already scheduled",
  },
  {
    value: "wait",
    title: "Wait until markets feel calmer",
    detail: "Keep the contribution in cash for now",
  },
  {
    value: "more",
    title: "Invest more because prices are lower",
    detail: "Increase this month’s contribution above €500",
  },
] as const;
const FACTORS = {
  horizon: {
    short: ["SHORTER", "You may need the money sooner, so a recovery has less time to unfold."],
    medium: ["MEDIUM", "You have some time, but your future need for the money still matters."],
    long: ["LONG", "A longer horizon gives temporary market falls more time to recover."],
  },
  savings: {
    limited: [
      "LIMITED",
      "A limited emergency buffer can make liquidity more important than market timing.",
    ],
    some: [
      "MODERATE",
      "You have some room for surprises, but an unexpected expense could affect the plan.",
    ],
    strong: ["STRONG", "Your short-term savings are less dependent on this contribution."],
  },
  reaction: {
    low: ["LOWER TOLERANCE", "Large temporary losses may be difficult to stay invested through."],
    medium: [
      "MODERATE",
      "Volatility feels uncomfortable, but may be tolerable when the plan still fits.",
    ],
    high: [
      "HIGHER TOLERANCE",
      "You described large temporary swings as part of a long-term journey.",
    ],
  },
  style: {
    regular: ["REGULAR", "You prefer a repeatable schedule rather than reacting to headlines."],
    occasional: ["FLEXIBLE", "Your contributions depend on when money is available."],
    none: ["UNDEFINED", "Building a contribution rule may matter before changing one."],
  },
} as const;

export function PracticeExperience() {
  const [step, setStep] = useState<Step>("profile");
  const [profile, setProfile] = useState<Profile>({});
  const [decision, setDecision] = useState<Decision | null>(null);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [step]);
  const answered = Object.keys(profile).length;
  function reset() {
    setProfile({});
    setDecision(null);
    setStep("profile");
  }
  return (
    <div className="min-h-screen bg-background">
      <PracticeHeader step={step} />
      <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        {step === "profile" && (
          <LearningProfile
            profile={profile}
            answered={answered}
            onSelect={(k, v) => setProfile((p) => ({ ...p, [k]: v }))}
            onContinue={() => setStep("scenario")}
          />
        )}{" "}
        {step === "scenario" && (
          <PracticeScenario
            decision={decision}
            onSelect={setDecision}
            onBack={() => setStep("profile")}
            onContinue={() => {
              if (decision) {
                track("demo_decision_confirmed", { decision });
                setStep("feedback");
              }
            }}
          />
        )}{" "}
        {step === "feedback" && decision && (
          <PersonalizedFeedback
            profile={profile as Required<Profile>}
            decision={decision}
            onBack={() => setStep("scenario")}
            onContinue={() => {
              track("demo_completed", { decision });
              setStep("summary");
            }}
          />
        )}{" "}
        {step === "summary" && (
          <LearningSummary
            profile={profile as Required<Profile>}
            onReset={reset}
            onEdit={() => setStep("profile")}
          />
        )}
      </main>
      <footer className="border-t border-border px-5 py-7">
        <p className="mx-auto max-w-5xl text-xs leading-relaxed text-muted-foreground">
          This is an educational simulation using virtual money. It is not a suitability assessment,
          financial advice or a recommendation. Investing involves risk, including the possible loss
          of capital.
        </p>
      </footer>
    </div>
  );
}
function PracticeHeader({ step }: { step: Step }) {
  const index = ["profile", "scenario", "feedback", "summary"].indexOf(step) + 1;
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 sm:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <NudgeLogo small />
          <span className="hidden rounded-full bg-mint-soft px-2 py-1 text-[9px] font-bold uppercase text-market-up sm:inline">
            Educational simulation
          </span>
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Return{" "}
          <span className="hidden sm:inline">to Nudge home</span>
        </Link>
      </div>
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-[width] duration-700"
          style={{ width: `${index * 25}%` }}
        />
      </div>
    </header>
  );
}
function Label({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-extrabold uppercase text-primary">{children}</p>;
}
function Note() {
  return (
    <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
      <Info className="mt-0.5 size-3.5 shrink-0" />
      Educational simulation only. Not investment advice.
    </p>
  );
}
function LearningProfile({
  profile,
  answered,
  onSelect,
  onContinue,
}: {
  profile: Profile;
  answered: number;
  onSelect: (k: keyof Profile, v: string) => void;
  onContinue: () => void;
}) {
  return (
    <div className="animate-rise">
      <Label>Your learning profile</Label>
      <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold sm:text-5xl">
        The same decision does not fit everyone.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Four details help Nudge explain what a market decision could mean for you. You can change
        them at any time.
      </p>
      <div className="mt-8 rounded-2xl border border-border bg-surface p-4">
        <div className="flex justify-between text-sm font-bold">
          <span>Learning profile</span>
          <span className="text-primary">{answered} / 4 answered</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${answered * 25}%` }}
          />
        </div>
      </div>
      <div className="mt-8 space-y-5">
        {QUESTIONS.map((q) => (
          <ProfileQuestion
            key={q.key}
            question={q}
            value={profile[q.key]}
            onSelect={(v) => onSelect(q.key, v)}
            attention={!profile[q.key] && QUESTIONS.find((x) => !profile[x.key])?.key === q.key}
          />
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        This is not a suitability assessment. It only personalises the educational explanation in
        this demo.
      </p>
      <Button
        disabled={answered < 4}
        onClick={onContinue}
        className={cn(
          "mt-5 h-13 w-full rounded-xl px-6 text-base font-bold sm:w-auto",
          answered === 4 && "animate-ready",
        )}
      >
        Build my learning profile <ArrowRight />
      </Button>
    </div>
  );
}
function ProfileQuestion({
  question,
  value,
  onSelect,
  attention,
}: {
  question: Question;
  value: string | undefined;
  onSelect: (v: string) => void;
  attention: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border bg-surface p-5 transition-all sm:p-6",
        attention ? "border-primary/35 shadow-soft" : "border-border",
      )}
    >
      <div className="flex gap-4">
        <span className="text-xs font-extrabold text-primary">{question.number}</span>
        <h2 className="font-display text-xl font-extrabold sm:text-2xl">{question.title}</h2>
      </div>
      <div className="mt-5 grid gap-3 lg:grid-cols-3" role="radiogroup" aria-label={question.title}>
        {question.options.map((o) => {
          const active = value === o.value;
          return (
            <Button
              key={o.value}
              variant="outline"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(o.value)}
              className={cn(
                "h-auto min-h-20 justify-start whitespace-normal rounded-xl px-4 py-3 text-left",
                active && "border-primary bg-primary-soft",
              )}
            >
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full border",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border-strong",
                )}
              >
                {active && <Check className="size-3.5" />}
              </span>
              <span>
                <strong className="block text-sm">{o.title}</strong>
                <span className="mt-1 block text-xs font-normal leading-relaxed text-muted-foreground">
                  {o.detail}
                </span>
              </span>
            </Button>
          );
        })}
      </div>
    </section>
  );
}
function VirtualPortfolio() {
  return (
    <section className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-7">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase text-muted-foreground">Virtual portfolio</p>
          <p className="mt-1 font-display text-4xl font-extrabold">
            <AnimatedNumber />
          </p>
        </div>
        <p className="text-right text-sm font-bold text-market-up">
          +6.4%
          <span className="block text-xs font-normal text-muted-foreground">
            six illustrative months
          </span>
        </p>
      </div>
      <div className="mt-5">
        <PortfolioChart compact />
      </div>
      <div className="mt-5 rounded-xl bg-primary-soft p-4">
        <p className="text-xs text-muted-foreground">Your planned monthly investment</p>
        <p className="mt-1 font-display text-xl font-extrabold">€500</p>
      </div>
    </section>
  );
}
function PracticeScenario({
  decision,
  onSelect,
  onBack,
  onContinue,
}: {
  decision: Decision | null;
  onSelect: (d: Decision) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="animate-rise">
      <Button variant="ghost" onClick={onBack} className="mb-5 -ml-3">
        <ArrowLeft /> Edit learning profile
      </Button>
      <div className="grid items-start gap-6 lg:grid-cols-[.85fr_1.15fr]">
        <VirtualPortfolio />
        <section className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-8">
          <Label>Investing scenario</Label>
          <p className="mt-3 text-sm font-semibold text-market-down">
            Markets have just fallen 10%.
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            You planned to invest €500 this month. What would you do?
          </h1>
          <p className="mt-3 text-muted-foreground">
            There is no universally correct answer. Choose the action you would be most likely to
            take.
          </p>
          <div className="mt-6 grid gap-3" role="radiogroup">
            {DECISIONS.map((o, i) => (
              <Button
                key={o.value}
                variant="outline"
                role="radio"
                aria-checked={decision === o.value}
                onClick={() => onSelect(o.value)}
                className={cn(
                  "h-auto min-h-20 justify-start whitespace-normal rounded-xl p-4 text-left",
                  decision === o.value && "border-primary bg-primary-soft",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border text-xs font-bold",
                    decision === o.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border-strong",
                  )}
                >
                  {decision === o.value ? (
                    <Check className="size-4" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span>
                  <strong className="block">{o.title}</strong>
                  <span className="mt-1 block text-xs font-normal text-muted-foreground">
                    {o.detail}
                  </span>
                </span>
              </Button>
            ))}
          </div>
          <Button
            disabled={!decision}
            onClick={onContinue}
            className="mt-6 h-13 w-full rounded-xl text-base font-bold"
          >
            Understand my decision <ArrowRight />
          </Button>
          <Note />
        </section>
      </div>
    </div>
  );
}
function makeFeedback(p: Required<Profile>, d: Decision) {
  const cautious = p.horizon === "short" || p.savings === "limited" || p.reaction === "low";
  if (cautious)
    return {
      title:
        "Before thinking about market timing, your situation suggests there may be more important questions to review.",
      body: `A ${p.horizon === "short" ? "shorter time horizon" : "more sensitive response to losses"}${p.savings === "limited" ? " and limited emergency buffer" : ""} can make access to cash and the size of potential losses more important than whether prices look cheaper this week.`,
      close:
        d === "more"
          ? "Increasing the contribution could also increase a risk you already said may be hard to carry."
          : "Pausing to review those constraints is different from trying to predict the market.",
    };
  if (d === "planned")
    return {
      title: "Your decision is consistent with the plan you described.",
      body: "Your horizon is long, your short-term savings buffer is stronger and you told us you prefer a regular investing routine.",
      close:
        "The market changed this week. The assumptions behind your plan did not necessarily change.",
    };
  if (d === "more")
    return {
      title: "Lower prices may fit your situation, but they are not enough on their own.",
      body: "Your profile suggests more capacity to tolerate a decline, yet increasing the contribution still changes the amount of risk you planned to take.",
      close:
        "A price fall can be relevant. Your overall allocation, cash needs and original contribution rule still matter.",
    };
  return {
    title: "Waiting may feel safer, but calm markets are not guaranteed to arrive on schedule.",
    body: "Your profile suggests you have time, a stronger savings buffer and capacity to tolerate volatility. Waiting changes the regular plan you described.",
    close:
      "The useful question is whether your circumstances changed — not whether this week felt uncomfortable.",
  };
}
function PersonalizedFeedback({
  profile,
  decision,
  onBack,
  onContinue,
}: {
  profile: Required<Profile>;
  decision: Decision;
  onBack: () => void;
  onContinue: () => void;
}) {
  const result = useMemo(() => makeFeedback(profile, decision), [profile, decision]);
  const selected = DECISIONS.find((x) => x.value === decision);
  const keys = ["horizon", "savings", "reaction", "style"] as const;
  const names = ["Time horizon", "Safety buffer", "Reaction to volatility", "Investing routine"];
  return (
    <div className="animate-rise">
      <Button variant="ghost" onClick={onBack} className="mb-5 -ml-3">
        <ArrowLeft /> Change my decision
      </Button>
      <section className="rounded-3xl border border-border bg-surface p-6 shadow-lift sm:p-9">
        <Label>Your personalised explanation</Label>
        <p className="mt-4 text-sm text-muted-foreground">
          You chose <strong className="text-foreground">{selected?.title}</strong>
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold sm:text-5xl">
          {result.title}
        </h1>
        <div className="mt-7 rounded-2xl border border-primary/25 bg-primary-soft p-5 sm:p-6">
          <p className="flex items-center gap-2 font-display text-lg font-extrabold">
            <Sparkles className="size-5 text-primary" /> Why Nudge says that
          </p>
          <p className="mt-3 text-muted-foreground">{result.body}</p>
          <p className="mt-3 font-bold">{result.close}</p>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {keys.map((key, i) => {
            const factor = (FACTORS[key] as Record<string, readonly [string, string]>)[
              profile[key]
            ]!;
            return (
              <div
                key={key}
                className="feedback-factor rounded-2xl border border-border bg-surface-2 p-4"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <p className="text-[10px] font-bold uppercase text-muted-foreground">{names[i]}</p>
                <p className="mt-2 text-sm font-extrabold text-primary">{factor[0]}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{factor[1]}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-sm font-semibold">
          The same market event can mean different things depending on the investor.
        </p>
        <Button
          onClick={onContinue}
          className="mt-6 h-13 w-full rounded-xl text-base font-bold sm:w-auto"
        >
          See my reasoning summary <ArrowRight />
        </Button>
        <Note />
      </section>
    </div>
  );
}
function LearningSummary({
  profile,
  onReset,
  onEdit,
}: {
  profile: Required<Profile>;
  onReset: () => void;
  onEdit: () => void;
}) {
  const labels = [
    FACTORS.horizon[profile.horizon][0],
    FACTORS.savings[profile.savings][0],
    FACTORS.reaction[profile.reaction][0],
    FACTORS.style[profile.style][0],
  ];
  return (
    <div className="animate-rise">
      <section className="rounded-3xl border border-border bg-surface p-6 text-center shadow-lift sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary text-brand-lime">
          <Check className="size-7" />
        </span>
        <div className="mt-5">
          <Label>Decision complete</Label>
        </div>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-extrabold sm:text-5xl">
          You just practised a decision before it cost you anything.
        </h1>
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-surface-2 p-5 text-left">
          <p className="text-xs font-bold uppercase text-primary">What you considered</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {["Timeline", "Safety buffer", "Risk reaction", "Investing routine"].map((n, i) => (
              <div
                key={n}
                className="flex items-center justify-between rounded-xl bg-surface px-4 py-3"
              >
                <span className="text-sm font-semibold">{n}</span>
                <span className="text-xs font-extrabold text-primary">{labels[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl font-display text-2xl font-extrabold">
          Nudge does not tell you what to buy.
          <br />
          <span className="text-primary">It teaches you what to think about before deciding.</span>
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="h-13 rounded-xl px-6 text-base font-bold">
            <Link href="/#early-access">
              Join Nudge early access <ArrowRight />
            </Link>
          </Button>
          <Button variant="outline" onClick={onReset} className="h-13 rounded-xl px-6">
            <RotateCcw /> Try the scenario again
          </Button>
          <Button variant="ghost" onClick={onEdit} className="h-13">
            <Pencil /> Edit learning profile
          </Button>
        </div>
        <Note />
      </section>
    </div>
  );
}
