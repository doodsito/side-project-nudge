"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CircleUser, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NudgeLogo } from "@/components/brand/nudge-logo";
import { signOut } from "@/app/dashboard/actions";
import { useHasSession } from "@/hooks/use-has-session";
import { BRAND } from "@/lib/brand";
import type { Dictionary } from "@/lib/dictionaries";
import type { Track } from "@/lib/tracks";
import { cn } from "@/lib/utils";

export function Navbar({ track, t }: { track: Track; t: Dictionary["nav"] }) {
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
        "fixed inset-x-0 top-0 z-40 px-5 transition-all duration-300 sm:px-8",
        scrolled
          ? "border-b border-border/70 bg-background/85 shadow-soft backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center">
        <Link
          href={`/${track}#top`}
          aria-label={`${BRAND} ${t.home}`}
          className="inline-flex min-h-11 w-fit items-center gap-2"
        >
          <NudgeLogo small />
          <span className="font-display text-2xl font-bold tracking-[-0.04em] text-foreground">
            {BRAND}
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label={t.main}>
          <div className="flex items-center gap-3">
            {!signedIn && (
              <Link
                href="/login"
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.logIn}
              </Link>
            )}
            <Button
              asChild
              variant="default"
              className="group h-10 rounded-xl font-bold transition-all hover:-translate-y-px"
            >
              <Link href={signedIn ? "/dashboard" : "/signup"}>
                {t.signUp}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            {signedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={t.accountMenu}
                    className="size-10 rounded-full text-muted-foreground hover:text-foreground [&_svg]:size-8"
                  >
                    <CircleUser strokeWidth={1.5} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-44">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/account">{t.account}</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => signOut()}>{t.logOut}</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </nav>
        <Button
          ref={toggleRef}
          size="icon"
          variant="outline"
          aria-label={t.toggle}
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
          className="-mx-5 animate-slide-up border-t border-border bg-background px-5 py-4 shadow-lift sm:-mx-8 sm:px-8 md:hidden"
          aria-label={t.mobile}
        >
          <div className="mx-auto flex max-w-6xl flex-col">
            {signedIn ? (
              <>
                <Link
                  href="/dashboard/account"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-semibold hover:bg-muted"
                >
                  {t.account}
                </Link>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="cursor-pointer rounded-lg px-3 py-3 text-left text-base font-semibold hover:bg-muted"
                >
                  {t.logOut}
                </button>
              </>
            ) : (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="mt-2 border-border-strong bg-surface hover:bg-muted"
              >
                <Link href="/login" onClick={() => setOpen(false)}>
                  {t.logIn}
                </Link>
              </Button>
            )}
            <Button asChild size="lg" variant="default" className="mt-2">
              <Link href={signedIn ? "/dashboard" : "/signup"} onClick={() => setOpen(false)}>
                {t.signUp} <ArrowRight />
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
