// The two versions of the site. A track bundles a language, a market and a
// currency: France (French, euros) and the United States (English, dollars).
// France comes first: it is the default whenever nothing else is known.

export const TRACKS = ["fr", "us"] as const;
export type Track = (typeof TRACKS)[number];

export const DEFAULT_TRACK: Track = "fr";

// The visitor's choice, readable by the browser (no personal data, set when they
// choose: no consent needed). Also saved on the account as user_metadata.track.
export const TRACK_COOKIE = "nudge_track";
export const TRACK_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// `country` is in the track's own language, for the footer's switch.
export const TRACK_INFO: Record<Track, { lang: string; country: string; flag: string }> = {
  fr: {
    lang: "fr-FR",
    country: "France",
    flag: "/flags/fr.svg",
  },
  us: {
    lang: "en-US",
    country: "United States",
    flag: "/flags/us.svg",
  },
};

export function isTrack(value: unknown): value is Track {
  return typeof value === "string" && (TRACKS as readonly string[]).includes(value);
}

// Countries offered the French track first; every other known country gets the US one.
const FRENCH_TRACK_COUNTRIES = ["FR", "BE", "CH", "LU", "MC"];

/** The track to suggest for a country code (Vercel's x-vercel-ip-country header). */
export function trackForCountry(country: string | null): Track {
  if (!country) return DEFAULT_TRACK;
  return FRENCH_TRACK_COUNTRIES.includes(country.toUpperCase()) ? "fr" : "us";
}

/** The track at the start of a path (/fr, /us/...), if any. */
export function trackFromPath(pathname: string): Track | null {
  const first = pathname.split("/")[1];
  return isTrack(first) ? first : null;
}
