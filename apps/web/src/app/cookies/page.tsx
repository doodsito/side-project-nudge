import type { Metadata } from "next";
import { ConsentDialogLink } from "@c15t/nextjs/components/consent-dialog-link";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { MarketingTemplate } from "@/components/templates/marketing-template";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { BRAND, CONTACT_EMAIL, SITE_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Cookie Policy | ${BRAND}`,
  description: `Which cookies ${BRAND} uses, why, and how to change your choice at any time.`,
  alternates: { canonical: `${SITE_URL}/cookies` },
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

const heading = "mt-12 font-display text-2xl font-extrabold";
const text = "mt-4 leading-relaxed text-muted-foreground";

export default function CookiesPage() {
  return (
    <MarketingTemplate>
      <article className="px-5 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">Cookie policy</h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: 29 September 2026</p>
          <p className={text}>
            This page explains which cookies {new URL(SITE_URL).host} uses, why, and how to change
            your choice at any time.
          </p>

          <h2 className={heading}>In short</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
            <li>Without your permission, we only store your cookie choice.</li>
            <li>
              Google Analytics cookies are set only if you click “Accept all” or turn on Analytics
              in the cookie settings.
            </li>
            <li>We don’t use advertising cookies.</li>
          </ul>

          <h2 className={heading}>Cookies we use</h2>
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

          <h2 className={heading}>Google Analytics</h2>
          <p className={text}>
            Google Analytics is provided by Google Ireland Limited. It tells us how many people
            visit {BRAND}, which pages they read and which features they use, such as the practice
            decision. Its cookies last 13 months at most and are not renewed on each visit. Google
            signals and ad personalisation are turned off. Google may process this data outside the
            European Union; see{" "}
            <a
              href="https://policies.google.com/privacy"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Google’s privacy policy
            </a>
            .
          </p>

          <h2 className={heading}>Change your choice</h2>
          <p className={text}>
            Open the cookie settings from the link at the bottom of every page, or right here. If
            you withdraw your consent, the page reloads and Google Analytics no longer loads. You
            can also delete cookies from your browser settings.
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

          <h2 className={heading}>Contact</h2>
          <p className={text}>
            Questions about this policy or your data:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </article>
    </MarketingTemplate>
  );
}
