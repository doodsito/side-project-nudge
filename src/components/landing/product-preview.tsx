import { useEffect, useState } from "react";
import { Flame, Sparkles, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const OPTIONS = ["Sell everything", "Hold", "Buy more", "Review my allocation"];

/**
 * Phone mockup of the learning experience. Purely presentational —
 * it animates in once and then stays calm.
 */
export function ProductPreview({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    setMounted(true);
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setXp(1250);
      return;
    }
    let current = 0;
    const id = setInterval(() => {
      current += 65;
      if (current >= 1250) {
        current = 1250;
        clearInterval(id);
      }
      setXp(current);
    }, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={cn("relative mx-auto w-full", compact ? "max-w-[320px]" : "max-w-[370px]")}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10"
        style={{
          background: "radial-gradient(closest-side, var(--primary-soft), transparent 72%)",
        }}
      />

      <div className="relative rounded-[2.5rem] border border-border-strong bg-ink p-2.5 shadow-device">
        <div className="relative overflow-hidden rounded-[2rem] bg-background">
          <div className="absolute top-2.5 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />

          <div className="space-y-3 px-4 pt-10 pb-5">
            {/* status row */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold">Investor level 4</p>
                <p className="text-[10px] text-muted-foreground tabular-nums">{xp} XP</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-mint-soft px-2 py-1 text-[10px] font-semibold text-market-up">
                  <Flame className="size-3" aria-hidden /> 8-day streak
                </span>
              </div>
            </div>

            {/* progress */}
            <div className="flex items-center gap-1.5">
              {[1, 1, 1, 0.55, 0, 0].map((v, i) => (
                <span key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{
                      width: mounted ? `${v * 100}%` : "0%",
                      transition: `width .8s cubic-bezier(.22,1,.36,1) ${0.2 + i * 0.08}s`,
                    }}
                  />
                </span>
              ))}
            </div>

            {/* challenge card */}
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
              <p className="text-[10px] font-semibold tracking-[0.12em] text-primary uppercase">
                Your next challenge
              </p>
              <p className="mt-1.5 font-display text-base leading-snug font-bold">
                The market drops 8%. What would you do?
              </p>
              <div className="mt-3 space-y-1.5">
                {OPTIONS.map((o, i) => (
                  <div
                    key={o}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-[11.5px] transition-all",
                      i === 3
                        ? "border-primary bg-primary-soft font-semibold"
                        : "border-border text-foreground/80",
                    )}
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "none" : "translateY(6px)",
                      transition: `all .5s ease ${0.3 + i * 0.1}s`,
                    }}
                  >
                    {o}
                  </div>
                ))}
              </div>
              <p className="mt-3 rounded-xl bg-surface-2 px-3 py-2 text-[10.5px] leading-relaxed text-muted-foreground">
                Before revealing the answer, think about your time horizon, diversification and risk
                tolerance.
              </p>
            </div>

            {/* AI note */}
            <div className="rounded-2xl border border-primary/25 bg-primary-soft p-3.5">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-accent-foreground">
                <Sparkles className="size-3.5" aria-hidden /> Why this matters
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-foreground/75">
                A fall in price only matters if something changed about your plan. Next up:
                <span className="font-semibold"> how volatility affects long-term portfolios.</span>
              </p>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border bg-surface px-3.5 py-2.5">
              <p className="text-[11px] font-medium">Modules completed</p>
              <p className="inline-flex items-center gap-1 text-[11px] font-bold">
                <Trophy className="size-3.5 text-mint" aria-hidden /> 12 / 30
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
