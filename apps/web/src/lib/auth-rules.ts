// Sign-in rules shared by the forms (browser) and the Server Actions (server).
// No server-only code here: client components import this file.

export const ACCESS_CODE_PATTERN = /^[A-Z0-9-]{4,32}$/;

// Password rules, checked here and in Supabase (Authentication > Providers > Email).
// 72 is the most Supabase accepts.
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 72;

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

export function passwordError(password: string): string | null {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Use at least ${PASSWORD_MIN_LENGTH} characters for your password.`;
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return `Use at most ${PASSWORD_MAX_LENGTH} characters for your password.`;
  }
  return null;
}

export function readCredentials(
  formData: FormData,
): { email: string; password: string } | { error: string } {
  const email = readEmail(formData);
  if (!email) return { error: "Enter a valid email address, like you@example.com." };
  const password = String(formData.get("password") ?? "");
  const error = passwordError(password);
  return error ? { error } : { email, password };
}

// Shows "Continue with Google" on /get-started. Turn on once Google sign-in is
// set up in Supabase (Authentication > Providers > Google), never before.
export const GOOGLE_SIGN_IN_ENABLED = false;
