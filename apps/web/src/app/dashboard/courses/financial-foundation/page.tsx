import type { Metadata } from "next";
import { FoundationWorld } from "@/components/dashboard/foundation-world";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).learning.courses.foundation.metaTitle };
}

export default async function FinancialFoundationPage() {
  const member = await requireMember();
  return (
    <FoundationWorld
      progress={member.courseProgress}
      copy={getDictionary(member.track).learning.courses.foundation}
      track={member.track}
    />
  );
}
