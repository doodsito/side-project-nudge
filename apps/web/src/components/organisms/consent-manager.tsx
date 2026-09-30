"use client";

import { type ComponentProps, type ReactNode } from "react";
import { ConsentBanner, ConsentDialog, ConsentManagerProvider } from "@c15t/nextjs";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

// CNIL: analytics cookies live 13 months at most, without being renewed on each visit.
const THIRTEEN_MONTHS_IN_SECONDS = 60 * 60 * 24 * 395;

const options: ComponentProps<typeof ConsentManagerProvider>["options"] = {
  // Consent is stored in this browser only (a `c15t` cookie and localStorage): no server to run.
  mode: "offline",
  consentCategories: ["necessary", "measurement"],
  // The choice is asked again after about 6 months, as the CNIL recommends.
  storageConfig: { defaultExpiryDays: 182 },
  // Google's gtag snippet, split in two. c15t adds both scripts only after the visitor
  // accepts analytics, never before, and reloads the page if they withdraw consent later.
  scripts: [
    {
      id: "google-analytics-config",
      category: "measurement",
      textContent: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', ${JSON.stringify({
          cookie_expires: THIRTEEN_MONTHS_IN_SECONDS,
          cookie_update: false,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
        })});
      `,
    },
    {
      id: "google-analytics",
      category: "measurement",
      src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
    },
  ],
  legalLinks: { cookiePolicy: { href: "/cookies", target: "_self", label: "Cookie policy" } },
  i18n: {
    locale: "en",
    messages: {
      en: {
        common: {
          acceptAll: "Accept all",
          rejectAll: "Reject all",
          customize: "Customize",
          save: "Save settings",
        },
        cookieBanner: {
          title: "Can we measure your visit?",
          description:
            "With your permission, Google Analytics sets cookies to count visits and show which pages help people learn. Nothing is set unless you accept, and you can change your choice at any time from the footer.",
        },
        consentManagerDialog: {
          title: "Cookie settings",
          description:
            "Choose which cookies Nudge may use. You can come back here at any time from the footer.",
        },
        consentTypes: {
          necessary: {
            title: "Strictly necessary",
            description: "Remembers your cookie choice. Always on.",
          },
          measurement: {
            title: "Analytics",
            description:
              "Google Analytics counts visits and shows which pages and features are used, so we can improve Nudge.",
          },
        },
      },
    },
  },
  colorScheme: "light",
  theme: {
    colors: {
      primary: "var(--primary)",
      primaryHover: "color-mix(in oklab, var(--primary) 90%, var(--background))",
      surface: "var(--surface)",
      surfaceHover: "var(--surface-2)",
      border: "var(--border)",
      borderHover: "var(--border-strong)",
      text: "var(--foreground)",
      textMuted: "var(--muted-foreground)",
      textOnPrimary: "var(--primary-foreground)",
      switchTrack: "var(--border-strong)",
      switchTrackActive: "var(--primary)",
      switchThumb: "var(--surface)",
    },
    typography: { fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" },
    radius: {
      sm: "calc(var(--radius) - 4px)",
      md: "calc(var(--radius) - 2px)",
      lg: "var(--radius)",
      full: "9999px",
    },
  },
};

export function ConsentManager({ children }: { children: ReactNode }) {
  return (
    <ConsentManagerProvider options={options}>
      <ConsentBanner hideBranding legalLinks={["cookiePolicy"]} />
      <ConsentDialog hideBranding legalLinks={["cookiePolicy"]} />
      {children}
    </ConsentManagerProvider>
  );
}
