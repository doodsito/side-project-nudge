"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup } from "@/components/ui/radio-group";
import { TrackOption } from "@/components/shared/track-option";
import { saveTrack, useTrackCookie } from "@/hooks/use-track-cookie";
import { isTrack, TRACKS, type Track } from "@/lib/tracks";

// Shown in both languages: the visitor has not chosen one yet.
const MARKET: Record<Track, string> = {
  fr: "Français · euros · PEA, assurance vie, livrets",
  us: "English · dollars · 401(k), IRA, brokerage accounts",
};
const CONTINUE: Record<Track, string> = { fr: "Continuer", us: "Continue" };

/**
 * Asks a first-time visitor which version of the site they want. The page's
 * own track is preselected: "/" sends each visitor to the one that matches
 * their country. Closing the dialog keeps the selected version.
 */
export function TrackDialog({ track }: { track: Track }) {
  const router = useRouter();
  const saved = useTrackCookie();
  const [selected, setSelected] = useState<Track>(track);

  function choose() {
    saveTrack(selected);
    if (selected !== track) router.push(`/${selected}`);
  }

  return (
    <Dialog open={saved === null} onOpenChange={(open) => !open && choose()}>
      <DialogContent className="max-w-md rounded-3xl p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-extrabold">
            Choisis ta version · Choose your version
          </DialogTitle>
          <DialogDescription>
            Ta langue, ton marché et ta devise. · Your language, market and currency.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup
          value={selected}
          onValueChange={(value) => isTrack(value) && setSelected(value)}
          aria-label="Version"
          className="mt-2 gap-3"
        >
          {TRACKS.map((option) => (
            <TrackOption
              key={option}
              track={option}
              id={`track-${option}`}
              detail={MARKET[option]}
            />
          ))}
        </RadioGroup>
        <DialogFooter className="mt-2">
          <Button size="lg" className="w-full" onClick={choose}>
            {CONTINUE[selected]}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
