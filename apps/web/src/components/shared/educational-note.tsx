import { Info } from "lucide-react";

export function EducationalNote() {
  return (
    <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
      <Info className="mt-0.5 size-3.5 shrink-0" />
      Educational simulation only. Not investment advice.
    </p>
  );
}
