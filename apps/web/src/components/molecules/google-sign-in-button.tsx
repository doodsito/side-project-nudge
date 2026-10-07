import { SubmitButton } from "@/components/atoms/submit-button";

/** Sends the visitor to Google's sign-in page through a Server Action. */
export function GoogleSignInButton({ action }: { action: () => Promise<void> }) {
  return (
    <form action={action}>
      <SubmitButton pendingLabel="Opening Google…" className="w-full">
        Continue with Google
      </SubmitButton>
    </form>
  );
}
