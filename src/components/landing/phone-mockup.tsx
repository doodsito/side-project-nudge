import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const AI_TEXT =
  "European equities fell after weaker economic data. Your diversified ETF limited the impact compared with individual stocks.";

function useTypewriter(text: string, start: boolean, speed = 18) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOut(text);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed]);
  return out;
}

export function PhoneMockup() {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(10247.32);
  const [showChallenge, setShowChallenge] = useState(false);
  const [showAi, setShowAi] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const t1 = setTimeout(() => setShowAi(true), 900);
    const t2 = setTimeout(() => setShowChallenge(true), 1800);
    const id = setInterval(() => {
      setValue((v) => {
        const drift = (Math.random() - 0.45) * 6;
        const nextValue = Math.min(10420, Math.max(10080, v + drift));
        return Math.round(nextValue * 100) / 100;
      });
    }, 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(id);
    };
  }, []);

  const typed = useTypewriter(AI_TEXT, showAi);
  const pct = ((value - 10000) / 10000) * 100;

  return (
    <div ref={wrap} className="relative mx-auto w-full max-w-[380px]">
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-full bg-primary/12 blur-3xl"
        style={{ background: "radial-gradient(circle at 60% 30%, var(--primary-soft), transparent 70%)" }}
      />

      {/* device */}
      <div className="relative rounded-[2.6rem] border border-border-strong bg-ink p-2.5 shadow-device">
        <div className="relative overflow-hidden rounded-[2.1rem] bg-background">
          <div className="absolute top-2.5 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />

          <div className="space-y-3.5 px-4 pt-10 pb-5">
            {/* header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-muted-foreground">Your portfolio</p>
                <p className="text-[10px] text-muted-foreground/80">Virtual money · real markets</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-mint-soft px-2 py-1 text-[10px] font-semibold text-market-up">
                <Flame className="size-3" /> 8
              </span>
            </div>

            {/* balance */}
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
              <div className="flex items-end justify-between">
                <p className="font-display text-3xl font-extrabold tabular-nums tracking-tight">
                  €
                  {value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <span
                  className={cn(
                    "mb-1 text-xs font-semibold tabular-nums",
                    pct >= 0 ? "text-market-up" : "text-market-down",
                  )}
                >
                  {pct >= 0 ? "+" : ""}
                  {pct.toFixed(2)}%
                </span>
              </div>

              <svg viewBox="0 0 300 76" className="mt-3 h-16 w-full" aria-hidden>
                <defs>
                  <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 58 L30 52 L60 55 L90 42 L120 46 L150 33 L180 38 L210 26 L240 30 L270 18 L300 22 L300 76 L0 76 Z"
                  fill="url(#fill)"
                  opacity={mounted ? 1 : 0}
                  style={{ transition: "opacity 1.2s ease 0.6s" }}
                />
                <path
                  d="M0 58 L30 52 L60 55 L90 42 L120 46 L150 33 L180 38 L210 26 L240 30 L270 18 L300 22"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="420"
                  strokeDashoffset="420"
                  className={mounted ? "animate-draw" : undefined}
                />
              </svg>

              {/* allocation */}
              <div className="mt-3 space-y-2">
                {[
                  { label: "ETF", pctv: 62, color: "var(--primary)" },
                  { label: "Stocks", pctv: 23, color: "var(--mint)" },
                  { label: "Cash", pctv: 15, color: "var(--border-strong)" },
                ].map((a, i) => (
                  <div key={a.label} className="flex items-center gap-2">
                    <span className="w-11 text-[10px] font-medium text-muted-foreground">
                      {a.label}
                    </span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          background: a.color,
                          width: mounted ? `${a.pctv}%` : "0%",
                          transition: `width 1s cubic-bezier(.22,1,.36,1) ${0.4 + i * 0.15}s`,
                        }}
                      />
                    </span>
                    <span className="w-8 text-right text-[10px] tabular-nums text-muted-foreground">
                      {a.pctv}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI card */}
            <div
              className={cn(
                "rounded-2xl border border-primary/25 bg-primary-soft p-3.5 transition-all duration-700",
                showAi ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-primary" />
                <p className="text-[11px] font-semibold text-accent-foreground">
                  Why did your portfolio fall today?
                </p>
              </div>
              <p className="mt-1.5 min-h-[46px] text-[11px] leading-relaxed text-foreground/75">
                {typed}
                {typed.length < AI_TEXT.length && (
                  <span className="animate-caret ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 bg-primary" />
                )}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                Understand what happened <ArrowRight className="size-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* floating challenge card */}
      <div
        className={cn(
          "animate-float absolute -right-3 bottom-14 w-[62%] rounded-2xl border border-border bg-surface p-3.5 shadow-lift transition-all duration-700 sm:-right-10",
          showChallenge ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        <p className="text-[10px] font-semibold tracking-[0.12em] text-primary uppercase">
          Today's challenge
        </p>
        <p className="mt-1 text-xs font-semibold">Markets fell 4%. What would you do?</p>
        <div className="mt-2 space-y-1">
          {["Sell everything", "Do nothing", "Buy more", "I'm not sure"].map((o, i) => (
            <div
              key={o}
              className={cn(
                "rounded-lg border px-2 py-1.5 text-[10.5px]",
                i === 1 ? "border-primary bg-primary-soft font-medium" : "border-border",
              )}
            >
              {String.fromCharCode(65 + i)}. {o}
            </div>
          ))}
        </div>
      </div>

      {/* floating streak chip */}
      <div className="animate-float absolute -top-4 -left-2 hidden rounded-xl border border-border bg-surface px-3 py-2 shadow-soft sm:block [animation-delay:1.5s]">
        <p className="text-[10px] text-muted-foreground">Investor level 4</p>
        <p className="text-xs font-bold">1,250 XP</p>
      </div>
    </div>
  );
}
