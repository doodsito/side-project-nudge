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
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
        <div className="relative z-10">
          <div className="hero-stagger">
            <Eyebrow>Built for first-time investors</Eyebrow>
            <h1 className="mt-5 max-w-3xl font-display text-[2.75rem] leading-[1.02] font-extrabold sm:text-6xl lg:text-[4.25rem]">
              Make your first investing decision{" "}
              <span className="text-primary">before your money is on the line.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Practise with a virtual €10,000 portfolio in realistic market conditions. Get
              personalised feedback on what you chose, why it matters and what risk you took —
              without risking a single euro.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PracticeButton />
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border-strong bg-surface transition-all hover:-translate-y-px hover:bg-muted"
              >
                <a href="#early-access">Join the early access list</a>
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-muted-foreground">
              {["Free", "Takes 2 minutes", "No account required"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-market-up" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="animate-rise [animation-delay:300ms]">
          <HeroProductWindow />
        </div>
      </div>
      <a
        href="#why-now"
        className="mx-auto mt-14 flex w-fit items-center gap-2 text-xs font-bold uppercase text-muted-foreground"
      >
        See why practice matters <ArrowDown className="size-4" />
      </a>
    </section>
  );
}
