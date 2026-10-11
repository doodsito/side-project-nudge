import { notFound } from "next/navigation";
import { TrackDialog } from "@/components/layout/track-dialog";
import { getDictionary } from "@/lib/dictionaries";
import { isTrack, TRACK_INFO, TRACKS } from "@/lib/tracks";

// /fr and /us are built ahead of time; any other first segment is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return TRACKS.map((track) => ({ track }));
}

// The root layout serves every page with lang="en": this marks the track's
// pages with their own language.
export default async function TrackLayout({ children, params }: LayoutProps<"/[track]">) {
  const { track } = await params;
  if (!isTrack(track)) notFound();
  return (
    <div lang={TRACK_INFO[track].lang}>
      {children}
      <TrackDialog track={track} t={getDictionary(track).tracks} />
    </div>
  );
}
