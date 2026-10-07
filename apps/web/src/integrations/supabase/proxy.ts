// Refreshes the Supabase session before a signed-in page renders, because
// Server Components cannot write the refreshed cookies themselves. Called by
// src/proxy.ts. Based on Supabase's Next.js guide: keep getClaims() right after
// createServerClient() and return the response as it is, or users get signed out.
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseConfig } from "./server";
import type { Database } from "./types";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { url, publishableKey } = supabaseConfig();
  const supabase = createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        // Stops a CDN from caching a response that carries a session.
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();

  // A quick check only: every dashboard page checks the session and the beta
  // access again (lib/auth.ts), since this proxy can be skipped.
  if (!data?.claims && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/beta", request.url));
  }
  return response;
}
