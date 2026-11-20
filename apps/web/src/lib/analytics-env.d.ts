// Declares the public PostHog variables so components/layout/consent-manager.tsx
// can read them as process.env.NAME. Next.js only inlines NEXT_PUBLIC_ variables
// written that way; process.env["NAME"] stays empty in the browser.
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?: string;
    readonly NEXT_PUBLIC_POSTHOG_HOST?: string;
  }
}
