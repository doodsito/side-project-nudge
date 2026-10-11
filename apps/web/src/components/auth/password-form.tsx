"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Eye, EyeOff, MailCheck } from "lucide-react";
import { SubmitButton } from "@/components/auth/submit-button";
import { PasswordStrength } from "@/components/auth/password-strength";
import { Input } from "@/components/ui/input";
import { PASSWORD_MIN_LENGTH, type AuthFormAction } from "@/lib/auth-rules";
import type { Dictionary } from "@/lib/dictionaries";

// Each mode's submit button (keys of auth.form in the dictionaries) and autocomplete hint.
const MODES = {
  "sign-up": { submit: "signUp", pending: "signUpPending", autoComplete: "new-password" },
  "sign-in": { submit: "logIn", pending: "logInPending", autoComplete: "current-password" },
  "new-password": {
    submit: "savePassword",
    pending: "savePasswordPending",
    autoComplete: "new-password",
  },
} as const;

const inputClass =
  "h-14 rounded-xl border-muted-foreground bg-surface px-4 text-base placeholder:text-muted-foreground";

/** Email and password (or only a new password), sent to a Server Action. */
export function PasswordForm({
  mode,
  action,
  t,
}: {
  mode: keyof typeof MODES;
  action: AuthFormAction;
  t: Dictionary["auth"]["form"];
}) {
  const [state, formAction] = useActionState(action, {});
  const [visible, setVisible] = useState(false);
  // Kept in state: React empties a form's fields after its action runs.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          {t.checkInboxBefore} <strong>{state.sentTo}</strong> {t.checkInboxAfter}
        </span>
      </p>
    );
  }
  return (
    <form ref={formRef} action={formAction} noValidate>
      {mode !== "new-password" && (
        <>
          <label htmlFor="auth-email" className="mb-2 block text-sm font-bold">
            {t.email}
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
            placeholder={t.emailPlaceholder}
            aria-invalid={state.error ? true : undefined}
            aria-describedby="auth-status"
            className={`${inputClass} mb-4`}
          />
        </>
      )}
      <label htmlFor="auth-password" className="mb-2 block text-sm font-bold">
        {mode === "new-password" ? t.newPassword : t.password}
      </label>
      <div className="relative">
        <Input
          id="auth-password"
          name="password"
          type={visible ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
          aria-label={visible ? t.hidePassword : t.showPassword}
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
      {choosing && <PasswordStrength id="auth-password-hint" password={password} t={t} />}
      <p id="auth-status" aria-live="polite" className="mt-2 min-h-5 text-sm text-destructive">
        {state.error}
      </p>
      <SubmitButton pendingLabel={t[pending]} className="mt-2 w-full">
        {t[submit]}
      </SubmitButton>
    </form>
  );
}
