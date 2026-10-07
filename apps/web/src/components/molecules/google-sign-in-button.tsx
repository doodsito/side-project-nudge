import Image from "next/image";
import { SubmitButton } from "@/components/atoms/submit-button";

/** Sends the visitor to Google's sign-in page through a Server Action. Styled the way Google asks: neutral, with its "G". */
export function GoogleSignInButton({ action }: { action: () => Promise<void> }) {
  return (
    <form action={action}>
      <SubmitButton
        variant="outline"
        pendingLabel="Opening Google…"
        className="w-full border-border-strong bg-surface hover:bg-muted"
      >
        <Image src="/brand/google-g.svg" alt="" width={18} height={18} />
        Continue with Google
      </SubmitButton>
    </form>
  );
}
