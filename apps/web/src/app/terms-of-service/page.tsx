import type { Metadata } from "next";
import Link from "next/link";
import { LegalTemplate } from "@/components/templates/legal-template";
import { BRAND, CONTACT_EMAIL, SITE_URL } from "@/lib/brand";
import { llmsTxtAlternate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `Terms of Service | ${BRAND}`,
  description: `The rules for using ${BRAND}: an educational project, never investment advice.`,
  alternates: { ...llmsTxtAlternate, canonical: `${SITE_URL}/terms-of-service` },
};

export default function TermsOfServicePage() {
  return (
    <LegalTemplate title="Terms of service" updated="1 October 2026">
      <p>
        These terms apply when you use {new URL(SITE_URL).host}. By using the site, you accept them.
        If you don’t agree, please don’t use the site.
      </p>

      <h2>What {BRAND} is</h2>
      <p>
        {BRAND} is an educational project. It lets you practise investing decisions with fictional
        situations and virtual money, then explains the reasoning behind your choices. The site is
        free and needs no account. {BRAND} has not launched yet: this early version may change or
        stop at any time.
      </p>

      <h2>Education, not advice</h2>
      <p>
        Nothing on {BRAND} is investment, financial, tax or legal advice, or a recommendation to buy
        or sell any financial product. {BRAND} does not assess whether an investment suits you and
        is not a regulated financial adviser. Situations, prices and results in the practice are
        fictional or simplified, and past performance does not predict future results.
      </p>
      <p>
        Investing involves risk, including the possible loss of capital. Before investing real
        money, take the time to understand the risks, and consider talking to a licensed
        professional.
      </p>

      <h2>Virtual money only</h2>
      <p>
        You cannot deposit, invest or withdraw real money on {BRAND}. Virtual results have no cash
        value.
      </p>

      <h2>Early access list</h2>
      <p>
        You can join the early access list if you are at least 15, with an email address that is
        yours. We use it as described in the <Link href="/privacy-policy">privacy policy</Link>, and
        you can leave the list at any time by writing to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Using the site</h2>
      <p>
        Please don’t try to break the site, overload it or get around its security. Search engines,
        crawlers and AI systems are welcome to read the public pages, within the rules of our{" "}
        <a href="/robots.txt">robots.txt</a>.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The texts, design, logo and code of {BRAND} belong to the {BRAND} authors. All rights
        reserved. You may quote short extracts with a link to the source; anything else needs our
        written permission. Search engines and AI systems may index, quote and learn from the public
        pages.
      </p>

      <h2>Availability and accuracy</h2>
      <p>
        We do our best to keep the site available and its content accurate, but we can’t guarantee
        either. Content may contain errors or become outdated.
      </p>

      <h2>Liability</h2>
      <p>
        {BRAND} is provided free of charge and as is. To the extent the law allows, we are not
        liable for decisions you make, including investment decisions, based on what you read or
        practise on the site. Nothing in these terms limits any liability that the law does not
        allow us to limit.
      </p>

      <h2>Links to other sites</h2>
      <p>We link to other sites for convenience and are not responsible for their content.</p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms. The date at the top of this page shows the latest version, and
        the version that applies is the one published when you use the site.
      </p>

      <h2>Law and disputes</h2>
      <p>
        These terms are governed by French law. If a disagreement arises, please write to us first
        so we can try to settle it. If we can’t, the French courts will decide, without affecting
        any rights you have as a consumer in the country where you live.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. The publisher’s details are in the{" "}
        <Link href="/legal-notice">legal notice</Link>.
      </p>
    </LegalTemplate>
  );
}
