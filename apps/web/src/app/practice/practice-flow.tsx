"use client";

// The state of the /practice page. It lives next to its page because no other
// page uses it; the screens it imports run on the client through this file.
import { useEffect, useRef, useState } from "react";
import { LearningProfile } from "@/components/organisms/learning-profile";
import { LearningSummary } from "@/components/organisms/learning-summary";
import { PersonalizedFeedback } from "@/components/organisms/personalized-feedback";
import { PracticeScenario } from "@/components/organisms/practice-scenario";
import { PracticeTemplate } from "@/components/templates/practice-template";
import { track } from "@/lib/analytics";
import {
  isCompleteProfile,
  resolveStep,
  updateProfile,
  type Decision,
  type Profile,
  type Step,
} from "@/lib/practice-scenario";

export function PracticeFlow() {
  const [step, setStep] = useState<Step>("scenario");
  const [profile, setProfile] = useState<Profile>({});
  const [decision, setDecision] = useState<Decision | null>(null);
  const content = useRef<HTMLDivElement>(null);
  const complete = isCompleteProfile(profile);
  useEffect(() => {
    // A direct link or refresh starts a new session; no personal answers go in the URL.
    window.history.replaceState(window.history.state, "", "#scenario");
  }, []);
  useEffect(() => {
    function restoreStep() {
      const target = resolveStep(window.location.hash.slice(1), profile, decision);
      setStep(target);
      if (window.location.hash !== `#${target}`) {
        window.history.replaceState(window.history.state, "", `#${target}`);
      }
    }
    window.addEventListener("popstate", restoreStep);
    return () => window.removeEventListener("popstate", restoreStep);
  }, [profile, decision]);
  function navigate(target: Step) {
    const next = resolveStep(target, profile, decision);
    if (next !== step) window.history.pushState(window.history.state, "", `#${next}`);
    setStep(next);
  }
  useEffect(() => {
    const heading = content.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [step]);
  function reset() {
    setDecision(null);
    navigate("scenario");
  }
  function startOver() {
    setProfile({});
    setDecision(null);
    navigate("scenario");
  }
  return (
    <PracticeTemplate step={step}>
      <div ref={content} className="[&_h1]:scroll-mt-32 [&_h1]:focus:outline-none">
        {step === "profile" && (
          <LearningProfile
            profile={profile}
            onSelect={(k, v) => setProfile((p) => updateProfile(p, k, v))}
            onBack={() => navigate("summary")}
            onContinue={() => {
              if (complete) {
                track("practice_profile_completed");
                navigate("scenario");
              }
            }}
          />
        )}{" "}
        {step === "scenario" && (
          <PracticeScenario
            decision={decision}
            onSelect={setDecision}
            onEditProfile={complete ? () => navigate("profile") : undefined}
            onContinue={() => {
              if (decision) {
                track("demo_decision_confirmed", { decision });
                navigate("feedback");
              }
            }}
          />
        )}{" "}
        {step === "feedback" && decision && (
          <PersonalizedFeedback
            profile={complete ? profile : null}
            decision={decision}
            onBack={() => navigate("scenario")}
            onContinue={() => {
              track("practice_explanation_read");
              navigate("summary");
            }}
          />
        )}{" "}
        {step === "summary" && decision && (
          <LearningSummary
            hasProfile={complete}
            onReset={reset}
            onEdit={() => navigate("profile")}
            onStartOver={startOver}
          />
        )}
      </div>
    </PracticeTemplate>
  );
}
