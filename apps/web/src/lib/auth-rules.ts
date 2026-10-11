// Sign-in rules shared by the forms (browser) and the Server Actions (server).
// No server-only code here: client components import this file.

export const ACCESS_CODE_PATTERN = /^[A-Z0-9-]{4,32}$/;

// Password rules, checked here and in Supabase (Authentication > Providers > Email:
// minimum length 8, password requirements "Letters and digits"). 72 is the most
// Supabase accepts.
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 72;

// The rules a new password must meet, in the order the form lists them. Their
// labels are in the dictionaries (auth.form.rules).
export const PASSWORD_RULES = [
  { id: "length", test: (p: string) => p.length >= PASSWORD_MIN_LENGTH },
  { id: "letter", test: (p: string) => /[a-zA-Z]/.test(p) },
  { id: "number", test: (p: string) => /[0-9]/.test(p) },
] as const;

/**
 * A rough strength for the meter under the password field: 0 until every rule
 * is met, then 1 (weak), 2 (good) or 3 (strong) from the length and the kinds
 * of characters. A hint for the person, not a security check.
 */
export function passwordStrength(password: string): 0 | 1 | 2 | 3 {
  if (!PASSWORD_RULES.every((rule) => rule.test(password))) return 0;
  const kinds = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((kind) =>
    kind.test(password),
  ).length;
  if (password.length >= 14 || (password.length >= 12 && kinds >= 3)) return 3;
  if (password.length >= 10 || kinds >= 3) return 2;
  return 1;
}

// What the sign-in forms show after a Server Action: an error, or the address an email went to.
export type AuthFormState = { error?: string; sentTo?: string };
export type AuthFormAction = (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;

/** The email from a form, trimmed and lower-case, or null if it doesn't look like one. */
export function readEmail(formData: FormData): string | null {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  return email.length <= 254 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? email : null;
}

// What can be wrong with the credentials: keys of auth.errors in the dictionaries.
export type CredentialsError = "email" | "passwordMissing" | "tooShort" | "tooLong" | "rules";

export function passwordError(password: string): CredentialsError | null {
  if (password.length < PASSWORD_MIN_LENGTH) return "tooShort";
  if (password.length > PASSWORD_MAX_LENGTH) return "tooLong";
  if (!PASSWORD_RULES.every((rule) => rule.test(password))) return "rules";
  return null;
}

/**
 * The email and password from a form. A new password must meet the rules; a
 * sign-in only needs one, so accounts made before a rule changed still work.
 */
export function readCredentials(
  formData: FormData,
  { newPassword }: { newPassword: boolean },
): { email: string; password: string } | { error: CredentialsError } {
  const email = readEmail(formData);
  if (!email) return { error: "email" };
  const password = String(formData.get("password") ?? "");
  const error = newPassword ? passwordError(password) : password ? null : "passwordMissing";
  return error ? { error } : { email, password };
}

// Shows "Continue with Google" on /login and /signup. Turn on once Google sign-in is
// set up in Supabase (Authentication > Providers > Google), never before.
export const GOOGLE_SIGN_IN_ENABLED = false;
