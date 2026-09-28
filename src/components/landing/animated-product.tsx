import { useEffect, useState } from "react";
import { BrainCircuit, CircleDollarSign, Flame, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { NudgeLogo } from "@/components/nudge-logo";

const points = "8,126 63,116 116,119 169,91 222,99 275,63 328,76 382,38 434,47 486,23";

export function AnimatedNumber({ from = 10000, to = 10640, prefix = "€" }: { from?: number; to?: number; prefix?: string }) {
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setValue(to); return; }
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - started) / 1100, 1);
      setValue(Math.round(from + (to - from) * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [from, to]);
  return <span className="tabular-nums">{prefix}{value.toLocaleString("en-GB")}</span>;
}

export function PortfolioChart({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden", compact ? "h-28" : "h-44")} role="img" aria-label="Illustrative portfolio chart rising from ten thousand euros to ten thousand six hundred and forty euros over six months">
      <div className="absolute inset-0 grid grid-rows-3">
        {[0, 1, 2].map((line) => <span key={line} className="border-b border-border/70" />)}
      </div>
      <svg viewBox="0 0 494 145" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity=".2" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`M${points} L486,145 L8,145 Z`} fill="url(#chartArea)" className="chart-area" />
        <polyline points={points} fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="chart-line" />
        <circle cx="486" cy="23" r="5" fill="var(--surface)" stroke="var(--primary)" strokeWidth="3" className="chart-dot" />
      </svg>
      <div className="absolute right-0 top-0 rounded-lg border border-primary/20 bg-surface px-2.5 py-1.5 text-xs font-bold text-primary shadow-soft">€10,640</div>
      <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] font-medium text-muted-foreground"><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span></div>
    </div>
  );
}

export function HeroProductWindow() {
  return (
    <div className="product-float relative mx-auto w-full max-w-[580px]">
      <div className="overflow-hidden rounded-[1.75rem] border border-border-strong bg-surface shadow-device">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border bg-surface-2 px-4 py-3 sm:px-5">
          <NudgeLogo iconOnly small />
          <div className="min-w-0"><p className="truncate text-xs font-bold">Practice mode</p><p className="truncate text-[10px] text-muted-foreground">Decide before you invest.</p></div>
          <span className="inline-flex items-center gap-1 rounded-full bg-mint-soft px-2 py-1 text-[10px] font-bold text-market-up"><span className="size-1.5 rounded-full bg-market-up" /> Live simulation</span>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-3 gap-2.5">
            {[{ icon: ShieldCheck, label: "Investor level", value: "4" }, { icon: Sparkles, label: "Progress", value: "1,250 XP" }, { icon: Flame, label: "Consistency", value: "8-day streak" }].map((item, index) => (
              <div key={item.label} className="product-stat rounded-xl border border-border bg-background p-3" style={{ animationDelay: `${360 + index * 100}ms` }}>
                <item.icon className="size-3.5 text-primary" aria-hidden /><p className="mt-2 text-[9px] text-muted-foreground sm:text-[10px]">{item.label}</p><p className="mt-0.5 text-[11px] font-extrabold sm:text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-border bg-background p-4 sm:p-5">
            <div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase text-muted-foreground">Virtual portfolio</p><p className="mt-1 font-display text-2xl font-extrabold sm:text-3xl"><AnimatedNumber /></p></div><p className="text-right text-xs font-bold text-market-up">+6.4%<span className="block font-normal text-muted-foreground">illustrative</span></p></div>
            <div className="mt-5"><PortfolioChart /></div>
          </div>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {[{ icon: CircleDollarSign, title: "Virtual money", copy: "Mistakes cost €0" }, { icon: BrainCircuit, title: "Real decisions", copy: "Practise the hard moments" }, { icon: Sparkles, title: "Clear reasoning", copy: "Understand why" }].map((item) => <div key={item.title} className="rounded-xl bg-surface-2 p-3"><item.icon className="size-4 text-primary" aria-hidden /><p className="mt-2 text-xs font-bold">{item.title}</p><p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground">{item.copy}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
