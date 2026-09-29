import { Eyebrow } from "@/components/atoms/eyebrow";
import { Reveal } from "@/components/atoms/reveal";
import { cn } from "@/lib/utils";

export function SectionIntro({
  label,
  title,
  text,
  centered = false,
  inverse = false,
}: {
  label: string;
  title: string;
  text?: string;
  centered?: boolean;
  inverse?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-4xl", centered && "mx-auto text-center")}>
      <Eyebrow inverse={inverse}>{label}</Eyebrow>
      <h2
        className={cn(
          "mt-4 font-display text-3xl leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.5rem]",
          inverse && "text-ink-foreground",
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            centered && "mx-auto",
            inverse ? "text-ink-foreground/65" : "text-muted-foreground",
          )}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}
