import { LogOut } from "lucide-react";
import Image from "next/image";
import { SubmitButton } from "@/components/auth/submit-button";

export function SignOutButton({
  action,
  className,
  label,
  pendingLabel,
  iconSrc,
  mode = "button",
}: {
  action: () => Promise<void>;
  className?: string;
  label: string;
  pendingLabel: string;
  iconSrc?: string;
  mode?: "button" | "row";
}) {
  return (
    <form action={action}>
      <SubmitButton
        pendingLabel={pendingLabel}
        variant={mode === "row" ? "ghost" : "outline"}
        className={className}
      >
        {mode === "row" ? (
          <>
            <span className="grid size-[34px] shrink-0 place-items-center rounded-[10px] bg-white text-[var(--nudge-learn-violet)]">
              {iconSrc ? (
                <Image src={iconSrc} alt="" width={24} height={24} />
              ) : (
                <LogOut aria-hidden />
              )}
            </span>
            <span className="min-w-0 flex-1 text-left">{label}</span>
            <Image
              src="/brand/portfolio/profile-open.svg"
              alt=""
              width={16}
              height={16}
              className="shrink-0"
            />
          </>
        ) : (
          <>
            {iconSrc ? (
              <Image src={iconSrc} alt="" width={24} height={24} />
            ) : (
              <LogOut aria-hidden />
            )}{" "}
            {label}
          </>
        )}
      </SubmitButton>
    </form>
  );
}
