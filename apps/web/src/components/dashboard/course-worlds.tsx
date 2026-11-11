import { COURSE_WORLDS } from "@/lib/course-worlds";
import type { Dictionary } from "@/lib/dictionaries";

/** Shows worlds that follow the active learning path. */
export function CourseWorlds({ copy }: { copy: Dictionary["learning"]["courses"] }) {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{copy.yourCourses}</h1>
      <section aria-labelledby="course-roadmap-heading" className="mt-8">
        <h2 id="course-roadmap-heading" className="font-display text-lg font-bold">
          {copy.roadmap}
        </h2>
        <ol className="mt-4 border-l-2 border-border pl-5">
          {COURSE_WORLDS.slice(2).map((world) => {
            const worldCopy = copy.worlds[world.number - 1]!;
            return (
              <li key={world.slug} className="relative pb-3 last:pb-0">
                <span
                  className="absolute top-5 -left-[1.875rem] size-4 rounded-full border-2 border-border-strong bg-background"
                  aria-hidden
                />
                <article
                  aria-label={`${copy.world} ${world.number}: ${worldCopy.title}. ${copy.comingSoon}.`}
                  className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-border bg-surface-2 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground">
                      {copy.world} {world.number}
                    </p>
                    <h3 className="font-semibold text-foreground/80 text-balance">
                      {worldCopy.title}
                    </h3>
                  </div>
                  <span className="shrink-0 rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-extrabold uppercase text-muted-foreground">
                    {copy.comingSoon}
                  </span>
                </article>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
