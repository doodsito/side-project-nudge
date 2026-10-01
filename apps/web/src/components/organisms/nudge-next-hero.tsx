import { ArrowDownRight, ArrowUpRight, MoveRight } from "lucide-react";
import { NudgeFold } from "@/components/atoms/nudge-next-mark";
import { Button } from "@/components/ui/button";
import { nudgeCopy, type NudgeLocale } from "@/lib/nudge-next-copy";

export function NudgeNextHero({ locale }: { locale: NudgeLocale }) {
  const c = nudgeCopy[locale];
  return (
    <section className="nx-hero" aria-labelledby="nx-hero-title">
      <div className="nx-hero-top">
        <span>{c.brand}</span>
        <ArrowDownRight size={32} strokeWidth={1.4} aria-hidden="true" />
      </div>
      <h1 id="nx-hero-title">
        {c.hero.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h1>
      <NudgeFold className="nx-hero-art" />
      <div className="nx-hero-bottom">
        <div>
          <p>{c.intro}</p>
          <Button asChild size="xl" className="nx-button nx-button-light">
            <a href="#experience">
              {c.enter}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
      <div className="nx-learning-loop" aria-label={c.ribbon.join(", ")}>
        {c.ribbon.map((word, i) => (
          <span key={word}>
            {word}
            {i < 3 && <MoveRight size={22} strokeWidth={1.3} aria-hidden="true" />}
          </span>
        ))}
      </div>
    </section>
  );
}
