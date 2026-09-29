import { cn } from "@/lib/utils";

const points = "8,126 63,116 116,119 169,91 222,99 275,63 328,76 382,38 434,47 486,23";

export function PortfolioChart({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn("relative overflow-hidden", compact ? "h-28" : "h-44")}
      role="img"
      aria-label="Illustrative portfolio chart rising from ten thousand euros to ten thousand six hundred and forty euros over six months"
    >
      <div className="absolute inset-0 grid grid-rows-3">
        {[0, 1, 2].map((line) => (
          <span key={line} className="border-b border-border/70" />
        ))}
      </div>
      <svg
        viewBox="0 0 494 145"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity=".2" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`M${points} L486,145 L8,145 Z`} fill="url(#chartArea)" className="chart-area" />
        <polyline
          points={points}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          className="chart-line"
        />
        <circle
          cx="486"
          cy="23"
          r="5"
          fill="var(--surface)"
          stroke="var(--primary)"
          strokeWidth="3"
          className="chart-dot"
        />
      </svg>
      <div className="absolute right-0 top-0 rounded-lg border border-primary/20 bg-surface px-2.5 py-1.5 text-xs font-bold text-primary shadow-soft">
        €10,640
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] font-medium text-muted-foreground">
        <span>JAN</span>
        <span>FEB</span>
        <span>MAR</span>
        <span>APR</span>
        <span>MAY</span>
        <span>JUN</span>
      </div>
    </div>
  );
}
