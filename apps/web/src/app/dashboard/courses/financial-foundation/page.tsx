import type { Metadata } from "next";
import { FoundationWorld } from "@/components/dashboard/foundation-world";
import { requireMember } from "@/lib/auth";

export const metadata: Metadata = { title: "Build your financial foundation" };

export default async function FinancialFoundationPage() {
  const member = await requireMember();
  return <FoundationWorld progress={member.courseProgress} />;
}
