import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { WhyInvestFlow } from "@/app/lessons/why-invest/why-invest-flow";
import { DEFAULT_TRACK, isTrack, TRACK_INFO } from "@/lib/tracks";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function WhyInvestPreviewPage({
  searchParams,
}: PageProps<"/dev/why-invest-preview">) {
  if (process.env.NODE_ENV !== "development") notFound();
  const host = (await headers()).get("host") ?? "";
  if (!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)) notFound();

  const { track: requestedTrack } = await searchParams;
  const track = isTrack(requestedTrack) ? requestedTrack : DEFAULT_TRACK;

  return (
    <div lang={TRACK_INFO[track].lang}>
      <WhyInvestFlow track={track} alreadyCompleted={false} preview />
    </div>
  );
}
