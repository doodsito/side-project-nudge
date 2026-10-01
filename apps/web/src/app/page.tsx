import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { NudgeNextFlow } from "./nudge-next/nudge-next-flow";
import "./nudge-next/nudge-next.css";
import { BRAND, SITE_URL } from "@/lib/brand";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-nudge-next-display",
  display: "swap",
});
const body = DM_Sans({ subsets: ["latin"], variable: "--font-nudge-next-body", display: "swap" });

export const metadata: Metadata = {
  title: `${BRAND} — Get a feel for investing`,
  description:
    "Practise investing decisions with fictional situations and virtual money, then understand the reasoning behind your choices.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: `${BRAND} — Get a feel for investing`,
    description:
      "Practise investing decisions with fictional situations and virtual money, then understand the reasoning behind your choices.",
    type: "website",
    url: SITE_URL,
  },
  robots: { index: true, follow: true },
  icons: { icon: { url: "/brand/nudge-next-mark.svg?v=2", type: "image/svg+xml" } },
};

export default function HomePage() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <NudgeNextFlow />
    </div>
  );
}
