import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChoiceButton, ChoiceMarker } from "@/components/atoms/choice-button";
import { EducationalNote } from "@/components/atoms/educational-note";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { VirtualPortfolio } from "@/components/molecules/virtual-portfolio";
import { DECISIONS, type Decision } from "@/lib/practice-scenario";

export function PracticeScenario({
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
          <Eyebrow>Investing scenario</Eyebrow>
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
              <ChoiceButton
                key={o.value}
                selected={decision === o.value}
                onClick={() => onSelect(o.value)}
                className="min-h-20 p-4"
              >
                <ChoiceMarker selected={decision === o.value} className="size-8 text-xs font-bold">
                  {decision === o.value ? (
                    <Check className="size-4" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </ChoiceMarker>
                <span>
                  <strong className="block">{o.title}</strong>
                  <span className="mt-1 block text-xs font-normal text-muted-foreground">
                    {o.detail}
                  </span>
                </span>
              </ChoiceButton>
            ))}
          </div>
          <Button
            disabled={!decision}
            onClick={onContinue}
            className="mt-6 h-13 w-full rounded-xl text-base font-bold"
          >
            Understand my decision <ArrowRight />
          </Button>
          <EducationalNote />
        </section>
      </div>
    </div>
  );
}
