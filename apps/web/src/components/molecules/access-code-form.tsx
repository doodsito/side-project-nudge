"use client";

import { useActionState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { SubmitButton } from "@/components/atoms/submit-button";
import { Input } from "@/components/ui/input";
import type { AuthFormAction } from "@/lib/auth";

export function AccessCodeForm({ action }: { action: AuthFormAction }) {
  const [state, formAction] = useActionState(action, {});
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (state.error) inputRef.current?.focus();
  }, [state]);
  return (
    <form action={formAction} noValidate>
      <label htmlFor="access-code" className="mb-2 block text-sm font-bold">
        Access code
      </label>
      <Input
        ref={inputRef}
        id="access-code"
        name="code"
        required
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        placeholder="Your code…"
        aria-invalid={state.error ? true : undefined}
        aria-describedby={state.error ? "access-code-error" : undefined}
        className="h-14 rounded-xl border-muted-foreground bg-surface px-4 text-base uppercase placeholder:normal-case placeholder:text-muted-foreground"
      />
      <p
        id="access-code-error"
        className="mt-2 min-h-5 text-sm text-destructive"
        aria-live="polite"
      >
        {state.error}
      </p>
      <SubmitButton pendingLabel="Checking…" className="group mt-2 w-full">
        Continue{" "}
        <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
      </SubmitButton>
    </form>
  );
}
