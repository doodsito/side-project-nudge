"use client";

import { type ComponentProps, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/** A form's submit button: stays enabled until the form is sent, then shows `pendingLabel`. */
export function SubmitButton({
  children,
  pendingLabel,
  ...props
}: Omit<ComponentProps<typeof Button>, "type"> & { children: ReactNode; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} {...props}>
      {pending ? (
        <>
          <LoaderCircle className="animate-spin" aria-hidden /> {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
