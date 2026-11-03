"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore, useTransition } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type Preference = {
  worldZeroSkipped: boolean;
  worldOneDiscoverySeen: boolean;
};
type Action = () => Promise<{ status: "saved" | "error" }>;

function subscribeToPreferences(key: string | null, callback: () => void) {
  if (!key) return () => {};
  const handleStorage = (event: StorageEvent) => {
    if (event.key === key) callback();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener("nudge:learn-preferences", callback);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("nudge:learn-preferences", callback);
  };
}

function readPreferences(key: string | null) {
  if (!key) return "";
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function saveFallback(key: string | null, preference: Preference) {
  if (!key) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(preference));
    window.dispatchEvent(new Event("nudge:learn-preferences"));
    return true;
  } catch {
    return false;
  }
}

function parsePreferences(raw: string): Preference {
  try {
    const value: unknown = raw ? JSON.parse(raw) : null;
    if (!value || typeof value !== "object") {
      return { worldZeroSkipped: false, worldOneDiscoverySeen: false };
    }
    return {
      worldZeroSkipped: Reflect.get(value, "worldZeroSkipped") === true,
      worldOneDiscoverySeen: Reflect.get(value, "worldOneDiscoverySeen") === true,
    };
  } catch {
    return { worldZeroSkipped: false, worldOneDiscoverySeen: false };
  }
}

export function LearnStartActions({
  userId,
  firstTime,
  completedWorldOneLessons,
  initialWorldZeroSkipped,
  initialDiscoverySeen,
  worldZeroHref,
  worldOneLabel,
  nextLessonHref,
  nextLessonLabel,
  startLearningLabel,
  alreadyKnowBasicsLabel,
  discoveryTitle,
  discoveryDescription,
  discoveryAction,
  discoveryClose,
  preferenceFallback,
  preferenceSaveError,
  skipWorldZeroAction,
  markDiscoverySeenAction,
}: {
  userId?: string;
  firstTime: boolean;
  completedWorldOneLessons: number;
  initialWorldZeroSkipped: boolean;
  initialDiscoverySeen: boolean;
  worldZeroHref: string;
  worldOneLabel: string;
  nextLessonHref?: string;
  nextLessonLabel?: string;
  startLearningLabel: string;
  alreadyKnowBasicsLabel: string;
  discoveryTitle: string;
  discoveryDescription: string;
  discoveryAction: string;
  discoveryClose: string;
  preferenceFallback: string;
  preferenceSaveError: string;
  skipWorldZeroAction?: Action;
  markDiscoverySeenAction?: Action;
}) {
  const storageKey = userId ? `nudge:learn-preferences:${userId}` : null;
  const preferencesRaw = useSyncExternalStore(
    (callback) => subscribeToPreferences(storageKey, callback),
    () => readPreferences(storageKey),
    () => "",
  );
  const localPreferences = parsePreferences(preferencesRaw);
  const [sessionSkipped, setSessionSkipped] = useState(initialWorldZeroSkipped);
  const [sessionDiscoverySeen, setSessionDiscoverySeen] = useState(initialDiscoverySeen);
  const [discoveryRequested, setDiscoveryRequested] = useState(
    initialWorldZeroSkipped && !initialDiscoverySeen && completedWorldOneLessons === 0,
  );
  const [preferenceMessage, setPreferenceMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const skipped = sessionSkipped || localPreferences.worldZeroSkipped;
  const discoverySeen = sessionDiscoverySeen || localPreferences.worldOneDiscoverySeen;
  const discoveryOpen = discoveryRequested && !discoverySeen && completedWorldOneLessons === 0;
  function chooseWorldOne() {
    setPreferenceMessage("");
    setSessionSkipped(true);
    setDiscoveryRequested(true);
    startTransition(async () => {
      let saved = !skipWorldZeroAction;
      if (skipWorldZeroAction) {
        try {
          saved = (await skipWorldZeroAction()).status === "saved";
        } catch {
          saved = false;
        }
      }
      window.dispatchEvent(new Event("nudge:world-zero-skipped"));
      if (!saved) {
        const fallbackSaved = saveFallback(storageKey, {
          worldZeroSkipped: true,
          worldOneDiscoverySeen: false,
        });
        setPreferenceMessage(fallbackSaved ? preferenceFallback : preferenceSaveError);
      }
    });
  }

  function finishDiscovery() {
    setDiscoveryRequested(false);
    setSessionDiscoverySeen(true);
    startTransition(async () => {
      if (!markDiscoverySeenAction) return;
      let saved = false;
      try {
        saved = (await markDiscoverySeenAction()).status === "saved";
      } catch {
        saved = false;
      }
      if (!saved) {
        const fallbackSaved = saveFallback(storageKey, {
          worldZeroSkipped: true,
          worldOneDiscoverySeen: true,
        });
        if (!fallbackSaved) setPreferenceMessage(preferenceSaveError);
      }
    });
  }

  return (
    <>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {firstTime && !skipped ? (
          <>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={worldZeroHref}>
                {startLearningLabel} <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="w-full text-primary sm:w-auto"
              onClick={chooseWorldOne}
              disabled={isPending}
            >
              {alreadyKnowBasicsLabel}
            </Button>
          </>
        ) : nextLessonHref && nextLessonLabel ? (
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href={nextLessonHref}>
              {nextLessonLabel} <ArrowRight aria-hidden />
            </Link>
          </Button>
        ) : null}
      </div>
      {preferenceMessage && (
        <p role="status" className="mt-2 text-sm text-muted-foreground">
          {preferenceMessage}
        </p>
      )}

      <Dialog
        open={discoveryOpen}
        onOpenChange={(open) => {
          if (open) setDiscoveryRequested(true);
          else if (discoveryOpen) finishDiscovery();
        }}
      >
        <DialogContent
          overlayClassName="bg-ink/35 backdrop-blur-[2px]"
          closeLabel={discoveryClose}
          className="!left-0 !top-auto !bottom-0 !translate-x-0 !translate-y-0 grid max-h-[min(82dvh,34rem)] w-full max-w-none gap-0 overflow-y-auto rounded-t-[2rem] rounded-b-none border border-border bg-background p-0 shadow-lift sm:!left-[50%] sm:!top-[50%] sm:!bottom-auto sm:!translate-x-[-50%] sm:!translate-y-[-50%] sm:max-w-md sm:rounded-3xl"
        >
          <div className="px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-8 sm:px-7 sm:pb-7">
            <div className="flex items-center gap-4 pr-8">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-primary">{worldOneLabel}</p>
                <DialogTitle className="mt-1 font-display text-2xl font-bold leading-tight tracking-tight text-foreground">
                  {discoveryTitle}
                </DialogTitle>
              </div>
              <Image
                src="/brand/mascot/nudge-guide.webp"
                alt=""
                width={88}
                height={88}
                className="size-20 shrink-0 object-contain"
              />
            </div>
            <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {discoveryDescription}
            </DialogDescription>
            <Button
              size="lg"
              className="mt-5 w-full"
              onClick={finishDiscovery}
              disabled={isPending}
            >
              {discoveryAction} <ArrowRight aria-hidden />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
