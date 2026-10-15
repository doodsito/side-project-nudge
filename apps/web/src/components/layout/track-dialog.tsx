"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useConsentManager, useTranslations } from "@c15t/nextjs";
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
 * Welcomes a first-time visitor in one dialog: which version of the site they
 * want, and, while the cookie choice is still open, whether analytics may run.
 * "/" sends each visitor to the track that matches their country, which is also
 * preselected. Accepting or refusing cookies saves both choices; closing the
 * dialog keeps the selected version and leaves the cookie banner to ask.
 */
export function TrackDialog({
  track,
  t,
  links,
}: {
  track: Track;
  t: Dictionary["tracks"];
  links: Dictionary["footer"];
}) {
  const router = useRouter();
  const saved = useTrackCookie();
  const [selected, setSelected] = useState<Track>(track);
  const { activeUI, saveConsents, setActiveUI } = useConsentManager();
  const cookies = useTranslations();
  const askCookies = activeUI === "banner";

  function choose() {
    saveTrack(selected);
    if (selected !== track) router.push(`/${selected}`);
  }

  // The consent is stored before a change of track remounts the consent provider.
  async function chooseWithCookies(consent: "all" | "necessary") {
    await saveConsents(consent);
    choose();
  }

  function customize() {
    choose();
    setActiveUI("dialog");
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
        {askCookies ? (
          <>
            <div className="mt-2 border-t border-border pt-4 text-sm">
              <p className="font-bold">{cookies.cookieBanner.title}</p>
              <p className="mt-1 text-muted-foreground">
                {cookies.cookieBanner.description}{" "}
                <Link href="/privacy-policy" className="underline underline-offset-2">
                  {links.privacy}
                </Link>
                {" · "}
                <Link href="/cookies" className="underline underline-offset-2">
                  {links.cookies}
                </Link>
              </p>
            </div>
            {/* CNIL: refusing must be as easy and as visible as accepting. */}
            <DialogFooter className="mt-2 grid grid-cols-2 gap-3 sm:space-x-0">
              <Button size="lg" onClick={() => void chooseWithCookies("necessary")}>
                {cookies.common.rejectAll}
              </Button>
              <Button size="lg" onClick={() => void chooseWithCookies("all")}>
                {cookies.common.acceptAll}
              </Button>
              <Button variant="link" className="col-span-2 h-auto p-0" onClick={customize}>
                {cookies.common.customize}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <DialogFooter className="mt-2">
            <Button size="lg" className="w-full" onClick={choose}>
              {t.continue}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
