import { LogOut } from "lucide-react";
import { SubmitButton } from "@/components/auth/submit-button";

export function SignOutButton({
  action,
  className,
  label,
  pendingLabel,
}: {
  action: () => Promise<void>;
  className?: string;
  label: string;
  pendingLabel: string;
}) {
  return (
    <form action={action}>
      <SubmitButton pendingLabel={pendingLabel} variant="outline" className={className}>
        <LogOut aria-hidden /> {label}
      </SubmitButton>
    </form>
  );
}
