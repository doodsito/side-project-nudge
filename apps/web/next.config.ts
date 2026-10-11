import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AGENTS.md at the repository root is the single instruction file for agents,
  // so `next dev` must not generate a second AGENTS.md and CLAUDE.md in apps/web.
  agentRules: false,
  // /beta was split into /signup, /login and /forgot-password; old links and emails still work.
  redirects() {
    return [
      {
        source: "/beta",
        has: [{ type: "query", key: "step", value: "sign-in" }],
        destination: "/login",
        permanent: true,
      },
      {
        source: "/beta",
        has: [{ type: "query", key: "step", value: "reset" }],
        destination: "/forgot-password",
        permanent: true,
      },
      { source: "/beta", destination: "/signup", permanent: true },
    ];
  },
  // Basic security headers on every page. No Content-Security-Policy yet: the
  // consent banner and Google Analytics need one tuned for them.
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
