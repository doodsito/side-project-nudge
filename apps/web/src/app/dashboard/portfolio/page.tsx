import type { Metadata } from "next";
import Link from "next/link";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requireMember } from "@/lib/auth";

export const metadata: Metadata = { title: "Portfolio" };

export default async function PortfolioPage() {
  await requireMember();
  return (
    <>
      <h1 className="font-display text-3xl font-extrabold text-balance">Portfolio</h1>
      <p className="mt-2 text-muted-foreground">Virtual money only. Nothing here is real.</p>
      <section
        aria-labelledby="portfolio-empty"
        className="mt-8 flex flex-col items-start rounded-3xl border border-dashed border-border-strong p-8"
      >
        <span className="grid size-12 place-items-center rounded-2xl bg-muted">
          <Wallet className="size-6 text-primary" aria-hidden />
        </span>
        <h2 id="portfolio-empty" className="mt-4 font-display text-xl font-extrabold">
          Your virtual portfolio starts soon
        </h2>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
          The decisions you practise will build a portfolio in virtual euros, so you can see how
          your choices play out over time. It is a simulation for learning, not financial advice.
        </p>
        <Button asChild variant="outline" size="lg" className="mt-6">
          <Link href="/dashboard/courses">Practise a decision</Link>
        </Button>
      </section>
    </>
  );
}
