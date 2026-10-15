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

export function EarlyAccessForm({ t }: { t: Dictionary["earlyAccess"] }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "complete" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || status === "saving") return;
    setStatus("saving");
    track("beta_signup_submitted", { source: "early_access" });
    try {
      const { error } = await getSupabase().rpc("join_waitlist", {
        email: email.trim().toLowerCase(),
        source: "early_access",
      });
      if (error) throw error;
    } catch (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    track("beta_signup_completed", { source: "early_access" });
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
