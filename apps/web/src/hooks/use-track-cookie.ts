"use client";

import { useSyncExternalStore } from "react";
import { isTrack, TRACK_COOKIE, TRACK_COOKIE_MAX_AGE, type Track } from "@/lib/tracks";

const CHANGE_EVENT = "nudge-track-change";
const COOKIE_PATTERN = new RegExp(`(?:^|;\\s*)${TRACK_COOKIE}=([^;]*)`);

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

function readTrack(): Track | null {
  const value = COOKIE_PATTERN.exec(document.cookie)?.[1];
  return isTrack(value) ? value : null;
}

/**
 * The track this browser chose, or null before any choice. Undefined while
 * unknown: on the server and during hydration, before the cookie is read.
 */
export function useTrackCookie(): Track | null | undefined {
  return useSyncExternalStore(subscribe, readTrack, () => undefined);
}

/** Remembers the visitor's track in this browser. */
export function saveTrack(track: Track) {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${TRACK_COOKIE}=${track}; path=/; max-age=${TRACK_COOKIE_MAX_AGE}; samesite=lax${secure}`;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
