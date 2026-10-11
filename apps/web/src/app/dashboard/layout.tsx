import type { Metadata } from "next";
import { DashboardTemplate } from "@/components/dashboard/dashboard-template";
import { getMemberTrack } from "@/lib/auth";
import { BRAND } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";
import { TRACK_INFO } from "@/lib/tracks";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: { template: `%s | ${BRAND}`, default: BRAND },
  robots: { index: false, follow: false },
};

// No access check here: a layout is not re-run on every navigation, so each
// page calls requireMember() itself (lib/auth.ts). The member is only read for
// the language of their track.
export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const track = await getMemberTrack();
  const t = getDictionary(track);
  return (
    <div lang={TRACK_INFO[track].lang}>
      <DashboardTemplate signOut={signOut} t={t.dashboard} skipLink={t.skipLink}>
        {children}
      </DashboardTemplate>
    </div>
  );
}
