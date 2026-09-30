"use client";

import { useState, type FormEvent } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabase } from "@/integrations/supabase/client";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const PROFILES = [
  ["student", "Student"],
  ["young_professional", "Young professional"],
  ["other", "Other"],
] as const;
type Profile = (typeof PROFILES)[number][0];

export function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileMissing, setProfileMissing] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "complete" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || status === "saving") return;
    if (!profile) {
      setProfileMissing(true);
      return;
    }
    setStatus("saving");
    track("beta_signup_submitted", { source: "early_access" });
    try {
      const { error } = await getSupabase().rpc("join_waitlist", {
        email: email.trim().toLowerCase(),
        profile,
        source: "early_access",
      });
      if (error) throw error;
    } catch (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    track("beta_signup_completed", { source: "early_access", profile });
    setStatus("complete");
  }
  if (status === "complete")
    return (
      <div
        className="animate-slide-up flex min-h-14 items-center gap-3 rounded-xl border border-mint/40 bg-mint-soft px-5 text-sm font-bold text-market-up"
        role="status"
      >
        <span className="grid size-7 place-items-center rounded-full bg-surface">
          <Check className="size-4" aria-hidden />
        </span>
        You’re on the list.
      </div>
    );
  return (
    <form onSubmit={submit} className="w-full max-w-xl">
      <fieldset className="mb-3">
        <legend className="mb-2 text-sm font-bold">Which describes you best?</legend>
        <div className="flex flex-wrap gap-2">
          {PROFILES.map(([value, label]) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                name="profile"
                value={value}
                checked={profile === value}
                onChange={() => {
                  setProfile(value);
                  setProfileMissing(false);
                }}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "inline-flex h-10 items-center rounded-full border border-border-strong bg-surface px-4 text-sm font-bold transition-colors",
                  "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                )}
              >
                {label}
              </span>
            </label>
          ))}
        </div>
        {profileMissing && (
          <p className="mt-2 text-sm text-destructive" role="alert">
            Choose the option that describes you best.
          </p>
        )}
      </fieldset>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label htmlFor="early-access-email" className="sr-only">
          Email address
        </label>
        <Input
          id="early-access-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="h-14 rounded-xl border-border-strong bg-surface px-4 text-base placeholder:text-muted-foreground"
        />
        <Button
          type="submit"
          disabled={status === "saving"}
          className="group h-14 rounded-xl px-6 text-base font-bold shadow-soft active:scale-[.98]"
        >
          {status === "saving" ? (
            <>
              <LoaderCircle className="size-4 animate-spin" /> Joining…
            </>
          ) : (
            <>
              Join early access{" "}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </>
          )}
        </Button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-destructive" role="alert">
          We couldn’t save your place just now. Please try again.
        </p>
      )}
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Receive product and early-access updates from Nudge. You will be able to unsubscribe at any
        time.
      </p>
    </form>
  );
}
