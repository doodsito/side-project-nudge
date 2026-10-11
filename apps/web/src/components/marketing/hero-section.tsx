import { ArrowDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/shared/eyebrow";
import { HeroProductWindow } from "@/components/marketing/hero-product-window";
import type { Dictionary } from "@/lib/dictionaries";

export function HeroSection({
  t,
  window,
}: {
  t: Dictionary["hero"];
  window: Dictionary["heroWindow"];
}) {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.02fr_.98fr]">
        <div className="relative z-10 min-w-0">
          <div className="hero-stagger">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="mt-5 max-w-3xl font-display text-[2.75rem] leading-[1.02] font-extrabold sm:text-6xl lg:text-[4.25rem]">
              {t.title} <span className="text-primary">{t.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="group transition-all hover:-translate-y-px hover:shadow-lift"
              >
                <a href="#early-access">
                  {t.cta}
                  <ArrowDown className="transition-transform group-hover:translate-y-0.5" />
                </a>
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-muted-foreground">
              {t.points.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-market-up" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="min-w-0 animate-rise [animation-delay:300ms]">
          <HeroProductWindow t={window} />
        </div>
      </div>
      <a
        href="#challenge"
        className="mx-auto mt-14 flex w-fit items-center gap-2 text-xs font-bold uppercase text-muted-foreground"
      >
        {t.scrollHint} <ArrowDown className="size-4" />
      </a>
    </section>
  );
}
