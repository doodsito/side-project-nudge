"use client";

// The state of the /practice page. It lives next to its page because no other
// page uses it; the screens it imports run on the client through this file.
import { useEffect, useState } from "react";
import { LearningProfile } from "@/components/organisms/learning-profile";
import { LearningSummary } from "@/components/organisms/learning-summary";
import { PersonalizedFeedback } from "@/components/organisms/personalized-feedback";
import { PracticeScenario } from "@/components/organisms/practice-scenario";
import { PracticeTemplate } from "@/components/templates/practice-template";
import { track } from "@/lib/analytics";
import type { Decision, Profile, Step } from "@/lib/practice-scenario";

export function PracticeFlow() {
  const [step, setStep] = useState<Step>("profile");
  const [profile, setProfile] = useState<Profile>({});
  const [decision, setDecision] = useState<Decision | null>(null);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [step]);
  const answered = Object.keys(profile).length;
  function reset() {
    setProfile({});
    setDecision(null);
    setStep("profile");
  }
  return (
    <PracticeTemplate step={step}>
      {step === "profile" && (
        <LearningProfile
          profile={profile}
          answered={answered}
          onSelect={(k, v) => setProfile((p) => ({ ...p, [k]: v }))}
          onContinue={() => setStep("scenario")}
        />
      )}{" "}
      {step === "scenario" && (
        <PracticeScenario
          decision={decision}
          onSelect={setDecision}
          onBack={() => setStep("profile")}
          onContinue={() => {
            if (decision) {
              track("demo_decision_confirmed", { decision });
              setStep("feedback");
            }
          }}
        />
      )}{" "}
      {step === "feedback" && decision && (
        <PersonalizedFeedback
          profile={profile as Required<Profile>}
          decision={decision}
          onBack={() => setStep("scenario")}
          onContinue={() => {
            track("demo_completed", { decision });
            setStep("summary");
          }}
        />
      )}{" "}
      {step === "summary" && (
        <LearningSummary
          profile={profile as Required<Profile>}
          onReset={reset}
          onEdit={() => setStep("profile")}
        />
      )}
    </PracticeTemplate>
  );
}
