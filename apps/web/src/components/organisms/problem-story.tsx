import { Check } from "lucide-react";
import { Reveal } from "@/components/atoms/reveal";
import { Section } from "@/components/atoms/section";
import { SectionIntro } from "@/components/molecules/section-intro";

const QUESTIONS = [
  "Do you understand the basics, but still feel nervous putting real money in?",
  "Have you watched videos and read articles, but still don’t know what you would actually buy?",
  "Are you worried your first investing lesson could cost you real money?",
];
export function ProblemStory() {
  return (
    <Section id="why-now" className="border-y border-border bg-surface-2">
      <SectionIntro
        label="The real cost of waiting"
        title="Knowing the terms won’t help when the market drops."
        text="Information feels useful until your own savings are involved. Then every choice suddenly feels expensive."
      />
      <div className="mt-16 grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <Reveal>
          <p className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
            Dear future investor,
          </p>
        </Reveal>
        <div className="space-y-5">
          {QUESTIONS.map((item, i) => (
            <Reveal
              key={item}
              delay={i * 90}
              className="flex gap-4 border-b border-border pb-5 text-lg font-semibold"
            >
              <Check className="mt-1 size-5 shrink-0 text-market-up" />
              {item}
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal className="my-16 border-y border-border py-10 text-center">
        <p className="font-display text-2xl font-bold text-muted-foreground sm:text-4xl">
          You are not missing more information.
        </p>
        <p className="mt-3 font-display text-3xl font-extrabold text-primary sm:text-5xl">
          You are missing practice making real investing decisions.
        </p>
      </Reveal>
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>You can know what ETFs, diversification and compound interest mean.</p>
          <p>
            But knowing the terms is different from knowing what to do when your own money is
            involved.
          </p>
          <p>
            So you watch another video, save another post and tell yourself you will start when you
            feel ready.
          </p>
          <p>
            But information alone rarely creates that feeling. Every month you wait is another month
            your money stays on the sidelines.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-sm font-bold uppercase text-primary">
            When markets fall, the questions get harder
          </p>
          <ol className="mt-5 space-y-3">
            {[
              "How much should you invest?",
              "What should you buy?",
              "How much risk should you take?",
              "Should you hold, sell or buy more?",
            ].map((q, i) => (
              <li
                key={q}
                className="flex items-center gap-4 rounded-xl border border-border bg-surface px-5 py-4 text-lg font-bold shadow-soft"
              >
                <span className="text-xs text-primary">0{i + 1}</span>
                {q}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
      <Reveal className="mt-16 rounded-3xl bg-ink px-6 py-10 text-center text-ink-foreground sm:px-12 sm:py-14">
        <p className="mx-auto max-w-4xl font-display text-3xl font-extrabold sm:text-5xl">
          You don’t need another investing course — or to risk your savings just to learn.
        </p>
        <p className="mt-4 text-lg text-ink-foreground/70">
          You need a safe place to make the decisions first.
        </p>
      </Reveal>
    </Section>
  );
}
