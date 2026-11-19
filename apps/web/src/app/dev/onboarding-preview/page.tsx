import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { DEFAULT_TRACK, isTrack } from "@/lib/tracks";
import { OnboardingPreview } from "./onboarding-preview";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function OnboardingPreviewPage({
  searchParams,
}: PageProps<"/dev/onboarding-preview">) {
  if (process.env.NODE_ENV !== "development") notFound();
  const host = (await headers()).get("host") ?? "";
  if (!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)) notFound();

  const { track } = await searchParams;
  return <OnboardingPreview track={isTrack(track) ? track : DEFAULT_TRACK} />;
}
