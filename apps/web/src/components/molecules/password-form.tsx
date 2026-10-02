"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Eye, EyeOff, MailCheck } from "lucide-react";
import { SubmitButton } from "@/components/atoms/submit-button";
import { Input } from "@/components/ui/input";
import { PASSWORD_MIN_LENGTH, type AuthFormAction } from "@/lib/auth-rules";

const MODES = {
  "sign-up": { submit: "Create my account", pending: "Creating…", autoComplete: "new-password" },
  "sign-in": { submit: "Sign in", pending: "Signing in…", autoComplete: "current-password" },
  "new-password": {
    submit: "Save my new password",
    pending: "Saving…",
    autoComplete: "new-password",
  },
} as const;

const inputClass =
  "h-14 rounded-xl border-muted-foreground bg-surface px-4 text-base placeholder:text-muted-foreground";

/** Email and password (or only a new password), sent to a Server Action. */
export function PasswordForm({
  mode,
  action,
}: {
  mode: keyof typeof MODES;
  action: AuthFormAction;
}) {
  const [state, formAction] = useActionState(action, {});
  const [visible, setVisible] = useState(false);
  // Kept in state: React empties a form's fields after its action runs (the password is retyped).
  const [email, setEmail] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.error)
      formRef.current?.querySelector<HTMLInputElement>("input:not([type=hidden])")?.focus();
  }, [state]);
  const { submit, pending, autoComplete } = MODES[mode];
  const choosing = mode !== "sign-in";

  if (state.sentTo) {
    return (
      <p role="status" className="flex gap-2 rounded-xl bg-mint-soft p-4 text-sm text-foreground">
        <MailCheck className="mt-0.5 size-4 shrink-0 text-market-up" aria-hidden />
        <span className="min-w-0 break-words">
          Check your inbox: we sent a link to <strong>{state.sentTo}</strong> to confirm your email.
          Open it in this browser to finish creating your account.
        </span>
      </p>
    );
  }
  return (
    <form ref={formRef} action={formAction} noValidate>
      {mode !== "new-password" && (
        <>
          <label htmlFor="auth-email" className="mb-2 block text-sm font-bold">
            Email address
          </label>
          <Input
            id="auth-email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            placeholder="you@example.com"
            aria-invalid={state.error ? true : undefined}
            aria-describedby="auth-status"
            className={`${inputClass} mb-4`}
          />
        </>
      )}
      <label htmlFor="auth-password" className="mb-2 block text-sm font-bold">
        {mode === "new-password" ? "New password" : "Password"}
      </label>
      <div className="relative">
        <Input
          id="auth-password"
          name="password"
          type={visible ? "text" : "password"}
          required
          autoComplete={autoComplete}
          minLength={choosing ? PASSWORD_MIN_LENGTH : undefined}
          aria-invalid={state.error ? true : undefined}
          aria-describedby={choosing ? "auth-password-hint auth-status" : "auth-status"}
          className={`${inputClass} pr-14`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          aria-controls="auth-password"
          className="absolute inset-y-0 right-1 my-auto grid size-11 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          {visible ? (
            <EyeOff className="size-5" aria-hidden />
          ) : (
            <Eye className="size-5" aria-hidden />
          )}
        </button>
      </div>
      {choosing && (
        <p id="auth-password-hint" className="mt-2 text-xs text-muted-foreground">
          At least {PASSWORD_MIN_LENGTH} characters.
        </p>
      )}
      <p id="auth-status" aria-live="polite" className="mt-2 min-h-5 text-sm text-destructive">
        {state.error}
      </p>
      <SubmitButton pendingLabel={pending} className="mt-2 w-full">
        {submit}
      </SubmitButton>
    </form>
  );
}
