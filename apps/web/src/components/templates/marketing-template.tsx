import { type ReactNode } from "react";
import { Footer } from "@/components/organisms/footer";
import { Navbar } from "@/components/organisms/navbar";
import { SkipLink } from "@/components/atoms/skip-link";

export function MarketingTemplate({
  children,
  navItems,
  navCtaHref,
}: {
  children: ReactNode;
  navItems?: Array<[string, string]>;
  navCtaHref?: string;
}) {
  return (
    <>
      <SkipLink />
      <Navbar items={navItems} ctaHref={navCtaHref} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
