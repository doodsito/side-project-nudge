import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { BRAND } from "@/lib/brand";
import { getVisitorTrack } from "@/lib/auth";
import { NudgeNextFlow } from "./nudge-next-flow";
import "./nudge-next.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-nudge-next-display",
  display: "swap",
});
const body = DM_Sans({ subsets: ["latin"], variable: "--font-nudge-next-body", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await getVisitorTrack()) === "fr";
  return {
    title: `${fr ? "Découvrir l’investissement" : "Get a feel for investing"} | ${BRAND}`,
    description: fr
      ? "Une exploration interactive de l’investissement. Situations fictives, argent virtuel, meilleure compréhension."
      : "An interactive investing-learning direction study. Fictional situations, virtual money, real understanding.",
    robots: { index: false, follow: false },
    icons: { icon: { url: "/brand/nudge-next-mark.svg?v=2", type: "image/svg+xml" } },
  };
}

export default async function NudgeNextPage() {
  const track = await getVisitorTrack();
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <NudgeNextFlow initialTrack={track} />
    </div>
  );
}
