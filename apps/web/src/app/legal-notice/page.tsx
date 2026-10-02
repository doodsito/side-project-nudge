import type { Metadata } from "next";
import Link from "next/link";
import { LegalTemplate } from "@/components/templates/legal-template";
import { BRAND, CONTACT_EMAIL, PUBLISHER, SITE_URL } from "@/lib/brand";
import { llmsTxtAlternate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `Legal Notice | ${BRAND}`,
  description: `Who publishes and hosts ${BRAND}, and how to contact us.`,
  alternates: { ...llmsTxtAlternate, canonical: `${SITE_URL}/legal-notice` },
};

export default function LegalNoticePage() {
  return (
    <LegalTemplate title="Legal notice" updated="1 October 2026">
      <p>
        This page says who publishes {new URL(SITE_URL).host} and who hosts it, as French law
        requires (Loi pour la confiance dans l’économie numérique).
      </p>

      <h2>Publisher</h2>
      <p>
        {BRAND} is published by {PUBLISHER}, an individual, on a non-professional basis. {PUBLISHER}{" "}
        is also the publication director.
      </p>
      <p>
        Contact: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>

      <h2>Hosting</h2>
      <p>
        The site is hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United
        States (<a href="https://vercel.com">vercel.com</a>).
      </p>

      <h2>Education, not advice</h2>
      <p>
        {BRAND} is an educational project. It does not give investment advice, recommend any
        financial product or promise any return, and it is not a regulated financial adviser. The
        practice uses fictional situations and virtual money. Read the{" "}
        <Link href="/terms-of-service">terms of service</Link> for details.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The texts, design, logo and code of {BRAND} belong to the {BRAND} authors. All rights
        reserved. You may quote short extracts with a link to the source; anything else needs our
        written permission.
      </p>

      <h2>Personal data and cookies</h2>
      <p>
        How we handle personal data is explained in the{" "}
        <Link href="/privacy-policy">privacy policy</Link>, and which cookies we use in the{" "}
        <Link href="/cookies">cookie policy</Link>.
      </p>
    </LegalTemplate>
  );
}
