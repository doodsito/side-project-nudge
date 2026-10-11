import { Check, Circle } from "lucide-react";
import { PASSWORD_RULES, passwordStrength } from "@/lib/auth-rules";
import { cn } from "@/lib/utils";

const LEVELS = [
  { label: "Weak", bar: "bg-market-down" },
  { label: "Good", bar: "bg-primary" },
  { label: "Strong", bar: "bg-market-up" },
] as const;

/** Under a new password: the rules, ticked as they are met, and a strength meter. */
export function PasswordStrength({ id, password }: { id: string; password: string }) {
  const strength = passwordStrength(password);
  const level = strength > 0 ? LEVELS[strength - 1] : undefined;
  return (
    <div id={id} className="mt-3 space-y-3">
      <div className="flex items-center gap-3">
        <div className="grid flex-1 grid-cols-3 gap-1.5" aria-hidden>
          {LEVELS.map((step, index) => (
            <span
              key={step.label}
              className={cn(
                "h-1.5 rounded-full bg-muted transition-colors",
                level && index < strength && level.bar,
              )}
            />
          ))}
        </div>
        <p className="w-28 text-right text-xs font-bold text-muted-foreground">
          {level ? `Strength: ${level.label}` : "Strength"}
        </p>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {PASSWORD_RULES.map((rule) => {
          const met = rule.test(password);
          return (
            <li
              key={rule.label}
              className={cn(
                "flex items-center gap-1.5",
                met ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {met ? (
                <Check className="size-3.5 shrink-0 text-market-up" aria-hidden />
              ) : (
                <Circle className="size-3.5 shrink-0" aria-hidden />
              )}
              {rule.label}
              <span className="sr-only">{met ? "(done)" : "(missing)"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
