"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Scale, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { EarlyAccessForm } from "@/components/marketing/early-access-form";
import { Section } from "@/components/marketing/section";
import { LandingLessonPreview } from "@/components/marketing/landing-lesson-preview";
import "./landing-refinement.css";
import { landingCopy } from "@/lib/dictionaries/landing";
import type { Dictionary } from "@/lib/dictionaries";

function Companion({
  pose,
  className,
}: {
  pose: "welcome" | "curious" | "encourage";
  className?: string;
}) {
  return (
    <Image
      src={`/brand/mascot/nudge-${pose}.webp`}
      alt=""
      width={1305}
      height={1205}
      sizes="(max-width: 640px) 140px, 200px"
      className={className}
    />
  );
}

export function LandingContent({
  track,
  earlyAccess,
}: {
  track: "fr" | "us";
  earlyAccess: Dictionary["earlyAccess"];
}) {
  const t = landingCopy[track];
  const [open, setOpen] = useState(false);

  return (
    <div className="landing-refined">
      <section id="top" className="px-5 pt-28 pb-20 sm:px-8 sm:pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h1 className="mt-5 font-display text-4xl leading-tight font-extrabold sm:text-5xl lg:text-6xl">
              {t.hero[1]} <span className="text-primary">{t.hero[2]}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t.hero[3]}
            </p>
            <div id="early-access" className="mt-8 scroll-mt-28">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    {t.cta}
                    <ArrowRight aria-hidden />
                  </Button>
                </DialogTrigger>
                <DialogContent className="waitlist-dialog max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl">
                  <Companion pose="welcome" className="mx-auto h-auto w-24" />
                  <DialogTitle className="pr-6 font-display text-2xl font-extrabold">
                    {earlyAccess.title}
                  </DialogTitle>
                  <DialogDescription>{earlyAccess.text}</DialogDescription>
                  <EarlyAccessForm t={earlyAccess} />
                </DialogContent>
              </Dialog>
              <p className="mt-3 text-sm text-muted-foreground">{t.note}</p>
            </div>
          </div>
          <div className="investing-worlds" role="img" aria-label={t.worlds.description}>
            <svg className="world-route" viewBox="0 0 440 360" aria-hidden="true">
              <path
                d="M65 265 C120 265 125 165 215 165 S310 65 375 65"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="6 10"
              />
            </svg>
            {[ShieldCheck, Scale, Layers].map((Icon, i) => (
              <div className={"investing-world world-" + i} key={i}>
                <div className="world-platform">
                  <Icon aria-hidden size={30} />
                </div>
                <strong>{t.worlds.labels[i]}</strong>
              </div>
            ))}
            <div className="world-companion">
              <Companion pose="encourage" className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>
      <Section id="problem" className="landing-problem">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              {t.problem[1]}
            </h2>
          </div>
          <div className="grid gap-5 text-lg leading-relaxed text-muted-foreground">
            <p>{t.problem[2]}</p>
            <p>{t.problem[3]}</p>
          </div>
        </div>
      </Section>
      <Section id="solution" className="landing-solution">
        <div className="grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">
              {t.solution[1]}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t.solution[2]}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t.solution[3]}</p>
          </div>
          <div className="solution-scene">
            <LandingLessonPreview track={track} />
            <Companion pose="curious" className="solution-side-companion" />
          </div>
        </div>
      </Section>
      <Section id="benefits" className="landing-benefits">
        <h2 className="max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">
          {t.benefitsTitle}
        </h2>
        <div className="benefit-list">
          {t.benefits.map(([title, text]) => (
            <div key={title} className="benefit-row">
              <h3 className="font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section id="how-it-works" className="bg-ink text-ink-foreground">
        <h2 className="max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">{t.howTitle}</h2>
        <div className="learning-steps">
          {t.steps.map(([title, text], i) => (
            <div key={title} className="learning-step">
              <span className="font-bold text-secondary">0{i + 1}</span>
              <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section id="beta-access" className="landing-access">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold">{t.accessTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.access}</p>
        </div>
      </Section>
      <Section id="questions" className="landing-faq">
        <div className="grid gap-8 md:grid-cols-[.6fr_1fr]">
          <h2 className="font-display text-3xl font-extrabold">{t.faqTitle}</h2>
          <Accordion type="single" collapsible>
            {t.faq.map(([q, a], i) => (
              <AccordionItem key={q} value={String(i)}>
                <AccordionTrigger className="text-left text-base">{q}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
      <Section className="landing-end">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{t.end[0]}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.end[1]}</p>
        </div>
      </Section>
    </div>
  );
}
