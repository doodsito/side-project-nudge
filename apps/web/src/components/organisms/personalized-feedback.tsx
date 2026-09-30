import { useMemo } from "react";
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
        <Eyebrow>Your personalised explanation</Eyebrow>
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
        <Button size="xl" onClick={onContinue} className="mt-6 w-full sm:w-auto">
          See my reasoning summary <ArrowRight />
        </Button>
        <EducationalNote />
      </section>
    </div>
  );
}
