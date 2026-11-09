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
    <section className="-mx-4 px-4 pt-4 pb-[calc(5rem+env(safe-area-inset-bottom))] lg:mx-0 lg:px-10 lg:pt-8">
      <PortfolioPreview copy={t} />
    </section>
  );
}
