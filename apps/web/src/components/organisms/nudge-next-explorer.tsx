"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { NudgeNextTopicArt } from "@/components/molecules/nudge-next-topic-art";
import { Button } from "@/components/ui/button";
import { nudgeCopy, type NudgeLocale, type Topic } from "@/lib/nudge-next-copy";

const topics: Topic[] = ["markets", "time", "spread"];

export function NudgeNextExplorer({
  locale,
  onExplored,
}: {
  locale: NudgeLocale;
  onExplored: () => void;
}) {
  const [topic, setTopic] = useState<Topic>("markets");
  const [read, setRead] = useState<Topic[]>([]);
  const c = nudgeCopy[locale];
  const current = c.topics[topic];
  return (
    <section className="nx-explore" id="explore" aria-labelledby="nx-explore-title">
      <div className="nx-section-heading">
        <h2 id="nx-explore-title">{c.exploreTitle}</h2>
        <p>{c.exploreIntro}</p>
      </div>
      <div className="nx-explorer-body">
        <div className="nx-topics">
          <div className="nx-topic-buttons" role="group" aria-label={c.exploreTitle}>
            {topics.map((value) => (
              <button
                key={value}
                aria-pressed={topic === value}
                aria-controls="nx-topic-content"
                onClick={() => setTopic(value)}
              >
                <span>{c.topics[value].name}</span>
                {read.includes(value) ? (
                  <Check size={19} aria-hidden="true" />
                ) : (
                  <ArrowUpRight size={19} aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
          <p>{c.promise}</p>
        </div>
        <article className="nx-topic-content" id="nx-topic-content" aria-live="polite">
          <div className="nx-topic-visual">
            <NudgeNextTopicArt topic={topic} locale={locale} />
            <span className="nx-topic-subtitle">{current.subtitle}</span>
          </div>
          <div className="nx-topic-copy">
            <h3>{current.title}</h3>
            <p>{current.body}</p>
            <p className="nx-topic-detail">{current.detail}</p>
            <Button
              variant="ghost"
              className="nx-text-link"
              disabled={read.includes(topic)}
              onClick={() => {
                setRead([...read, topic]);
                onExplored();
              }}
            >
              {read.includes(topic) ? c.progress : c.topicRead}
              {read.includes(topic) ? (
                <Check aria-hidden="true" />
              ) : (
                <ArrowUpRight aria-hidden="true" />
              )}
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
