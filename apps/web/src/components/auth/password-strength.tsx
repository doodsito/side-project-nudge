import { Check, Circle } from "lucide-react";
import { PASSWORD_RULES, passwordStrength } from "@/lib/auth-rules";
import type { Dictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

const BARS = ["bg-market-down", "bg-primary", "bg-market-up"] as const;

/** Under a new password: the rules, ticked as they are met, and a strength meter. */
export function PasswordStrength({
  id,
  password,
  t,
}: {
  id: string;
  password: string;
  t: Dictionary["auth"]["form"];
}) {
  const strength = passwordStrength(password);
  const level = strength > 0 ? t.levels[strength - 1] : undefined;
  return (
    <div id={id} className="mt-3 space-y-3">
      <div className="flex items-center gap-3">
        <div className="grid flex-1 grid-cols-3 gap-1.5" aria-hidden>
          {BARS.map((bar, index) => (
            <span
              key={bar}
              className={cn(
                "h-1.5 rounded-full bg-muted transition-colors",
                index < strength && BARS[strength - 1],
              )}
            />
          ))}
        </div>
        <p className="w-36 text-right text-xs font-bold text-muted-foreground">
          {level ?? t.strength}
        </p>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {PASSWORD_RULES.map((rule) => {
          const met = rule.test(password);
          return (
            <li
              key={rule.id}
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
              {t.rules[rule.id]}
              <span className="sr-only">{met ? t.ruleDone : t.ruleMissing}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
