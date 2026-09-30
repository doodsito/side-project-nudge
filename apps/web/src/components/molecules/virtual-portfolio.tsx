import { AnimatedNumber } from "@/components/atoms/animated-number";
import { PortfolioChart } from "@/components/atoms/portfolio-chart";

export function VirtualPortfolio() {
  return (
    <section className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-7">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase text-muted-foreground">Virtual portfolio</p>
          <p className="mt-1 font-display text-4xl font-extrabold">
            <AnimatedNumber />
          </p>
        </div>
        <p className="text-right text-sm font-bold text-market-up">
          +6.4%
          <span className="block text-xs font-normal text-muted-foreground">
            six illustrative months
          </span>
        </p>
      </div>
      <div className="mt-5">
        <PortfolioChart compact />
      </div>
      <div className="mt-5 rounded-xl bg-primary-soft p-4">
        <p className="text-xs text-muted-foreground">Your planned monthly investment</p>
        <p className="mt-1 font-display text-xl font-extrabold">€500</p>
      </div>
    </section>
  );
}
