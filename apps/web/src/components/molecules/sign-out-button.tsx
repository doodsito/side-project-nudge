import { LogOut } from "lucide-react";
import { SubmitButton } from "@/components/atoms/submit-button";

export function SignOutButton({
  action,
  className,
}: {
  action: () => Promise<void>;
  className?: string;
}) {
  return (
    <form action={action}>
      <SubmitButton pendingLabel="Signing out…" variant="outline" className={className}>
        <LogOut aria-hidden /> Sign out
      </SubmitButton>
    </form>
  );
}
