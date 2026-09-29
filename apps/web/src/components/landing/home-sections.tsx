"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, ChevronRight, Menu, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { EarlyAccessForm } from "@/components/landing/early-access-form";
import { HeroProductWindow } from "@/components/landing/animated-product";
import { NudgeLogo } from "@/components/nudge-logo";
import { BRAND } from "@/lib/brand";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
function Eyebrow({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <p
      className={cn("text-[11px] font-extrabold uppercase", inverse ? "text-mint" : "text-primary")}
    >
      {children}
    </p>
  );
}
function Intro({
  label,
  title,
  text,
  centered = false,
  inverse = false,
}: {
  label: string;
  title: string;
  text?: string;
  centered?: boolean;
  inverse?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-4xl", centered && "mx-auto text-center")}>
      <Eyebrow inverse={inverse}>{label}</Eyebrow>
      <h2
        className={cn(
          "mt-4 font-display text-3xl leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.5rem]",
          inverse && "text-ink-foreground",
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            centered && "mx-auto",
            inverse ? "text-ink-foreground/65" : "text-muted-foreground",
          )}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}
function Logo() {
  return <NudgeLogo small />;
}
function PracticeButton({
  className,
  children = "Try your first investing decision",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Button
      asChild
      className={cn(
        "group h-12 rounded-xl px-6 text-base font-bold shadow-soft transition-all hover:-translate-y-px hover:shadow-lift active:scale-[.98]",
        className,
      )}
    >
      <Link href="/practice" onClick={() => track("demo_started", { location: "homepage_cta" })}>
        {children}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </Button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const items = [
    ["Why now", "#why-now"],
    ["What you gain", "#benefits"],
    ["How it works", "#how-it-works"],
  ] as const;
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/85 shadow-soft backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8">
        <a href="#top" aria-label="Nudge home">
          <Logo />
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {items.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
          <a
            href="#early-access"
            className="group inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-soft transition-all hover:-translate-y-px"
          >
            Join early access{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </nav>
        <Button
          size="icon"
          variant="outline"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="min-h-11 min-w-11 md:hidden"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav
          className="animate-slide-up border-t border-border bg-background px-5 py-4 shadow-lift md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-6xl flex-col">
            {items.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold hover:bg-muted"
              >
                {label}
              </a>
            ))}
            <a
              href="#early-access"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-primary px-4 py-3 text-center font-bold text-primary-foreground"
            >
              Join early access →
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

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
              <a
                href="#early-access"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border-strong bg-surface px-6 text-base font-bold transition-all hover:-translate-y-px hover:bg-muted"
              >
                Join the early access list
              </a>
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

const QUESTIONS = [
  "Do you understand the basics, but still feel nervous putting real money in?",
  "Have you watched videos and read articles, but still don’t know what you would actually buy?",
  "Are you worried your first investing lesson could cost you real money?",
];
export function ProblemStory() {
  return (
    <Section id="why-now" className="border-y border-border bg-surface-2">
      <Intro
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

const BENEFITS = [
  [
    "01",
    "Make mistakes while they still cost €0.",
    "Test your instincts with virtual money, see where your reasoning breaks down and learn before the consequences are real.",
  ],
  [
    "02",
    "Know what to consider before you click buy or sell.",
    "Use your goal, timeline, safety buffer and tolerance for risk to make a decision — not a headline or someone else’s hot take.",
  ],
  [
    "03",
    "See the trade-offs before they feel personal.",
    "Explore what each choice protects, what it puts at risk and what would make it more or less appropriate for you.",
  ],
  [
    "04",
    "Face your first real market drop with a plan.",
    "Build a repeatable decision process now, so a red screen later does not turn uncertainty into panic.",
  ],
];
export function Benefits() {
  return (
    <Section id="benefits">
      <Intro
        label="What’s in it for you"
        title="Turn financial knowledge into decisions you can trust."
        text="Nudge closes the gap between understanding investing in theory and knowing what you would actually do."
      />
      <div className="mt-14 grid gap-x-14 md:grid-cols-2">
        {BENEFITS.map(([n, title, copy], i) => (
          <Reveal
            key={n}
            delay={(i % 2) * 80}
            className={cn("border-t border-border-strong py-9", i % 2 === 1 && "md:translate-y-16")}
          >
            <span className="font-display text-5xl font-extrabold text-primary/30">{n}</span>
            <h3 className="mt-5 max-w-md font-display text-2xl font-extrabold sm:text-3xl">
              {title}
            </h3>
            <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">{copy}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const STEPS = [
  [
    "01",
    "Meet a real investing moment.",
    "A market fall, a new contribution or a portfolio that drifted away from its target.",
  ],
  [
    "02",
    "Choose with virtual money.",
    "Act on a €10,000 portfolio without exposing your savings to a single euro of risk.",
  ],
  [
    "03",
    "Understand the consequence.",
    "Get personalised feedback on what fits your situation, what could go wrong and what to review next.",
  ],
];
export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-ink text-ink-foreground">
      <Intro
        inverse
        label="How Nudge works"
        title="From “I don’t know what I’d do” to a decision you can explain."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {STEPS.map(([n, title, copy], i) => (
          <Reveal
            key={n}
            delay={i * 100}
            className="relative border-t border-ink-foreground/20 py-7 md:pr-8"
          >
            <span className="text-xs font-bold text-mint">STEP {n}</span>
            <h3 className="mt-7 font-display text-2xl font-extrabold">{title}</h3>
            <p className="mt-3 leading-relaxed text-ink-foreground/65">{copy}</p>
            {i < 2 && (
              <ArrowRight className="absolute top-7 right-3 hidden size-5 text-mint md:block" />
            )}
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10">
        <PracticeButton />
      </Reveal>
    </Section>
  );
}

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
          <Intro
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
                <Button
                  key={key}
                  variant="outline"
                  role="radio"
                  aria-checked={answer === key}
                  onClick={() => choose(key)}
                  className={cn(
                    "group h-auto min-h-16 justify-start whitespace-normal rounded-xl px-4 py-3 text-left",
                    answer === key && "border-primary bg-primary-soft",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full border font-bold transition-transform group-hover:translate-x-0.5",
                      answer === key
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border-strong",
                    )}
                  >
                    {key}
                  </span>
                  <span className="text-sm sm:text-base">{item.answer}</span>
                  <ChevronRight className="ml-auto size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Button>
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

export function BeforeAfter() {
  const before = [
    "You know the definitions but freeze when you have to act.",
    "You borrow someone else’s conviction without understanding their situation.",
    "You delay starting because every mistake feels too expensive.",
  ];
  const after = [
    "You know which facts matter before making a choice.",
    "You can explain the trade-offs in your own words.",
    "You recognise when to act, when to wait and what to review.",
  ];
  return (
    <Section>
      <Intro
        label="The change that matters"
        title="Don’t make your first decision with real money."
      />
      <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Reveal className="rounded-3xl border border-border bg-surface-2 p-7 sm:p-9">
          <Eyebrow>Before Nudge</Eyebrow>
          <h3 className="mt-4 font-display text-3xl font-extrabold">
            More content. Same hesitation.
          </h3>
          <ul className="mt-7 space-y-5">
            {before.map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <X className="mt-0.5 size-5 shrink-0 text-market-down" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="grid place-items-center">
          <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
            <ArrowRight className="hidden size-4 lg:block" />
            <ArrowDown className="size-4 lg:hidden" />
          </span>
        </div>
        <Reveal delay={100} className="rounded-3xl border border-mint/40 bg-mint-soft p-7 sm:p-9">
          <Eyebrow>After practising</Eyebrow>
          <h3 className="mt-4 font-display text-3xl font-extrabold">A process you can repeat.</h3>
          <ul className="mt-7 space-y-5">
            {after.map((item) => (
              <li key={item} className="flex gap-3 font-semibold">
                <Check className="mt-0.5 size-5 shrink-0 text-market-up" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

export function FAQSection({ faqs }: { faqs: Array<[string, string]> }) {
  return (
    <Section id="faq" className="bg-surface-2">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <Intro
          label="Before you begin"
          title="Good questions deserve clear answers."
          text="Nudge is designed to help beginners build judgement — not to make investment choices for them."
        />
        <Reveal delay={100}>
          <Accordion type="single" collapsible>
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger
                  onClick={() => track("faq_opened", { question: q })}
                  className="py-5 text-left font-display text-base font-bold hover:no-underline"
                >
                  {q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
export function FinalCTA() {
  return (
    <Section className="bg-ink text-ink-foreground">
      <Reveal className="mx-auto max-w-4xl text-center">
        <Eyebrow inverse>Practice before the pressure</Eyebrow>
        <h2 className="mt-4 font-display text-4xl leading-tight font-extrabold sm:text-6xl">
          Make your first mistake with virtual money — not your savings.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-foreground/65">
          Try a realistic investing decision now. In three minutes, you will know more about how you
          think as an investor.
        </p>
        <PracticeButton className="mt-8 w-full sm:w-auto" />
      </Reveal>
    </Section>
  );
}
export function EarlyAccessSection() {
  return (
    <Section id="early-access" className="bg-primary-soft">
      <Reveal className="grid items-end gap-10 lg:grid-cols-[1fr_.8fr]">
        <div>
          <Eyebrow>Nudge early access</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            Keep practising before real money is on the line.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Join the early access list to be among the first to practise new investing scenarios
            with Nudge.
          </p>
        </div>
        <EarlyAccessForm />
      </Reveal>
    </Section>
  );
}
export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <Logo />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Nudge is designed for educational purposes and does not provide personalised investment
            advice. Investing involves risk, including the possible loss of capital.
          </p>
          <p className="mt-5 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BRAND}. All rights reserved.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm" aria-label="Footer navigation">
          {[
            ["Why now", "#why-now"],
            ["Benefits", "#benefits"],
            ["How it works", "#how-it-works"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="text-muted-foreground hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
