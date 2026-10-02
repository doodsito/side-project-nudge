// Supabase client for signed-in pages, Server Actions and Route Handlers. It
// keeps the user's session in cookies, so the server acts as that user and the
// database's row level security applies. Like client.ts, it only uses the
// publishable key. Create a new one for every request; never share it.
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

export function supabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. See apps/web/.env.example.",
    );
  }
  return { url, publishableKey };
}

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { url, publishableKey } = supabaseConfig();
  return createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components cannot set cookies; src/proxy.ts refreshes the session instead.
        }
      },
    },
  });
}
