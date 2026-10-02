import { Check, X } from "lucide-react";
import { Reveal } from "@/components/atoms/reveal";
import { Section } from "@/components/atoms/section";
import { SectionIntro } from "@/components/molecules/section-intro";
import { cn } from "@/lib/utils";

// Compares approaches, never named companies. The first column is Nudge and is highlighted.
export function ComparisonTable({
  label,
  title,
  columns,
  rows,
  note,
}: {
  label: string;
  title: string;
  columns: string[];
  rows: Array<[string, boolean[]]>;
  note: string;
}) {
  return (
    <Section className="bg-surface-2">
      <SectionIntro centered label={label} title={title} />
      <Reveal className="mt-12 overflow-x-auto rounded-3xl border border-border bg-surface shadow-soft">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr>
              <td className="p-3 sm:p-5" />
              {columns.map((column, i) => (
                <th
                  key={column}
                  scope="col"
                  className={cn(
                    "p-3 text-center text-sm font-bold sm:p-5",
                    i === 0 ? "bg-primary-soft font-display text-base text-primary" : "",
                  )}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([row, values]) => (
              <tr key={row} className="border-t border-border">
                <th scope="row" className="p-3 text-sm font-semibold sm:p-5 sm:text-base">
                  {row}
                </th>
                {values.map((value, i) => (
                  <td key={columns[i]} className={cn("p-3 sm:p-5", i === 0 && "bg-primary-soft")}>
                    {value ? (
                      <Check
                        className="mx-auto size-5 text-market-up"
                        aria-label="Yes"
                        role="img"
                      />
                    ) : (
                      <X className="mx-auto size-5 text-market-down" aria-label="No" role="img" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
      <p className="mt-4 text-center text-sm text-muted-foreground">{note}</p>
    </Section>
  );
}
