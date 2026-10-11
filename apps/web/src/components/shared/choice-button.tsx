"use client";

import { type ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// One answer of a single-choice question. Height and padding stay with the caller.
export function ChoiceButton({
  selected,
  className,
  ...props
}: Omit<ButtonProps, "role" | "variant"> & { selected: boolean }) {
  return (
    <Button
      variant="outline"
      role="radio"
      aria-checked={selected}
      onKeyDown={(event) => {
        const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
        if (!keys.includes(event.key)) return;
        const group = event.currentTarget.closest('[role="radiogroup"]');
        const choices = Array.from(
          group?.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)') ?? [],
        );
        if (!choices.length) return;
        event.preventDefault();
        const index = choices.indexOf(event.currentTarget);
        const offset = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? choices.length - 1
              : (index + offset + choices.length) % choices.length;
        choices[next]?.focus();
        choices[next]?.click();
      }}
      className={cn(
        "h-auto justify-start whitespace-normal rounded-xl text-left focus-visible:ring-2 focus-visible:ring-offset-2 active:bg-primary-soft",
        selected && "border-primary bg-primary-soft",
        className,
      )}
      {...props}
    />
  );
}

export function ChoiceMarker({
  selected,
  className,
  children,
}: {
  selected: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full border",
        selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
