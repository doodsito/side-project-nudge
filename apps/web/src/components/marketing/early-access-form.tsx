"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { textLinkClass } from "@/components/shared/text-link";
import { getSupabase } from "@/integrations/supabase/client";
import { track } from "@/lib/analytics";
import type { Dictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

const PROFILES = ["student", "young_professional", "other"] as const;
type Profile = (typeof PROFILES)[number];

export function EarlyAccessForm({ t }: { t: Dictionary["earlyAccess"] }) {
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
        {t.done}
      </div>
    );
  return (
    <form onSubmit={submit} className="w-full max-w-xl">
      <fieldset className="mb-3" aria-describedby={profileMissing ? "profile-error" : undefined}>
        <legend className="mb-2 text-sm font-bold">{t.profileLegend}</legend>
        <div className="flex flex-wrap gap-2">
          {PROFILES.map((value) => (
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
                {t.profiles[value]}
              </span>
            </label>
          ))}
        </div>
        {profileMissing && (
          <p id="profile-error" className="mt-2 text-sm text-destructive" role="alert">
            {t.profileError}
          </p>
        )}
      </fieldset>
      <label htmlFor="early-access-email" className="mb-2 block text-sm font-bold">
        {t.emailLabel}
      </label>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <Input
          id="early-access-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t.emailPlaceholder}
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
              <LoaderCircle className="size-4 animate-spin" /> {t.saving}
            </>
          ) : (
            <>
              {t.submit}{" "}
              <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
            </>
          )}
        </Button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {t.error}
        </p>
      )}
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {t.consent}{" "}
        <Link href="/privacy-policy" className={textLinkClass}>
          {t.privacy}
        </Link>
      </p>
    </form>
  );
}
