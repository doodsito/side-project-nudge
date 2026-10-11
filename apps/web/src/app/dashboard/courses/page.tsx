import type { Metadata } from "next";
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CourseWorlds } from "@/components/dashboard/course-worlds";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).dashboard.tabs.courses };
}

export default async function CoursesPage() {
  const member = await requireMember();
  return (
    <>
      {member.track === "us" && (
        <Alert role="status" className="mb-6">
          <Info aria-hidden />
          <AlertDescription>{getDictionary("us").dashboard.usComingSoon}</AlertDescription>
        </Alert>
      )}
      <CourseWorlds progress={member.courseProgress} />
    </>
  );
}
