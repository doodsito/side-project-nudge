"use client";

import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { ChoiceButton, ChoiceMarker } from "@/components/shared/choice-button";
import { Reveal } from "@/components/marketing/reveal";
import { Section } from "@/components/marketing/section";
import { PracticeButton } from "@/components/marketing/practice-button";
import { SectionIntro } from "@/components/marketing/section-intro";
import { track } from "@/lib/analytics";
import type { Dictionary } from "@/lib/dictionaries";

type MiniAnswer = keyof Dictionary["challenge"]["answers"];

export function MiniChallenge({ t }: { t: Dictionary["challenge"] }) {
  const [answer, setAnswer] = useState<MiniAnswer | null>(null);
  const [shown, setShown] = useState(false);
  function choose(value: MiniAnswer) {
    setAnswer(value);
    setShown(false);
    track("demo_answer_selected", { location: "mini_challenge", answer: value });
    window.setTimeout(
      () => setShown(true),
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? 0 : 500,
    );
  }
  return (
    <Section id="challenge" className="bg-surface-2">
      <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
        <div>
          <SectionIntro label={t.label} title={t.title} text={t.text} />{" "}
          <Reveal className="mt-8 space-y-3">
            {t.promises.map((item) => (
              <p key={item} className="flex gap-3 font-semibold">
                <Check className="size-5 shrink-0 text-market-up" />
                {item}
              </p>
            ))}
          </Reveal>
        </div>
        <Reveal
          delay={100}
          className="overflow-hidden rounded-3xl border border-border-strong bg-surface shadow-lift"
        >
          <div className="flex items-center justify-between border-b border-border bg-background px-5 py-4">
            <span className="text-xs font-extrabold uppercase text-primary">{t.badge}</span>
            <span className="text-xs font-semibold text-muted-foreground">{t.count}</span>
          </div>
          <div className="p-5 sm:p-8">
            <p className="text-sm text-muted-foreground">{t.context}</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">{t.question}</h3>
            <div className="mt-6 grid gap-3" role="radiogroup" aria-label={t.answersLabel}>
              {(Object.entries(t.answers) as Array<[MiniAnswer, (typeof t.answers)["A"]]>).map(
                ([key, item]) => (
                  <ChoiceButton
                    key={key}
                    selected={answer === key}
                    tabIndex={answer === key || (!answer && key === "A") ? 0 : -1}
                    onClick={() => choose(key)}
                    className="group min-h-16 px-4 py-3"
                  >
                    <ChoiceMarker
                      selected={answer === key}
                      className="size-8 font-bold transition-transform group-hover:translate-x-0.5"
                    >
                      {key}
                    </ChoiceMarker>
                    <span className="text-sm sm:text-base">{item.answer}</span>
                    <ChevronRight className="ml-auto size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </ChoiceButton>
                ),
              )}
            </div>
            {!shown && <p className="mt-5 text-sm text-muted-foreground">{t.prompt}</p>}
            {shown && answer && (
              <div
                className="animate-slide-up mt-6 rounded-2xl border border-primary/25 bg-primary-soft p-5"
                aria-live="polite"
              >
                <h4 className="font-display text-xl font-extrabold">{t.answers[answer].title}</h4>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {t.answers[answer].copy}
                </p>
                {answer === "B" && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {t.checks.map(([title, copy]) => (
                      <div key={title} className="rounded-xl bg-surface p-3">
                        <p className="text-xs font-bold uppercase text-primary">{title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{copy}</p>
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-4 font-bold">{t.takeaway}</p>
                <p className="mt-5 text-sm font-semibold">{t.nudge}</p>
                <PracticeButton location="mini_challenge" className="mt-3 w-full sm:w-auto">
                  {t.cta}
                </PracticeButton>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
