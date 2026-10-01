import {
  CASE_VALUES,
  caseResult,
  formatters,
  nudgeCopy,
  type NudgeLocale,
} from "@/lib/nudge-next-copy";
import type { Decision } from "@/lib/practice-case";

export function NudgeNextChart({
  locale,
  decision,
}: {
  locale: NudgeLocale;
  decision: Decision | null;
}) {
  const c = nudgeCopy[locale];
  const { money, percent, interpolate } = formatters(locale);
  const result = caseResult(decision);
  return (
    <figure className="nx-chart" aria-labelledby="nx-chart-title">
      <figcaption id="nx-chart-title">{c.chartTitle}</figcaption>
      <div className="nx-chart-event">
        <span>{c.fall}</span>
        <strong>{percent(-CASE_VALUES.fall)}</strong>
        <span className="nx-event-cut" aria-hidden="true" />
      </div>
      <div className="nx-chart-row">
        <div>
          <span>{c.before}</span>
          <strong>{money(CASE_VALUES.portfolio)}</strong>
        </div>
        <div className="nx-bar-track">
          <div className="nx-bar nx-bar-before" style={{ width: "100%" }} />
        </div>
      </div>
      <div className="nx-chart-row">
        <div>
          <span>{c.after}</span>
          <strong>{money(result.afterFall)}</strong>
        </div>
        <div className="nx-bar-track">
          <div
            className="nx-bar nx-bar-after"
            style={{ width: `${(result.afterFall / CASE_VALUES.portfolio) * 100}%` }}
          />
          <span className="nx-loss" style={{ width: "10%" }} />
        </div>
      </div>
      <div className={`nx-chart-row nx-chart-total ${decision ? "nx-chart-revealed" : ""}`}>
        <div>
          <span>{decision ? c.total : c.after}</span>
          <strong>{money(result.total)}</strong>
        </div>
        <div className="nx-bar-track">
          <div className="nx-bar nx-bar-after" style={{ width: "90%" }} />
          <div
            className="nx-bar nx-bar-added"
            style={{ width: `${(result.added / CASE_VALUES.portfolio) * 100}%` }}
          />
        </div>
        <p className="nx-add-label">
          {c.contribution}
          <b>{money(result.added)}</b>
        </p>
      </div>
      <p className="nx-chart-caption">{c.chartNote}</p>
      <details className="nx-assumptions">
        <summary>{c.virtual}</summary>
        <p>{c.assumption}</p>
        <p>{interpolate(c.amountNote)}</p>
      </details>
    </figure>
  );
}
