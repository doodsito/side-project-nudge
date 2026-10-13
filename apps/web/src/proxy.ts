import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/integrations/supabase/proxy";
import { isTrack, TRACK_COOKIE, trackForCountry } from "@/lib/tracks";

// "/" sends each visitor to their track: the one they chose, or else the one
// that matches their country (Vercel's x-vercel-ip-country header). The other
// paths read the Supabase session, to keep it fresh.
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const saved = request.cookies.get(TRACK_COOKIE)?.value;
    const track = isTrack(saved)
      ? saved
      : trackForCountry(request.headers.get("x-vercel-ip-country"));
    const url = request.nextUrl.clone();
    url.pathname = `/${track}`;
    return NextResponse.redirect(url);
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/lessons/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ],
};
