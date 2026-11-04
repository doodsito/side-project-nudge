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

      <div className="flex w-full flex-col items-center sm:my-10">
        <div className="flex w-full flex-col items-center gap-3.5 text-center">
          <Image
            src="/portfolio-under-construction.png"
            alt=""
            width={240}
            height={184}
            priority
            className="h-[184px] w-[240px]"
          />
          <div className="h-[77px] w-full">
            <h2 className="font-display text-[30px] leading-[35px] font-extrabold text-balance text-[var(--nudge-learn-ink)]">
              {t.headline}
            </h2>
          </div>
          <p className="font-sans text-base leading-6 font-semibold text-[var(--nudge-learn-portfolio-muted)]">
            {t.descriptionLines.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <p className="w-full text-center font-sans text-sm leading-5 font-semibold text-[var(--nudge-learn-portfolio-muted)]">
          {t.comingSoon}
        </p>
        <Button
          asChild
          size="lg"
          className="h-14 w-full rounded-[18px] bg-[var(--nudge-learn-violet)] px-6 text-[15px] font-extrabold tracking-[0.3px] text-white shadow-[0_5px_0_var(--nudge-learn-violet-800)] hover:bg-[var(--nudge-learn-violet-hover)] sm:mx-auto sm:max-w-md"
        >
          <Link href="/dashboard">{t.continueLearning}</Link>
        </Button>
      </div>
    </section>
  );
}
