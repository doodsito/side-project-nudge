import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <p
      className={cn("text-[11px] font-extrabold uppercase", inverse ? "text-mint" : "text-primary")}
    >
      {children}
    </p>
  );
}
