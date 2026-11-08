import type { Metadata } from "next";
import { PortfolioPreview } from "@/components/dashboard/portfolio-preview";
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
    <section className="px-5 pt-6 pb-[calc(5rem+env(safe-area-inset-bottom))] sm:px-8 sm:pt-10 sm:pb-20 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-extrabold text-balance">{t.title}</h1>
        <PortfolioPreview copy={t} />
      </div>
    </section>
  );
}
