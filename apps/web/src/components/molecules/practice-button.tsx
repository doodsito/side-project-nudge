"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function PracticeButton({
  className,
  children = "Try your first investing decision",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Button
      asChild
      className={cn(
        "group h-12 rounded-xl px-6 text-base font-bold shadow-soft transition-all hover:-translate-y-px hover:shadow-lift active:scale-[.98]",
        className,
      )}
    >
      <Link href="/practice" onClick={() => track("demo_started", { location: "homepage_cta" })}>
        {children}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </Button>
  );
}
