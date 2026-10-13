import Image from "next/image";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

type NudgeLogoProps = {
  iconOnly?: boolean;
  small?: boolean;
  className?: string;
};

export function NudgeLogo({ iconOnly = false, small = false, className }: NudgeLogoProps) {
  return (
    <Image
      src="/brand/nudge-bascule.svg"
      alt={iconOnly ? BRAND : `${BRAND} logo`}
      width={256}
      height={256}
      unoptimized
      className={cn("block w-auto shrink-0 object-contain", small ? "h-8" : "h-9", className)}
    />
  );
}
