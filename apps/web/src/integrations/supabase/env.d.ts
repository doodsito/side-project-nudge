// Declares the public Supabase variables so client.ts can read them as
// process.env.NAME. Next.js only inlines NEXT_PUBLIC_ variables written that
// way; process.env["NAME"] stays empty in the browser.
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_SUPABASE_URL?: string;
    readonly NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
  }
}
