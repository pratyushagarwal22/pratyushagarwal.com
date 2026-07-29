"use client";

import { useState } from "react";
import { log } from "@/data/log";
import { contentContainerClassName } from "./ContentContainer";
import { GitHubSlot } from "./GitHubSlot";
import { LogEntry } from "./LogEntry";
import { SectionHeading } from "./SectionHeading";
import { ShowMoreButton } from "./ShowMoreButton";

const DEFAULT_VISIBLE = 5;

export function ShippingLog() {
  const [showAll, setShowAll] = useState(false);

  const sorted = [...log].sort((a, b) => b.date.localeCompare(a.date));
  const total = sorted.length;
  const hiddenCount = Math.max(0, total - DEFAULT_VISIBLE);
  const visible = showAll ? sorted : sorted.slice(0, DEFAULT_VISIBLE);

  return (
    <section
      id="now"
      aria-labelledby="now-heading"
      className={`${contentContainerClassName} scroll-mt-20`}
    >
      <SectionHeading id="now-heading">Now</SectionHeading>
      <p className="mt-2 font-body text-base text-text-muted">
        A dated feed of what I ship — commits, writes, and milestones.
      </p>

      <div className="mt-8 flex flex-col gap-8">
        <GitHubSlot />

        <div>
          <ol className="list-none p-0">
            {visible.map((entry, index) => (
              <li key={entry.id}>
                <LogEntry
                  entry={entry}
                  isLast={index === visible.length - 1}
                />
              </li>
            ))}
          </ol>

          {total > DEFAULT_VISIBLE ? (
            <ShowMoreButton
              expanded={showAll}
              count={hiddenCount}
              onClick={() => setShowAll((v) => !v)}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
