import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EducationalNote } from "@/components/atoms/educational-note";
import { Eyebrow } from "@/components/atoms/eyebrow";
import {
  DECISIONS,
  FACTORS,
  makeFeedback,
  type Decision,
  type Profile,
} from "@/lib/practice-scenario";

export function PersonalizedFeedback({
  profile,
  decision,
  onBack,
  onContinue,
}: {
  profile: Required<Profile> | null;
  decision: Decision;
  onBack: () => void;
  onContinue: () => void;
}) {
  const result = profile ? makeFeedback(profile, decision) : null;
  const selected = DECISIONS.find((x) => x.value === decision);
  const keys = ["horizon", "savings", "reaction", "style"] as const;
  const names = ["Time horizon", "Safety buffer", "Reaction to volatility", "Investing routine"];
  return (
    <div className="animate-rise">
      <Button variant="ghost" onClick={onBack} className="mb-5 -ml-3">
        <ArrowLeft /> Change my decision
      </Button>
      <section className="rounded-3xl border border-border bg-surface p-6 shadow-lift sm:p-9">
        <Eyebrow>What this choice changes</Eyebrow>
        <p className="mt-4 text-sm text-muted-foreground">
          You chose <strong className="text-foreground">{selected?.title}</strong>
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold sm:text-5xl">
          {result?.title ?? "A choice between cash and investing."}
        </h1>
        <div className="mt-7 rounded-2xl border border-primary/25 bg-primary-soft p-5 sm:p-6">
          <p className="flex items-center gap-2 font-display text-lg font-extrabold">
            <Sparkles className="size-5 text-primary" aria-hidden="true" />{" "}
            {profile ? "How your answers shape the explanation" : "The question behind the choice"}
          </p>
          <p className="mt-3 text-muted-foreground">
            {result?.body ??
              "Alex has €200 in accessible emergency savings. Before focusing on the 10% market fall, consider when Alex might need this money and what cash is available for a surprise expense."}
          </p>
          <p className="mt-3 font-bold">
            {result?.close ??
              "This is Alex's fictional choice. The case cannot tell you what amount to save or invest."}
          </p>
        </div>
        <div className="mt-6 rounded-2xl border border-border p-5">
          <h2 className="font-display text-xl font-bold">What changes for Alex</h2>
          <p className="mt-3">{selected?.consequence}</p>
          <p className="mt-3 text-muted-foreground">{selected?.tradeoff}</p>
          <details className="mt-4">
            <summary className="min-h-11 cursor-pointer py-3 font-bold text-primary focus-visible:ring-2 focus-visible:ring-ring">
              Compare the other choices
            </summary>
            <ul className="mt-3 space-y-4">
              {DECISIONS.filter((option) => option.value !== decision).map((option) => (
                <li key={option.value} className="rounded-xl bg-surface-2 p-4">
                  <h3 className="font-bold">{option.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{option.consequence}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {option.tradeoff}
                  </p>
                </li>
              ))}
            </ul>
          </details>
        </div>
        {profile && (
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
                  <p className="text-xs font-bold uppercase text-muted-foreground">{names[i]}</p>
                  <p className="mt-2 text-sm font-extrabold text-primary">{factor[0]}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{factor[1]}</p>
                </div>
              );
            })}
          </div>
        )}
        <p className="mt-6 text-sm font-semibold">
          The same market event can mean different things depending on the investor.
        </p>
        <Button
          size="xl"
          onClick={onContinue}
          className="mt-6 w-full h-auto min-h-13 whitespace-normal py-3 sm:w-auto"
        >
          Check what I learned <ArrowRight />
        </Button>
        <EducationalNote />
      </section>
    </div>
  );
}
