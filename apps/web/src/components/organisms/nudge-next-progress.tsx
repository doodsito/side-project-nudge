import { Check } from "lucide-react";
import { NudgeNextMark } from "@/components/atoms/nudge-next-mark";
import { nudgeCopy, type NudgeLocale } from "@/lib/nudge-next-copy";

export function NudgeNextProgress({
  locale,
  milestones,
}: {
  locale: NudgeLocale;
  milestones: boolean[];
}) {
  const c = nudgeCopy[locale];
  const count = milestones.filter(Boolean).length;
  return (
    <section id="progress" className="nx-progress" aria-labelledby="nx-progress-title">
      <div className="nx-progress-intro">
        <NudgeNextMark />
        <h2 id="nx-progress-title">{c.progressTitle}</h2>
        <p>{count === 3 ? c.completed : c.progressBody}</p>
      </div>
      <div className="nx-trail">
        <div className="nx-trail-count" aria-live="polite">
          <strong>
            {count}
            <span>/3</span>
          </strong>
          <span>{c.progress}</span>
        </div>
        <ol>
          {c.milestones.map((label, i) => (
            <li key={label} data-complete={milestones[i]}>
              <div className="nx-trail-segment">
                <span>{milestones[i] ? <Check size={24} aria-hidden="true" /> : i + 1}</span>
              </div>
              <span>{label}</span>
            </li>
          ))}
        </ol>
        <p>{c.session}</p>
      </div>
    </section>
  );
}
