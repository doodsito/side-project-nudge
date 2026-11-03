"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTrackCookie } from "@/hooks/use-track-cookie";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  console.error(error);
  const fr = useTrackCookie() === "fr";

  return (
    <div
      lang={fr ? "fr-FR" : "en-US"}
      className="flex min-h-screen items-center justify-center bg-background px-4"
    >
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {fr ? "Cette page ne s’est pas chargée" : "This page didn’t load"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {fr
            ? "Un problème est survenu. Tu peux réessayer ou retourner à l’accueil."
            : "Something went wrong on our end. You can try refreshing or head back home."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button onClick={() => retry()}>{fr ? "Réessayer" : "Try again"}</Button>
          <Button asChild variant="outline">
            <Link href="/">{fr ? "Retour à l’accueil" : "Go home"}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
