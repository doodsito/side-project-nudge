import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

// Indexable pages only: /nudge-next is a noindex preview and /demo redirects to /practice.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/practice",
    "/privacy-policy",
    "/terms-of-service",
    "/legal-notice",
    "/cookies",
  ].map((path) => ({ url: `${SITE_URL}${path}` }));
}
