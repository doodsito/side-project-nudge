import type { Track } from "@/lib/tracks";
import { fr } from "./fr";
import { us, type Dictionary } from "./us";

export type { Dictionary };

const DICTIONARIES: Record<Track, Dictionary> = { fr, us };

export function getDictionary(track: Track): Dictionary {
  return DICTIONARIES[track];
}
