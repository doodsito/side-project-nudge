/**
 * Lightweight analytics shim.
 *
 * Events are pushed to a queue on `window` and forwarded to PostHog or GA4 if
 * either is present. GA4 is only present once the visitor has accepted
 * analytics cookies: components/organisms/consent-manager.tsx loads it.
 */

/** Google Analytics 4 property "Nudge". A public ID, not a secret. */
export const GA_MEASUREMENT_ID = "G-G0TDDC3RS5";

export type AnalyticsEvent =
  | "navbar_beta_click"
  | "hero_beta_click"
  | "midpage_beta_click"
  | "final_beta_click"
  | "beta_modal_opened"
  | "beta_signup_submitted"
  | "beta_signup_completed"
  | "beta_modal_abandoned"
  | "demo_started"
  | "demo_answer_selected"
  | "demo_completed"
  | "faq_opened"
  | "market_scenario_answered"
  | "nav_cta_clicked"
  | "hero_cta_clicked"
  | "mid_page_cta_clicked"
  | "offer_cta_clicked"
  | "final_cta_clicked"
  | "demo_decision_confirmed"
  | "demo_lesson_opened";

type Props = Record<string, unknown>;

declare global {
  interface Window {
    posthog?: { capture: (event: string, props?: Props) => void };
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __npEvents?: Array<{ event: string; props: Props }>;
  }
}

export function track(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  const payload = { ...props, ts: new Date().toISOString() };

  window.__npEvents = window.__npEvents ?? [];
  window.__npEvents.push({ event, props: payload });

  try {
    window.posthog?.capture(event, payload);
    window.gtag?.("event", event, payload);
    if (!window.posthog && !window.gtag) {
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event, ...payload });
    }
  } catch {
    /* analytics must never break the page */
  }

  if (process.env.NODE_ENV === "development") {
    console.info(`[analytics] ${event}`, payload);
  }
}
