import { useState } from "react";
import { Sparkles, TrendingDown } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const FEEDBACK: Record<string, { title: string; body: string }> = {
  Sell: {
    title: "You chose Sell.",
    body: "Worth examining: selling after a decline locks in the loss. If nothing changed about your goals or your time horizon, a price drop alone is a weak reason to exit. Next lesson: market volatility and long-term investing.",
  },
  Hold: {
    title: "You chose Hold.",
    body: "Why this may make sense: your investment horizon is long-term and your portfolio remains diversified. A single market decline does not necessarily change your investment thesis.",
  },
  Buy: {
    title: "You chose Buy.",
    body: "Worth examining: buying into a decline can make sense if it fits your plan and you still hold enough cash for the unexpected. It becomes risky when it turns into timing the market. Next lesson: position sizing.",
  },
  "I'm not sure": {
    title: "You chose I'm not sure.",
    body: "That's an honest answer, and a useful one. It usually means your risk tolerance hasn't been tested yet. We'd start you on: what a market decline actually means for a long-term portfolio.",
  },
};

export function MarketScenario() {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface-2 px-5 py-3.5 sm:px-7">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          <span className="size-1.5 animate-pulse rounded-full bg-market-down" /> Today
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-market-down">
          <TrendingDown className="size-4" /> S&amp;P 500 falls 3.2%
        </span>
      </div>

      <div className="p-5 sm:p-7">
        <p className="font-display text-xl font-bold text-balance-tight sm:text-2xl">
          Your portfolio is down €217 today. What do you do?
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {Object.keys(FEEDBACK).map((option) => (
            <button
              key={option}
              onClick={() => {
                setChoice(option);
                track("market_scenario_answered", { choice: option });
              }}
              className={cn(
                "rounded-xl border px-3 py-3 text-sm font-medium transition-all",
                choice === option
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:-translate-y-0.5 hover:border-primary hover:bg-primary-soft",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {choice && (
          <div className="animate-slide-up mt-5 rounded-2xl border border-primary/25 bg-primary-soft p-5">
            <p className="inline-flex items-center gap-1.5 text-sm font-bold text-accent-foreground">
              <Sparkles className="size-4" /> {FEEDBACK[choice]?.title}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/80">
              {FEEDBACK[choice]?.body}
            </p>
          </div>
        )}

        <p className="mt-5 text-xs text-muted-foreground">
          Educational simulation only. Not investment advice.
        </p>
      </div>
    </div>
  );
}
