import type { Metadata } from "next";
import { DM_Sans, Inter, Manrope, Space_Grotesk } from "next/font/google";
import { ConsentManager } from "@/components/layout/consent-manager";
import { Footer } from "@/components/layout/footer";
import { readTrackCookie } from "@/lib/auth";
import { llmsTxtAlternate } from "@/lib/metadata";
import "@/styles.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Practice investing before your money is on the line",
  description:
    "Learn investing by making real decisions with a virtual portfolio and real market data.",
  openGraph: { type: "website" },
  twitter: { card: "summary_large_image" },
  icons: { icon: { url: "/brand/nudge-bascule.svg", type: "image/svg+xml" } },
  alternates: llmsTxtAlternate,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const initialTrack = await readTrackCookie();
  return (
    <html
      lang={initialTrack === "fr" ? "fr" : "en"}
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable} ${dmSans.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <ConsentManager initialTrack={initialTrack}>
          {children}
          <Footer initialTrack={initialTrack} />
        </ConsentManager>
      </body>
    </html>
  );
}
