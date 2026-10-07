import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { BRAND } from "@/lib/brand";
import { NudgeNextFlow } from "./nudge-next-flow";
import "./nudge-next.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-nudge-next-display",
  display: "swap",
});
const body = DM_Sans({ subsets: ["latin"], variable: "--font-nudge-next-body", display: "swap" });

export const metadata: Metadata = {
  title: `Get a feel for investing | ${BRAND}`,
  description:
    "An interactive investing-learning direction study. Fictional situations, virtual money, real understanding.",
  robots: { index: false, follow: false },
  icons: { icon: { url: "/brand/nudge-next-mark.svg?v=2", type: "image/svg+xml" } },
};

export default function NudgeNextPage() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <NudgeNextFlow />
    </div>
  );
}
