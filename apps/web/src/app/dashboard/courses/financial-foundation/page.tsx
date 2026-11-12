import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "World 1" };
}

export default async function FinancialFoundationPage() {
  redirect("/dashboard/courses");
}
