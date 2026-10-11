import { ArrowDownRight, Wallet } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";

export function HeroProductWindow({ t }: { t: Dictionary["heroWindow"] }) {
  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-border-strong bg-surface shadow-device">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface-2 px-5 py-4">
        <p className="text-sm font-bold">{t.title}</p>
        <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
          {t.badge}
        </span>
      </div>
      <div className="p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            <Wallet aria-hidden="true" />
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t.left}
            <br />
            {t.savings}
          </p>
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-surface-2 p-4">
          <ArrowDownRight aria-hidden="true" className="size-7 text-market-down" />
          <div>
            <p className="font-display text-2xl font-extrabold">{t.event}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.question}</p>
          </div>
        </div>
        <ul className="mt-5 space-y-3">
          {t.options.map((option, i) => (
            <li
              key={option}
              className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm"
            >
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-soft font-bold text-primary"
              >
                {i + 1}
              </span>
              {option}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{t.footer}</p>
      </div>
    </div>
  );
}
