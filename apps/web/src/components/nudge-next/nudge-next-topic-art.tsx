import { nudgeCopy, type NudgeLocale, type Topic } from "@/lib/nudge-next-copy";

export function NudgeNextTopicArt({ topic, locale }: { topic: Topic; locale: NudgeLocale }) {
  const labels = nudgeCopy[locale].topics[topic].labels;
  if (topic === "time")
    return (
      <div className="nx-topic-art nx-time-art">
        <div className="nx-year-short">
          <span>{labels[0]}</span>
          <i />
        </div>
        <div className="nx-year-long">
          <span>{labels[1]}</span>
          <div>
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>
        <small>{labels[2]}</small>
      </div>
    );
  if (topic === "spread")
    return (
      <div className="nx-topic-art nx-spread-art">
        <div>
          <span>{labels[0]}</span>
          <div className="nx-one-holding">
            <i />
          </div>
        </div>
        <div>
          <span>{labels[1]}</span>
          <div className="nx-four-holdings">
            {Array.from({ length: 4 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>
        <small>{labels[2]}</small>
      </div>
    );
  return (
    <div className="nx-topic-art nx-market-art">
      <svg viewBox="0 0 480 210" aria-hidden="true">
        <path d="M50 105h375" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="m30 45 88 0-24 120H6Z" fill="currentColor" />
        <path d="m52 85 14 36 23-13" fill="none" className="nx-art-white-line" strokeWidth="4" />
        <path d="m213 45 88 0-24 120h-88Z" className="nx-fill-white" />
        <path d="M226 92h35m-42 23h35" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="m386 45 88 0-24 120h-88Z" className="nx-fill-lime" />
        <path d="m397 105 13 13 24-30" fill="none" stroke="currentColor" strokeWidth="4" />
      </svg>
      <div>
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
