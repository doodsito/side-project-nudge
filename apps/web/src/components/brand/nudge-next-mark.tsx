import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function NudgeNextMark({ className = "" }: { className?: string }) {
  return (
    <svg className={cn("nx-mark", className)} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <image href="/brand/nudge-bascule.svg" width="64" height="64" />
    </svg>
  );
}

/** The mark with the lowercase name, for pages outside the homepage (footer, legal pages). */
export function NudgeNextLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-2xl font-bold tracking-[-0.04em] text-foreground",
        className,
      )}
    >
      <NudgeNextMark className="size-7" />
      {BRAND.toLowerCase()}
    </span>
  );
}

export function NudgeFold({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 540" className={className} fill="none" aria-hidden="true">
      <image href="/brand/nudge-bascule.svg" x="50" width="540" height="540" />
    </svg>
  );
}
