import { LogOut } from "lucide-react";
import Image from "next/image";
import { SubmitButton } from "@/components/auth/submit-button";

export function SignOutButton({
  action,
  className,
  label,
  pendingLabel,
  iconSrc,
}: {
  action: () => Promise<void>;
  className?: string;
  label: string;
  pendingLabel: string;
  iconSrc?: string;
}) {
  return (
    <form action={action}>
      <SubmitButton pendingLabel={pendingLabel} variant="outline" className={className}>
        {iconSrc ? <Image src={iconSrc} alt="" width={24} height={24} /> : <LogOut aria-hidden />}{" "}
        {label}
      </SubmitButton>
    </form>
  );
}
