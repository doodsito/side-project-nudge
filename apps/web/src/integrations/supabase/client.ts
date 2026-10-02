// Supabase client for the browser and the server. It only uses the publishable
// key, which is public by design: it can do no more than the database's row
// level security and functions allow. Never use a secret key in this app.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

let client: SupabaseClient<Database> | undefined;

// The client is created on first use, so pages still render when the variables
// are missing; only the features that call Supabase fail. Use it like this:
// import { getSupabase } from "@/integrations/supabase/client";
export function getSupabase(): SupabaseClient<Database> {
  if (!client) {
    // Next.js inlines NEXT_PUBLIC_ variables at build time, for both the browser and the server.
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !publishableKey) {
      throw new Error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. See apps/web/.env.example.",
      );
    }
    client = createClient<Database>(url, publishableKey);
  }
  return client;
}
