import { type NextRequest } from "next/server";
import { updateSession } from "@/integrations/supabase/proxy";

// Runs before the pages that read the Supabase session, to keep it fresh.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/dashboard/:path*", "/beta", "/reset-password"],
};
