import { SubmitButton } from "@/components/auth/submit-button";
import type { Dictionary } from "@/lib/dictionaries";

/** Sends the visitor to Google's sign-in page through a Server Action. */
export function GoogleSignInButton({
  action,
  t,
}: {
  action: () => Promise<void>;
  t: Dictionary["auth"]["form"];
}) {
  return (
    <form action={action}>
      <SubmitButton pendingLabel={t.googlePending} className="w-full">
        {t.google}
      </SubmitButton>
    </form>
  );
}
