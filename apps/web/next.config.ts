import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AGENTS.md at the repository root is the single instruction file for agents,
  // so `next dev` must not generate a second AGENTS.md and CLAUDE.md in apps/web.
  agentRules: false,
};

export default nextConfig;
