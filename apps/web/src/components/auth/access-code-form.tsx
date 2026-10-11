"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import type { AuthFormAction } from "@/lib/auth-rules";
import type { Dictionary } from "@/lib/dictionaries";

export function AccessCodeForm({
  action,
  t,
}: {
  action: AuthFormAction;
  t: Dictionary["auth"]["form"];
}) {
  const [state, formAction] = useActionState(action, {});
  // Kept in state: React empties a form's fields after its action runs.
  const [code, setCode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (state.error) inputRef.current?.focus();
  }, [state]);
  return (
    <form action={formAction} noValidate>
      <label htmlFor="invitation-code" className="mb-2 block text-sm font-bold">
        {t.code}
      </label>
      <Input
        ref={inputRef}
        id="invitation-code"
        name="code"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        required
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        placeholder={t.codePlaceholder}
        aria-invalid={state.error ? true : undefined}
        aria-describedby={state.error ? "invitation-code-error" : undefined}
        className="h-14 rounded-xl border-muted-foreground bg-surface px-4 text-base uppercase placeholder:normal-case placeholder:text-muted-foreground"
      />
      <p
        id="invitation-code-error"
        className="mt-2 min-h-5 text-sm text-destructive"
        aria-live="polite"
      >
        {state.error}
      </p>
      <SubmitButton pendingLabel={t.codePending} className="group mt-2 w-full">
        {t.codeSubmit}{" "}
        <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
      </SubmitButton>
    </form>
  );
}
