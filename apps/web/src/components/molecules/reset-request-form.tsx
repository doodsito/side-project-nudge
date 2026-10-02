"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { MailCheck } from "lucide-react";
import { SubmitButton } from "@/components/atoms/submit-button";
import { Input } from "@/components/ui/input";
import type { AuthFormAction } from "@/lib/auth-rules";

/** "Forgot your password?": asks for the email that should receive a reset link. */
export function ResetRequestForm({ action }: { action: AuthFormAction }) {
  const [state, formAction] = useActionState(action, {});
  // Kept in state: React empties a form's fields after its action runs.
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (state.error) inputRef.current?.focus();
  }, [state]);
  return (
    <form action={formAction} noValidate>
      <label htmlFor="reset-email" className="mb-2 block text-sm font-bold">
        Email address
      </label>
      <Input
        ref={inputRef}
        id="reset-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        spellCheck={false}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        aria-invalid={state.error ? true : undefined}
        aria-describedby="reset-email-status"
        className="h-14 rounded-xl border-muted-foreground bg-surface px-4 text-base placeholder:text-muted-foreground"
      />
      <div id="reset-email-status" aria-live="polite" className="mt-2 min-h-5 text-sm">
        {state.error && <p className="text-destructive">{state.error}</p>}
        {state.sentTo && (
          <p className="flex gap-2 rounded-xl bg-mint-soft p-3 text-foreground">
            <MailCheck className="mt-0.5 size-4 shrink-0 text-market-up" aria-hidden />
            <span className="min-w-0 break-words">
              If an account uses <strong>{state.sentTo}</strong>, we sent it a link to choose a new
              password. Open it in this browser.
            </span>
          </p>
        )}
      </div>
      <SubmitButton pendingLabel="Sending…" className="mt-2 w-full">
        {state.sentTo ? "Send the link again" : "Send me a reset link"}
      </SubmitButton>
    </form>
  );
}
