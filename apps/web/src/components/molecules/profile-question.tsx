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
        <h2 className="font-display text-xl font-extrabold sm:text-2xl">{question.title}</h2>
      </div>
      <div className="mt-5 grid gap-3 lg:grid-cols-3" role="radiogroup" aria-label={question.title}>
        {question.options.map((o) => {
          const active = value === o.value;
          return (
            <ChoiceButton
              key={o.value}
              selected={active}
              onClick={() => onSelect(o.value)}
              className="min-h-20 px-4 py-3"
            >
              <ChoiceMarker selected={active} className="size-6">
                {active && <Check className="size-3.5" />}
              </ChoiceMarker>
              <span>
                <strong className="block text-sm">{o.title}</strong>
                <span className="mt-1 block text-xs font-normal leading-relaxed text-muted-foreground">
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
