import type { Metadata } from "next";
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { UpcomingWorlds } from "@/components/dashboard/worlds-home";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).dashboard.tabs.courses };
}

export default async function CoursesPage() {
  const member = await requireMember();
  const dictionary = getDictionary(member.track);
  const courseCopy = dictionary.learning.courses;
  return (
    <>
      {member.track === "us" && (
        <Alert role="status" className="mx-auto mt-4 max-w-5xl">
          <Info aria-hidden />
          <AlertDescription>{getDictionary("us").dashboard.usComingSoon}</AlertDescription>
        </Alert>
      )}
      <DashboardHome
        progress={member.courseProgress}
        track={member.track}
        courseCopy={courseCopy}
        foundationCopy={courseCopy.foundation}
      />
      <UpcomingWorlds copy={courseCopy} />
    </>
  );
}
