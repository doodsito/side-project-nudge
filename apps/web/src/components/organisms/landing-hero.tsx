import { type ReactNode } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { PracticeButton } from "@/components/molecules/practice-button";

export function LandingHero({
  label,
  title,
  highlight,
  text,
  primary,
  secondary,
  secondaryHref,
  reassurance,
  visual,
}: {
  label: string;
  title: string;
  highlight: string;
  text: string;
  primary: string;
  secondary: string;
  secondaryHref: string;
  reassurance: string[];
  visual: ReactNode;
}) {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <div className="hero-stagger min-w-0">
          <Eyebrow>{label}</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-display text-[2.4rem] leading-[1.05] font-extrabold sm:text-5xl lg:text-[3.4rem]">
            {title} <span className="text-primary">{highlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PracticeButton location="v2_hero">{primary}</PracticeButton>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-auto min-h-12 whitespace-normal border-border-strong bg-surface py-3 transition-all hover:-translate-y-px hover:bg-muted"
            >
              <a href={secondaryHref}>{secondary}</a>
            </Button>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-muted-foreground">
            {reassurance.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-market-up" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 animate-rise [animation-delay:300ms]">{visual}</div>
      </div>
    </section>
  );
}
