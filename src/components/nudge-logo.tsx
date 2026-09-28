import iconAsset from "@/assets/nudge-icon.png.asset.json";
import fullAsset from "@/assets/nudge-logo.png.asset.json";
import { cn } from "@/lib/utils";

type NudgeLogoProps = {
  iconOnly?: boolean;
  small?: boolean;
  className?: string;
};

export function NudgeLogo({ iconOnly = false, small = false, className }: NudgeLogoProps) {
  return (
    <img
      src={iconOnly ? iconAsset.url : fullAsset.url}
      alt={iconOnly ? "Nudge" : "Nudge logo"}
      width={iconOnly ? 447 : 885}
      height={iconOnly ? 434 : 266}
      className={cn("block w-auto shrink-0 object-contain", small ? "h-8" : "h-9", className)}
    />
  );
}