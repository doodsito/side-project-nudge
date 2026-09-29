"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NudgeLogo } from "@/components/atoms/nudge-logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const items = [
    ["Why now", "#why-now"],
    ["What you gain", "#benefits"],
    ["How it works", "#how-it-works"],
  ] as const;
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/85 shadow-soft backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8">
        <a href="#top" aria-label="Nudge home">
          <NudgeLogo small />
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {items.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
          <a
            href="#early-access"
            className="group inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-soft transition-all hover:-translate-y-px"
          >
            Join early access{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </nav>
        <Button
          size="icon"
          variant="outline"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="min-h-11 min-w-11 md:hidden"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav
          className="animate-slide-up border-t border-border bg-background px-5 py-4 shadow-lift md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-6xl flex-col">
            {items.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold hover:bg-muted"
              >
                {label}
              </a>
            ))}
            <a
              href="#early-access"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-primary px-4 py-3 text-center font-bold text-primary-foreground"
            >
              Join early access →
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
