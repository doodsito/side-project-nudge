import type { Metadata } from "next";
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
      <section className="mt-8 rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <p className="font-display text-xl font-extrabold text-primary">{t.inDevelopment}</p>
      </section>
    </>
  );
}
