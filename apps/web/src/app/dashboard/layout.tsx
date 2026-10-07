import type { Metadata } from "next";
import { DashboardTemplate } from "@/components/templates/dashboard-template";
import { BRAND } from "@/lib/brand";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: { template: `%s | ${BRAND}`, default: BRAND },
  robots: { index: false, follow: false },
};

// No access check here: a layout is not re-run on every navigation, so each
// page calls requireMember() itself (lib/auth.ts).
export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return <DashboardTemplate signOut={signOut}>{children}</DashboardTemplate>;
}
