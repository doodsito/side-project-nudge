import { Info } from "lucide-react";
import { us } from "@/lib/dictionaries/us";

export function EducationalNote({ copy = us.learning.shared.educationalNote }: { copy?: string }) {
  return (
    <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
      <Info className="mt-0.5 size-3.5 shrink-0" />
      {copy}
    </p>
  );
}
