import { SITE_URL } from "@/lib/brand";

/**
 * Points AI agents to /llms.txt from the page <head>. Next.js replaces `alternates` as a whole, so a
 * page that sets its own canonical spreads this in: `alternates: { ...llmsTxtAlternate, canonical }`.
 */
export const llmsTxtAlternate = { types: { "text/markdown": `${SITE_URL}/llms.txt` } };
