import Image from "next/image";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { TRACK_INFO, type Track } from "@/lib/tracks";

/**
 * A track's flag, styled like an Apple emoji (SVG: emoji flags show as letters
 * on Windows). Decorative.
 */
export function TrackFlag({ track, small = false }: { track: Track; small?: boolean }) {
  return (
    <span
      className={cn("flag-emoji", small ? "h-3 w-[18px] rounded-[3px]" : "h-7 w-10 rounded-md")}
    >
      <Image
        src={TRACK_INFO[track].flag}
        alt=""
        width={small ? 18 : 40}
        height={small ? 12 : 28}
        unoptimized
        className="size-full object-cover"
      />
    </span>
  );
}

/** One choice of track inside a RadioGroup: flag, `label`, then `detail`. */
export function TrackOption({
  track,
  id,
  label,
  detail,
}: {
  track: Track;
  id: string;
  label: string;
  detail: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-4 rounded-2xl border border-border p-4 transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-soft"
    >
      <RadioGroupItem id={id} value={track} />
      <TrackFlag track={track} />
      <span className="min-w-0">
        <span className="block font-bold">{label}</span>
        <span className="block text-sm text-muted-foreground">{detail}</span>
      </span>
    </label>
  );
}
