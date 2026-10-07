import type { Metadata } from "next";
import Link from "next/link";
import { PracticeButton } from "@/components/molecules/practice-button";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Page not found | ${BRAND}`,
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PracticeButton location="not_found" />
          <Button asChild variant="outline" size="lg">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
