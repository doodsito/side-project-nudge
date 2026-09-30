import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { ConsentManager } from "@/components/organisms/consent-manager";
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

export const metadata: Metadata = {
  title: "Practice investing before your money is on the line",
  description:
    "Learn investing by making real decisions with a virtual portfolio and real market data.",
  openGraph: { type: "website" },
  twitter: { card: "summary_large_image" },
  icons: { icon: { url: "/favicon.png", type: "image/png" } },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable}`}
    >
      <body>
        <ConsentManager>{children}</ConsentManager>
      </body>
    </html>
  );
}
