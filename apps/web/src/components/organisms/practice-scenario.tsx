import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChoiceButton, ChoiceMarker } from "@/components/atoms/choice-button";
import { EducationalNote } from "@/components/atoms/educational-note";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { DECISIONS, PRACTICE_CASE, type Decision } from "@/lib/practice-case";

export function PracticeScenario({
  decision,
  onSelect,
  onEditProfile,
  onContinue,
}: {
  decision: Decision | null;
  onSelect: (d: Decision) => void;
  onEditProfile: (() => void) | undefined;
  onContinue: () => void;
}) {
  return (
    <div className="animate-rise">
      {onEditProfile && (
        <Button variant="ghost" onClick={onEditProfile} className="mb-5 -ml-3 min-h-11">
          <ArrowLeft aria-hidden="true" /> Edit reflection
        </Button>
      )}
      <div className="mx-auto max-w-3xl">
        <section className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-8">
          <Eyebrow>Fictional practice case</Eyebrow>
          <h1
            id="practice-question"
            className="mt-3 scroll-mt-32 font-display text-2xl font-extrabold sm:text-4xl"
          >
            {PRACTICE_CASE.title}
          </h1>
          <p className="mt-3 text-muted-foreground">{PRACTICE_CASE.context}</p>
          <dl className="mt-5 grid grid-cols-2 gap-2">
            {PRACTICE_CASE.facts.map((fact, index) => (
              <div
                key={fact.label}
                className={`rounded-xl bg-surface-2 p-3 ${index === 2 ? "col-span-2" : ""}`}
              >
                <dt className="text-xs font-semibold text-muted-foreground">{fact.label}</dt>
                <dd className="mt-1 font-display text-lg font-extrabold">{fact.value}</dd>
              </div>
            ))}
          </dl>
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
            See what each choice changes <ArrowRight aria-hidden="true" />
          </Button>
          <EducationalNote />
        </section>
      </div>
    </div>
  );
}
