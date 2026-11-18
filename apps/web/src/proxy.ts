import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/integrations/supabase/proxy";
import { TRACK_COOKIE, TRACK_COOKIE_MAX_AGE, trackForLanguage } from "@/lib/tracks";

// "/" sends each visitor to the track that matches their browser language
// (Accept-Language). The other paths read the Supabase session, to keep it fresh.
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const track = trackForLanguage(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${track}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(TRACK_COOKIE, track, {
      path: "/",
      maxAge: TRACK_COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
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
