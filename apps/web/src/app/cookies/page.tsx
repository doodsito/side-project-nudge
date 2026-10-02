import type { Metadata } from "next";
import Link from "next/link";
import { ConsentDialogLink } from "@c15t/nextjs/components/consent-dialog-link";
import { Button } from "@/components/ui/button";
import { LegalTemplate } from "@/components/templates/legal-template";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { BRAND, CONTACT_EMAIL, SITE_URL } from "@/lib/brand";
import { llmsTxtAlternate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `Cookie Policy | ${BRAND}`,
  description: `Which cookies ${BRAND} uses, why, and how to change your choice at any time.`,
  alternates: { ...llmsTxtAlternate, canonical: `${SITE_URL}/cookies` },
};

const COOKIES = [
  {
    name: "c15t",
    purpose:
      "Remembers your cookie choice so we don't ask on every page. A copy is kept in your browser's local storage.",
    duration: "6 months",
    category: "Strictly necessary",
  },
  {
    name: "nudge_access_code",
    purpose: "Remembers the beta access code you entered until you finish signing in.",
    duration: "30 minutes",
    category: "Strictly necessary",
  },
  {
    name: "sb-…-auth-token",
    purpose: "Keeps you signed in to your beta account. Set only when you sign in.",
    duration: "Until you sign out, 400 days at most",
    category: "Strictly necessary",
  },
  {
    name: "sb-…-auth-token-code-verifier",
    purpose: "Secures your sign-in while you go through Google or the email link.",
    duration: "Deleted once you are signed in",
    category: "Strictly necessary",
  },
  {
    name: "_ga",
    purpose: "Google Analytics: tells visits from the same browser apart, to count visitors.",
    duration: "13 months",
    category: "Analytics, only if you accept",
  },
  {
    name: `_ga_${GA_MEASUREMENT_ID.replace("G-", "")}`,
    purpose: "Google Analytics: keeps track of the current visit.",
    duration: "13 months",
    category: "Analytics, only if you accept",
  },
];

export default function CookiesPage() {
  return (
    <LegalTemplate title="Cookie policy" updated="2 October 2026">
      <p>
        This page explains which cookies {new URL(SITE_URL).host} uses, why, and how to change your
        choice at any time. Everything else about your personal data is in our{" "}
        <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>In short</h2>
      <ul>
        <li>
          Without your permission, we only store your cookie choice and, when you sign in to the
          beta, what keeps you signed in.
        </li>
        <li>
          Google Analytics cookies are set only if you click “Accept all” or turn on Analytics in
          the cookie settings.
        </li>
        <li>We don’t use advertising cookies.</li>
      </ul>

      <h2>Cookies we use</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="border-b border-border-strong">
              <th className="py-3 pr-4 font-bold">Name</th>
              <th className="py-3 pr-4 font-bold">Purpose</th>
              <th className="py-3 pr-4 font-bold">Kept for</th>
              <th className="py-3 font-bold">Category</th>
            </tr>
          </thead>
          <tbody>
            {COOKIES.map((cookie) => (
              <tr key={cookie.name} className="border-b border-border align-top">
                <td className="py-3 pr-4 font-mono text-foreground">{cookie.name}</td>
                <td className="py-3 pr-4 leading-relaxed text-muted-foreground">
                  {cookie.purpose}
                </td>
                <td className="py-3 pr-4 whitespace-nowrap text-muted-foreground">
                  {cookie.duration}
                </td>
                <td className="py-3 text-muted-foreground">{cookie.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Google Analytics</h2>
      <p>
        Google Analytics is provided by Google Ireland Limited. It tells us how many people visit{" "}
        {BRAND}, which pages they read and which features they use, such as the practice decision.
        Its cookies last 13 months at most and are not renewed on each visit. Google signals and ad
        personalisation are turned off. Google may process this data outside the European Union; see{" "}
        <a href="https://policies.google.com/privacy">Google’s privacy policy</a>.
      </p>

      <h2>Change your choice</h2>
      <p>
        Click “Cookies” at the bottom of every page, or use the button below. If you withdraw your
        consent, the page reloads and Google Analytics no longer loads. You can also delete cookies
        from your browser settings.
      </p>
      <ConsentDialogLink asChild>
        <Button
          variant="outline"
          size="lg"
          className="mt-6 border-border-strong bg-surface hover:bg-muted"
        >
          Open cookie settings
        </Button>
      </ConsentDialogLink>

      <h2>Contact</h2>
      <p>
        Questions about this policy or your data:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalTemplate>
  );
}
