import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { InvestmentBasicsFlow } from "@/app/lessons/investment-basics/investment-basics-flow";
import { newQuestionOrder } from "@/lib/investment-basics-lesson";
import { DEFAULT_TRACK, isTrack, TRACK_INFO } from "@/lib/tracks";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function InvestmentBasicsPreviewPage({
  searchParams,
}: PageProps<"/dev/investment-basics-preview">) {
  if (process.env.NODE_ENV !== "development") notFound();
  const host = (await headers()).get("host") ?? "";
  if (!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)) notFound();
  const { track: requestedTrack } = await searchParams;
  const track = isTrack(requestedTrack) ? requestedTrack : DEFAULT_TRACK;

  return (
    <div lang={TRACK_INFO[track].lang}>
      <InvestmentBasicsFlow track={track} initialOrder={newQuestionOrder()} preview />
    </div>
  );
}
