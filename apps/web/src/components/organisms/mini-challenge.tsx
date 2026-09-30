"use client";

import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { ChoiceButton, ChoiceMarker } from "@/components/atoms/choice-button";
import { Reveal } from "@/components/atoms/reveal";
import { Section } from "@/components/atoms/section";
import { PracticeButton } from "@/components/molecules/practice-button";
import { SectionIntro } from "@/components/molecules/section-intro";
import { track } from "@/lib/analytics";

type MiniAnswer = "A" | "B" | "C";
const MINI = {
  A: {
    answer: "Which stocks fell the most",
    title: "Price movement is only one piece of the decision.",
    copy: "Knowing what fell tells you what the market did, not whether your goal, timeline or ability to take risk changed. A lower price alone is not a complete reason to act.",
  },
  B: {
    answer: "Whether your goal, timeline or risk capacity changed",
    title: "Start with what changed for you.",
    copy: "Your investment decision should begin with your situation, not with this week’s market movement.",
  },
  C: {
    answer: "What financial influencers are buying",
    title: "Someone else’s decision may not fit your life.",
    copy: "Their goal, time horizon, finances and tolerance for loss may be completely different. Borrowed conviction is fragile when markets move.",
  },
};
export function MiniChallenge() {
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
    <Section className="bg-surface-2">
      <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
        <div>
          <SectionIntro
            label="Learn by deciding"
            title="One decision teaches you more than another hour of scrolling."
            text="Nudge turns passive knowledge into active judgement. You choose first, then learn from the reasoning behind the choice."
          />{" "}
          <Reveal className="mt-8 space-y-3">
            {[
              "No “perfect answer” detached from your situation",
              "No stock tips or pressure to trade",
              "No real capital at risk",
            ].map((item) => (
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
            <span className="text-xs font-extrabold uppercase text-primary">
              20-second challenge
            </span>
            <span className="text-xs font-semibold text-muted-foreground">1 of 1</span>
          </div>
          <div className="p-5 sm:p-8">
            <p className="text-sm text-muted-foreground">
              You planned to invest for 10 years. Markets fall 10% this week.
            </p>
            <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
              What should you review first?
            </h3>
            <div className="mt-6 grid gap-3" role="radiogroup" aria-label="Challenge answers">
              {(Object.entries(MINI) as Array<[MiniAnswer, typeof MINI.A]>).map(([key, item]) => (
                <ChoiceButton
                  key={key}
                  selected={answer === key}
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
              ))}
            </div>
            {!shown && (
              <p className="mt-5 text-sm text-muted-foreground">
                Choose an answer to see how Nudge turns a reaction into a reasoned decision.
              </p>
            )}
            {shown && answer && (
              <div
                className="animate-slide-up mt-6 rounded-2xl border border-primary/25 bg-primary-soft p-5"
                aria-live="polite"
              >
                <h4 className="font-display text-xl font-extrabold">{MINI[answer].title}</h4>
                <p className="mt-2 leading-relaxed text-muted-foreground">{MINI[answer].copy}</p>
                {answer === "B" && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Goal", "Has the reason you are investing changed?"],
                      ["Timeline", "Do you still have roughly the same amount of time?"],
                      ["Risk capacity", "Has your financial ability to tolerate losses changed?"],
                    ].map(([title, copy]) => (
                      <div key={title} className="rounded-xl bg-surface p-3">
                        <p className="text-xs font-bold uppercase text-primary">{title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{copy}</p>
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-4 font-bold">Market prices changed. Your plan may not have.</p>
                <p className="mt-5 text-sm font-semibold">
                  Want to see how this changes based on your situation?
                </p>
                <PracticeButton className="mt-3 w-full sm:w-auto">
                  Build my learning profile
                </PracticeButton>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
