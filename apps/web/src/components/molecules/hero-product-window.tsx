import { BrainCircuit, CircleDollarSign, Flame, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatedNumber } from "@/components/atoms/animated-number";
import { NudgeLogo } from "@/components/atoms/nudge-logo";
import { PortfolioChart } from "@/components/atoms/portfolio-chart";

export function HeroProductWindow() {
  return (
    <div className="product-float relative mx-auto w-full max-w-[580px]">
      <div className="overflow-hidden rounded-[1.75rem] border border-border-strong bg-surface shadow-device">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border bg-surface-2 px-4 py-3 sm:px-5">
          <NudgeLogo iconOnly small />
          <div className="min-w-0">
            <p className="truncate text-xs font-bold">Practice mode</p>
            <p className="truncate text-[10px] text-muted-foreground">Decide before you invest.</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-mint-soft px-2 py-1 text-[10px] font-bold text-market-up">
            <span className="size-1.5 rounded-full bg-market-up" /> Live simulation
          </span>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { icon: ShieldCheck, label: "Investor level", value: "4" },
              { icon: Sparkles, label: "Progress", value: "1,250 XP" },
              { icon: Flame, label: "Consistency", value: "8-day streak" },
            ].map((item, index) => (
              <div
                key={item.label}
                className="product-stat rounded-xl border border-border bg-background p-3"
                style={{ animationDelay: `${360 + index * 100}ms` }}
              >
                <item.icon className="size-3.5 text-primary" aria-hidden />
                <p className="mt-2 text-[9px] text-muted-foreground sm:text-[10px]">{item.label}</p>
                <p className="mt-0.5 text-[11px] font-extrabold sm:text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-border bg-background p-4 sm:p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase text-muted-foreground">
                  Virtual portfolio
                </p>
                <p className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">
                  <AnimatedNumber />
                </p>
              </div>
              <p className="text-right text-xs font-bold text-market-up">
                +6.4%<span className="block font-normal text-muted-foreground">illustrative</span>
              </p>
            </div>
            <div className="mt-5">
              <PortfolioChart />
            </div>
          </div>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {[
              { icon: CircleDollarSign, title: "Virtual money", copy: "Mistakes cost €0" },
              { icon: BrainCircuit, title: "Real decisions", copy: "Practise the hard moments" },
              { icon: Sparkles, title: "Clear reasoning", copy: "Understand why" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-surface-2 p-3">
                <item.icon className="size-4 text-primary" aria-hidden />
                <p className="mt-2 text-xs font-bold">{item.title}</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
