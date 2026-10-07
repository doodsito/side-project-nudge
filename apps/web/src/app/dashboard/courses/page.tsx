import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Button } from "@/components/ui/button";
import { requireMember } from "@/lib/auth";
import { PRACTICE_CASE } from "@/lib/practice-case";

export const metadata: Metadata = { title: "Courses" };

export default async function CoursesPage() {
  await requireMember();
  return (
    <>
      <h1 className="font-display text-3xl font-extrabold text-balance">Courses</h1>
      <p className="mt-2 text-muted-foreground">
        Short cases with virtual money. Decide first, then see the reasoning.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        <li className="flex flex-col rounded-3xl border border-border bg-surface p-6 shadow-soft">
          <Eyebrow>Case 1 · Virtual money</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-extrabold text-balance">
            {PRACTICE_CASE.title}
          </h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {PRACTICE_CASE.objective}
          </p>
          <Button asChild size="lg" className="group mt-6 self-start">
            <Link href="/practice">
              Start the case{" "}
              <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Button>
        </li>
        <li className="flex flex-col justify-center rounded-3xl border border-dashed border-border-strong p-6">
          <h2 className="font-display text-xl font-extrabold">More cases are on the way</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            New situations will appear here during the beta.
          </p>
        </li>
      </ul>
    </>
  );
}
