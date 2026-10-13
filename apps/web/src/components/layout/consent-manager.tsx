"use client";

import { useEffect, useMemo, useState, type ComponentProps, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  ConsentBanner,
  ConsentDialog,
  ConsentManagerProvider,
  prepareTranslationConfig,
  useConsentManager,
} from "@c15t/nextjs";
import { useTrackCookie } from "@/hooks/use-track-cookie";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { trackFromPath } from "@/lib/tracks";

// The pages the banner links to: they stay readable and scrollable while it is open.
const POLICY_PAGES = ["/privacy-policy", "/cookies"];

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
  legalLinks: {
    privacyPolicy: { href: "/privacy-policy", target: "_self", label: "Privacy policy" },
    cookiePolicy: { href: "/cookies", target: "_self", label: "Cookie policy" },
  },
  i18n: {
    messages: {
      en: {
        common: {
          acceptAll: "Accept all",
          rejectAll: "Reject all",
          customize: "Customize",
          save: "Save settings",
        },
        cookieBanner: {
          title: "🍪 Can we measure your visit?",
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
            description: "Remembers your cookie choice and your version of the site. Always on.",
          },
          measurement: {
            title: "Analytics",
            description:
              "Google Analytics counts visits and shows which pages and features are used, so we can improve Nudge.",
          },
        },
      },
      fr: {
        common: {
          acceptAll: "Tout accepter",
          rejectAll: "Tout refuser",
          customize: "Personnaliser",
          save: "Enregistrer",
        },
        cookieBanner: {
          title: "🍪 Pouvons-nous mesurer ta visite\u00a0?",
          description:
            "Avec ton accord, Google Analytics dépose des cookies pour compter les visites et voir quelles pages aident à apprendre. Rien n’est déposé sans ton accord, et tu peux changer d’avis à tout moment depuis le bas de page.",
        },
        consentManagerDialog: {
          title: "Réglages des cookies",
          description:
            "Choisis les cookies que Nudge peut utiliser. Tu peux revenir ici à tout moment depuis le bas de page.",
        },
        consentTypes: {
          necessary: {
            title: "Strictement nécessaires",
            description: "Mémorisent ton choix de cookies et ta version du site. Toujours actifs.",
          },
          measurement: {
            title: "Mesure d’audience",
            description:
              "Google Analytics compte les visites et montre quelles pages et fonctions sont utilisées, pour améliorer Nudge.",
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
    slots: {
      // c15t's wrapper grows to the full width of the screen and used to catch clicks
      // next to the card (a "Sign in" button could not be pressed): only the card does now.
      consentBanner: "pointer-events-none",
      consentBannerCard: "pointer-events-auto",
    },
  },
};

type Language = "en" | "fr";

// Offline, c15t starts with the `locale` language rather than the browser's. On
// the policy pages, the banner stays in its corner so the text can be read;
// elsewhere it is centred.
function optionsFor(language: Language, centred: boolean): typeof options {
  return {
    ...options,
    i18n: { ...options.i18n, locale: language },
    theme: {
      ...options.theme,
      slots: {
        ...options.theme?.slots,
        ...(centred && { consentBanner: "pointer-events-none inset-0 grid place-items-center" }),
      },
    },
  };
}

/**
 * Switches the banner and dialog to the track's language. c15t keeps the
 * language it started with, and a new provider would remount the whole page
 * (it wraps it): the track cookie is only read after hydration, so that
 * happened on every load of a non-track page for French visitors.
 */
function ConsentLanguage({ language }: { language: Language }) {
  const { translationConfig, setTranslationConfig } = useConsentManager();
  useEffect(() => {
    if (translationConfig.defaultLanguage === language) return;
    setTranslationConfig(
      prepareTranslationConfig({
        translations: options.i18n?.messages ?? {},
        defaultLanguage: language,
        disableAutoLanguageSwitch: true,
      }),
    );
  }, [language, translationConfig, setTranslationConfig]);
  return null;
}

export function ConsentManager({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const onPolicyPage = POLICY_PAGES.includes(pathname);
  const pageTrack = trackFromPath(pathname);
  const savedTrack = useTrackCookie();
  // On a track's pages, a first-time visitor makes both choices in TrackDialog;
  // the banner only asks if they close it without choosing for cookies.
  const showBanner = !pageTrack || Boolean(savedTrack);
  const language = (pageTrack ?? savedTrack) === "fr" ? "fr" : "en";
  // Only the first language starts c15t; ConsentLanguage follows later changes.
  const [startLanguage] = useState<Language>(language);
  const providerOptions = useMemo(
    () => optionsFor(startLanguage, !onPolicyPage),
    [startLanguage, onPolicyPage],
  );
  return (
    <ConsentManagerProvider options={providerOptions}>
      <ConsentLanguage language={language} />
      {showBanner && (
        <ConsentBanner
          hideBranding
          legalLinks={["privacyPolicy", "cookiePolicy"]}
          // Dims and locks the page until a choice is made, except on the policy pages.
          scrollLock={!onPolicyPage}
        />
      )}
      <ConsentDialog hideBranding legalLinks={["privacyPolicy", "cookiePolicy"]} />
      {children}
    </ConsentManagerProvider>
  );
}
