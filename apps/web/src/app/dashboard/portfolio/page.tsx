import type { Metadata } from "next";
import Link from "next/link";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).dashboard.portfolio.title };
}

export default async function PortfolioPage() {
  const member = await requireMember();
  const t = getDictionary(member.track).dashboard.portfolio;
  return (
    <>
      <h1 className="font-display text-3xl font-extrabold text-balance">{t.title}</h1>
      <p className="mt-2 text-muted-foreground">{t.intro}</p>
      <section
        aria-labelledby="portfolio-empty"
        className="mt-8 flex flex-col items-start rounded-3xl border border-dashed border-border-strong p-8"
      >
        <span className="grid size-12 place-items-center rounded-2xl bg-muted">
          <Wallet className="size-6 text-primary" aria-hidden />
        </span>
        <h2 id="portfolio-empty" className="mt-4 font-display text-xl font-extrabold">
          {t.emptyTitle}
        </h2>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {t.emptyText}
        </p>
        <Button asChild variant="outline" size="lg" className="mt-6">
          <Link href="/dashboard/courses">{t.cta}</Link>
        </Button>
      </section>
    </>
  );
}
