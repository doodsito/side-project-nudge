"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NudgeLogo } from "@/components/atoms/nudge-logo";
import { useHasSession } from "@/hooks/use-has-session";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const signedIn = useHasSession();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const items = [
    ["Try a challenge", "/#challenge"],
    ["How it works", "/#how-it-works"],
  ] as const;
  return (
    <header
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/85 shadow-soft backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8">
        <Link href="/#top" aria-label="Nudge home">
          <NudgeLogo small />
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {items.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            {!signedIn && (
              <Button
                asChild
                variant="outline"
                className="h-10 rounded-xl border-border-strong bg-surface font-bold transition-all hover:-translate-y-px hover:bg-muted"
              >
                <Link href="/#early-access">Join the waitlist</Link>
              </Button>
            )}
            <Button
              asChild
              className="group h-10 rounded-xl font-bold transition-all hover:-translate-y-px"
            >
              <Link href={signedIn ? "/dashboard" : "/beta"}>
                {signedIn ? "Dashboard" : "I have a code"}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </nav>
        <Button
          ref={toggleRef}
          size="icon"
          variant="outline"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
          className="min-h-11 min-w-11 md:hidden"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="animate-slide-up border-t border-border bg-background px-5 py-4 shadow-lift md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-6xl flex-col">
            {items.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold hover:bg-muted"
              >
                {label}
              </Link>
            ))}
            {!signedIn && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="mt-2 border-border-strong bg-surface hover:bg-muted"
              >
                <Link href="/#early-access" onClick={() => setOpen(false)}>
                  Join the waitlist
                </Link>
              </Button>
            )}
            <Button asChild size="lg" className="mt-2">
              <Link href={signedIn ? "/dashboard" : "/beta"} onClick={() => setOpen(false)}>
                {signedIn ? "Dashboard" : "I have a code"} <ArrowRight />
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
