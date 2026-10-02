import { ArrowDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { HeroProductWindow } from "@/components/molecules/hero-product-window";
import { PracticeButton } from "@/components/molecules/practice-button";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.02fr_.98fr]">
        <div className="relative z-10 min-w-0">
          <div className="hero-stagger">
            <Eyebrow>For students & first-job starters</Eyebrow>
            <h1 className="mt-5 max-w-3xl font-display text-[2.75rem] leading-[1.02] font-extrabold sm:text-6xl lg:text-[4.25rem]">
              Your first money decisions. <span className="text-primary">A little clearer.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              New to saving or investing? Start with Alex’s first paycheque. Choose what to do with
              €100, explore the trade-offs and check what you learned — without using real money.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PracticeButton location="hero">Try the practice case</PracticeButton>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-auto min-h-12 whitespace-normal py-3 border-border-strong bg-surface transition-all hover:-translate-y-px hover:bg-muted"
              >
                <a href="#early-access">Join the early access list</a>
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-muted-foreground">
              {["Free", "One short case", "No account required"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-market-up" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="min-w-0 animate-rise [animation-delay:300ms]">
          <HeroProductWindow />
        </div>
      </div>
      <a
        href="#challenge"
        className="mx-auto mt-14 flex w-fit items-center gap-2 text-xs font-bold uppercase text-muted-foreground"
      >
        Try a quick question <ArrowDown className="size-4" />
      </a>
    </section>
  );
}
