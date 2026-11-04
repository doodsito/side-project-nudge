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
    <>
      <h1 className="font-display text-3xl font-extrabold text-balance">{t.title}</h1>
      <PortfolioPreview copy={t} />
    </>
  );
}
