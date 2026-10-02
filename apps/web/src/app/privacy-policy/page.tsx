import type { Metadata } from "next";
import Link from "next/link";
import { LegalTemplate } from "@/components/templates/legal-template";
import { BRAND, CONTACT_EMAIL, PUBLISHER, SITE_URL } from "@/lib/brand";
import { llmsTxtAlternate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND}`,
  description: `What personal data ${BRAND} collects, why, how long we keep it and how to use your rights.`,
  alternates: { ...llmsTxtAlternate, canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  const contact = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
  return (
    <LegalTemplate title="Privacy policy" updated="2 October 2026">
      <p>
        This policy explains what personal data {BRAND} collects on {new URL(SITE_URL).host}, why,
        how long we keep it and how to use your rights. We never sell your data and never use it for
        advertising.
      </p>

      <h2>Who is responsible</h2>
      <p>
        The data controller is {PUBLISHER}, who publishes {BRAND} as an individual (see the{" "}
        <Link href="/legal-notice">legal notice</Link>). For anything about your data, write to{" "}
        {contact}.
      </p>

      <h2>What we collect and why</h2>
      <ul>
        <li>
          <strong>Early access list.</strong> When you join, we keep your email address, the profile
          you choose (student, young professional or other), where on the site you signed up and
          when. We use them only to tell you when early access opens and when {BRAND} launches; the
          profile helps us understand who is interested. Legal basis: your consent, given by
          submitting the form.
        </li>
        <li>
          <strong>Your beta account.</strong> When you create an account with an access code, we
          keep your email address, how you sign in (password or Google), the access code you used,
          when you joined and when you last signed in. Your password is stored only in a scrambled
          form (hashed) that nobody, us included, can read. If you sign in with Google, Google also
          shares your name and profile picture with us. We use this only to let you sign in and use
          the beta. Legal basis: the terms you accept when you create the account.
        </li>
        <li>
          <strong>Audience measurement.</strong> Only if you accept analytics cookies, Google
          Analytics records your visit: pages viewed, features used (such as the decision you make
          in the practice, or the profile you choose when you join the list, never your email),
          approximate location, device and browser. Legal basis: your consent. Details are in the{" "}
          <Link href="/cookies">cookie policy</Link>.
        </li>
        <li>
          <strong>Your cookie choice.</strong> We keep it in a cookie and in your browser’s local
          storage so we don’t ask on every page. It stays in your browser; we don’t receive it.
        </li>
        <li>
          <strong>Technical data.</strong> Our host, Vercel, processes technical data such as your
          IP address, browser and the pages requested, to deliver the site and protect it against
          abuse. Legal basis: our legitimate interest in running a working, secure site.
        </li>
      </ul>
      <p>
        What you enter in the practice stays in your browser tab and disappears when you leave the
        page: we don’t store it.
      </p>

      <h2>Who receives it</h2>
      <p>
        Only the {BRAND} team can see the early access list and the accounts. These providers
        process data on our behalf, under a data processing agreement:
      </p>
      <ul>
        <li>Vercel Inc., United States: hosting of the site.</li>
        <li>
          Supabase: sign-in and the database of the early access list and the accounts, stored in
          the European Union (Paris).
        </li>
        <li>
          Google Ireland Limited: Google Analytics, only if you accept it, and Google sign-in, only
          if you choose it.
        </li>
      </ul>

      <h2>Transfers outside the European Union</h2>
      <p>
        Some of these providers may process data in the United States. These transfers rely on the
        European Commission’s adequacy decision for the EU-US Data Privacy Framework or on its
        standard contractual clauses.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>
          Early access list: until you ask us to remove you, and at most 3 years after you sign up.
        </li>
        <li>Beta account: until you ask us to delete it.</li>
        <li>
          Google Analytics: its cookies last 13 months at most, and the data it collects is kept 14
          months at most.
        </li>
        <li>Your cookie choice: 6 months, then we ask again.</li>
        <li>Technical data: for the short period Vercel needs to run and secure the site.</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        You can ask to access, correct or delete your data, to restrict or object to its use, and to
        receive it in a portable format. You can also give instructions on what happens to your data
        after your death. Where we rely on your consent, you can withdraw it at any time: to leave
        the early access list or delete your account, email us from the address concerned; to turn
        off analytics, click “Cookies” at the bottom of any page.
      </p>
      <p>
        To use your rights, write to {contact}. We answer within one month. If you think your rights
        are not respected, you can complain to the CNIL, the French data protection authority (
        <a href="https://www.cnil.fr">cnil.fr</a>).
      </p>

      <h2>Children</h2>
      <p>
        You must be at least 15 to join the early access list or create an account: below that age,
        French law requires a parent’s consent. The rest of the site works without giving any
        personal data.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        When this policy changes, we update the date at the top of this page. If a change affects
        how we use your email, we tell the people on the early access list before it applies.
      </p>
    </LegalTemplate>
  );
}
