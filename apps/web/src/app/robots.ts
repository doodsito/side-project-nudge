import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

// Every crawler is welcome, AI ones included: search, AI answers and training are all allowed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
