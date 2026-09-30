import { Check } from "lucide-react";
import { ChoiceButton, ChoiceMarker } from "@/components/atoms/choice-button";
import type { Question } from "@/lib/practice-scenario";
import { cn } from "@/lib/utils";

export function ProfileQuestion({
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
        <h2
          tabIndex={-1}
          className="scroll-mt-32 font-display text-xl font-extrabold focus:outline-none sm:text-2xl"
        >
          {question.title}
        </h2>
      </div>
      <p id={`help-${question.key}`} className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {question.help}
      </p>
      <div
        className="mt-5 grid gap-3"
        role="radiogroup"
        aria-label={question.title}
        aria-describedby={`help-${question.key}`}
      >
        {question.options.map((o) => {
          const active = value === o.value;
          return (
            <ChoiceButton
              key={o.value}
              selected={active}
              tabIndex={active || (!value && question.options[0] === o) ? 0 : -1}
              onClick={() => onSelect(o.value)}
              className="min-h-20 px-4 py-3"
            >
              <ChoiceMarker selected={active} className="size-6">
                {active && <Check className="size-3.5" />}
              </ChoiceMarker>
              <span>
                <strong className="block text-base">{o.title}</strong>
                <span className="mt-1 block text-sm font-normal leading-relaxed text-muted-foreground">
                  {o.detail}
                </span>
              </span>
            </ChoiceButton>
          );
        })}
      </div>
    </section>
  );
}
