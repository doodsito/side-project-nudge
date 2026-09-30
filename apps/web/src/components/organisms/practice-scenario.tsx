import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChoiceButton, ChoiceMarker } from "@/components/atoms/choice-button";
import { EducationalNote } from "@/components/atoms/educational-note";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { VirtualPortfolio } from "@/components/molecules/virtual-portfolio";
import { DECISIONS, PRACTICE_CASE, type Decision } from "@/lib/practice-case";

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
      <Button variant="ghost" onClick={onBack} className="mb-5 -ml-3 min-h-11">
        <ArrowLeft /> Edit learning profile
      </Button>
      <div className="grid items-start gap-6 lg:grid-cols-[.85fr_1.15fr]">
        <section className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-8 lg:col-start-2 lg:row-start-1">
          <Eyebrow>Fictional practice case</Eyebrow>
          <p className="mt-3 text-sm font-semibold text-foreground">
            Markets have just fallen 10%.
          </p>
          <h1
            id="practice-question"
            className="mt-2 scroll-mt-32 font-display text-2xl font-extrabold sm:text-4xl"
          >
            {PRACTICE_CASE.title}
          </h1>
          <p className="mt-3 text-muted-foreground">{PRACTICE_CASE.context}</p>
          <div className="mt-6 grid gap-3" role="radiogroup" aria-labelledby="practice-question">
            {DECISIONS.map((o, i) => (
              <ChoiceButton
                key={o.value}
                selected={decision === o.value}
                tabIndex={decision === o.value || (!decision && i === 0) ? 0 : -1}
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
                  <span className="mt-1 block text-sm font-normal text-muted-foreground">
                    {o.detail}
                  </span>
                </span>
              </ChoiceButton>
            ))}
          </div>
          <Button
            size="xl"
            disabled={!decision}
            onClick={onContinue}
            className="mt-6 w-full h-auto min-h-13 whitespace-normal py-3"
          >
            Understand my decision <ArrowRight />
          </Button>
          <EducationalNote />
        </section>
        <details className="group rounded-3xl border border-border bg-surface p-4 lg:col-start-1 lg:row-start-1">
          <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 font-semibold text-primary focus-visible:ring-2 focus-visible:ring-ring">
            View the illustrative portfolio
            <ChevronDown
              aria-hidden="true"
              className="size-5 shrink-0 transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="my-3 text-sm leading-relaxed text-muted-foreground">
            Background illustration only. The six-month chart does not show the 10% fall in this
            case.
          </p>
          <VirtualPortfolio />
        </details>
      </div>
    </div>
  );
}
