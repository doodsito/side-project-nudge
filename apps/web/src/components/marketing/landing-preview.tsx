"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { landingPreviewTestimonials } from "@/lib/landing-preview-content";
import { BRAND } from "@/lib/brand";
import { useHasSession } from "@/hooks/use-has-session";
import { FAQSection } from "@/components/marketing/faq-section";
import { AnimatedPoggo } from "@/components/marketing/animated-poggo";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./landing-preview.module.css";

const heroScreens = [
  {
    src: "/brand/landing-preview/worlds-first-world.png",
    alt: "Écran des mondes d’apprentissage Nudge",
    label: "les mondes d’apprentissage",
    width: 390,
    height: 844,
  },
  {
    src: "/brand/landing-preview/learning-path-screen.png",
    alt: "Carte du parcours d’apprentissage Nudge",
    label: "le parcours d’apprentissage",
    width: 390,
    height: 844,
  },
  {
    src: "/brand/landing-preview/lesson-complete-screen.png",
    alt: "Écran de fin de leçon avec une évaluation par étoiles",
    label: "la fin d’une leçon",
    width: 390,
    height: 775,
  },
] as const;

function HeroAction() {
  const signedIn = useHasSession();

  return (
    <Button asChild size="lg" className={styles["hero-action"]}>
      <Link href={signedIn ? "/dashboard/courses" : "/signup"}>
        Commencer à apprendre
        <ArrowRight aria-hidden />
      </Link>
    </Button>
  );
}

function CredibilityStrip({ copy }: { copy: string }) {
  return (
    <aside className={styles["credibility"]} aria-label={`À propos de l’équipe ${BRAND}`}>
      <div className={styles["credibility-logos"]} aria-hidden="true">
        <Image
          src="/brand/berkeley-college-of-engineering.png"
          alt=""
          width={3000}
          height={728}
          sizes="(max-width: 639px) 120px, 220px"
          className={styles["credibility-logo"]}
        />
        <Image
          src="https://www.societegenerale.com/sites/default/files/image/2023-04/logo-societe-generale.png"
          alt=""
          width={1220}
          height={248}
          unoptimized
          sizes="(max-width: 639px) 120px, 220px"
          className={styles["credibility-logo"]}
        />
        <Image
          src="https://www.skema.edu/sites/default/files/2024-05/logo-skema-266x92px-cp-fond-blanc.jpg"
          alt=""
          width={266}
          height={92}
          unoptimized
          sizes="(max-width: 639px) 120px, 220px"
          className={styles["credibility-logo"]}
        />
      </div>
      <div>
        <p>{copy}</p>
      </div>
    </aside>
  );
}

