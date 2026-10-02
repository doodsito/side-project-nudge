"use client";

import { useActionState, useEffect, useRef } from "react";
import { MailCheck } from "lucide-react";
import { SubmitButton } from "@/components/atoms/submit-button";
import { Input } from "@/components/ui/input";
import type { AuthFormAction } from "@/lib/auth";

export function EmailSignInForm({ action }: { action: AuthFormAction }) {
  const [state, formAction] = useActionState(action, {});
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (state.error) inputRef.current?.focus();
  }, [state]);
  return (
    <form action={formAction} noValidate>
      <label htmlFor="sign-in-email" className="mb-2 block text-sm font-bold">
        Email address
      </label>
      <Input
        ref={inputRef}
        id="sign-in-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        spellCheck={false}
        defaultValue={state.sentTo}
        placeholder="you@example.com"
        aria-invalid={state.error ? true : undefined}
        aria-describedby="sign-in-email-status"
        className="h-14 rounded-xl border-muted-foreground bg-surface px-4 text-base placeholder:text-muted-foreground"
      />
      <div id="sign-in-email-status" aria-live="polite" className="mt-2 min-h-5 text-sm">
        {state.error && <p className="text-destructive">{state.error}</p>}
        {state.sentTo && (
          <p className="flex gap-2 rounded-xl bg-mint-soft p-3 text-foreground">
            <MailCheck className="mt-0.5 size-4 shrink-0 text-market-up" aria-hidden />
            <span className="min-w-0 break-words">
              Check your inbox: we sent a sign-in link to <strong>{state.sentTo}</strong>. Open it
              in this browser to continue.
            </span>
          </p>
        )}
      </div>
      <SubmitButton pendingLabel="Sending…" variant="outline" className="mt-2 w-full">
        {state.sentTo ? "Send the link again" : "Email me a sign-in link"}
      </SubmitButton>
    </form>
  );
}
