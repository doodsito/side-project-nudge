import { LogOut } from "lucide-react";
import { SubmitButton } from "@/components/auth/submit-button";

export function SignOutButton({
  action,
  className,
}: {
  action: () => Promise<void>;
  className?: string;
}) {
  return (
    <form action={action}>
      <SubmitButton pendingLabel="Logging out…" variant="outline" className={className}>
        <LogOut aria-hidden /> Log out
      </SubmitButton>
    </form>
  );
}
