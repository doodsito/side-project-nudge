import Link from "next/link";
import { ArrowRight, Check, Pencil, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EducationalNote } from "@/components/atoms/educational-note";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { FACTORS, type Profile } from "@/lib/practice-scenario";
import { BRAND } from "@/lib/brand";

export function LearningSummary({
  profile,
  onReset,
  onEdit,
}: {
  profile: Required<Profile>;
  onReset: () => void;
  onEdit: () => void;
}) {
  const labels = [
    FACTORS.horizon[profile.horizon][0],
    FACTORS.savings[profile.savings][0],
    FACTORS.reaction[profile.reaction][0],
    FACTORS.style[profile.style][0],
  ];
  return (
    <div className="animate-rise">
      <section className="rounded-3xl border border-border bg-surface p-6 text-center shadow-lift sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary text-brand-lime">
          <Check className="size-7" />
        </span>
        <div className="mt-5">
          <Eyebrow>Decision complete</Eyebrow>
        </div>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-extrabold sm:text-5xl">
          One decision. A clearer way to think.
        </h1>
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-surface-2 p-5 text-left">
          <p className="text-xs font-bold uppercase text-primary">What you considered</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {["Timeline", "Safety buffer", "Risk reaction", "Investing routine"].map((n, i) => (
              <div
                key={n}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface px-4 py-3"
              >
                <span className="text-sm font-semibold">{n}</span>
                <span className="text-xs font-extrabold text-primary">{labels[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Try another choice to compare the explanation. Your learning profile stays the same, so
          you can focus on what changes.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="xl" onClick={onReset} className="min-h-13 h-auto whitespace-normal py-3">
            <RotateCcw aria-hidden="true" /> Try another choice
          </Button>
          <Button
            asChild
            variant="outline"
            size="xl"
            className="min-h-13 h-auto whitespace-normal py-3"
          >
            <Link href="/#early-access">
              Join {BRAND} early access <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="ghost" size="xl" onClick={onEdit}>
            <Pencil /> Edit learning profile
          </Button>
        </div>
        <EducationalNote />
      </section>
    </div>
  );
}
