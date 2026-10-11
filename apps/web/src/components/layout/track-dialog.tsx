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
import type { Dictionary } from "@/lib/dictionaries";
import { isTrack, TRACKS, type Track } from "@/lib/tracks";

/**
 * Asks a first-time visitor which version of the site they want, in the
 * language of the page's track: "/" sends each visitor to the track that
 * matches their country, which is also preselected. Closing the dialog keeps
 * the selected version.
 */
export function TrackDialog({ track, t }: { track: Track; t: Dictionary["tracks"] }) {
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
          <DialogTitle className="font-display text-2xl font-extrabold">{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>
        <RadioGroup
          value={selected}
          onValueChange={(value) => isTrack(value) && setSelected(value)}
          aria-label={t.title}
          className="mt-2 gap-3"
        >
          {TRACKS.map((option) => (
            <TrackOption
              key={option}
              track={option}
              id={`track-${option}`}
              label={t.options[option].country}
              detail={t.options[option].detail}
            />
          ))}
        </RadioGroup>
        <DialogFooter className="mt-2">
          <Button size="lg" className="w-full" onClick={choose}>
            {t.continue}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
