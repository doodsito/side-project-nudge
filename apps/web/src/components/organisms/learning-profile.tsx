import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { ProfileQuestion } from "@/components/molecules/profile-question";
import { QUESTIONS, type Profile } from "@/lib/practice-scenario";
import { cn } from "@/lib/utils";

export function LearningProfile({
  profile,
  answered,
  onSelect,
  onContinue,
}: {
  profile: Profile;
  answered: number;
  onSelect: (k: keyof Profile, v: string) => void;
  onContinue: () => void;
}) {
  return (
    <div className="animate-rise">
      <Eyebrow>Your learning profile</Eyebrow>
      <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold sm:text-5xl">
        The same decision does not fit everyone.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Four details help Nudge explain what a market decision could mean for you. You can change
        them at any time.
      </p>
      <div className="mt-8 rounded-2xl border border-border bg-surface p-4">
        <div className="flex justify-between text-sm font-bold">
          <span>Learning profile</span>
          <span className="text-primary">{answered} / 4 answered</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${answered * 25}%` }}
          />
        </div>
      </div>
      <div className="mt-8 space-y-5">
        {QUESTIONS.map((q) => (
          <ProfileQuestion
            key={q.key}
            question={q}
            value={profile[q.key]}
            onSelect={(v) => onSelect(q.key, v)}
            attention={!profile[q.key] && QUESTIONS.find((x) => !profile[x.key])?.key === q.key}
          />
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        This is not a suitability assessment. It only personalises the educational explanation in
        this demo.
      </p>
      <Button
        size="xl"
        disabled={answered < 4}
        onClick={onContinue}
        className={cn("mt-5 w-full sm:w-auto", answered === 4 && "animate-ready")}
      >
        Build my learning profile <ArrowRight />
      </Button>
    </div>
  );
}
