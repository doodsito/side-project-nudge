import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    <section className="-mx-5 -mt-6 -mb-[calc(5rem+env(safe-area-inset-bottom))] flex min-h-[calc(100svh-78px-env(safe-area-inset-bottom))] flex-col justify-between bg-[var(--nudge-learn-portfolio-canvas)] px-6 pt-9 pb-9 sm:mx-auto sm:mt-0 sm:mb-0 sm:min-h-[calc(100svh-12rem)] sm:max-w-5xl sm:rounded-3xl sm:px-10 sm:py-10">
      <h1 className="font-display text-[28px] leading-9 font-extrabold text-[var(--nudge-learn-ink)]">
        {t.title}
      </h1>

      <div className="flex w-full flex-col items-center gap-[18px] sm:my-10">
        <Image
          src="/portfolio-under-construction.png"
          alt=""
          width={240}
          height={184}
          priority
          className="h-[184px] w-[240px]"
        />
        <div className="flex w-full flex-col items-center gap-3 text-center">
          <p className="rounded-full bg-[var(--nudge-learn-teal-status)] px-[13px] py-1.5 font-display text-xs leading-4 font-extrabold tracking-[1px] text-[var(--nudge-learn-teal-500)]">
            {t.inDevelopment}
          </p>
          <h2 className="font-display text-[30px] leading-9 font-extrabold text-balance text-[var(--nudge-learn-ink)]">
            {t.headline}
          </h2>
          <p className="font-sans text-base leading-6 font-semibold text-[var(--nudge-learn-portfolio-muted)]">
            {t.description}
            <br />
            {t.comeBack}
          </p>
        </div>
      </div>

      <Button
        asChild
        size="lg"
        className="h-14 w-full rounded-[18px] bg-[var(--nudge-learn-violet)] px-6 text-[15px] font-extrabold tracking-[0.3px] text-white shadow-[0_5px_0_var(--nudge-learn-violet-800)] hover:bg-[var(--nudge-learn-violet-hover)] sm:mx-auto sm:max-w-md"
      >
        <Link href="/dashboard">{t.continueLearning}</Link>
      </Button>
    </section>
  );
}
