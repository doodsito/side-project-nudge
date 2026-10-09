import type { Metadata } from "next";
import { CourseWorlds } from "@/components/organisms/course-worlds";
import { requireMember } from "@/lib/auth";

export const metadata: Metadata = { title: "Courses" };

export default async function CoursesPage() {
  await requireMember();
  return <CourseWorlds />;
}
