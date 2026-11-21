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
import { DEFAULT_TRACK, trackFromPath, type Track } from "@/lib/tracks";

// The pages the banner links to: they stay readable and scrollable while it is open.
const POLICY_PAGES = ["/privacy-policy", "/cookies"];

// CNIL: analytics cookies live 13 months at most, without being renewed on each visit.
const THIRTEEN_MONTHS_IN_SECONDS = 60 * 60 * 24 * 395;

// PostHog project, from the Vercel environment variables. Both values are public.
const POSTHOG_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

// PostHog's official loader snippet, then its settings: page views on every navigation,
// session replay with every typed value hidden, and a cookie of 13 months at most.
// Skipped when the token is missing, for example locally without a .env.local.
const posthogScripts = POSTHOG_TOKEN
  ? [
      {
        id: "posthog",
        category: "measurement" as const,
        textContent: `
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init(${JSON.stringify(POSTHOG_TOKEN)}, ${JSON.stringify({
            api_host: POSTHOG_HOST,
            person_profiles: "identified_only",
            capture_pageview: "history_change",
            cookie_expiration: 395,
            session_recording: { maskAllInputs: true },
          })});
        `,
      },
    ]
  : [];

const options: ComponentProps<typeof ConsentManagerProvider>["options"] = {
  // Consent is stored in this browser only (a `c15t` cookie and localStorage): no server to run.
  mode: "offline",
  consentCategories: ["necessary", "measurement"],
  // The choice is asked again after about 6 months, as the CNIL recommends.
  storageConfig: { defaultExpiryDays: 182 },
  // Google's gtag snippet, split in two, and PostHog. c15t adds these scripts only after the
  // visitor accepts analytics, never before, and reloads the page if they withdraw consent later.
  scripts: [
    ...posthogScripts,
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
    privacyPolicy: { href: "/privacy-policy", target: "_self" },
    cookiePolicy: { href: "/cookies", target: "_self" },
  },
  i18n: {
    messages: {
      en: {
        legalLinks: { privacyPolicy: "Privacy policy", cookiePolicy: "Cookie policy" },
        common: {
          acceptAll: "Accept all",
          rejectAll: "Reject all",
          customize: "Customize",
          save: "Save settings",
        },
        cookieBanner: {
          title: "🍪 Can we measure your visit?",
          description:
            "With your permission, Google Analytics and PostHog set cookies to count visits, show which pages help people learn and replay visits with what you type hidden. Nothing is set unless you accept, and you can change your choice at any time from the footer.",
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
              "Google Analytics and PostHog count visits, show which pages and features are used and replay visits with what you type hidden, so we can improve Nudge.",
          },
        },
      },
      fr: {
        legalLinks: { privacyPolicy: "Confidentialité", cookiePolicy: "Cookies" },
        common: {
          acceptAll: "Tout accepter",
          rejectAll: "Tout refuser",
          customize: "Personnaliser",
          save: "Enregistrer",
        },
        cookieBanner: {
          title: "🍪 Pouvons-nous mesurer ta visite\u00a0?",
          description:
            "Avec ton accord, Google Analytics et PostHog déposent des cookies pour compter les visites, voir quelles pages aident à apprendre et revoir les visites sans ce que tu tapes. Rien n’est déposé sans ton accord, et tu peux changer d’avis à tout moment depuis le bas de page.",
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
              "Google Analytics et PostHog comptent les visites, montrent quelles pages et fonctions sont utilisées et permettent de revoir les visites sans ce que tu tapes, pour améliorer Nudge.",
          },
        },
      },
    },
  },
  colorScheme: "light",
  theme: {
    colors: {
      primary: "var(--nudge-learn-violet)",
      primaryHover: "var(--nudge-learn-violet-hover)",
      surface: "var(--nudge-learn-white)",
      surfaceHover: "var(--nudge-learn-white)",
      border: "var(--nudge-learn-neutral-200)",
      borderHover: "var(--nudge-learn-neutral-300)",
      text: "var(--nudge-learn-ink)",
      textMuted: "var(--nudge-learn-neutral-600)",
      textOnPrimary: "var(--nudge-learn-white)",
      switchTrack: "var(--nudge-learn-neutral-300)",
      switchTrackActive: "var(--nudge-learn-violet)",
      switchThumb: "var(--nudge-learn-white)",
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
      consentBannerCard: {
        className:
          "pointer-events-auto overflow-hidden rounded-3xl border border-[var(--nudge-learn-neutral-200)] shadow-lift",
        style: { width: "calc(100% - 2rem)", maxWidth: "42rem" },
      },
      consentBannerFooter:
        "border-t border-[var(--nudge-learn-neutral-200)] bg-[var(--nudge-learn-white)] px-6 py-5",
      consentBannerTitle: "font-display font-semibold tracking-tight text-onboarding-ink",
      consentBannerDescription: "font-sans leading-relaxed",
      consentDialogCard:
        "overflow-hidden rounded-3xl border border-[var(--nudge-learn-neutral-200)] bg-[var(--nudge-learn-white)] shadow-lift",
      consentDialogTitle: "font-display font-semibold tracking-tight text-onboarding-ink",
      buttonPrimary: "h-12 rounded-xl px-5 font-sans font-semibold",
      buttonSecondary: "h-12 rounded-xl px-5 font-sans font-semibold",
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

export function ConsentManager({
  children,
  initialTrack,
}: {
  children: ReactNode;
  initialTrack: Track | null;
}) {
  const pathname = usePathname();
  const onPolicyPage = POLICY_PAGES.includes(pathname);
  const pageTrack = trackFromPath(pathname);
  const savedTrack = useTrackCookie();
  // On a track's pages, a first-time visitor makes both choices in TrackDialog;
  // the banner only asks if they close it without choosing for cookies.
  const showBanner = !pageTrack || Boolean(savedTrack ?? initialTrack);
  const language =
    (pageTrack ?? savedTrack ?? initialTrack ?? DEFAULT_TRACK) === "fr" ? "fr" : "en";
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
