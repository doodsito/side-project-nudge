"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
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

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia(reducedMotionQuery);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerMotionSnapshot() {
  return true;
}

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
          src="/brand/skema-business-school.png"
          alt=""
          width={572}
          height={151}
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
  const [activePhoneIndex, setActivePhoneIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotionSnapshot,
    getServerMotionSnapshot,
  );
  const phoneSceneRef = useRef<HTMLDivElement>(null);
  const activePhoneRef = useRef(1);
  const touchStartXRef = useRef<number | null>(null);
  const lastWheelChangeRef = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;

    const focusWorlds = window.setTimeout(() => {
      activePhoneRef.current = 0;
      setActivePhoneIndex(0);
    }, 1000);
    const focusLessonComplete = window.setTimeout(() => {
      activePhoneRef.current = 2;
      setActivePhoneIndex(2);
    }, 2000);
    const stopAutoPlay = window.setTimeout(() => setIsAutoPlaying(false), 3000);

    return () => {
      window.clearTimeout(focusWorlds);
      window.clearTimeout(focusLessonComplete);
      window.clearTimeout(stopAutoPlay);
    };
  }, [isAutoPlaying, reducedMotion]);

  useEffect(() => {
    const phoneScene = phoneSceneRef.current;
    if (!phoneScene) return;

    function handleWheel(event: WheelEvent) {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < 12) return;

      const nextIndex = Math.max(
        0,
        Math.min(heroScreens.length - 1, activePhoneRef.current + Math.sign(delta)),
      );
      if (nextIndex === activePhoneRef.current) return;

      event.preventDefault();
      setIsAutoPlaying(false);
      const now = Date.now();
      if (now - lastWheelChangeRef.current < 650) return;

      lastWheelChangeRef.current = now;
      activePhoneRef.current = nextIndex;
      setActivePhoneIndex(nextIndex);
    }

    phoneScene.addEventListener("wheel", handleWheel, { passive: false });
    return () => phoneScene.removeEventListener("wheel", handleWheel);
  }, []);

  function movePhoneFocus(direction: -1 | 1) {
    const nextIndex = Math.max(
      0,
      Math.min(heroScreens.length - 1, activePhoneRef.current + direction),
    );
    if (nextIndex === activePhoneRef.current) return;

    setIsAutoPlaying(false);
    activePhoneRef.current = nextIndex;
    setActivePhoneIndex(nextIndex);
  }

  function handlePhoneKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      movePhoneFocus(1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      movePhoneFocus(-1);
    }
  }

  function handlePhoneTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const startX = touchStartXRef.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartXRef.current = null;
    if (startX === null || endX === undefined) return;

    const distance = endX - startX;
    if (Math.abs(distance) > 42) movePhoneFocus(distance < 0 ? 1 : -1);
  }

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
        <div
          aria-label="Trois écrans de Nudge. Faites défiler ou glissez pour passer de l’un à l’autre."
          className={styles["phone-scene"]}
          onKeyDown={handlePhoneKeyDown}
          onTouchEnd={handlePhoneTouchEnd}
          onTouchStart={(event) => {
            touchStartXRef.current = event.touches[0]?.clientX ?? null;
          }}
          ref={phoneSceneRef}
          role="region"
          tabIndex={0}
        >
          <div className={styles["phone-group"]}>
            {heroScreens.map((screen, index) => {
              const positionClass =
                index === activePhoneIndex
                  ? "phone-center"
                  : index === (activePhoneIndex + 1) % heroScreens.length
                    ? "phone-right"
                    : "phone-left";

              return (
                <figure
                  className={`${styles["phone-card"]} ${styles[positionClass]}`}
                  data-active={index === activePhoneIndex}
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
      <FAQSection t={faq} className={`${styles["faq"] ?? ""} bg-card`} layout="centered" />
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
