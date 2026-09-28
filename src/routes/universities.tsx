import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/universities")({
  head: () => ({
    meta: [
      { title: `Financial education for universities | ${BRAND}` },
      { name: "description", content: "A practical financial education experience for universities helping students build real-world investing confidence." },
      { property: "og:title", content: `Financial education for universities | ${BRAND}` },
      { property: "og:description", content: "Practical, decision-led financial education for students. The university programme is currently in development." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://practice-first.lovable.app/universities" }],
  }),
  component: UniversitiesPage,
});

function UniversitiesPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 py-12">
      <section className="w-full max-w-2xl text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden /> Back to {BRAND}
        </Link>
        <div className="mx-auto mt-10 grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
          <GraduationCap className="size-7" aria-hidden />
        </div>
        <p className="mt-6 text-xs font-bold uppercase text-primary">For universities</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-6xl">
          Practical financial skills for life after university.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          We’re developing a separate Nudge experience to help institutions give students practical, decision-led financial education. More details are coming soon.
        </p>
      </section>
    </main>
  );
}
