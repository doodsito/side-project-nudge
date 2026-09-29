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
      className={cn(
        "h-auto justify-start whitespace-normal rounded-xl text-left",
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
      className={cn(
        "grid shrink-0 place-items-center rounded-full border",
        selected ? "border-primary bg-primary text-primary-foreground" : "border-border-strong",
        className,
      )}
    >
      {children}
    </span>
  );
}