function TestimonialMarquee({ source }: { source: Dictionary["previewTestimonialsSource"] }) {
  return (
    <section className={styles["testimonials"]} aria-labelledby="preview-testimonials-title">
      <div className={styles["testimonial-heading"]}>
        <h2 id="preview-testimonials-title">Ce qu’en pensent les personnes qui testent {BRAND}.</h2>
        <p className={styles["testimonial-source"]}>{source}</p>
      </div>
      <Marquee
        className={styles["testimonial-viewport"]}
        trackClassName={styles["testimonial-track"]}
        duplicateClassName={styles["testimonial-duplicate"]}
        ariaLabel="Témoignages des personnes en bêta. Fais défiler horizontalement pour les lire."
      >
        {landingPreviewTestimonials.map((testimonial, index) => (
          <figure className={styles["testimonial-card"]} key={testimonial.quote}>
            <div className={styles["testimonial-avatar"]} data-avatar={index % 4} aria-hidden />
            <blockquote>{testimonial.quote}</blockquote>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}

function Marquee({
  children,
  className,
  trackClassName,
  duplicateClassName,
  ariaLabel,
}: {
  children: ReactNode;
  className: string | undefined;
  trackClassName: string | undefined;
  duplicateClassName: string | undefined;
  ariaLabel: string;
}) {
  return (
    <div className={className} role="region" aria-label={ariaLabel} tabIndex={0}>
      <div className={trackClassName}>
        {children}
        <div className={duplicateClassName} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

function CurriculumSection({ curriculum }: { curriculum: Dictionary["previewCurriculum"] }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = curriculum.steps[activeStepIndex];

  return (
    <section className={styles["curriculum"]} aria-labelledby="preview-curriculum-title">
      <div className={styles["curriculum-heading"]}>
        <h2 id="preview-curriculum-title">{curriculum.title}</h2>
        <p>{curriculum.description}</p>
      </div>
      <div className={styles["curriculum-tabs"]} role="group" aria-label={curriculum.title}>
        {curriculum.steps.map((step, index) => (
          <button
            aria-pressed={activeStepIndex === index}
            className={styles["curriculum-tab"]}
            key={step.label}
            onClick={() => setActiveStepIndex(index)}
            type="button"
          >
            {step.label}
          </button>
        ))}
      </div>
      {activeStep && (
        <div className={styles["curriculum-panel"]} aria-live="polite">
          <div className={styles["curriculum-topics"]}>
            <h3>{curriculum.topicsLabel}</h3>
            <ul key={activeStep.label}>
              {activeStep.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
          <div className={styles["curriculum-map"]} aria-hidden="true">
            <p>{activeStep.title}</p>
            <div className={styles["curriculum-path"]} data-step={activeStepIndex}>
              <span className={styles["curriculum-track"]} />
              <span className={styles["curriculum-marker"]} />
              {curriculum.steps.map((step, index) => (
                <span
                  className={styles["curriculum-node"]}
                  data-active={activeStepIndex === index}
                  key={step.label}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
            <span className={styles["curriculum-map-caption"]}>{activeStep.label}</span>
          </div>
        </div>
      )}
    </section>
  );
}

export function LandingPreview({
  faq,
  closingCopy,
  credibility,
  companion,
  curriculum,
  testimonialSource,
}: {
  faq: Dictionary["faq"];
  closingCopy: Dictionary["previewClosingCta"];
  credibility: Dictionary["previewCredibility"];
  companion: Dictionary["previewCompanion"];
  curriculum: Dictionary["previewCurriculum"];
  testimonialSource: Dictionary["previewTestimonialsSource"];
}) {
  return (
    <div className={styles["preview"]}>
      <section className={styles["hero"]} aria-labelledby="preview-hero-title">
        <div className={styles["hero-copy"]}>
          <h1 id="preview-hero-title">
            Apprends à investir,
            <span> simplement.</span>
          </h1>
          <p>
            Des leçons courtes, des mondes à explorer et un portefeuille virtuel pour apprendre en
            faisant.
          </p>
          <HeroAction />
        </div>
        <div className={styles["phone-scene"]}>
          <div className={styles["phone-group"]}>
            {heroScreens.map((screen, index) => {
              const positionClass =
                index === 1 ? "phone-center" : index === 0 ? "phone-left" : "phone-right";

              return (
                <figure
                  className={`${styles["phone-card"]} ${styles[positionClass]}`}
                  data-screen={index}
                  key={screen.src}
                  aria-label={screen.label}
                >
                  <div className={styles["phone-frame"]}>
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      width={screen.width}
                      height={screen.height}
                      unoptimized
                      loading="eager"
                      sizes="(max-width: 639px) max(120px, min(29vw, 160px)), (max-width: 800px) 11rem, 13rem"
                      className={styles["phone-screen"]}
                    />
                  </div>
                </figure>
              );
            })}
          </div>
        </div>
      </section>
      <CurriculumSection curriculum={curriculum} />
      <CredibilityStrip copy={credibility} />
      <section className={styles["companion"]} aria-labelledby="preview-companion-title">
        <AnimatedPoggo className={styles["companion-poggo"] ?? ""} />
        <h2 id="preview-companion-title">{companion}</h2>
      </section>
      <TestimonialMarquee source={testimonialSource} />
      <FAQSection t={faq} className="bg-card" layout="centered" />
      <ClosingAction copy={closingCopy} />
    </div>
  );
}

function ClosingAction({ copy }: { copy: Dictionary["previewClosingCta"] }) {
  const signedIn = useHasSession();

  return (
    <section className={styles["closing"]} aria-labelledby="preview-closing-title">
      <div className={styles["closing-inner"]}>
        <h2 id="preview-closing-title" className={styles["closing-title"]}>
          {copy.title}
        </h2>
        <Button asChild size="lg" className={styles["closing-action"]}>
          <Link href={signedIn ? "/dashboard/courses" : "/signup"}>
            {copy.cta}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  );
}
