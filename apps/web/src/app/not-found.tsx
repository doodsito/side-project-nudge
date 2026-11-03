import type { Metadata } from "next";
import Link from "next/link";
import { PracticeButton } from "@/components/marketing/practice-button";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { getVisitorTrack } from "@/lib/auth";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${(await getVisitorTrack()) === "fr" ? "Page introuvable" : "Page not found"} | ${BRAND}`,
  };
}

export default async function NotFound() {
  const track = await getVisitorTrack();
  const fr = track === "fr";
  return (
    <div
      lang={fr ? "fr-FR" : "en-US"}
      className="flex min-h-screen items-center justify-center bg-background px-4"
    >
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          {fr ? "Page introuvable" : "Page not found"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {fr
            ? "La page recherchée n’existe pas ou a été déplacée."
            : "The page you’re looking for doesn’t exist or has been moved."}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PracticeButton location="not_found">
            {fr ? "Essayer un exercice" : "Try the practice case"}
          </PracticeButton>
          <Button asChild variant="outline" size="lg">
            <Link href="/">{fr ? "Retour à l’accueil" : "Go home"}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
