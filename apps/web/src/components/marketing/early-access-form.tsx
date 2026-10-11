"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabase } from "@/integrations/supabase/client";
import { track } from "@/lib/analytics";
import { BRAND } from "@/lib/brand";
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
      event.currentTarget.querySelector<HTMLInputElement>('input[name="profile"]')?.focus();
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
      <fieldset className="mb-3" aria-describedby={profileMissing ? "profile-error" : undefined}>
        <legend className="mb-2 text-sm font-bold">Which describes you best?</legend>
        <div className="flex flex-wrap gap-2">
          {PROFILES.map(([value, label]) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                name="profile"
                value={value}
                checked={profile === value}
                aria-describedby={profileMissing ? "profile-error" : undefined}
                onChange={() => {
                  setProfile(value);
                  setProfileMissing(false);
                }}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border border-muted-foreground bg-surface px-4 py-2 text-sm font-bold transition-colors",
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
          <p id="profile-error" className="mt-2 text-sm text-destructive" role="alert">
            Choose the option that describes you best.
          </p>
        )}
      </fieldset>
      <label htmlFor="early-access-email" className="mb-2 block text-sm font-bold">
        Email address
      </label>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <Input
          id="early-access-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="h-14 rounded-xl border-muted-foreground bg-surface px-4 text-base placeholder:text-muted-foreground"
        />
        <Button
          type="submit"
          size="lg"
          disabled={status === "saving"}
          className="group h-14 active:scale-[.98]"
        >
          {status === "saving" ? (
            <>
              <LoaderCircle className="size-4 animate-spin" /> Joining…
            </>
          ) : (
            <>
              Join early access{" "}
              <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
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
        We’ll only email you about early access and the launch of {BRAND}. You can leave the list at
        any time. You must be 15 or older.{" "}
        <Link
          href="/privacy-policy"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Privacy policy
        </Link>
      </p>
    </form>
  );
}
