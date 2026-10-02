import { BRAND, BRAND_TAGLINE, CONTACT_EMAIL, SITE_URL } from "@/lib/brand";

// Built once at build time: the content only depends on constants.
export const dynamic = "force-static";

// A short, described index of the site for AI agents, following https://llmstxt.org.
const body = `# ${BRAND}

> ${BRAND_TAGLINE}

${BRAND} is an investing-education app for young working adults who know they should invest but have never started. Visitors practise investing decisions with fictional situations and virtual money, then see the reasoning and trade-offs behind their choices.

${BRAND} is education, never financial advice: it does not recommend any financial product, assess whether an investment suits someone or promise returns. It has not launched yet. The site is in English and French, and amounts are in euros.

## Pages

- [Home](${SITE_URL}/): the interactive experience. A fictional case where the market dips and Alex chooses whether to keep, delay or increase a planned contribution, with the trade-off of each choice; short ideas to explore (market movements, time horizons, diversification); progress through the session.
- [Practice](${SITE_URL}/practice): one first money decision in a fictional case, choosing between accessible savings and a first investment, then checking what was learned. No account needed.

## Optional

- [Terms of service](${SITE_URL}/terms-of-service): the rules for using ${BRAND}; education, not advice.
- [Privacy policy](${SITE_URL}/privacy-policy): what personal data ${BRAND} collects, why, and for how long.
- [Cookie policy](${SITE_URL}/cookies): the cookies ${BRAND} uses and how to change consent.
- [Legal notice](${SITE_URL}/legal-notice): who publishes and hosts ${BRAND}.
- [Contact](mailto:${CONTACT_EMAIL}): questions about ${BRAND} or personal data.
`;

export function GET() {
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
